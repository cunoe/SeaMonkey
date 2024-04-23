<script lang="ts" setup>
import { Command } from '@tauri-apps/api/shell'
import { useIntervalFn } from '@vueuse/core'
import { getKV } from "~/composables/store/kv";

import convertShipid from "~/utils/convert.shipid";
import parseDatetime from "~/utils/parse.datetime";

import Players from "~/components/player/Players.vue";
import GameStats from "~/components/player/GameStats.vue";
import { SettingsNeededSettingsModal } from '#components';

import type {Ref} from "vue";
import type {GameData, Vehicle} from "~/types/GameData";
import {sortShip} from "#imports";
import {saveBattleHistory} from "~/composables/store/battle_history";
import convertMatchGroup from "~/utils/convert.matchgroup";

const modal = useModal()
const toast = useToast()

const output: Ref<GameData> = ref(null as unknown as GameData)
const date: Ref<Date> = ref(new Date())
const dateTime = ref('')
const maxItem = ref(0)
const duration = ref(0)
const isReady = ref(false)
const gameDir = ref('')
const playersInfo: Ref<Vehicle[]> = ref([])
const player: Ref<Vehicle> = ref(null as unknown as Vehicle)
const teammates: Ref<Vehicle[]> = ref([])
const enemies: Ref<Vehicle[]> = ref([])
const checkModal = ref(false)

function openNeededSettingsModal() {
  toast.add({
    title: "请正确设置游戏目录"
  })
  checkModal.value = true
  modal.open(SettingsNeededSettingsModal, {
    un: 1,
    onSuccess: async () => {
      checkModal.value = false
    }
  })
}

onMounted(async () => {
  // 定期检测游戏目录 replays 下面的战斗信息
  useIntervalFn(async () => {
    // 如果模态框打开，则不执行
    if (checkModal.value) {return}
    // 如果游戏目录为空，则从数据库中获取，如果依然为空，则打开模态框
    if (!gameDir.value) {gameDir.value = await getKV("gameDir");if (gameDir.value === '') {openNeededSettingsModal()}}
    const command = Command.sidecar('binaries/replay-parser', ["-p", gameDir.value])
    command.execute().then(
        (res) => {
          // 如果返回值为 -1，则表示游戏目录错误
          if (res.stdout === "-1") {
            openNeededSettingsModal()
          } else if (res.stdout !== "") {
            let dataParse = JSON.parse(res.stdout)
            // 根据游戏时间判断是否为同一场游戏
            if (dataParse?.dateTime !== dateTime.value) {
              // 基本信息解析
              isReady.value = true
              output.value = dataParse
              date.value = parseDatetime(dataParse.dateTime)
              dateTime.value = dataParse.dateTime
              // 队友信息解析
              playersInfo.value = output.value?.vehicles.map(item => {
                // 使用 convert 函数获取船舶信息
                const shipInfo = convertShipid(String(item.shipId));
                // 将船舶信息添加到当前车辆对象中
                return {
                  ...item, // 保留原有的车辆信息
                  shipInfo: shipInfo // 添加船舶信息
                };
              });
              player.value = <Vehicle>playersInfo.value.find(item => item.relation === 0)
              teammates.value = playersInfo.value.filter(item => item.relation !== 2)
              enemies.value = playersInfo.value.filter(item => item.relation === 2)
              teammates.value = sortShip(teammates.value)
              enemies.value = sortShip(enemies.value)

              // 计算本场游戏中的最大人数
              maxItem.value = Math.max(teammates.value.length, enemies.value.length)

              saveBattleHistory({
                kokomi_battle_id: 0,
                start_time: date.value,
                match_group: convertMatchGroup(output.value.matchGroup).name,
                game_mode: output.value.gameMode,
                map_display_name: convertMapid(output.value.mapId).name,
                map_id: output.value.mapId,
                players_per_team: output.value.playersPerTeam,
                teams_count: output.value.teamsCount,
                duration: output.value.duration,
                player_name: player.value.name,
                player_vehicle: (player.value.shipInfo ? player.value.shipInfo.ship_name.zh_sg : '不认识这艘船捏'),
                scenario: output.value.scenario,
                teammate_server: '',
                enemy_server: '',
                raw_data: res.stdout
              })
            }
          }
        }
    ).catch(err => {console.log(err)});
  }, 5000)
  useIntervalFn(async () => {
    duration.value = ((new Date).getTime() - date.value.getTime())/1000
  }, 1000)
})

</script>

<template>
  <div>
    <div v-if="!isReady">
      <div class="p-2" />
      <div class="container max-w-full">
        <div class="w-full min-h-screen flex justify-center items-center">
          <div
              class="w-3/5 rounded-lg shadow-sm p-5 border-dashed border border-blue-500 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-0 text-center">
            <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
              <div class="text-center">
                <div class="stat-value text-3xl">还没有数据哦~请这位窝批，启动！</div>
                <span class="loading loading-infinity loading-lg"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-2" />
    </div>
    <div v-if="isReady">
      <div class="p-2" />
        <div class="container max-w-full">
          <GameStats :duration="duration" :gameData="output" :player="player" />
          <Players :teammates="teammates" :enemies="enemies" :maxItem="maxItem" />
      </div>
    </div>
  </div>
</template>

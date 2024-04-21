<script setup>
import { Command } from '@tauri-apps/api/shell'
import { useIntervalFn } from '@vueuse/core'
import convertShipid from "~/utils/convert.shipid.ts";
import parseDatetime from "~/utils/parse.datetime.ts";
import convertSecondsToString from "~/utils/convert.seconds.to.string.ts";
import convertMatchGroup from "../utils/convert.mathgroup.ts";
import numberToRoman from "../utils/number.to.roman.ts";
import {getKV} from "~/composables/store/kv.ts";
import { SettingsNeededSettingsModal } from '#components';
import isValidWindowsPath from "~/utils/valid.windows.path.ts";
import TeammateCard from "~/components/player/TeammateCard.vue";
import Players from "~/components/player/players.vue";

const modal = useModal()
const output = ref()
const date = ref()
const dateTime = ref('')
const maxItem = ref(0)
const duration = ref(0)
const isReady = ref(false)
const gameDir = ref()
const toast = useToast()
const playersInfo = ref([])
const player = ref({})
const teammates = ref([])
const enemies = ref([])

function openNeededSettingsModal() {
  toast.add({
    title: "请正确设置游戏目录"
  })
  modal.open(SettingsNeededSettingsModal, {
    onSuccess: async () => {
      gameDir.value = await getKV("gameDir")
    }
  })
}

onBeforeMount(async () => {
  gameDir.value = await getKV("gameDir")
  if (gameDir.value === '') {
    openNeededSettingsModal()
  }
});

onMounted(async () => {
  useIntervalFn(async () => {
    if (!isValidWindowsPath(gameDir.value)) {openNeededSettingsModal()}
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
                const shipInfo = convertShipid(item.shipId);
                // 将船舶信息添加到当前车辆对象中
                return {
                  ...item, // 保留原有的车辆信息
                  shipInfo: shipInfo // 添加船舶信息
                };
              });
              player.value = playersInfo.value.find(item => item.relation === 0)
              teammates.value = playersInfo.value.filter(item => item.relation !== 2)
              enemies.value = playersInfo.value.filter(item => item.relation === 2)

              // 计算本场游戏中的最大人数
              maxItem.value = Math.max(teammates.value.length, enemies.value.length)

            }
          }
        }
    )
  }, 5000)
  useIntervalFn(async () => {
    duration.value = date.value ? (new Date() - date.value) / 1000 : 0
  }, 1000)
})

</script>

<template>
  <div>
    <div v-if="!isReady">
      <div class="p-2" />
      <div class="text-3xl text-center">还没有数据哦~请这位窝批，启动！</div>
      <div class="p-2" />
    </div>
    <div v-if="isReady">
      <div class="p-2" />
        <div class="container max-w-full">
          <div class="flex justify-center">
            <div class="stats container">
              <div class="stat text-center">
                <div class="stat-title">游戏模式 GameMode</div>
                <div class="stat-value">{{convertMatchGroup(output?.matchGroup)}} {{output?.name}}</div>
              </div>
              <div class="stat text-center">
                <div class="stat-title">对战地图 Map</div>
                <div class="stat-value">{{convertMapid(output?.mapId).name}}</div>
              </div>
              <div class="stat text-center">
                <div class="stat-title">距离这一场战斗 Since</div>
                <div class="stat-value">{{ convertSecondsToString(duration) }}</div>
              </div>
              <div class="stat text-center">
                <div class="stat-title">你开的船 Ship</div>
                <div class="stat-value">
                  {{ player.shipInfo ? numberToRoman(player.shipInfo.tier) : '' }}
                  {{ player.shipInfo ? player.shipInfo.ship_name.zh_sg : '不认识这艘船捏' }}
                </div>
              </div>
            </div>
          </div>
          <players :teammates="teammates" :enemies="enemies" :maxItem="maxItem" />
      </div>
    </div>
  </div>
</template>

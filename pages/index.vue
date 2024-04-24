<script lang="ts" setup>
import { Command } from '@tauri-apps/api/shell'
import { useIntervalFn } from '@vueuse/core'
import { getKV } from "~/composables/store/kv";

import parseDatetime from "~/utils/parse.datetime";

import Players from "~/components/player/Players.vue";
import { SettingsNeededSettingsModal } from '#components';

import type {Ref} from "vue";
import type {GameData, Vehicle} from "~/types/GameData";
import {saveBattleHistory} from "~/composables/store/battle_history";
import convertMatchGroup from "~/utils/convert.matchgroup";

const modal = useModal()
const toast = useToast()

const gameDataParse: Ref<GameData> = ref(null as unknown as GameData)
const player: Ref<Vehicle> = ref(null as unknown as Vehicle)
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
  // 定时检测游戏目录下的战斗信息
  useIntervalFn(async () => {
    // 如果模态框打开，则不执行
    if (checkModal.value) {return}
    // 如果游戏目录为空，则从数据库中获取，如果依然为空，则打开模态框
    let gameDirSet = await getKV("gameDir")
    let gameServerSet = await getKV("gameServer")
    let clanEnemyServerSet = await getKV("clanEnemyServer")
    if (gameDirSet === '' || gameServerSet === '') {openNeededSettingsModal()}
    const command = Command.sidecar('binaries/replay-parser', ["-p", gameDirSet])
    command.execute().then((res) => {
          // 如果返回值为 -1，则表示游戏目录错误
          if (res.stdout === "-1") {
            openNeededSettingsModal()
          } else if (res.stdout !== "") {
            let strArr = res.stdout.split('------split------')
            if (strArr.length !== 2) {
              toast.add({
                title: "解析错误，检查游戏目录是否正确",
              })
            }
            let gameDataRaw = strArr[0]
            let gameServerAutoDetect = strArr[1]
            gameDataParse.value = JSON.parse(gameDataRaw)
            let playersInfo: Vehicle[] = gameDataParse.value.vehicles.map(item => {return {...item,shipInfo:convertShipid(String(item.shipId))}})
            player.value = <Vehicle>playersInfo.find(item => item.relation === 0)

            let teammateServer: string
            let enemyServer: string
            if (gameServerSet === 'auto') {
              if (gameServerAutoDetect === '-1') {
                toast.add({
                  title: "无法自动获取服务器，请手动设置",
                })
                throw new Error('无法自动获取服务器')
              }
              teammateServer = gameServerAutoDetect
            } else {
              teammateServer = gameServerSet
            }
            if (clanEnemyServerSet === 'sync') {
              enemyServer = teammateServer
            } else {
              enemyServer = clanEnemyServerSet
            }

            saveBattleHistory({
              timestamp: parseDatetime(gameDataParse.value.dateTime).getTime(),
              kokomi_battle_id: 0,
              start_time: parseDatetime(gameDataParse.value.dateTime),
              match_group: convertMatchGroup(gameDataParse.value.matchGroup).name,
              game_mode: gameDataParse.value.gameMode,
              map_display_name: convertMapid(gameDataParse.value.mapId).name,
              map_id: gameDataParse.value.mapId,
              players_per_team: gameDataParse.value.playersPerTeam,
              teams_count: gameDataParse.value.teamsCount,
              duration: gameDataParse.value.duration,
              player_name: player.value.name,
              player_vehicle: (player.value.shipInfo ? player.value.shipInfo.ship_name.zh_sg : '不认识这艘船捏'),
              scenario: gameDataParse.value.scenario,
              teammate_server: teammateServer,
              enemy_server: enemyServer,
              raw_data: gameDataRaw
            })
          }
        }
    ).catch(err => {console.log(err)});
  }, 5000)
})

</script>

<template>
  <div class="">
    <div>
      <Players />
    </div>
  </div>
</template>

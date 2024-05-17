<script lang="ts" setup>
import { invoke } from "@tauri-apps/api/tauri";
import { useIntervalFn } from '@vueuse/core'
import { getKV } from "~/composables/store/kv";

import parseDatetime from "~/utils/parse.datetime";
import convertMatchGroup from "~/utils/convert.matchgroup";

import type {GameData, Vehicle} from "~/types/GameData";


import { SettingsNeededSettingsModal } from '#components';
import {saveBattleHistory} from "~/composables/store/battle_history";
import checkServerValidity from "~/utils/check.server";

const modal = useModal()
const toast = useToast()

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

useIntervalFn(async () => {
  // 如果模态框打开，则不执行
  if (checkModal.value) {return}
  // 如果游戏目录为空，则从数据库中获取，如果依然为空，则打开模态框
  let gameDirSet = await getKV("gameDir")
  let gameServerSet = await getKV("gameServer")
  let clanEnemyServerSet = await getKV("clanEnemyServer")
  if (gameDirSet === '' || gameServerSet === '') {openNeededSettingsModal()}
  // 获取游戏目录下的战斗信息
  invoke('get_replays_temp_info', {gameDir: gameDirSet})
      .then(async (res: any) => {
        let gameDataParse: GameData
        if (typeof res === "string") {
          gameDataParse = JSON.parse(res)
        } else {
          throw new Error('数据解析失败')
        }
        let playersInfo: Vehicle[] = [];
        for (let i = 0; i < gameDataParse.vehicles.length; i++) {
          let getShipInfo = await convertShipid(String(gameDataParse.vehicles[i].shipId))
          if (getShipInfo) {
            playersInfo.push({
              ...gameDataParse.vehicles[i],
              shipInfo: getShipInfo
            })
          }
        }
        let player: Vehicle | undefined
        player = playersInfo.find(item => item.relation === 0)
        if (!player) {
          toast.add({
            title: "出现意外错误！请联系开发者！",
          })
          throw new Error('无法获取玩家信息')
        }

        let teammateServer = 'unknown';
        let enemyServer = 'unknown';
        try {
          if (gameServerSet === 'auto') {
            const res = await invoke('get_selected_realm', { gameDir: gameDirSet });
            if (typeof res === 'string') {
              if (checkServerValidity(res)) {
                teammateServer = res;
              } else {
                toast.add({
                  title: "错误：该服务器暂不支持！",
                });
              }
            }
          } else {
            teammateServer = gameServerSet;
          }

          if (gameDataParse.matchGroup.toUpperCase() === 'CLAN') {
            enemyServer = clanEnemyServerSet === 'sync' ? teammateServer : clanEnemyServerSet;
          } else {
            enemyServer = teammateServer;
          }
        } catch (err) {
          console.log(err);
        }

        if (teammateServer === 'unknown' || enemyServer === 'unknown') {
          toast.add({
            title: "错误：未获取到服务器信息！可能无法自动检测，请尝试手动选择服务器！",
          });
          throw new Error('teamServer or enemyServer is unknown')
        }

        if (!(checkServerValidity(teammateServer) && checkServerValidity(enemyServer))) {
          toast.add({
            title: "错误：服务器信息不正确！",
          });
          throw new Error('teamServer or enemyServer is invalid')
        }

        await saveBattleHistory({
          timestamp: parseDatetime(gameDataParse.dateTime).getTime(),
          kokomi_battle_id: 0,
          start_time: parseDatetime(gameDataParse.dateTime),
          match_group: convertMatchGroup(gameDataParse.matchGroup).name,
          game_mode: gameDataParse.gameMode,
          map_display_name: convertMapid(gameDataParse.mapId).name,
          map_id: gameDataParse.mapId,
          players_per_team: gameDataParse.playersPerTeam,
          teams_count: gameDataParse.teamsCount,
          duration: gameDataParse.duration,
          player_name: player.name,
          player_vehicle: (player.shipInfo ? player.shipInfo.ship_name.zh_sg : '不认识这艘船捏'),
          scenario: gameDataParse.scenario,
          teammate_server: teammateServer,
          enemy_server: enemyServer,
          tire: (player.shipInfo ? player.shipInfo.tier : -1),
          raw_data: res
        })
      })
      .catch((err) => {
        console.log(err);
        if (err === '1002') {
          toast.add({
            title: "错误：游戏目录下没有找到replays文件夹，请检查游戏目录是否正确！",
          })
        }
      })
}, 5000)



</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UModals />
  <UNotifications />
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

html.dark{
  color-scheme: dark;
}
</style>
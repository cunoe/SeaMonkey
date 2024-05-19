<script setup lang="ts">
import TeammateCard from "~/components/player/TeammateCard.vue";
import EnemyCard from "~/components/player/EnemyCard.vue";
import type {GameData, Vehicle} from "~/types/GameData";
import type {BattleHistory} from "~/composables/store/battle_history";
import GameStats from "~/components/player/GameStats.vue";
import {useIntervalFn} from "@vueuse/core";
import {getLatestBattleHistory} from "~/composables/store/battle_history";
import {sortShip} from "#imports";
import parseDatetime from "~/utils/parse.datetime";
import {defaultBattleDataItem, fetchBattleData} from "~/composables/requests/kokomi";
import type {BattleDataResponse, BattleDataRequest} from "~/composables/requests/kokomi";
import TeammateCardSimple from "~/components/player/TeammateCardSimple.vue";
import EnemyCardSimple from "~/components/player/EnemyCardSimple.vue";
import {getKV, saveKV} from "~/composables/store/kv";

const toast = useToast()

const isDetail = ref(false)
const isSortedByPr = ref(false)
const isHiddenStats = ref(false)

const screenInfo = ref('还没有数据哦~请这位窝批，启动！')
const battleHistory = ref<BattleHistory>(null as unknown as BattleHistory)
const gameInfo = ref<GameData>(null as unknown as GameData)
const teammates = ref<Vehicle[]>([])
const enemies = ref<Vehicle[]>([])
const player = ref<Vehicle>(null as unknown as Vehicle)
const maxItem = ref(12)
const isReady = ref(false)
const duration = ref(0)
const battleDataResp = ref(null as unknown as BattleDataResponse)

const result = ref<BattleHistory>(null as unknown as BattleHistory)

// 判断该条目是否为同一条目 避免重复请求
const lastTimestamp = ref(0)
const lastTeammateServer = ref('')
const lastEnemyServer = ref('')

function SortPlayers() {
  if (isSortedByPr.value) {
    let tempTeammates = teammates.value.map(item => {
      return {
        ...item,
        ship_profile: battleDataResp.value.battle_data.find(i => i.id === item.id)?.ship_profile ?? defaultBattleDataItem.ship_profile,
      }
    })
    let tempEnemies = enemies.value.map(item => {
      return {
        ...item,
        ship_profile: battleDataResp.value.battle_data.find(i => i.id === item.id)?.ship_profile ?? defaultBattleDataItem.ship_profile,
      }
    })
    teammates.value = tempTeammates.sort((a, b) => {
      return b.ship_profile.pr - a.ship_profile.pr
    })
    enemies.value = tempEnemies.sort((a, b) => {
      return b.ship_profile.pr - a.ship_profile.pr
    })
  } else {
    teammates.value = sortShip(teammates.value)
    enemies.value = sortShip(enemies.value)
  }
}

watch(isSortedByPr, () => {
  SortPlayers()
  saveKV('isSortedByPr', isSortedByPr.value.toString())
})

watch(isDetail, () => {
  saveKV('isDetail', isDetail.value.toString())
})

watch(isHiddenStats, () => {
  saveKV('isHiddenStats', isHiddenStats.value.toString())
})

watch(result, async (value) => {
  if (value) {
    await updateInfo(value)
  }
})

async function updateInfo(result: BattleHistory) {
  pause()

    screenInfo.value = '正在解析数据，请稍后'
    isReady.value = false

    getKV('isSortedByPr').then((res) => {
      isSortedByPr.value = res === 'true'
    }).catch(() => {
      isSortedByPr.value = false
    })

    getKV('isDetail').then((res) => {
      isDetail.value = res === 'true'
    }).catch(() => {
      isDetail.value = false
    })

    getKV('isHiddenStats').then((res) => {
      isHiddenStats.value = res === 'true'
    }).catch(() => {
      isHiddenStats.value = false
    })
    let gameData: GameData = JSON.parse(result.raw_data)
    let playersInfo: Vehicle[] = [];
    for (let i = 0; i < gameData.vehicles.length; i++) {
      let getShipInfo = await convertShipid(String(gameData.vehicles[i].shipId))
      if (getShipInfo) {
        playersInfo.push({
          ...gameData.vehicles[i],
          shipInfo: getShipInfo
        })
      }
    }
    player.value = <Vehicle>playersInfo.find(item => item.relation === 0)
    teammates.value = playersInfo.filter(item => item.relation !== 2)
    enemies.value = playersInfo.filter(item => item.relation === 2)
    maxItem.value = Math.max(teammates.value.length, enemies.value.length)
    gameInfo.value = gameData
    battleHistory.value = result

    lastTimestamp.value = result.timestamp
    lastTeammateServer.value = result.teammate_server
    lastEnemyServer.value = result.enemy_server

    let battleType = 'pvp'
    if (gameData.matchGroup.toUpperCase() === 'RANKED') {
      battleType = 'rank'
    }

    let params: BattleDataRequest = {
      battle_id: "",
      battle_type: battleType,
      teammate_server: battleHistory.value.teammate_server,
      teammates: teammates.value.map(item => {
        return {
          id: item.id,
          ship_id: item.shipId,
          name: item.name,
        }
      }),
      enemy_server: battleHistory.value.enemy_server,
      enemies: enemies.value.map(item => {
        return {
          id: item.id,
          ship_id: item.shipId,
          name: item.name,
        }
      }),
    }
    screenInfo.value = '正在请求数据，请稍后'
    await fetchBattleData(params).then((resp) => {
      battleDataResp.value = resp
      SortPlayers()
      isReady.value = true
    }).catch((err) => {
      toast.add({
        title: "获取数据失败：" + err,
      })
      screenInfo.value = '获取数据失败：' + err
      console.log(err)
      lastTimestamp.value = 0
    })

  resume()
}

onMounted(async () => {
  const r = await getLatestBattleHistory()
  if (r) {
    result.value = r
  } else {
    screenInfo.value = '没有数据哦~请这位窝批，启动！'
  }
})

const {pause, resume} = useIntervalFn(async () => {
  const r = await getLatestBattleHistory()
  if (!r) {return}
  if (r.timestamp === lastTimestamp.value && r.teammate_server === lastTeammateServer.value && r.enemy_server === lastEnemyServer.value) {
    return
  }
  result.value = r
}, 5000)
useIntervalFn(async () => {
  if (gameInfo.value) {
    duration.value = ((new Date).getTime() - parseDatetime(gameInfo.value.dateTime).getTime())/1000
  }
}, 1000)

</script>

<template>
  <div class="max-w-full">
    <div v-if="!isReady">
      <div class="p-2" />
      <div class="container max-w-full">
        <div class="w-full min-h-screen flex justify-center items-center">
          <div
              class="w-3/5 rounded-lg shadow-sm p-5 border-dashed border border-blue-500 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-0 text-center">
            <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
              <div class="text-center">
                <div class="text-3xl">{{ screenInfo }}</div>
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
        <div class="flex flex-row items-center justify-center">
          <div class="stats container"  :style="{backgroundColor: 'rgba(0, 0, 0, 0)'}" >
            <div class="stat text-center text-sm">
              <div class="flex flex-row stat-value text-xl space-x-2 justify-center items-center">
                <p>简洁模式</p>
                <input type="checkbox" class="toggle" checked  v-model="isDetail"/>
                <p>详细模式</p>
              </div>
            </div>
            <div class="stat text-center text-sm">
              <div class="flex flex-row stat-value text-xl space-x-2 justify-center items-center">
                <p>舰船排序</p>
                <input type="checkbox" class="toggle" checked  v-model="isSortedByPr"/>
                <p>评分排序</p>
              </div>
            </div>
            <div class="stat text-center text-2xl">
              <div class="flex flex-row stat-value text-xl space-x-2 justify-center items-center">
                <p>隐藏信息</p>
                <input type="checkbox" class="toggle" checked  v-model="isHiddenStats"/>
              </div>
            </div>
          </div>
        </div>
        <GameStats v-if="!isHiddenStats" :duration="duration" :gameData="gameInfo" :player="player" :battle-data="battleDataResp"/>
        <div class="columns-2 p-4 gap-2">
          <ul>
            <li v-for="(item, index) in teammates" :key="index" class="rounded-lg p-1 flex justify-end">
              <TeammateCard v-if="isDetail"
                  :playerInfo="item"
                  :server="battleHistory.teammate_server"
                  :battle-data="battleDataResp.battle_data.find(i => i.id === item.id)??defaultBattleDataItem"/>
              <TeammateCardSimple v-if="!isDetail"
                  :playerInfo="item"
                  :server="battleHistory.teammate_server"
                  :battle-data="battleDataResp.battle_data.find(i => i.id === item.id)??defaultBattleDataItem"/>
            </li>
            <template v-if="teammates.length < maxItem">
              <template v-for="i in maxItem - teammates.length">
                <div class="p-1">
                  <div v-if="isDetail" class="p-12"></div>
                  <div v-if="!isDetail" class="p-6"></div>
                </div>
              </template>
            </template>
          </ul>
          <ul>
            <li v-for="(item, index) in enemies" :key="index" class="rounded-lg p-1">
              <EnemyCard v-if="isDetail"
                  :playerInfo="item"
                  :server="battleHistory.enemy_server"
                  :battle-data="battleDataResp.battle_data.find(i => i.id === item.id)??defaultBattleDataItem"
              />
              <EnemyCardSimple v-if="!isDetail"
                  :playerInfo="item"
                  :server="battleHistory.enemy_server"
                  :battle-data="battleDataResp.battle_data.find(i => i.id === item.id)??defaultBattleDataItem"/>
            </li>
            <li v-if="enemies.length < maxItem">
              <template v-for="i in maxItem - enemies.length">
                <div class="p-1">
                  <div v-if="isDetail" class="p-12"></div>
                  <div v-if="!isDetail" class="p-6"></div>
                </div>
              </template>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
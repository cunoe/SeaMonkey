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

const battleHistory = ref<BattleHistory>(null as unknown as BattleHistory)
const gameInfo = ref<GameData>(null as unknown as GameData)
const teammates = ref<Vehicle[]>([])
const enemies = ref<Vehicle[]>([])
const player = ref<Vehicle>(null as unknown as Vehicle)
const maxItem = ref(12)
const isReady = ref(false)
const duration = ref(0)

onMounted(async () => {
  useIntervalFn(async () => {
    let result = await getLatestBattleHistory()
    if (result) {
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
      teammates.value = sortShip(playersInfo.filter(item => item.relation !== 2))
      enemies.value = sortShip(playersInfo.filter(item => item.relation === 2))
      maxItem.value = Math.max(teammates.value.length, enemies.value.length)
      gameInfo.value = gameData
      battleHistory.value = result
      isReady.value = true
    }
  }, 5000)
  useIntervalFn(async () => {
    if (gameInfo.value) {
      duration.value = ((new Date).getTime() - parseDatetime(gameInfo.value.dateTime).getTime())/1000
    }
  }, 1000)
})

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
        <GameStats :duration="duration" :gameData="gameInfo" :player="player" />
        <div class="columns-2 p-4 gap-2">
          <div>
            <div v-for="(item, index) in teammates" :key="index" class="rounded-lg p-1 flex justify-end">
              <TeammateCard :playerInfo="item" :server="battleHistory.teammate_server"/>
            </div>
            <template v-if="teammates.length < maxItem">
              <template v-for="i in maxItem - teammates.length">
                <div class="p-1">
                  <div class="p-12"></div>
                </div>
              </template>
            </template>
          </div>
          <div>
            <div v-for="(item, index) in enemies" :key="index" class="rounded-lg p-1">
              <EnemyCard :playerInfo="item" :server="battleHistory.enemy_server"/>
            </div>
            <template v-if="enemies.length < maxItem">
              <template v-for="i in maxItem - enemies.length">
                <div class="p-1">
                  <div class="p-12"></div>
                </div>
              </template>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
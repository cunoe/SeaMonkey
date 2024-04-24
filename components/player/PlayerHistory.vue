<script setup lang="ts">
import TeammateCard from "~/components/player/TeammateCard.vue";
import EnemyCard from "~/components/player/EnemyCard.vue";
import type {GameData, Vehicle} from "~/types/GameData";
import GameStats from "~/components/player/GameStats.vue";
import {useIntervalFn} from "@vueuse/core";
import {getBattleHistoryById, getLatestBattleHistory} from "~/composables/store/battle_history";
import type {BattleHistory} from "~/composables/store/battle_history";
import {sortShip} from "#imports";
import parseDatetime from "~/utils/parse.datetime";
import convertMatchGroup from "~/utils/convert.matchgroup";
import convertSecondsToString from "~/utils/convert.seconds.to.string";
import numberToRoman from "~/utils/number.to.roman";
import {convertDateToStr} from "~/utils/convert.date.to.string";

const props = defineProps<{
  battleId: number
}>();

const gameInfo = ref<GameData>(null as unknown as GameData)
const teammates = ref<Vehicle[]>([])
const enemies = ref<Vehicle[]>([])
const player = ref<Vehicle>(null as unknown as Vehicle)
const maxItem = ref(12)
const isReady = ref(false)
const duration = ref(0)
const battleHistory = ref<BattleHistory>(null as unknown as BattleHistory)

onMounted(async () => {
  let result = await getBattleHistoryById(props.battleId)
  if (result) {
    battleHistory.value = result
    let gameData: GameData = JSON.parse(result.raw_data)
    let playersInfo: Vehicle[] = gameData.vehicles.map(item => {return {...item,shipInfo:convertShipid(String(item.shipId))}})
    player.value = <Vehicle>playersInfo.find(item => item.relation === 0)
    teammates.value = sortShip(playersInfo.filter(item => item.relation !== 2))
    enemies.value = sortShip(playersInfo.filter(item => item.relation === 2))
    maxItem.value = Math.max(teammates.value.length, enemies.value.length)
    gameInfo.value = gameData
    isReady.value = true
  }
  useIntervalFn(async () => {
    if (gameInfo.value) {
      duration.value = ((new Date).getTime() - parseDatetime(gameInfo.value.dateTime).getTime())/1000
    }
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
                <div class="stat-value text-3xl">正在解析数据，请稍后</div>
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
        <div class="flex justify-center">
          <div class="stats container">
            <div class="stat text-center">
              <div class="stat-title">本场游戏开始于</div>
              <div class="stat-value">{{ convertDateToStr(parseDatetime(gameInfo.dateTime)) }}</div>
            </div>
            <div class="stat text-center">
              <div class="stat-title">队友服务器</div>
              <div class="stat-value">{{ battleHistory.teammate_server }}</div>
            </div>
            <div class="stat text-center">
              <div class="stat-title">敌方服务器</div>
              <div class="stat-value">{{ battleHistory.enemy_server }}</div>
            </div>
          </div>
        </div>
        <div class="columns-2 p-4 gap-2">
          <div>
            <div v-for="(item, index) in teammates" :key="index" class="rounded-lg p-1 flex justify-end">
              <TeammateCard :playerInfo="item"/>
            </div>
            <template v-if="teammates.length < maxItem">
              <template v-for="i in maxItem - teammates.length">
                <div class="rounded-lg p-4">
                  <div class="p-12"></div>
                </div>
              </template>
            </template>
          </div>
          <div>
            <div v-for="(item, index) in enemies" :key="index" class="rounded-lg p-1 flex justify-start">
              <EnemyCard :playerInfo="item" />
            </div>
            <template v-if="enemies.length < maxItem">
              <template v-for="i in maxItem - enemies.length">
                <div class="rounded-lg p-4">
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
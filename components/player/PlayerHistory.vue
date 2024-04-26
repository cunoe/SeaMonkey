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
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import convertServerToLocale from "../../utils/convert.server";
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

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

const playersDamageChartData: Ref<any> = ref({
  labels: [],
  datasets: [
    {
      label: 'Players Damage',
      backgroundColor: '#46cdcf',
      data: [],
    }
  ]
})

const playersExpChartData: Ref<any> = ref({
  labels: [],
  datasets: [
    {
      label: 'Players Exp',
      backgroundColor: '#46cdcf',
      data: [],
    }
  ]
})

const chartOptions: Ref<any> = ref({
    responsive: true,
        plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
          text: 'Chart.js Bar Chart'
    }
  }
})

onMounted(async () => {
  let result = await getBattleHistoryById(props.battleId)
  if (result) {
    battleHistory.value = result
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
    isReady.value = true
    playersDamageChartData.value.labels = playersInfo.map(item => item.name)
    playersDamageChartData.value.datasets[0].data = randomGenerateDateByNumber(playersInfo.length)
    playersExpChartData.value.labels = playersInfo.map(item => item.name)
    playersExpChartData.value.datasets[0].data = randomGenerateDateByNumber(playersInfo.length).sort((a,b) => b-a)
  }
  useIntervalFn(async () => {
    if (gameInfo.value) {
      duration.value = ((new Date).getTime() - parseDatetime(gameInfo.value.dateTime).getTime())/1000
    }
  }, 1000)
})


function randomGenerateDateByNumber(n: number): number[] {
  let result: number[] = []
  for (let i = 0; i < n; i++) {
    result.push(Math.floor(Math.random() * 10000))
  }
  return result
}
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
        <div class="max-w-full">
          <div class="columns-2 p-4 gap-10">
            <div class="flex justify-center">
              <Bar :data="playersDamageChartData" :options="chartOptions" class="h-96" />
            </div>
            <div class="flex justify-center">
              <Bar :data="playersExpChartData" :options="chartOptions" class="h-96" />
            </div>
          </div>
        </div>
        <GameStats :duration="duration" :gameData="gameInfo" :player="player" />
        <div class="flex justify-center">
          <div class="stats container">
            <div class="stat text-center">
              <div class="stat-title">本场游戏开始于</div>
              <div class="stat-value">{{ convertDateToStr(parseDatetime(gameInfo.dateTime)) }}</div>
            </div>
            <div class="stat text-center">
              <div class="stat-title">队友服务器</div>
              <div class="stat-value">{{ convertServerToLocale(battleHistory.teammate_server, 'zh-CN') }}</div>
            </div>
            <div class="stat text-center">
              <div class="stat-title">敌方服务器</div>
              <div class="stat-value">{{ convertServerToLocale(battleHistory.enemy_server, 'zh-CN') }}</div>
            </div>
          </div>
        </div>
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
            <div v-for="(item, index) in enemies" :key="index" class="rounded-lg p-1 flex justify-start">
              <EnemyCard :playerInfo="item" :server="battleHistory.enemy_server" />
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
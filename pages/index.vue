<script setup>
import { Command } from '@tauri-apps/api/shell'
import convertShipId from "~/utils/convertShipId.ts";
import parseDateTime from "~/utils/parseDateTime.ts";
import convertSecondsToHMSString from "~/utils/convertSecondsToHMSString.ts";

const output = ref()
const date = ref()
const maxItem = ref(0)
const duration = ref(0)
const isReady = ref(false)
const path = "D:\\Games\\World_of_Warships"

setInterval(async () => {
  const command = Command.sidecar('binaries/replay-parser', ["-p", path])
  command.execute().then(
      (res) => {
        if (res !== "") {
          let dataParse = JSON.parse(res.stdout)
          if (dataParse?.dateTime !== date.value) {
            isReady.value = true
            output.value = dataParse
            date.value = parseDateTime(dataParse.dateTime)
            maxItem.value = Math.max(output.value?.vehicles.filter(item => item.relation !== 2).length, output.value?.vehicles.filter(item => item.relation === 2).length)
          }
        }
      }
  )
  duration.value = date.value ? (new Date() - date.value) / 1000 : 0
}, 1000)

</script>

<template>
  <div v-if="!isReady">
    <div class="p-2" />
     还没有数据哦~
    <div class="p-2" />
  </div>
  <div v-if="isReady">
    <div class="p-2" />
    <div class="container max-w-full">
      <div className="stats container">

        <div className="stat text-center">
          <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div className="stat-title">游戏模式 GameMode</div>
          <div className="stat-value">{{output?.matchGroup}}</div>
<!--          <div className="stat-desc">Jan 1st - Feb 1st</div>-->
        </div>

        <div className="stat text-center">
          <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
          </div>
          <div className="stat-title">对战地图 Map</div>
          <div className="stat-value">{{output?.mapDisplayName}}</div>
<!--          <div className="stat-desc">↗︎ 400 (22%)</div>-->
        </div>

        <div className="stat text-center">
          <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
          </div>
          <div className="stat-title">游戏持续时间 Duration</div>
          <div className="stat-value" v-if="duration < 300 * 20">{{ convertSecondsToHMSString(duration) }}</div>
          <div className="stat-value" v-if="duration > 300 * 20">游戏似乎已经结束咯~</div>
<!--          <div className="stat-desc">↘︎ 90 (14%)</div>-->
        </div>

      </div>
      <div class="columns-2 p-4 gap-10">
        <div>
          <div v-for="(item, index) in output?.vehicles.filter(item => item.relation !== 2)" :key="index" class="rounded-lg p-1">
            <div class="card bg-stone-500 text-primary-content">
              <div class="card-body">
                <h2 class="card-title">{{item.name}}</h2>
                <p>{{ convertShipId(item.shipId.toString())?.ship_name?.zh_sg ?? '不认识这艘船捏' }}</p>
                <!--              <div class="card-actions justify-end">-->
                <!--                <button class="btn">Buy Now</button>-->
                <!--              </div>-->
              </div>
            </div>
          </div>
          <template v-if="output?.vehicles.filter(item => item.relation !== 2).length < maxItem">
            <template v-for="i in maxItem - output?.vehicles.filter(item => item.relation !== 2).length">
              <div class="rounded-lg p-4">
                （空位）
              </div>
            </template>
          </template>
        </div>
        <div>
          <div v-for="(item, index) in output?.vehicles.filter(item => item.relation === 2)" :key="index" class="rounded-lg p-1">
            <div class="card bg-stone-500 text-primary-content">
              <div class="card-body">
                <h2 class="card-title">{{item.name}}</h2>
                <p>{{ convertShipId(item.shipId.toString())?.ship_name?.zh_sg ?? '不认识这艘船捏' }}</p>
                <!--              <div class="card-actions justify-end">-->
                <!--                <button class="btn">Buy Now</button>-->
                <!--              </div>-->
              </div>
            </div>
          </div>
          <template v-if="output?.vehicles.filter(item => item.relation === 2).length < maxItem">
            <template v-for="i in maxItem - output?.vehicles.filter(item => item.relation === 2).length">
              <div class="rounded-lg p-4">
                <div class="p-10"></div>
              </div>
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>


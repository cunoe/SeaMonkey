<script setup>
import { Command } from '@tauri-apps/api/shell'
import { useIntervalFn } from '@vueuse/core'
import convertShipid from "~/utils/convert.shipid.ts";
import parseDatetime from "~/utils/parse.datetime.ts";
import convertSecondsToString from "~/utils/convert.seconds.to.string.ts";
import convertMatchGroup from "../utils/convert.mathgroup.ts";
import numberToRoman from "../utils/number.to.roman.ts";

const output = ref()
const date = ref()
const maxItem = ref(0)
const duration = ref(0)
const isReady = ref(false)
const path = "D:\\Games\\World_of_Warships"


useIntervalFn(async () => {
  const command = Command.sidecar('binaries/replay-parser', ["-p", path])
  command.execute().then(
      (res) => {
        if (res.stdout === "-1") {

        } else if (res.stdout !== "") {
          let dataParse = JSON.parse(res.stdout)
          if (dataParse?.dateTime !== date.value) {
            isReady.value = true
            output.value = dataParse
            date.value = parseDatetime(dataParse.dateTime)
            maxItem.value = Math.max(output.value?.vehicles.filter(item => item.relation !== 2).length, output.value?.vehicles.filter(item => item.relation === 2).length)
          }
        }
      }
  )
  duration.value = date.value ? (new Date() - date.value) / 1000 : 0
}, 1000)

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
                  {{ numberToRoman(convertShipid(output?.vehicles.filter(item => item.relation === 0)[0].shipId.toString())?.tier) ?? '' }}
                  {{ convertShipid(output?.vehicles.filter(item => item.relation === 0)[0].shipId.toString())?.ship_name?.zh_sg ?? '不认识这艘船捏' }}
                </div>
              </div>
            </div>
          </div>
        <div class="columns-2 p-4 gap-10">
          <div>
            <div v-for="(item, index) in output?.vehicles.filter(item => item.relation !== 2)" :key="index" class="rounded-lg p-1">
              <div class="card bg-stone-500 text-primary-content">
                <div class="card-body">
                  <h2 class="card-title">{{item.name}}</h2>
                  <p>{{ convertShipid(item.shipId.toString())?.ship_name?.zh_sg ?? '不认识这艘船捏' }}</p>
                </div>
              </div>
            </div>
            <template v-if="output?.vehicles.filter(item => item.relation !== 2).length < maxItem">
              <template v-for="i in maxItem - output?.vehicles.filter(item => item.relation !== 2).length">
                <div class="rounded-lg p-4">
                  <div class="p-10"></div>
                </div>
              </template>
            </template>
          </div>
          <div>
            <div v-for="(item, index) in output?.vehicles.filter(item => item.relation === 2)" :key="index" class="rounded-lg p-1">
              <div class="card bg-stone-500 text-primary-content">
                <div class="card-body">
                  <h2 class="card-title">{{item.name}}</h2>
                  <p>{{ convertShipid(item.shipId.toString())?.ship_name?.zh_sg ?? '不认识这艘船捏' }}</p>
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
  </div>
</template>


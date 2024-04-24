<script setup lang="ts">
import type {Vehicle} from "~/types/GameData.js";

const props = defineProps<{
  playerInfo: Vehicle
}>();

function print() {
  console.log(props.playerInfo)
}
</script>

<template>
<!--  <div class="card text-primary-content" style="background-color: #0fb4ff">-->
<!--    <div class="card-body">-->
<!--      <div class="card-title" style="display: flex; justify-content: space-between;">-->
<!--        <h2>{{ playerInfo.shipInfo ? numberToRoman(playerInfo.shipInfo.tier)+' '+playerInfo.shipInfo.ship_name.zh_sg : '不认识这艘船捏' }}</h2>-->
<!--        <h2>{{ playerInfo.name }}</h2>-->
<!--      </div>-->
<!--      <div class="flex flex-row">-->
<!--        <p class="text-start"> Main Info </p>-->
<!--        <div class="card-actions justify-end">-->
<!--          <button class="btn btn-primary">Other Info</button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div class="relative flex flex-col items-center justify-center overflow-hidden">-->
<!--    <div class="relative mx-auto">-->
<!--      <div class="group relative flex cursor-pointer after:shadow-lg after:shadow-black">-->
<!--        &lt;!&ndash; hidden slide, now starts from the right &ndash;&gt;-->
<!--        <div class="relative -right-36 top-0 z-10 w-96 rounded-xl bg-[#3d348b] px-5 py-3 text-base font-semibold leading-7 transition-all duration-700 group-hover:-right-32">-->
<!--          <div class="flex flex-col gap-4 justify-end text-end">-->
<!--            &lt;!&ndash; item 1 &ndash;&gt;-->
<!--            <div class="flex items-end justify-end gap-2">-->
<!--              <h2 class="text-white">-->
<!--                {{ playerInfo.name }}-->
<!--              </h2>-->
<!--            </div>-->
<!--            &lt;!&ndash; item 2 &ndash;&gt;-->
<!--            <div class="flex items-end justify-end gap-2">-->
<!--              <div class="flex items-center gap-1 rounded-full bg-green-400/45 py-0.5 pl-1 pr-2">-->
<!--                <p class="text-xs leading-tight text-white">WR</p>-->
<!--                <p class="text-xs leading-tight text-white">30%</p>-->
<!--              </div>-->
<!--&lt;!&ndash;              <p class="text-white  delay-200 duration-700 ease-in-out">30 Records</p>&ndash;&gt;-->
<!--              <div class="flex items-center gap-1 rounded-full bg-green-400/45 py-0.5 pl-1 pr-2">-->
<!--                <p class="text-xs leading-tight text-white">Goals</p>-->
<!--                <p class="text-xs leading-tight text-white">10%</p>-->
<!--              </div>-->
<!--&lt;!&ndash;              <p class="text-white  delay-200 duration-700 ease-in-out">1,300 Goals</p>&ndash;&gt;-->
<!--            </div>-->
<!--            <p>-->
<!--              <a @click="print" class="text-white/50">More</a>-->
<!--            </p>-->
<!--          </div>-->
<!--        </div>-->
<!--        &lt;!&ndash; main, now starts from the left &ndash;&gt;-->
<!--        <div class="absolute -left-36 top-0 z-20 w-144 flex flex-col gap-4 self-start rounded-xl rounded-r-2xl border-none bg-[#7678ed] px-5 py-3 text-base font-semibold leading-7 transition-all duration-700 group-hover:-left-32 group-hover:w-64 group-hover:rounded-r-lg">-->
<!--          <p class="text-[#fff]">Achivements unlocked</p>-->
<!--          <p class="text-[#fff]">Records sold</p>-->
<!--          <p>-->
<!--            <a onclick="print()" class="text-white/50">Learn more &rarr;</a>-->
<!--          </p>-->
<!--        </div>-->
<!--        <div class="h-16 bg-[#3d348b] w-[28rem] -right-10 shadow-2xl shadow-[#3d348b] absolute bottom-0"></div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
  <div>
    <div class="relative bg-[#3d348b] rounded-lg shadow-lg w-[40rem] p-16">
      <div class="absolute right-4 top-4 leading-loose text-end">
        <h2 class="text-white font-bold text-xl">{{ playerInfo.name }}</h2>
        <div class="flex flex-row gap-1 justify-end">
          <div class="badge font-bold">PR 3000</div>
          <div class="badge font-bold">WR 56%</div>
        </div>
        <div class="flex flex-row gap-1 justify-end">
          <div class="badge font-bold">EXP 2000</div>
          <div class="badge font-bold">DMG 130000</div>
        </div>
        <p><a href="https://baidu.com" class="text-white/50">More</a></p>
      </div>
      <div class="absolute inset-y-0 left-0 bg-[#7678ed] rounded-lg shadow-lg p-12 w-[26rem]">
        <div class="absolute left-4 top-4 text-start">
          <h2 class="text-white font-bold text-xl">{{playerInfo.shipInfo ? playerInfo.shipInfo.ship_name.zh_sg+' '+numberToRoman(playerInfo.shipInfo.tier) : '不认识这艘船捏'}}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
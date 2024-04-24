<script setup lang="ts">
import type {GameData, Vehicle} from '~/types/GameData';

const toast = useToast()

const props = defineProps<{
  playerInfo: Vehicle
}>();

const DMG = 10000
</script>

<template>
<!--  <div class="card text-primary-content" style="background-color: #0fb4ff">-->
<!--&lt;!&ndash;  <div class="card bg-base-200 shadow-xl">&ndash;&gt;-->
<!--    <div class="card-body">-->
<!--      <div class="card-title" style="display: flex; justify-content: space-between;">-->
<!--        <h2>{{ playerInfo.name }}</h2>-->
<!--        <h2>{{ playerInfo.shipInfo ? playerInfo.shipInfo.ship_name.zh_sg+' '+numberToRoman(playerInfo.shipInfo.tier) : '不认识这艘船捏' }}</h2>-->
<!--      </div>-->
<!--      <div class="flex flex-row">-->
<!--        <div class="card-actions justify-end">-->
<!--          <button class="btn btn-active">Other Info</button>-->
<!--        </div>-->
<!--        <p class="text-end"> Main Info </p>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
  <!-- component -->
  <!-- component -->
<!--  <div>-->
<!--    <div class="relative w-[60rem]">-->
<!--      <div class="group relative flex after:shadow-lg after:shadow-black">-->
<!--        &lt;!&ndash; hidden slide &ndash;&gt;-->
<!--        <div class="relative rounded-xl bg-[#3d348b] px-5 py-3 text-base font-semibold leading-7 transition-all duration-700">-->
<!--          <div class="flex flex-col gap-4">-->
<!--            &lt;!&ndash; item 1 &ndash;&gt;-->
<!--            <div class="flex items-center gap-2">-->
<!--              <p class="text-white">-->
<!--                {{ playerInfo.name }}-->
<!--              </p>-->
<!--            </div>-->
<!--            &lt;!&ndash; item 2 &ndash;&gt;-->
<!--            <div class="flex items-center gap-2">-->
<!--              <div class="flex items-center gap-1 rounded-full bg-green-400/45 py-0.5 pl-1 pr-2">-->
<!--                &lt;!&ndash;                <p class="-rotate-90 leading-tight text-green-500">&rarr;</p>&ndash;&gt;-->
<!--                <p class="text-xs leading-tight text-white">WR</p>-->
<!--                <p class="text-xs leading-tight text-white">10%</p>-->
<!--              </div>-->
<!--              <div class="flex items-center gap-1 rounded-full bg-green-400/45 py-0.5 pl-1 pr-2">-->
<!--&lt;!&ndash;                <p class="-rotate-90 leading-tight text-green-500">&rarr;</p>&ndash;&gt;-->
<!--                <p class="text-xs leading-tight text-white">Goals</p>-->
<!--                <p class="text-xs leading-tight text-white">30%</p>-->
<!--              </div>-->
<!--&lt;!&ndash;              <p class="text-white opacity-0 delay-200 duration-700 ease-in-out group-hover:opacity-100">30 Records</p>&ndash;&gt;-->
<!--            </div>-->
<!--            <p>-->
<!--              <a href="https://tailwindcss.com/docs" class="text-sky-500 opacity-0 hover:text-sky-600">&rarr;</a>-->
<!--            </p>-->
<!--          </div>-->
<!--        </div>-->
<!--        &lt;!&ndash; main &ndash;&gt;-->
<!--        <div class="absolute">-->
<!--          <h2 class="text-white">{{ playerInfo.shipInfo ? numberToRoman(playerInfo.shipInfo.tier)+' '+playerInfo.shipInfo.ship_name.zh_sg : '不认识这艘船捏' }}</h2>-->
<!--          <p class="text-[#fff]">Achivements unlocked</p>-->
<!--          <p>-->
<!--            <a href="https://tailwindcss.com/docs" class="text-white/50">Learn more &rarr;</a>-->
<!--          </p>-->
<!--        </div>-->
<!--        <div class="h-16 bg-[#3d348b] w-[28rem] -left-10 shadow-2xl shadow-[#3d348b] absolute bottom-0"></div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
  <div>
    <div class="relative bg-[#3d348b] rounded-lg shadow-lg w-[40rem] p-16">
      <div class="absolute left-4 top-4 leading-loose">
        <h2 class="text-white font-bold text-xl">{{ playerInfo.name }}</h2>
        <div class="flex flex-row gap-1">
          <div class="badge font-bold">WR 56%</div>
          <div class="badge font-bold">PR 3000</div>
        </div>
        <div class="flex flex-row gap-1">
          <div :class="{ 'badge font-bold bg-red-500': DMG < 100000, 'badge font-bold bg-green-500': DMG >= 100000 }">DMG {{ DMG }}</div>
          <div class="badge font-bold">EXP 2000</div>
        </div>
        <p><a @click="toast.add({title:'功能正在开发'})" class="text-white/50 cursor-pointer font-bold">查看更多</a></p>
      </div>
      <div class="absolute inset-y-0 right-0 bg-[#7678ed] rounded-lg shadow-lg p-12 w-[26rem]">
        <div class="absolute right-4 top-4 text-end">
          <h2 class="text-white font-bold text-xl">{{playerInfo.shipInfo ? playerInfo.shipInfo.ship_name.zh_sg+' '+numberToRoman(playerInfo.shipInfo.tier) : '不认识这艘船捏'}}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
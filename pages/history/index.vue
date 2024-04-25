<script setup lang="ts">

import {type BattleHistory, listLastBattleHistory} from "~/composables/store/battle_history";

const histories: Ref<BattleHistory[]> = ref([])

onMounted(async () => {
    histories.value = await listLastBattleHistory(10)
    for (let i = 0; i < histories.value.length; i++) {
        histories.value[i].start_time = new Date(histories.value[i].start_time)
    }
})
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需要加 1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
</script>

<template>
  <div class="flex justify-center">
    <div class="container max-w-screen-md">
      <div class="grid grid-cols-1 gap-4">
        <div v-for="(item, index) in histories" :key="index" class="rounded-lg p-1">
          <a @click="navigateTo(`/history/${item.id}`)">
            <div class="card hover-scale cursor-pointer text-primary-content" style="background-color: #7678ed">
              <div class="card-body">
                <div class="card-title" style="display: flex; justify-content: space-between;">
                  <div class="flex flex-row gap-1">

                    <h2>{{ item.player_name }}</h2>

                  </div>
                  <h2>{{ formatDate(item.start_time) }}</h2>
                </div>
                <div class="flex flex-row gap-1 font-bold">
                  <h2 class="badge bg-fuchsia-600 text-black">{{item.match_group}}</h2>
                  <h2>{{item.player_vehicle}}</h2>
                  <h2>{{ item.tire !== -1 ? numberToRoman(item.tire) : ''}}</h2>
                </div>
<!--                <div class="flex flex-row">-->
<!--                  <p class="text-start"> Main Info </p>-->
<!--                  <div class="card-actions justify-end">-->
<!--                    <button class="btn btn-primary" @click="navigateTo(`/history/${item.id}`)">Other Info</button>-->
<!--                  </div>-->
<!--                </div>-->
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.hover-scale {
  transition: transform 0.3s ease-in-out; /* 添加变换效果的过渡动画 */
}

.hover-scale:hover {
  transform: scale(1.05); /* 鼠标悬停时放大 5% */
}

</style>
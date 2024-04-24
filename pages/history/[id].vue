<script setup lang="ts">

import {type BattleHistory, getBattleHistoryById} from "~/composables/store/battle_history";
import PlayerHistory from "~/components/player/PlayerHistory.vue";

const route = useRoute()
const toast = useToast()
const isReady = ref(false)
const battleId = Number(route.params.id)

const battleHistory: Ref<BattleHistory> = ref(null as unknown as BattleHistory)

onBeforeMount(async () => {
  const result = await getBattleHistoryById(battleId)
  if (result === null) {
    toast.add({
      title: "该记录不存在，请返回首页"
    })
  } else {
    battleHistory.value = result;
    isReady.value = true
    battleHistory.value.start_time = new Date(battleHistory.value.start_time)
  }
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
                <div class="stat-value text-3xl">该记录不存在，请返回首页</div>
                <span class="loading loading-infinity loading-lg"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-2" />
    </div>
    <div v-if="isReady">
      <PlayerHistory :battleId="battleId" />
    </div>
  </div>
</template>

<style scoped>

</style>
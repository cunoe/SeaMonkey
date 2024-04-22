<script setup lang="ts">
import type {GameData, Vehicle} from '~/types/GameData';

const props = defineProps<{
  playerInfo: Vehicle
}>();
</script>

<template>
  <div class="card text-primary-content" style="background-color: #0fb4ff">
<!--  <div class="card bg-base-200 shadow-xl">-->
    <div class="card-body">
      <div class="card-title" style="display: flex; justify-content: space-between;">
        <h2>{{ playerInfo.name }}</h2>
        <h2>{{ playerInfo.shipInfo ? playerInfo.shipInfo.ship_name.zh_sg+' '+numberToRoman(playerInfo.shipInfo.tier) : '不认识这艘船捏' }}</h2>
      </div>
      <div class="flex flex-row">
        <div class="card-actions justify-end">
          <button class="btn btn-active">Other Info</button>
        </div>
        <p class="text-end"> Main Info </p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
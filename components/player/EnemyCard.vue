<script setup lang="ts">
import type {Vehicle} from "~/types/GameData.js";

const props = defineProps<{
  playerInfo: Vehicle
}>();
</script>

<template>
  <div class="card text-primary-content" style="background-color: #0fb4ff">
    <div class="card-body">
      <div class="card-title" style="display: flex; justify-content: space-between;">
        <h2>{{ playerInfo.shipInfo ? numberToRoman(playerInfo.shipInfo.tier)+' '+playerInfo.shipInfo.ship_name.zh_sg : '不认识这艘船捏' }}</h2>
        <h2>{{ playerInfo.name }}</h2>
      </div>
      <div class="flex flex-row">
        <p class="text-start"> Main Info </p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Other Info</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
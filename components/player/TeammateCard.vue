<script setup lang="ts">
import type {GameData, Vehicle} from '~/types/GameData';

const props = defineProps<{
  playerInfo: Vehicle
}>();
</script>

<template>
  <div class="card text-primary-content" style="background-color: #0fb4ff">
    <div class="card-body">
      <div class="card-title" style="display: flex; justify-content: space-between;">
        <h2>{{ playerInfo.name }}</h2>
        <h2>{{ playerInfo.shipInfo ? playerInfo.shipInfo.ship_name.zh_sg : '不认识这艘船捏' }}</h2>
      </div>
      <p> Other Info </p>
    </div>
  </div>
</template>

<style scoped>

</style>
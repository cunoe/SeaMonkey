<script setup lang="ts">
import TeammateCard from "~/components/player/TeammateCard.vue";
import EnemyCard from "~/components/player/EnemyCard.vue";
import type {Vehicle} from "~/types/GameData";

const props = defineProps<{
  teammates: Array<Vehicle>,
  enemies: Array<Vehicle>,
  maxItem: number;
}>();
</script>

<template>
  <div class="columns-2 p-4 gap-10">
    <div>
      <div v-for="(item, index) in teammates" :key="index" class="rounded-lg p-1">
        <TeammateCard :playerInfo="item"/>
      </div>
      <template v-if="teammates.length < maxItem">
        <template v-for="i in maxItem - teammates.length">
          <div class="rounded-lg p-4">
            <div class="p-10"></div>
          </div>
        </template>
      </template>
    </div>
    <div>
      <div v-for="(item, index) in enemies" :key="index" class="rounded-lg p-1">
        <EnemyCard :playerInfo="item" />
      </div>
      <template v-if="enemies.length < maxItem">
        <template v-for="i in maxItem - enemies.length">
          <div class="rounded-lg p-4">
            <div class="p-10"></div>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>
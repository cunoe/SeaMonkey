<script setup lang="ts">
import convertMatchGroup from "~/utils/convert.mathgroup";
import convertSecondsToString from "~/utils/convert.seconds.to.string";
import numberToRoman from "~/utils/number.to.roman";
import type {GameData, Vehicle} from "~/types/GameData";

const props = defineProps<{
  gameData: GameData;
  player: Vehicle
  duration: number;
}>();
</script>

<template>
  <div class="flex justify-center">
    <div class="stats container">
      <div class="stat text-center">
        <div class="stat-title">游戏模式 GameMode</div>
        <div class="stat-value">{{convertMatchGroup(gameData.matchGroup)}} {{gameData.name}}</div>
      </div>
      <div class="stat text-center">
        <div class="stat-title">对战地图 Map</div>
        <div class="stat-value">{{convertMapid(gameData.mapId).name}}</div>
      </div>
      <div class="stat text-center">
        <div class="stat-title">距离这一场战斗 Since</div>
        <div class="stat-value">{{ convertSecondsToString(duration) }}</div>
      </div>
      <div class="stat text-center">
        <div class="stat-title">你开的船 Ship</div>
        <div class="stat-value">
          {{ player.shipInfo ? numberToRoman(player.shipInfo.tier) : '' }}
          {{ player.shipInfo ? player.shipInfo.ship_name.zh_sg : '不认识这艘船捏' }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
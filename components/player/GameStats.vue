<script setup lang="ts">
import convertMatchGroup from "~/utils/convert.matchgroup";
import convertSecondsToString from "~/utils/convert.seconds.to.string";
import numberToRoman from "~/utils/number.to.roman";
import type {GameData, Vehicle} from "~/types/GameData";
import {type BattleDataResponse, defaultBattleData} from "~/composables/requests/kokomi";
import getWinRateColor from "~/utils/get.wr.color";

const props = defineProps<{
  gameData: GameData;
  player: Vehicle
  duration: number;
  battleData: BattleDataResponse;
}>();

const teammates = computed(() => {
  return props.gameData.vehicles.filter(item => item.relation === 1)
})

const enemies = computed(() => {
  return props.gameData.vehicles.filter(item => item.relation === 2)
})

const teammateAvgWR = computed(() => {
  let total = 0
  let n = 0
  teammates.value.forEach(item => {
    if (props.battleData.data.battle_data.find(i => i.id === item.id)) {
      total += props.battleData.data.battle_data.find(i => i.id === item.id)!.user_profile.wr
      n++
    }
  })
  return total / n
})

const enemyAvgWR = computed(() => {
  let total = 0
  let n = 0
  enemies.value.forEach(item => {
    if (props.battleData.data.battle_data.find(i => i.id === item.id)) {
      total += props.battleData.data.battle_data.find(i => i.id === item.id)!.user_profile.wr
      n++
    }
  })
  return total / n
})

const teammateAvgShipWR = computed(() => {
  let total = 0
  let n = 0
  teammates.value.forEach(item => {
    if (props.battleData.data.battle_data.find(i => i.id === item.id)) {
      total += props.battleData.data.battle_data.find(i => i.id === item.id)!.ship_profile.wr
      n++
    }
  })
  return total / n
})

const enemyAvgShipWR = computed(() => {
  let total = 0
  let n = 0
  enemies.value.forEach(item => {
    if (props.battleData.data.battle_data.find(i => i.id === item.id)) {
      total += props.battleData.data.battle_data.find(i => i.id === item.id)!.ship_profile.wr
      n++
    }
  })
  return total / n
})
function getWRColor(wr: number) {
  return getWinRateColor(wr)
}
</script>

<template>
  <div class="flex flex-col items-center justify-center">
<!--    <div class="stats container">-->
<!--      <div class="stat text-center">-->
<!--        <div class="stat-title">游戏模式</div>-->
<!--        <div class="stat-value">{{convertMatchGroup(gameData.matchGroup).name}} {{gameData.name}}</div>-->
<!--      </div>-->
<!--      <div class="stat text-center">-->
<!--        <div class="stat-title">对战地图</div>-->
<!--        <div class="stat-value">{{convertMapid(gameData.mapId).name}}</div>-->
<!--      </div>-->
<!--      <div class="stat text-center">-->
<!--        <div class="stat-title">距离这一场战斗</div>-->
<!--        <div class="stat-value">{{ convertSecondsToString(duration) }}</div>-->
<!--      </div>-->
<!--      <div class="stat text-center">-->
<!--        <div class="stat-title">你开的船</div>-->
<!--        <div class="stat-value">-->
<!--          {{ player.shipInfo ? numberToRoman(player.shipInfo.tier) : '' }}-->
<!--          {{ player.shipInfo ? player.shipInfo.ship_name.zh_sg : '不认识这艘船捏' }}-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <div class="stats container"  :style="{backgroundColor: 'rgba(0, 0, 0, 0)'}">
      <div class="stat text-center">
        <div class="stat-title">你开的船</div>
        <div class="stat-value">
          {{ player.shipInfo ? numberToRoman(player.shipInfo.tier) : '' }}
          {{ player.shipInfo ? player.shipInfo.ship_name.zh_sg : '不认识这艘船捏' }}
        </div>
      </div>
      <div class="stat text-center">
        <div class="stat-title">玩家平均胜率</div>
        <div class="stat-value"><p class='join' :style="{color: getWRColor(teammateAvgWR)}">{{teammateAvgWR.toFixed(2)}}%</p> / <p class='join' :style="{color: getWRColor(enemyAvgWR)}">{{enemyAvgWR.toFixed(2)}}%</p></div>
      </div>
      <div class="stat text-center">
        <div class="stat-title">舰船平均胜率</div>
        <div class="stat-value"><p class='join' :style="{color: getWRColor(teammateAvgShipWR)}">{{teammateAvgShipWR.toFixed(2)}}%</p> / <p class='join' :style="{color: getWRColor(enemyAvgShipWR)}">{{enemyAvgShipWR.toFixed(2)}}%</p></div>
      </div>
      <div class="stat text-center">
        <div class="stat-title">距离这一场战斗</div>
        <div class="stat-value">{{ convertSecondsToString(duration) }}</div>
      </div>
    </div>
<!--    <div class="stats container">-->
<!--      <div class="stat text-center">-->
<!--        <div class="stat-title">用户平均胜率</div>-->
<!--        <div class="stat-value"><p class='join' :style="{color: getWRColor(teammateAvgWR)}">{{teammateAvgWR.toFixed(2)}}</p> / <p class='join' :style="{color: getWRColor(enemyAvgWR)}">{{enemyAvgWR.toFixed(2)}}</p></div>-->
<!--      </div>-->
<!--      <div class="stat text-center">-->
<!--        <div class="stat-title">舰船平均胜率</div>-->
<!--        <div class="stat-value">{{teammateAvgShipWR.toFixed(2)}} / {{enemyAvgShipWR.toFixed(2)}}</div>-->
<!--      </div>-->
<!--&lt;!&ndash;      <div class="stat text-center">&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="stat-title">距离这一场战斗</div>&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="stat-value">{{ convertSecondsToString(duration) }}</div>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--&lt;!&ndash;      <div class="stat text-center">&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="stat-title">你开的船</div>&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="stat-value">&ndash;&gt;-->
<!--&lt;!&ndash;          {{ player.shipInfo ? numberToRoman(player.shipInfo.tier) : '' }}&ndash;&gt;-->
<!--&lt;!&ndash;          {{ player.shipInfo ? player.shipInfo.ship_name.zh_sg : '不认识这艘船捏' }}&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--    </div>-->
  </div>
</template>

<style scoped>

</style>
<script setup lang="ts">
import type {Vehicle} from "~/types/GameData.js";
import {PlayerInfoModal, PlayerShipInfoModal} from "#components";
import type {BattleData} from "~/composables/requests/kokomi";
import getPersonalRateData from "~/utils/get.pr.data";
import getWinRateColor from "~/utils/get.wr.color";
import getDMGColor from "~/utils/get.dmg.color";
import getBLTColor from "~/utils/get.blt.color";
import getFRColor from "~/utils/get.fr.color";

const modal = useModal();
const toast = useToast();

const props = defineProps<{
  playerInfo: Vehicle
  server: string
  battleData: BattleData
}>();

function getPRColorFromUtil(pr: number) {
  return getPersonalRateData(pr).color;
}
function getWRColorFromUtil(wr: number) {
  return getWinRateColor(wr)
}
function getExpColorFromUtil(exp: number){
  return getExpColor(exp)
}
function getDMGColorFromUtil(dmg: number, shipType: string){
  return getDMGColor(dmg, shipType)
}
function getBLTColorFromUtil(blt: number){
  return getBLTColor(blt)
}
function getFRColorFromUtil(fr: number) {
  return getFRColor(fr)
}
function getClanColorFromUtil(clanType: number) {
  return getClanColor(clanType)
}
function getClan(){
  if (props.battleData.clan === null) return ""
  return `[${props.battleData.clan}]`
}
</script>

<template>
  <div>
    <div class="relative bg-[#3d348b] rounded-lg shadow-lg w-[40rem] p-12">
      <a @click="modal.open(PlayerInfoModal, {player: playerInfo, playerServer: server, battleData: battleData})" class="text-white/50 cursor-pointer font-bold">
        <div class="absolute right-4 top-4 leading-loose text-end hover-scale">
          <div class="text-white font-bold text-xl join"><p>{{ playerInfo.name }}</p><p :style="{color: getClanColorFromUtil(battleData.clan_type)}">{{getClan()}}</p></div>
          <div class="flex flex-row gap-1 justify-end">
            <div class="badge font-bold" :style="{backgroundColor: getBLTColorFromUtil(battleData.user_profile.blt)}">场次 {{battleData.ship_profile.blt}}</div>
            <div class="badge font-bold" :style="{backgroundColor: getPRColorFromUtil(battleData.user_profile.pr)}">评分 {{battleData.user_profile.pr}}</div>
            <div class="badge font-bold" :style="{backgroundColor: getWRColorFromUtil(battleData.user_profile.wr)}">胜率 {{battleData.user_profile.wr.toFixed()}}%</div>
          </div>
          <div class="flex flex-row gap-1 justify-end">
            <div class="badge font-bold" :style="{backgroundColor: getFRColorFromUtil(battleData.user_profile.fr)}">击杀 {{battleData.ship_profile.fr}}</div>
            <div class="badge font-bold" :style="{backgroundColor: getExpColorFromUtil(battleData.user_profile.exp)}">经验 {{battleData.user_profile.exp}}</div>
            <div class="badge font-bold" :style="{backgroundColor: getDMGColorFromUtil(battleData.user_profile.dmg, '')}">伤害 {{battleData.user_profile.dmg}}</div>
          </div>
        </div>
      </a>
      <a @click="modal.open(PlayerShipInfoModal, {player: playerInfo, playerServer: server, battleData: battleData})" class="text-white/50 cursor-pointer font-bold">
        <div class="absolute inset-y-0 left-0 bg-[#7678ed] rounded-lg shadow-lg p-12 w-[22rem] hover-scale">
          <div class="absolute left-4 top-4 text-start">
            <h2 class="text-white font-bold text-xl">{{playerInfo.shipInfo ? numberToRoman(playerInfo.shipInfo.tier)+' '+playerInfo.shipInfo.ship_name.zh_sg : '不认识这艘船捏'}}</h2>
            <div class="flex flex-row gap-1">
              <div class="badge font-bold" :style="{backgroundColor: getWRColorFromUtil(battleData.ship_profile.wr)}">胜率 {{battleData.ship_profile.wr.toFixed()}}%</div>
              <div class="badge font-bold" :style="{backgroundColor: getPRColorFromUtil(battleData.ship_profile.pr)}">评分 {{battleData.ship_profile.pr}}</div>
              <div class="badge font-bold" :style="{backgroundColor: getBLTColorFromUtil(battleData.ship_profile.blt)}">场次 {{battleData.ship_profile.blt}}</div>
            </div>
            <div class="flex flex-row gap-1">
              <div class="badge font-bold" :style="{backgroundColor: getDMGColorFromUtil(battleData.ship_profile.dmg, playerInfo.shipInfo.type)}">伤害 {{battleData.ship_profile.dmg}}</div>
              <div class="badge font-bold" :style="{backgroundColor: getExpColorFromUtil(battleData.ship_profile.exp)}">经验 {{battleData.ship_profile.exp}}</div>
              <div class="badge font-bold" :style="{backgroundColor: getFRColorFromUtil(battleData.ship_profile.fr)}">击杀 {{battleData.ship_profile.fr}}</div>
            </div>
          </div>
        </div>
      </a>
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
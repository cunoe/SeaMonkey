<script setup lang="ts">
import type {Vehicle} from "~/types/GameData.js";
import {PlayerInfoModal, PlayerShipInfoModal} from "#components";
import type {BattleDataItem} from "~/composables/requests/kokomi";
import getPersonalRateData from "~/utils/get.pr.data";
import getWinRateColor from "~/utils/get.wr.color";
import getDMGColor from "~/utils/get.dmg.color";
import getBLTColor from "~/utils/get.blt.color";
import getFRColor from "~/utils/get.fr.color";
import {useIntervalFn} from "@vueuse/core";
import {getKV} from "~/composables/store/kv";

const modal = useModal();
const toast = useToast();

const isSetBackground = ref(false)
const isMarked = ref(false)

useIntervalFn(() => {
  getKV(`marked_player_${props.server}_${props.battleData.aid}`).then((res) => {
    isMarked.value = res === 'true'
  }).catch(() => {
    isMarked.value = false
  })
}, 1000)
const props = defineProps<{
  playerInfo: Vehicle
  server: string
  battleData: BattleDataItem
}>();


getKV('backgroundImage').then((res) => {
  isSetBackground.value = !(res === 'false' || res === '');
}).catch(() => {
  isSetBackground.value = false
})


function getPRColorFromUtil(pr: number) {
  if (isSetBackground.value) {
    return getPersonalRateData(pr).color + '80';
  }
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
  if (props.battleData.clan === null || props.battleData.clan === '') return ""
  return `[${props.battleData.clan}]`
}
function getBackgroundColor(pr: number){
  // if (!isSetBackground.value) {return 'rgba(0, 0, 0, 0)'} else {return getPRColorFromUtil(pr)}
  return getPRColorFromUtil(pr)
}
function getDefaultBackgroundColor(){
  if (isSetBackground.value) {return 'rgba(0, 0, 0, 0)'} else {return '#3d348b'}
}
function getTextColor(pr: number){
  // if (isSetBackground.value) {return getPRColorFromUtil(pr)} else {return '#ffffff'}
  return '#ffffff'
}
</script>

<template>
  <div>
    <div class="relative bg-[#3d348b] rounded-lg w-[40rem] p-6" :style="{backgroundColor: getDefaultBackgroundColor()}">
      <a @click="modal.open(PlayerInfoModal, {player: playerInfo, playerServer: server, battleData: battleData})" class="text-white/50 cursor-pointer font-bold">
        <div class="absolute right-4 top-2.5 leading-loose text-end hover-scale">
          <div class="text-white font-bold text-xl join"><p :class="{'text-orange-600': isMarked, '': !isMarked}" v-if="isMarked">*</p>
            <p :class="{'text-orange-600': isMarked, '': !isMarked}">{{ playerInfo.name }}</p>
            <p :class="{'text-orange-600': isMarked, '': !isMarked}" v-if="isMarked">*</p><p :style="{color: getClanColorFromUtil(battleData.clan_type)}">{{getClan()}}</p></div>
        </div>
      </a>
      <a @click="modal.open(PlayerShipInfoModal, {player: playerInfo, playerServer: server, battleData: battleData})" class="text-white/50 cursor-pointer font-bold">
        <div class="absolute inset-y-0 left-0 bg-[#7678ed] rounded-lg  p-6 w-[22rem] hover-scale" :style="{backgroundColor: getBackgroundColor(battleData.ship_profile.pr)}">
          <div class="absolute left-4 top-2.5 text-start">
            <h2 class="font-bold text-xl" :style="{color: getTextColor(battleData.ship_profile.pr)}">{{playerInfo.shipInfo ? numberToRoman(playerInfo.shipInfo.tier)+' '+playerInfo.shipInfo.ship_name.zh_sg : '不认识这艘船捏'}}</h2>
          </div>
          <div class="absolute right-4 top-1 w-[10rem]">
            <div class="grid grid-cols-1 text-sm text-white text-end">
              <div class=" ">{{battleData.ship_profile.wr}}% 胜率</div>
              <div class=" ">{{battleData.ship_profile.dmg}} 伤害</div>
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
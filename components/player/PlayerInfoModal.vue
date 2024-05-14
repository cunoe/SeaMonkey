<script lang="ts" setup>

import type {Vehicle} from "~/types/GameData";
import convertServerToLocale from "../../utils/convert.server";
import {type BattleData, fetchPlayerData, type PlayerDataResponse} from "~/composables/requests/kokomi";
import getPersonalRateData from "../../utils/get.pr.data";
import getWinRateColor from "~/utils/get.wr.color";
import getDMGColor from "~/utils/get.dmg.color";
import getBLTColor from "~/utils/get.blt.color";
import getFRColor from "~/utils/get.fr.color";
import {getKV, saveKV} from "~/composables/store/kv";

const props = defineProps<{
  player: Vehicle,
  playerServer: string
  battleData: BattleData
}>();

const toast = useToast()
const modal = useModal()

const info = ref('正在获取数据...')
const emit = defineEmits(['success'])
const isReady = ref(false)

const isMarked = ref(false)

const playerData = ref(null as unknown as PlayerDataResponse)

function onSuccess() {
  modal.close()
  emit('success')
}

watch(isMarked,  () => {
    saveKV(`marked_player_${props.playerServer}_${props.battleData.aid}`, isMarked.value.toString())
})

onBeforeMount(() => {
  getKV(`marked_player_${props.playerServer}_${props.battleData.aid}`).then((res) => {
    isMarked.value = res === 'true'
  }).catch(() => {
    isMarked.value = false
  })
  fetchPlayerData({aid: props.battleData.aid.toString(), server: props.playerServer}).then(res => {
    playerData.value = res
    isReady.value = true
  }).catch((err) => {
    toast.add({
      title: "获取数据失败：" + err.message,
    })
    info.value = "获取数据失败：" + err.message
    console.log(err)
  })
})
function getClan(){
  if (props.battleData.clan === null) return ""
  return `[${props.battleData.clan}]`
}
function getClanColorFromUtil(clanType: number) {
  return getClanColor(clanType)
}
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

</script>

<template>
  <UModal>
    <div class="flex flex-col items-center justify-center">
      <div class="card w-[48rem] bg-base-200 shadow-xl">
        <div class="card-body">
          <div class="card-title flex flex-row items-center justify-between">
              <div>
                <div class="text-xl font-bold join">
                  <p class="join" :style="{color: getClanColorFromUtil(battleData.clan_type)}">{{getClan()}}</p>
                  <p :class="{'text-orange-600': isMarked, '': !isMarked}" v-if="isMarked">*</p>
                  <p :class="{'text-orange-600': isMarked, '': !isMarked}">{{ player.name }}</p>
                  <p :class="{'text-orange-600': isMarked, '': !isMarked}" v-if="isMarked">*</p>
                  <div class="badge badge-neutral">
                    {{ convertServerToLocale(playerServer, '') }}
                  </div>
                </div>
              </div>
            <div class="flex flex-row space-x-2 justify-end items-end">
              <p>标记玩家</p><input type="checkbox" class="toggle" checked  v-model="isMarked"/>
            </div>
          </div>
          <div class="space-y-4">
            <div v-if="!isReady">
              <div class="container max-w-full">
                <div class="w-full flex justify-center items-center">
                  <div class="w-3/5 rounded-lg shadow-sm p-5 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-0 text-center">
<!--                      class="w-3/5 rounded-lg shadow-sm p-5 border-dashed border border-blue-500 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-0 text-center">-->
                    <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
                      <div class="text-center">
                        <div class="stat-value text-3xl">{{info}}</div>
                        <span class="loading loading-infinity loading-lg"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="isReady">
              <div class="flex flex-row text-white text-xl rounded-lg font-bold text-center justify-center items-center"  :style="{backgroundColor: getPRColorFromUtil(playerData.data.bt.pvp_solo.pr)}">
                {{getPersonalRateData(playerData.data.pr.pr).name}} {{playerData.data.pr.pr}}
              </div>
              <div class="p-1"></div>
              <div class="flex justify-center">
                <div class="stats container">
                  <div class="stat text-center">
                    <div class="stat-title"><Icon name="arcticons:battleforwesnoth" class="text-xl"/>战斗场数</div>
                    <div class="stat-value">{{playerData.data.pr.blt}}</div>
                  </div>
                  <div class="stat text-center">
                    <div class="stat-title"><Icon name="game-icons:target-prize"/>平均胜率</div>
                    <div class="stat-value" :style="{color: getWRColorFromUtil(playerData.data.pr.wr)}">{{playerData.data.pr.wr}}%</div>
                  </div>
                  <div class="stat text-center">
                    <div class="stat-title"><Icon name="material-symbols:water-drop" />场均伤害</div>
                    <div class="stat-value" :style="{color: getDMGColorFromUtil(playerData.data.pr.dmg, '')}">{{playerData.data.pr.dmg}}</div>
                  </div>
                  <div class="stat text-center">
                    <div class="stat-title"><Icon name="material-symbols:kid-star-sharp" />场均经验</div>
                    <div class="stat-value" :style="{color: getExpColorFromUtil(playerData.data.pr.exp)}">{{playerData.data.pr.exp}}</div>
                  </div>
                </div>
              </div>
              <div class="p-1"></div>
              <div class="grid grid-cols-[100px_100px_150px_100px_100px_70px_100px] font-bold">
                <div><p class="text-center">数据类型</p></div>
                <div><p class="text-center">场数</p></div>
                <div><p class="text-center">评分</p></div>
                <div><p class="text-center">胜率</p></div>
                <div><p class="text-center">伤害</p></div>
                <div><p class="text-center">K/D</p></div>
                <div><p class="text-center">经验</p></div>
              </div>
              <hr class="my-2 border-t border-gray-600 opacity-50">
              <div class="grid grid-cols-[100px_100px_150px_100px_100px_70px_100px] font-bold divide-x divide-gray-600 divide-opacity-50 auto-rows-max">
                <div>
                  <div class="text-center text-white">
                    <p class="">单野</p>
                  </div>
                  <div class="text-center text-white">
                    <p class="">自行车</p>
                  </div>
                  <div class="text-center text-white">
                    <p class="">三轮车</p>
                  </div>
                  <div class="text-center text-white">
                    <p class="">软壳</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p class="">{{ playerData.data.bt.pvp_solo.blt }}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">{{ playerData.data.bt.pvp_div2.blt }}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">{{ playerData.data.bt.pvp_div3.blt }}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">{{ playerData.data.bt.rank_solo.blt }}</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getPRColorFromUtil(playerData.data.bt.pvp_solo.pr)}">{{getPersonalRateData(playerData.data.bt.pvp_solo.pr).name}} {{playerData.data.bt.pvp_solo.pr}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getPRColorFromUtil(playerData.data.bt.pvp_div2.pr)}">{{getPersonalRateData(playerData.data.bt.pvp_div2.pr).name}} {{playerData.data.bt.pvp_div2.pr}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getPRColorFromUtil(playerData.data.bt.pvp_div3.pr)}">{{getPersonalRateData(playerData.data.bt.pvp_div3.pr).name}} {{playerData.data.bt.pvp_div3.pr}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getPRColorFromUtil(playerData.data.bt.rank_solo.pr)}">{{getPersonalRateData(playerData.data.bt.rank_solo.pr).name}} {{playerData.data.bt.rank_solo.pr}}</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getWRColorFromUtil(playerData.data.bt.pvp_solo.wr)}">{{playerData.data.bt.pvp_solo.wr}}%</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getWRColorFromUtil(playerData.data.bt.pvp_div2.wr)}">{{playerData.data.bt.pvp_div2.wr}}%</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getWRColorFromUtil(playerData.data.bt.pvp_div3.wr)}">{{playerData.data.bt.pvp_div3.wr}}%</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getWRColorFromUtil(playerData.data.bt.rank_solo.wr)}">{{playerData.data.bt.rank_solo.wr}}%</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getDMGColorFromUtil(playerData.data.bt.pvp_solo.dmg, '')}">{{playerData.data.bt.pvp_solo.dmg}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getDMGColorFromUtil(playerData.data.bt.pvp_div2.dmg, '')}">{{playerData.data.bt.pvp_div2.dmg}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getDMGColorFromUtil(playerData.data.bt.pvp_div3.dmg, '')}">{{playerData.data.bt.pvp_div3.dmg}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getDMGColorFromUtil(playerData.data.bt.rank_solo.dmg, '')}">{{playerData.data.bt.rank_solo.dmg}}</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getFRColorFromUtil(playerData.data.bt.pvp_solo.fr)}">{{playerData.data.bt.pvp_solo.fr}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getFRColorFromUtil(playerData.data.bt.pvp_div2.fr)}">{{playerData.data.bt.pvp_div2.fr}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getFRColorFromUtil(playerData.data.bt.pvp_div3.fr)}">{{playerData.data.bt.pvp_div3.fr}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getFRColorFromUtil(playerData.data.bt.rank_solo.fr)}">{{playerData.data.bt.rank_solo.fr}}</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getExpColorFromUtil(playerData.data.bt.pvp_solo.exp)}">{{playerData.data.bt.pvp_solo.exp}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getExpColorFromUtil(playerData.data.bt.pvp_div2.exp)}">{{playerData.data.bt.pvp_div2.exp}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getExpColorFromUtil(playerData.data.bt.pvp_div3.exp)}">{{playerData.data.bt.pvp_div3.exp}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getExpColorFromUtil(playerData.data.bt.rank_solo.exp)}">{{playerData.data.bt.rank_solo.exp}}</p>
                  </div>
                </div>
              </div>
              <div class="p-2"></div>
              <div class="grid grid-cols-[100px_100px_150px_100px_100px_70px_100px] font-bold">
                <div><p class="text-center">数据类型</p></div>
                <div><p class="text-center">场数</p></div>
                <div><p class="text-center">评分</p></div>
                <div><p class="text-center">胜率</p></div>
                <div><p class="text-center">伤害</p></div>
                <div><p class="text-center">K/D</p></div>
                <div><p class="text-center">经验</p></div>
              </div>
              <hr class="my-2 border-t border-gray-600 opacity-50">
              <div class="grid grid-cols-[100px_100px_150px_100px_100px_70px_100px] font-bold divide-x divide-gray-600 divide-opacity-50 auto-rows-max">
                <div>
                  <div class="text-center text-white">
                    <p class="">航母</p>
                  </div>
                  <div class="text-center text-white">
                    <p class="">战列舰</p>
                  </div>
                  <div class="text-center text-white">
                    <p class="">巡洋舰</p>
                  </div>
                  <div class="text-center text-white">
                    <p class="">驱逐舰</p>
                  </div>
                  <div class="text-center text-white">
                    <p class="">潜艇</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p class="">{{playerData.data.st.AirCarrier.blt}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">{{playerData.data.st.Battleship.blt}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">{{playerData.data.st.Cruiser.blt}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">{{playerData.data.st.Destroyer.blt}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">{{playerData.data.st.Submarine.blt}}</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p  class="" :style="{color: getPRColorFromUtil(playerData.data.st.AirCarrier.pr)}">{{getPersonalRateData(playerData.data.st.AirCarrier.pr).name}} {{playerData.data.st.AirCarrier.pr}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p  class="" :style="{color: getPRColorFromUtil(playerData.data.st.Battleship.pr)}">{{getPersonalRateData(playerData.data.st.Battleship.pr).name}} {{playerData.data.st.Battleship.pr}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p  class="" :style="{color: getPRColorFromUtil(playerData.data.st.Cruiser.pr)}">{{getPersonalRateData(playerData.data.st.Cruiser.pr).name}} {{playerData.data.st.Cruiser.pr}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p  class="" :style="{color: getPRColorFromUtil(playerData.data.st.Destroyer.pr)}">{{getPersonalRateData(playerData.data.st.Destroyer.pr).name}} {{playerData.data.st.Destroyer.pr}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p  class="" :style="{color: getPRColorFromUtil(playerData.data.st.Submarine.pr)}">{{getPersonalRateData(playerData.data.st.Submarine.pr).name}} {{playerData.data.st.Submarine.pr}}</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getWRColorFromUtil(playerData.data.st.AirCarrier.wr)}">{{playerData.data.st.AirCarrier.wr}}%</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getWRColorFromUtil(playerData.data.st.Battleship.wr)}">{{playerData.data.st.Battleship.wr}}%</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getWRColorFromUtil(playerData.data.st.Cruiser.wr)}">{{playerData.data.st.Cruiser.wr}}%</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getWRColorFromUtil(playerData.data.st.Destroyer.wr)}">{{playerData.data.st.Destroyer.wr}}%</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getWRColorFromUtil(playerData.data.st.Submarine.wr)}">{{playerData.data.st.Submarine.wr}}%</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getDMGColorFromUtil(playerData.data.st.AirCarrier.dmg, 'AirCarrier')}">{{playerData.data.st.AirCarrier.dmg}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getDMGColorFromUtil(playerData.data.st.Battleship.dmg, 'Battleship')}">{{playerData.data.st.Battleship.dmg}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getDMGColorFromUtil(playerData.data.st.Cruiser.dmg, 'Cruiser')}">{{playerData.data.st.Cruiser.dmg}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getDMGColorFromUtil(playerData.data.st.Destroyer.dmg, 'Destroyer')}">{{playerData.data.st.Destroyer.dmg}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getDMGColorFromUtil(playerData.data.st.Submarine.dmg, 'Submarine')}">{{playerData.data.st.Submarine.dmg}}</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getFRColorFromUtil(playerData.data.st.AirCarrier.fr)}">{{playerData.data.st.AirCarrier.fr}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getFRColorFromUtil(playerData.data.st.Battleship.fr)}">{{playerData.data.st.Battleship.fr}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getFRColorFromUtil(playerData.data.st.Cruiser.fr)}">{{playerData.data.st.Cruiser.fr}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getFRColorFromUtil(playerData.data.st.Destroyer.fr)}">{{playerData.data.st.Destroyer.fr}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getFRColorFromUtil(playerData.data.st.Submarine.fr)}">{{playerData.data.st.Submarine.fr}}</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getExpColorFromUtil(playerData.data.st.AirCarrier.exp)}">{{playerData.data.st.AirCarrier.exp}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getExpColorFromUtil(playerData.data.st.Battleship.exp)}">{{playerData.data.st.Battleship.exp}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getExpColorFromUtil(playerData.data.st.Cruiser.exp)}">{{playerData.data.st.Cruiser.exp}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getExpColorFromUtil(playerData.data.st.Destroyer.exp)}">{{playerData.data.st.Destroyer.exp}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getExpColorFromUtil(playerData.data.st.Submarine.exp)}">{{playerData.data.st.Submarine.exp}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UModal>
</template>


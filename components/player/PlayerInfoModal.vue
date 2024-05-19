<script lang="ts" setup>

import type {Vehicle} from "~/types/GameData";
import convertServerToLocale from "../../utils/convert.server";
import {type BattleDataItem, fetchPlayerData, type PlayerDataResponse} from "~/composables/requests/kokomi";
import getPersonalRateData from "../../utils/get.pr.data";
import getWinRateColor from "~/utils/get.wr.color";
import getDMGColor from "~/utils/get.dmg.color";
import getBLTColor from "~/utils/get.blt.color";
import getFRColor from "~/utils/get.fr.color";
import {getKV, saveKV} from "~/composables/store/kv";

const props = defineProps<{
  player: Vehicle,
  playerServer: string
  battleData: BattleDataItem
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
              <div class="flex flex-row text-white text-xl rounded-lg font-bold text-center justify-center items-center"  :style="{backgroundColor: getPRColorFromUtil(playerData.bt.pvp_solo.pr)}">
                {{getPersonalRateData(playerData.pr.pr).name}} {{playerData.pr.pr}}
              </div>
              <div class="p-1"></div>
              <div class="flex justify-center">
                <div class="stats container">
                  <div class="stat text-center">
                    <div class="stat-title"><Icon name="arcticons:battleforwesnoth" class="text-xl"/>战斗场数</div>
                    <div class="stat-value">{{playerData.pr.blt}}</div>
                  </div>
                  <div class="stat text-center">
                    <div class="stat-title"><Icon name="game-icons:target-prize"/>平均胜率</div>
                    <div class="stat-value" :style="{color: getWRColorFromUtil(playerData.pr.wr)}">{{playerData.pr.wr}}%</div>
                  </div>
                  <div class="stat text-center">
                    <div class="stat-title"><Icon name="material-symbols:water-drop" />场均伤害</div>
                    <div class="stat-value" :style="{color: getDMGColorFromUtil(playerData.pr.dmg, '')}">{{playerData.pr.dmg}}</div>
                  </div>
                  <div class="stat text-center">
                    <div class="stat-title"><Icon name="material-symbols:kid-star-sharp" />场均经验</div>
                    <div class="stat-value" :style="{color: getExpColorFromUtil(playerData.pr.exp)}">{{playerData.pr.exp}}</div>
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
                    <p class="">{{ playerData.bt.pvp_solo.blt }}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">{{ playerData.bt.pvp_div2.blt }}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">{{ playerData.bt.pvp_div3.blt }}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">{{ playerData.bt.rank_solo.blt }}</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getPRColorFromUtil(playerData.bt.pvp_solo.pr)}">{{getPersonalRateData(playerData.bt.pvp_solo.pr).name}} {{playerData.bt.pvp_solo.pr}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getPRColorFromUtil(playerData.bt.pvp_div2.pr)}">{{getPersonalRateData(playerData.bt.pvp_div2.pr).name}} {{playerData.bt.pvp_div2.pr}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getPRColorFromUtil(playerData.bt.pvp_div3.pr)}">{{getPersonalRateData(playerData.bt.pvp_div3.pr).name}} {{playerData.bt.pvp_div3.pr}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getPRColorFromUtil(playerData.bt.rank_solo.pr)}">{{getPersonalRateData(playerData.bt.rank_solo.pr).name}} {{playerData.bt.rank_solo.pr}}</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getWRColorFromUtil(playerData.bt.pvp_solo.wr)}">{{playerData.bt.pvp_solo.wr}}%</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getWRColorFromUtil(playerData.bt.pvp_div2.wr)}">{{playerData.bt.pvp_div2.wr}}%</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getWRColorFromUtil(playerData.bt.pvp_div3.wr)}">{{playerData.bt.pvp_div3.wr}}%</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getWRColorFromUtil(playerData.bt.rank_solo.wr)}">{{playerData.bt.rank_solo.wr}}%</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getDMGColorFromUtil(playerData.bt.pvp_solo.dmg, '')}">{{playerData.bt.pvp_solo.dmg}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getDMGColorFromUtil(playerData.bt.pvp_div2.dmg, '')}">{{playerData.bt.pvp_div2.dmg}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getDMGColorFromUtil(playerData.bt.pvp_div3.dmg, '')}">{{playerData.bt.pvp_div3.dmg}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getDMGColorFromUtil(playerData.bt.rank_solo.dmg, '')}">{{playerData.bt.rank_solo.dmg}}</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getFRColorFromUtil(playerData.bt.pvp_solo.fr)}">{{playerData.bt.pvp_solo.fr}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getFRColorFromUtil(playerData.bt.pvp_div2.fr)}">{{playerData.bt.pvp_div2.fr}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getFRColorFromUtil(playerData.bt.pvp_div3.fr)}">{{playerData.bt.pvp_div3.fr}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getFRColorFromUtil(playerData.bt.rank_solo.fr)}">{{playerData.bt.rank_solo.fr}}</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getExpColorFromUtil(playerData.bt.pvp_solo.exp)}">{{playerData.bt.pvp_solo.exp}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getExpColorFromUtil(playerData.bt.pvp_div2.exp)}">{{playerData.bt.pvp_div2.exp}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getExpColorFromUtil(playerData.bt.pvp_div3.exp)}">{{playerData.bt.pvp_div3.exp}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getExpColorFromUtil(playerData.bt.rank_solo.exp)}">{{playerData.bt.rank_solo.exp}}</p>
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
                    <p class="">{{playerData.st.AirCarrier.blt}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">{{playerData.st.Battleship.blt}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">{{playerData.st.Cruiser.blt}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">{{playerData.st.Destroyer.blt}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">{{playerData.st.Submarine.blt}}</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p  class="" :style="{color: getPRColorFromUtil(playerData.st.AirCarrier.pr)}">{{getPersonalRateData(playerData.st.AirCarrier.pr).name}} {{playerData.st.AirCarrier.pr}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p  class="" :style="{color: getPRColorFromUtil(playerData.st.Battleship.pr)}">{{getPersonalRateData(playerData.st.Battleship.pr).name}} {{playerData.st.Battleship.pr}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p  class="" :style="{color: getPRColorFromUtil(playerData.st.Cruiser.pr)}">{{getPersonalRateData(playerData.st.Cruiser.pr).name}} {{playerData.st.Cruiser.pr}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p  class="" :style="{color: getPRColorFromUtil(playerData.st.Destroyer.pr)}">{{getPersonalRateData(playerData.st.Destroyer.pr).name}} {{playerData.st.Destroyer.pr}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p  class="" :style="{color: getPRColorFromUtil(playerData.st.Submarine.pr)}">{{getPersonalRateData(playerData.st.Submarine.pr).name}} {{playerData.st.Submarine.pr}}</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getWRColorFromUtil(playerData.st.AirCarrier.wr)}">{{playerData.st.AirCarrier.wr}}%</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getWRColorFromUtil(playerData.st.Battleship.wr)}">{{playerData.st.Battleship.wr}}%</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getWRColorFromUtil(playerData.st.Cruiser.wr)}">{{playerData.st.Cruiser.wr}}%</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getWRColorFromUtil(playerData.st.Destroyer.wr)}">{{playerData.st.Destroyer.wr}}%</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getWRColorFromUtil(playerData.st.Submarine.wr)}">{{playerData.st.Submarine.wr}}%</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getDMGColorFromUtil(playerData.st.AirCarrier.dmg, 'AirCarrier')}">{{playerData.st.AirCarrier.dmg}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getDMGColorFromUtil(playerData.st.Battleship.dmg, 'Battleship')}">{{playerData.st.Battleship.dmg}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getDMGColorFromUtil(playerData.st.Cruiser.dmg, 'Cruiser')}">{{playerData.st.Cruiser.dmg}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getDMGColorFromUtil(playerData.st.Destroyer.dmg, 'Destroyer')}">{{playerData.st.Destroyer.dmg}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getDMGColorFromUtil(playerData.st.Submarine.dmg, 'Submarine')}">{{playerData.st.Submarine.dmg}}</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getFRColorFromUtil(playerData.st.AirCarrier.fr)}">{{playerData.st.AirCarrier.fr}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getFRColorFromUtil(playerData.st.Battleship.fr)}">{{playerData.st.Battleship.fr}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getFRColorFromUtil(playerData.st.Cruiser.fr)}">{{playerData.st.Cruiser.fr}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getFRColorFromUtil(playerData.st.Destroyer.fr)}">{{playerData.st.Destroyer.fr}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getFRColorFromUtil(playerData.st.Submarine.fr)}">{{playerData.st.Submarine.fr}}</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getExpColorFromUtil(playerData.st.AirCarrier.exp)}">{{playerData.st.AirCarrier.exp}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getExpColorFromUtil(playerData.st.Battleship.exp)}">{{playerData.st.Battleship.exp}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getExpColorFromUtil(playerData.st.Cruiser.exp)}">{{playerData.st.Cruiser.exp}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getExpColorFromUtil(playerData.st.Destroyer.exp)}">{{playerData.st.Destroyer.exp}}</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="" :style="{color: getExpColorFromUtil(playerData.st.Submarine.exp)}">{{playerData.st.Submarine.exp}}</p>
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


<script lang="ts" setup>

import type {Vehicle} from "~/types/GameData";
import convertServerToLocale from "../../utils/convert.server";
import numberToRoman from "~/utils/number.to.roman";
import {type BattleData, fetchShipData, type ShipDataResponse} from "~/composables/requests/kokomi";
import getPersonalRateData from "../../utils/get.pr.data";
import getWinRateColor from "~/utils/get.wr.color";
import getDMGColor from "~/utils/get.dmg.color";
import getBLTColor from "~/utils/get.blt.color";
import getFRColor from "~/utils/get.fr.color";

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

function onSuccess() {
  modal.close()
  emit('success')
}

const change = ref(false)
function changeChange() {
  change.value = !change.value
}

const shipData = ref(null as unknown as ShipDataResponse)

onBeforeMount(() => {
  fetchShipData({aid: props.battleData.aid.toString(), server: props.playerServer, ship_id: props.player.shipId}).then(res => {
    shipData.value = res
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
    <div>
      <div v-if="change" class="flex flex-col items-center justify-center">
        <div class="card w-[48rem] bg-base-200 shadow-xl">
          <div class="card-body">

            <div class="card-title flex flex-row items-center justify-between">
              <div>
                <div class="text-xl font-bold join">
                  <p class="join" :style="{color: getClanColorFromUtil(battleData.clan_type)}">{{getClan()}}</p>
                  {{ player.name }}
                  <div class="badge badge-neutral">
                    {{ convertServerToLocale(playerServer, '') }}
                  </div>
                </div>
              </div>
              <div>
                <div class="text-xl font-bold join">
                  {{player.shipInfo ? player.shipInfo.ship_name.zh_sg+' '+numberToRoman(player.shipInfo.tier) : '不认识这艘船捏'}}
                </div>
                <div class="card-actions join">
                  <button class="btn btn-square btn-sm" @click="changeChange()">
                    <Icon name="tabler:switch-horizontal" class="text-xl"/>
                  </button>
                </div>
              </div>
            </div>

            本场数据（WIP）
          </div>
        </div>
      </div>
      <div v-if="!change" class="flex flex-col items-center justify-center">
        <div class="card w-[48rem] bg-base-200 shadow-xl">
          <div class="card-body">
            <div class="card-title flex flex-row items-center justify-between">
              <div>
                <div class="text-xl font-bold join">
                  <p class="join" :style="{color: getClanColorFromUtil(battleData.clan_type)}">{{getClan()}}</p>
                  {{ player.name }}
                  <div class="badge badge-neutral">
                    {{ convertServerToLocale(playerServer, '') }}
                  </div>
                </div>
              </div>
              <div>
                <div class="text-xl font-bold join">
                  {{player.shipInfo ? player.shipInfo.ship_name.zh_sg+' '+numberToRoman(player.shipInfo.tier) : '不认识这艘船捏'}}
                </div>
                <div class="card-actions join">
                  <button class="btn btn-square btn-sm" @click="changeChange()">
                    <Icon name="tabler:switch-horizontal" class="text-xl" />
                  </button>
                </div>
              </div>
            </div>
            <div class="space-y-4">
              <div v-if="!isReady">
                <div class="container max-w-full">
                  <div class="w-full flex justify-center items-center">
                    <div class="w-3/5 rounded-lg shadow-sm p-5 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-0 text-center">
<!--                        class="w-3/5 rounded-lg shadow-sm p-5 border-dashed border border-blue-500 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-0 text-center">-->
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
                <div class="flex flex-row text-white text-xl rounded-lg font-bold text-center justify-center items-center"  :style="{backgroundColor: getPRColorFromUtil(shipData.data.pr.pr)}">
                  {{getPersonalRateData(shipData.data.pr.pr).name}} {{shipData.data.pr.pr}}
                </div>
                <div class="p-1"></div>
                <div class="flex justify-center">
                  <div class="stats container">
                    <div class="stat text-center">
                      <div class="stat-title"><Icon name="arcticons:battleforwesnoth" class="text-xl"/>战斗场数</div>
                      <div class="stat-value">{{ shipData.data.pr.blt }}</div>
                    </div>
                    <div class="stat text-center">
                      <div class="stat-title"><Icon name="game-icons:target-prize"/>平均胜率</div>
                      <div class="stat-value" :style="{color: getWRColorFromUtil(shipData.data.pr.wr)}">{{ shipData.data.pr.wr }}%</div>
                    </div>
                    <div class="stat text-center">
                      <div class="stat-title"><Icon name="material-symbols:water-drop" />场均伤害</div>
                      <div class="stat-value" :style="{color: getDMGColorFromUtil(shipData.data.pr.dmg, '')}">{{ shipData.data.pr.dmg }}</div>
                    </div>
                    <div class="stat text-center">
                      <div class="stat-title"><Icon name="material-symbols:kid-star-sharp" />场均经验</div>
                      <div class="stat-value" :style="{color: getExpColorFromUtil(shipData.data.pr.exp)}">{{ shipData.data.pr.exp }}</div>
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
                      <p class="">{{ shipData.data.bt.pvp_solo.blt }}</p>
                    </div>
                    <div class="text-center text-gray-400">
                      <p class="">{{ shipData.data.bt.pvp_div2.blt }}</p>
                    </div>
                    <div class="text-center text-gray-400">
                      <p class="">{{ shipData.data.bt.pvp_div3.blt }}</p>
                    </div>
                    <div class="text-center text-gray-400">
                      <p class="">{{ shipData.data.bt.rank_solo.blt }}</p>
                    </div>
                  </div>
                  <div>
                    <div class="text-center text-gray-400">
                      <p class="" :style="{color: getPRColorFromUtil(shipData.data.bt.pvp_solo.pr)}">{{getPersonalRateData(shipData.data.bt.pvp_solo.pr).name}} {{shipData.data.bt.pvp_solo.pr}}</p>
                    </div>
                    <div class="text-center text-gray-400">
                      <p class="" :style="{color: getPRColorFromUtil(shipData.data.bt.pvp_div2.pr)}">{{getPersonalRateData(shipData.data.bt.pvp_div2.pr).name}} {{shipData.data.bt.pvp_div2.pr}}</p>
                    </div>
                    <div class="text-center text-gray-400">
                      <p class="" :style="{color: getPRColorFromUtil(shipData.data.bt.pvp_div3.pr)}">{{getPersonalRateData(shipData.data.bt.pvp_div3.pr).name}} {{shipData.data.bt.pvp_div3.pr}}</p>
                    </div>
                    <div class="text-center text-gray-400">
                      <p class="" :style="{color: getPRColorFromUtil(shipData.data.bt.rank_solo.pr)}">{{getPersonalRateData(shipData.data.bt.rank_solo.pr).name}} {{shipData.data.bt.rank_solo.pr}}</p>
                    </div>
                  </div>
                  <div>
                    <div class="text-center text-gray-400">
                      <p class="" :style="{color: getWRColorFromUtil(shipData.data.bt.pvp_solo.wr)}">{{shipData.data.bt.pvp_solo.wr}}%</p>
                    </div>
                    <div class="text-center text-gray-400">
                      <p class="" :style="{color: getWRColorFromUtil(shipData.data.bt.pvp_div2.wr)}">{{shipData.data.bt.pvp_div2.wr}}%</p>
                    </div>
                    <div class="text-center text-gray-400">
                      <p class="" :style="{color: getWRColorFromUtil(shipData.data.bt.pvp_div3.wr)}">{{shipData.data.bt.pvp_div3.wr}}%</p>
                    </div>
                    <div class="text-center text-gray-400">
                      <p class="" :style="{color: getWRColorFromUtil(shipData.data.bt.rank_solo.wr)}">{{shipData.data.bt.rank_solo.wr}}%</p>
                    </div>
                  </div>
                  <div>
                    <div class="text-center text-gray-400">
                      <p class="" :style="{color: getDMGColorFromUtil(shipData.data.bt.pvp_solo.dmg, '')}">{{shipData.data.bt.pvp_solo.dmg}}</p>
                    </div>
                    <div class="text-center text-gray-400">
                      <p class="" :style="{color: getDMGColorFromUtil(shipData.data.bt.pvp_div2.dmg, '')}">{{shipData.data.bt.pvp_div2.dmg}}</p>
                    </div>
                    <div class="text-center text-gray-400">
                      <p class="" :style="{color: getDMGColorFromUtil(shipData.data.bt.pvp_div3.dmg, '')}">{{shipData.data.bt.pvp_div3.dmg}}</p>
                    </div>
                    <div class="text-center text-gray-400">
                      <p class="" :style="{color: getDMGColorFromUtil(shipData.data.bt.rank_solo.dmg, '')}">{{shipData.data.bt.rank_solo.dmg}}</p>
                    </div>
                  </div>
                  <div>
                    <div class="text-center text-gray-400">
                      <p class="" :style="{color: getFRColorFromUtil(shipData.data.bt.pvp_solo.fr)}">{{shipData.data.bt.pvp_solo.fr}}</p>
                    </div>
                    <div class="text-center text-gray-400">
                      <p class="" :style="{color: getFRColorFromUtil(shipData.data.bt.pvp_div2.fr)}">{{shipData.data.bt.pvp_div2.fr}}</p>
                    </div>
                    <div class="text-center text-gray-400">
                      <p class="" :style="{color: getFRColorFromUtil(shipData.data.bt.pvp_div3.fr)}">{{shipData.data.bt.pvp_div3.fr}}</p>
                    </div>
                    <div class="text-center text-gray-400">
                      <p class="" :style="{color: getFRColorFromUtil(shipData.data.bt.rank_solo.fr)}">{{shipData.data.bt.rank_solo.fr}}</p>
                    </div>
                  </div>
                  <div>
                    <div class="text-center text-gray-400">
                      <p class="" :style="{color: getExpColorFromUtil(shipData.data.bt.pvp_solo.exp)}">{{shipData.data.bt.pvp_solo.exp}}</p>
                    </div>
                    <div class="text-center text-gray-400">
                      <p class="" :style="{color: getExpColorFromUtil(shipData.data.bt.pvp_div2.exp)}">{{shipData.data.bt.pvp_div2.exp}}</p>
                    </div>
                    <div class="text-center text-gray-400">
                      <p class="" :style="{color: getExpColorFromUtil(shipData.data.bt.pvp_div3.exp)}">{{shipData.data.bt.pvp_div3.exp}}</p>
                    </div>
                    <div class="text-center text-gray-400">
                      <p class="" :style="{color: getExpColorFromUtil(shipData.data.bt.rank_solo.exp)}">{{shipData.data.bt.rank_solo.exp}}</p>
                    </div>
                  </div>
                </div>
                <div class="p-2"></div>
                <div class="grid grid-cols-3 font-bold">
                  <div><p class="text-center">其他数据</p></div>
                  <div><p class="text-center">武器命中率</p></div>
                  <div><p class="text-center">最高记录</p></div>
                </div>
                <hr class="my-2 border-t border-gray-600 opacity-50">
                <div class="grid grid-cols-3 font-bold divide-x divide-gray-600 divide-opacity-50">
                  <div>
                    <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                      <p class="text-start">存活率</p>
                      <p class="text-end">{{shipData.data.info.survival_rate}}%</p>
                    </div>
                    <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                      <p class="text-start">飞机击落</p>
                      <p class="text-end">{{shipData.data.info.avg_planes_killed}}</p>
                    </div>
                    <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                      <p class="text-start">潜在伤害</p>
                      <p class="text-end">{{shipData.data.info.avg_potential_dmage}}</p>
                    </div>
                    <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                      <p class="text-start">侦查伤害</p>
                      <p class="text-end">{{shipData.data.info.avg_spotting_damage}}</p>
                    </div>
                    <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                      <p class="text-start">占领贡献</p>
                      <p class="text-end">{{shipData.data.info.captuer_contribution}}%</p>
                    </div>
                    <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                      <p class="text-start">防御贡献</p>
                      <p class="text-end">{{shipData.data.info.defense_contribution}}%</p>
                    </div>
                  </div>
                  <div class="">
                    <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                      <p class="text-start">主炮</p>
                      <p class="text-end">{{shipData.data.info.main_battery}}%</p>
                    </div>
                    <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                      <p class="text-start">副炮</p>
                      <p class="text-end">{{shipData.data.info.second_battrey}}%</p>
                    </div>
                    <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                      <p class="text-start">鱼雷</p>
                      <p class="text-end">{{shipData.data.info.torpedo}}%</p>
                    </div>
                    <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                      <p class="text-start">火箭</p>
                      <p class="text-end">{{shipData.data.info.rocket}}%</p>
                    </div>
                    <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                      <p class="text-start">炸弹</p>
                      <p class="text-end">{{shipData.data.info.bomb}}%</p>
                    </div>
                    <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                      <p class="text-start">跳弹</p>
                      <p class="text-end">{{shipData.data.info.skip_bomb}}%</p>
                    </div>
                  </div>
                  <div class="">
                    <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                      <p class="text-start">击杀</p>
                      <p class="text-end">{{shipData.data.info.max_frags}}</p>
                    </div>
                    <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                      <p class="text-start">伤害</p>
                      <p class="text-end">{{shipData.data.info.max_damage}}</p>
                    </div>
                    <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                      <p class="text-start">潜在伤害</p>
                      <p class="text-end">{{shipData.data.info.max_potential_damage}}</p>
                    </div>
                    <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                      <p class="text-start">裸经验</p>
                      <p class="text-end">{{shipData.data.info.max_exp}}</p>
                    </div>
                    <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                      <p class="text-start">侦查伤害</p>
                      <p class="text-end">{{shipData.data.info.max_spotting_damage}}</p>
                    </div>
                    <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                      <p class="text-start">飞机击落</p>
                      <p class="text-end">{{shipData.data.info.max_planes_killed}}</p>
                    </div>
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


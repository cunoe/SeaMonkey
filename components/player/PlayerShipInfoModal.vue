<script lang="ts" setup>

import type {Vehicle} from "~/types/GameData";
import convertServerToChinese from "../../utils/convert.server";
import convertServerToEnglish from "../../utils/convert.server";
import convertServerToLocale from "../../utils/convert.server";
import convertMatchGroup from "~/utils/convert.matchgroup";
import convertSecondsToString from "~/utils/convert.seconds.to.string";
import numberToRoman from "~/utils/number.to.roman";

const props = defineProps<{
  player: Vehicle,
  playerServer: string
}>();

const toast = useToast()
const modal = useModal()
const emit = defineEmits(['success'])
const isReady = ref(true)

function onSuccess() {
  modal.close()
  emit('success')
}

onBeforeMount(async () => {
})

function changeIsReady() {
  isReady.value = !isReady.value
}

const columns = [
  {
    key: 'id',
    label: '数据类型'
  }, {
    key: 'num',
    label: '场数'
  }, {
    key: 'pr',
    label: '评分'
  }, {
    key: 'wr',
    label: '胜率'
  }, {
    key: 'dmg',
    label: '伤害'
  }, {
    key: 'kd',
    label: 'K/D'
  }, {
    key: 'exp',
    label: '经验'
  }
]

const items = [{
  id: '单野',
  num: 100,
  pr: '还需努力',
  wr: '30%',
  dmg: 10000,
  kd: 0.1,
  exp: 100,
  // class: 'bg-red-500/50 dark:bg-red-400/50'
}, {
  id: '自行车',
  num: 100,
  pr: '大佬平均',
  wr: '30%',
  dmg: 10000,
  kd: 0.1,
  exp: 100,
  // class: 'bg-red-500/50 dark:bg-red-400/50'
}, {
  id: '三轮车',
  num: 100,
  pr: '大佬平均',
  wr: '30%',
  dmg: 10000,
  kd: 0.1,
  exp: 100,
  // class: 'bg-red-500/50 dark:bg-red-400/50'
}, {
  id: '软壳',
  num: 100,
  pr: '大佬平均',
  wr: '30%',
  dmg: 10000,
  kd: 0.1,
  exp: 100,
}]

</script>

<template>
  <UModal>
    <div class="flex flex-col items-center justify-center">
      <div class="card w-[48rem] bg-base-200 shadow-xl">
        <div class="card-body">
          <div class="card-title flex flex-row items-center justify-between">
            <div>
              <div class="text-xl font-bold join">
                <p class="text-blue-500 join">[NASA]</p>
                {{ player.name }}
                <div class="badge badge-neutral">
                  {{ convertServerToLocale(playerServer, '') }}
                </div>
              </div>
            </div>
            <div>
              <div class="text-xl font-bold">
                {{player.shipInfo ? player.shipInfo.ship_name.zh_sg+' '+numberToRoman(player.shipInfo.tier) : '不认识这艘船捏'}}
              </div>
            </div>
          </div>
          <div class="space-y-4">
            <div v-if="!isReady">
              <div class="container max-w-full">
                <div class="w-full flex justify-center items-center">
                  <div
                      class="w-3/5 rounded-lg shadow-sm p-5 border-dashed border border-blue-500 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-0 text-center">
                    <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
                      <div class="text-center">
                        <div class="stat-value text-3xl">正在加载数据</div>
                        <span class="loading loading-infinity loading-lg"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="isReady">
              <div class="flex flex-row bg-fuchsia-600 text-white text-xl rounded-lg font-bold text-center justify-center items-center">
                大佬平均 +327
              </div>
              <div class="p-1"></div>
              <div class="flex justify-center">
                <div class="stats container">
                  <div class="stat text-center">
                    <div class="stat-title"><Icon name="arcticons:battleforwesnoth" class="text-xl"/>战斗场数</div>
                    <div class="stat-value">1000</div>
                  </div>
                  <div class="stat text-center">
                    <div class="stat-title"><Icon name="game-icons:target-prize"/>平均胜率</div>
                    <div class="stat-value text-amber-600">54.23%</div>
                  </div>
                  <div class="stat text-center">
                    <div class="stat-title"><Icon name="material-symbols:water-drop" />场均伤害</div>
                    <div class="stat-value text-fuchsia-600">123456</div>
                  </div>
                  <div class="stat text-center">
                    <div class="stat-title"><Icon name="material-symbols:kid-star-sharp" />场均经验</div>
                    <div class="stat-value text-fuchsia-600">2345</div>
                  </div>
                </div>
              </div>
              <UTable :rows="items" :columns="columns">
                <template #pr-data="{ row }">
                  <p class="text-pink-600 font-bold">{{ row.pr }}</p>
                </template>
                <template #wr-data="{ row }">
                  <p class="text-red-600 font-bold">{{ row.wr }}</p>
                </template>
              </UTable>
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
                    <p class="text-end">54.87%</p>
                  </div>
                  <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                    <p class="text-start">存活率</p>
                    <p class="text-end">54.87%</p>
                  </div>
                  <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                    <p class="text-start">存活率</p>
                    <p class="text-end">54.87%</p>
                  </div>
                  <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                    <p class="text-start">存活率</p>
                    <p class="text-end">54.87%</p>
                  </div>
                  <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                    <p class="text-start">存活率</p>
                    <p class="text-end">54.87%</p>
                  </div>
                  <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                    <p class="text-start">存活率</p>
                    <p class="text-end">54.87%</p>
                  </div>
                </div>
                <div class="">
                  <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                    <p class="text-start">存活率</p>
                    <p class="text-end">54.87%</p>
                  </div>
                  <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                    <p class="text-start">存活率</p>
                    <p class="text-end">54.87%</p>
                  </div>
                  <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                    <p class="text-start">存活率</p>
                    <p class="text-end">54.87%</p>
                  </div>
                  <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                    <p class="text-start">存活率</p>
                    <p class="text-end">54.87%</p>
                  </div>
                  <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                    <p class="text-start">存活率</p>
                    <p class="text-end">54.87%</p>
                  </div>
                  <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                    <p class="text-start">存活率</p>
                    <p class="text-end">54.87%</p>
                  </div>
                </div>
                <div class="">
                  <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                    <p class="text-start">存活率</p>
                    <p class="text-end">54.87%</p>
                  </div>
                  <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                    <p class="text-start">存活率</p>
                    <p class="text-end">54.87%</p>
                  </div>
                  <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                    <p class="text-start">存活率</p>
                    <p class="text-end">54.87%</p>
                  </div>
                  <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                    <p class="text-start">存活率</p>
                    <p class="text-end">54.87%</p>
                  </div>
                  <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                    <p class="text-start">存活率</p>
                    <p class="text-end">54.87%</p>
                  </div>
                  <div class="flex flex-row justify-between items-center gap-4 px-4 text-gray-400">
                    <p class="text-start">存活率</p>
                    <p class="text-end">54.87%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--        <div class="card-actions flex flex-row justify-end">-->
        <!--          <button class='btn' @click="onSuccess">-->
        <!--            关闭-->
        <!--          </button>-->
        <!--        </div>-->
      </div>
    </div>
  </UModal>
</template>


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
                    <p class="">123</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">123</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">123</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">123</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p class="text-pink-600">大佬平均+2000</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="text-pink-600">大佬平均+2000</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="text-pink-600">大佬平均+2000</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="text-pink-600">大佬平均+2000</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p class="text-purple-600">74.89%</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="text-purple-600">74.89%</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="text-purple-600">74.89%</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="text-purple-600">74.89%</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p class="text-purple-600">123456</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="text-purple-600">123456</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="text-purple-600">123456</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="text-purple-600">123456</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p class="">4.5</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">4.5</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">4.5</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">4.5</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p class="">1234</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">1234</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">1234</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">1234</p>
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
                    <p class="">123</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">123</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">123</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">123</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">123</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p class="text-pink-600">大佬平均+2000</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="text-pink-600">大佬平均+2000</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="text-pink-600">大佬平均+2000</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="text-pink-600">大佬平均+2000</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="text-pink-600">大佬平均+2000</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p class="">74.89%</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">74.89%</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">74.89%</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">74.89%</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">74.89%</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p class="">123456</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">123456</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">123456</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">123456</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">123456</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p class="">4.5</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">4.5</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">4.5</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">4.5</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">4.5</p>
                  </div>
                </div>
                <div>
                  <div class="text-center text-gray-400">
                    <p class="">1234</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">1234</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">1234</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">1234</p>
                  </div>
                  <div class="text-center text-gray-400">
                    <p class="">1234</p>
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


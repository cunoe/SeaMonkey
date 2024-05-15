<script lang="ts" setup>
import {getKV, saveKV} from "~/composables/store/kv";
import { open } from '@tauri-apps/api/dialog';
import {desktopDir, pictureDir} from '@tauri-apps/api/path';
import {useIntervalFn} from "@vueuse/core";
import {BaseDirectory, createDir, exists, readDir} from "@tauri-apps/api/fs";
import {convertFileSrc} from "@tauri-apps/api/tauri";

async function selectDir() {
  const selected = await open({
    directory: true,
    multiple: false,
    defaultPath: await desktopDir(),
  });
  if (selected === null) {
    // user cancelled the selection
  } else {
    dirInput.value = selected as string;
  }
}

const server = [
  {
    id: 'auto',
    label: '自动检测'
  },
  {
    id: 'asia',
    label: '亚服'
  },
  {
    id: 'na',
    label: '美服'
  },
  {
    id: 'eu',
    label: '欧服'
  },
  {
    id: 'cn',
    label: '国服'
  },
  {
    id: 'ru',
    label: '俄服'
  }
]

const clanEnemyServer = [
  {
    id: 'sync',
    label: '与当前服务器相同'
  },
  {
    id: 'asia',
    label: '亚服'
  },
  {
    id: 'na',
    label: '美服'
  },
  {
    id: 'eu',
    label: '欧服'
  },
  {
    id: 'cn',
    label: '国服'
  },
  {
    id: 'ru',
    label: '俄服'
  }
]

const toast = useToast()
const currentDir: Ref<string> = ref('')
const currentServer: Ref<string> = ref('')
const currentServerIndex: Ref<number> = ref(0)
const currentClanEnemyServer: Ref<string> = ref('')
const currentClanEnemyServerIndex: Ref<number> = ref(0)

const dirInput: Ref<string> = ref('')
const serverSelected = ref(server[0])
const clanEnemyServerSelected = ref(clanEnemyServer[0])

function changeDir() {
  if (dirInput.value !== '') {
    currentDir.value = dirInput.value
    toast.add({
      title: '目录修改成功',
    })
  } else {
    toast.add({
      title: '目录格式错误',
    })
  }
  saveKV('gameDir', dirInput.value)
}

function changeServer() {
  if (serverSelected.value.id) {
    saveKV('gameServer', serverSelected.value.id)
    toast.add({
      title: '服务器修改成功',
    })
  }
}

function changeClanEnemyServer() {
  if (clanEnemyServerSelected.value.id) {
    saveKV('clanEnemyServer', clanEnemyServerSelected.value.id)
    toast.add({
      title: '服务器修改成功',
    })
  }
}

onBeforeMount(async () => {
  currentDir.value = await getKV('gameDir')
  currentServer.value = await getKV('gameServer')
  currentServerIndex.value = server.findIndex(item => item.id === currentServer.value)
  if (currentServerIndex.value === -1) {
    currentServerIndex.value = 0
  }
  serverSelected.value = server[currentServerIndex.value]
  currentClanEnemyServer.value = await getKV('clanEnemyServer')
  if (currentClanEnemyServer.value === '') {
    currentClanEnemyServer.value = 'sync'
    await saveKV('clanEnemyServer', 'sync')
  }
  currentClanEnemyServerIndex.value = clanEnemyServer.findIndex(item => item.id === currentClanEnemyServer.value)
  if (currentClanEnemyServerIndex.value === -1) {
    currentClanEnemyServerIndex.value = 0
  }
  clanEnemyServerSelected.value = clanEnemyServer[currentClanEnemyServerIndex.value]

  backgroundDir.value = await pictureDir() + "\SeaMonkeyBackground"
})

const imagesListToSelect = ref<any[]>([
  {
    id: 'false',
    label: '无'
  }
]);
const imageSelected = ref(imagesListToSelect.value[0]);
const backgroundDir = ref<string>('')
const lastSelected = ref<string>('')

watch(imageSelected, () => {
  if (lastSelected.value === imageSelected.value.id) {
    return
  }
  saveKV('backgroundImage', imageSelected.value.id)
  toast.add({
    title: '背景图片修改成功',
  })
  lastSelected.value = imageSelected.value.id
})

useIntervalFn(async () => {
  const bgn = await getKV('backgroundImage')
  exists('SeaMonkeyBackground', {
    dir: BaseDirectory.Picture,
  }).then(async (result) => {
    if (!result) {
      console.log('No background images found in cache')
      await createDir('SeaMonkeyBackground', {
        dir: BaseDirectory.Picture,
        recursive: true
      })
    } else {
      const images_in_cache = await readDir(
          'SeaMonkeyBackground',
          {
            dir: BaseDirectory.Picture,
            recursive: false
          }
      );
      imagesListToSelect.value.splice(1)
      for (const entry of images_in_cache) {
        if (bgn === convertFileSrc(entry.path)) {
          imageSelected.value = {
            id: convertFileSrc(entry.path),
            label: entry.name ? entry.name : entry.path
          }
          continue
        }
        imagesListToSelect.value.push({
          id: convertFileSrc(entry.path),
          label: entry.name ? entry.name : entry.path
        });
      }
    }
  })
}, 1000)
</script>

<template>
  <div>
    <div class="container mx-auto max-w-screen-md rounded-lg backdrop-blur-sm">
      <div class="grid grid-cols-1 gap-4">
        <div>
          <div class="w-full">
            <div class="text-xl text-gray-200 join">游戏目录</div>
            <div class="text-sm text-gray-400">  类似 D:\Games\World_of_Warships</div>
            <!--          <input type="tel" v-model="dirInput" placeholder="如：D:\Games\World_of_Warships" class="w-full input">-->
            <button class='btn' @click="selectDir">
              选择目录
            </button>
            <div class="text-sm text-gray-400" v-if="currentDir!==''">当前目录：{{ currentDir }}</div>
            <div class="text-sm text-gray-400" v-if="dirInput !==''">已选择目录：{{ dirInput }}</div>
          </div>
          <button class='btn' @click="changeDir">
            保存
          </button>
          <!-- 分割线 -->
          <hr class="my-4 border-t border-gray-600 opacity-50">
          <div class="space-y-4">
            <div class="w-full">
              <div class="text-xl text-gray-200">服务器</div>
              <div class="text-sm text-gray-400">*服务器的设定将会影响到战绩统计，务必在启动游戏前确定服务器是否正确</div>
            </div>
            <USelectMenu  v-model="serverSelected" :options="server"></USelectMenu>
          </div>
          <button class='btn' @click="changeServer">
            保存
          </button>
          <hr class="my-4 border-t border-gray-600 opacity-50">
          <div class="space-y-4">
            <div class="w-full">
              <div class="text-xl text-gray-200">军团战对方服务器</div>
            </div>
            <USelectMenu  v-model="clanEnemyServerSelected" :options="clanEnemyServer"></USelectMenu>
          </div>
          <button class='btn' @click="changeClanEnemyServer">
            保存
          </button>
          <hr class="my-4 border-t border-gray-600 opacity-50">
          <div class="space-y-4">
            <div>
              <div class="text-xl text-gray-200">背景图片</div>
              <div class="text-sm text-gray-400">*请将图片放置到 {{backgroundDir}}</div>
              <ul>
                <USelectMenu  v-model="imageSelected" :options="imagesListToSelect"></USelectMenu>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
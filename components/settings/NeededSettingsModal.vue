<script lang="ts" setup>
import {getKV, saveKV} from "~/composables/store/kv";
import { open } from '@tauri-apps/plugin-dialog';
import { desktopDir } from '@tauri-apps/api/path';

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

const props = defineProps({
  un: {
    type: Number,
    default: 12
  },
})

interface Props {
  gameDir: string
  gameServer: string
}

const server = [{
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
    id: 'ru',
    label: '俄服'
  },
  {
    id: 'cn',
    label: '国服'
  }
]

const toast = useToast()
const modal = useModal()
const emit = defineEmits(['success'])
const currentDir: Ref<string> = ref('')
const currentServer: Ref<string> = ref('')
const currentServerIndex: Ref<number> = ref(0)
const dirInput: Ref<string> = ref('')
const serverSelected = ref(server[0])
const currentClanEnemyServer = ref('')

function setSettings() {
  if (dirInput.value) {
    saveKV('gameDir', dirInput.value)
  }
  if (serverSelected.value.id) {
    saveKV('gameServer', serverSelected.value.id)
  }
  if (currentClanEnemyServer.value === ''){
    saveKV('clanEnemyServer', 'sync')
  }
}

function onSuccess() {
  if (dirInput.value === '') {
    toast.add({
      title: '请选择游戏目录',
    })
    return
  }
  if (!serverSelected.value.id) {
    toast.add({
      title: '请选择服务器',
    })
    return
  }
  setSettings()
  toast.add({
    title: '设置成功',
  })
  modal.close()
  emit('success')
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
})


</script>

<template>
  <UModal prevent-close>
    <UCard>
      <template #header>
        <div class="flex flex-row items-center justify-between">
          <div class="text-xl font-bold">重要设置</div>
        </div>
      </template>
      <div class="space-y-4">
        <div class="w-full">
          <div class="text-xl text-gray-200">游戏目录</div>
          <div class="text-sm text-gray-400">类似 D:\Games\World_of_Warships</div>
<!--          <input type="tel" v-model="dirInput" placeholder="如：D:\Games\World_of_Warships" class="w-full input">-->
          <button class='btn' @click="selectDir">
            选择目录
          </button>
          <div class="text-sm text-gray-400" v-if="currentDir!==''">当前目录：{{ currentDir }}</div>
          <div class="text-sm text-gray-400" v-if="dirInput !==''">已选择目录：{{ dirInput }}</div>
        </div>
        <div class="w-full">
          <div class="text-xl text-gray-200">服务器</div>
        </div>
        <USelectMenu  v-model="serverSelected" :options="server"></USelectMenu>
      </div>
      <template #footer>
        <div class="flex flex-row justify-end">
          <button class='btn' @click="onSuccess">
            保存
          </button>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

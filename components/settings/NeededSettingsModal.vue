<script lang="ts" setup>
import {getKV, saveKV} from "~/composables/store/kv";

const toast = useToast()
const modal = useModal()

const emit = defineEmits(['success'])

const currentDir: Ref<string> = ref('')
const currentServer: Ref<string> = ref('')
const currentServerIndex: Ref<number> = ref(0)
interface Props {
  gameDir: string
  gameServer: string
}
const props = defineProps<Props>()
function onSuccess() {
  setSettings()
  toast.add({
    title: '设置成功',
    message: '设置成功',
    duration: 3000,
  })
  modal.close()
  emit('success')
}

const dirInput: Ref<string> = ref('')

onBeforeMount(async () => {
  currentDir.value = await getKV('gameDir')
  currentServer.value = await getKV('gameServer')
  currentServerIndex.value = server.findIndex(item => item.id === currentServer.value)
  if (currentServerIndex.value === -1) {
    currentServerIndex.value = 0
  }
  serverSelected.value = server[currentServerIndex.value]
})

function setSettings() {
  console.log(dirInput.value)
  if (dirInput.value) {
    saveKV('gameDir', dirInput.value)
  }
  if (serverSelected.value.id) {
    saveKV('gameServer', serverSelected.value.id)
  }
}

const server = [{
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
  }
]
const serverSelected = ref(server[0])
</script>

<template>
  <UModal>
    <UCard>
      <template #header>
        <div class="flex flex-row items-center justify-between">
          <div class="text-xl font-bold">重要设置</div>
        </div>
      </template>
      <div class="space-y-4">
        <div class="w-full">
          <div class="text-xl text-gray-200">游戏目录</div>
          <input type="tel" v-model="dirInput" :placeholder="currentDir ?? '未设置目录'"
                 class="w-full input">
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

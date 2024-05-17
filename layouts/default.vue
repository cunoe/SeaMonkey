<template>
  <div class="flex flex-col font-spacegrotesk h-screen" :style="{backgroundImage: 'url('+currentImage+')', backgroundSize: 'cover', backgroundAttachment: 'fixed'}">
    <header class="w-full z-10" >
      <AppNavbar />
    </header>
    <main class="flex-1 flex flex-col justify-start m-4">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppNavbar from '~/components/main/AppNavbar.vue';
import {useIntervalFn} from "@vueuse/core";
import {getKV} from "~/composables/store/kv";

const currentImage = ref<string>('');

useIntervalFn(async () => {
  getKV('backgroundImage').then((res) => {
    if (res === '') {return}
    if (res === currentImage.value) {return}
    if (res === 'false') {
      currentImage.value = '';
      return;
    }
    currentImage.value = res;
  }).catch((err) => {
    console.error(err);
  })
}, 1000)

</script>
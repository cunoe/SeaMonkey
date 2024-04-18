<template>
  <div class="flex flex-col font-spacegrotesk h-screen">
    <header class="w-full bg-[#F1F2F4] dark:bg-slate-950 z-10">
      <AppNavbar />
    </header>
    <main class="flex-1 flex flex-col justify-start m-4">
<!--      <div class="p-2"></div>-->
      <slot />
<!--      <div class="p-2"></div>-->
    </main>
<!--    <footer class="w-full">-->
<!--      <AppFooter />-->
<!--    </footer>-->
  </div>
</template>

<script setup lang="ts">
import AppNavbar from '~/components/main/AppNavbar.vue';
import AppFooter from '~/components/main/AppFooter.vue';
</script>
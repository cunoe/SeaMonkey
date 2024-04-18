<!-- Navbar.vue -->
<script>
import { ref, defineComponent } from 'vue';
const year = ref(new Date().getFullYear());

export default defineComponent({
  setup() {
    return {
      year
    };
  }
});
</script>

<template>
  <footer>
    <div class="flex flex-col justify-center items-center space-y-1 bg-base-300 h-40 mx-auto">
      <div class="container mx-auto">
        <div class="space-x-2 text-gray-600">
          <a href="https://icp.gov.moe/?keyword=20232394" rel="noreferrer" target="_blank">
            萌ICP备20232394号
          </a>
        </div>
        <div class="p-1"></div>
        <div>
          <span class="text-gray-400">Copyright © 2017 - {{year}} - By Cunoe</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style>
/* 样式 */
</style>

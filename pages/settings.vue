<script setup lang="ts">
import { open } from '@tauri-apps/api/dialog';
import { appDir } from '@tauri-apps/api/path';
// Open a selection dialog for directories
const selected = await open({
  directory: true,
  multiple: true,
  defaultPath: await appDir(),
});
if (Array.isArray(selected)) {
  // user selected multiple directories
} else if (selected === null) {
  // user cancelled the selection
} else {
  // user selected a single directory
}
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text text-xl">游戏目录</span>
        <span class="label-text-alt">务必设置</span>
      </div>
      <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
      <div class="label">
        <span class="label-text-alt">Bottom Left label</span>
        <span class="label-text-alt">Bottom Right label</span>
      </div>
    </label>
  </div>
</template>

<style scoped>

</style>
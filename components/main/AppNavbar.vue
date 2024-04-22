<template>
  <div>
    <div class="bg-base-300 flex text-center">
      <div class="container mx-auto columns-3">
        <!-- 左侧链接部分 -->
        <div>
          <nuxt-link to="/" class="btn btn-ghost text-xl text-gray-400 hover:text-white">首页</nuxt-link>
          <nuxt-link to="/settings" class="btn btn-ghost text-xl text-gray-400 hover:text-white">设置</nuxt-link>
          <nuxt-link to="/about" class="btn btn-ghost text-xl text-gray-400 hover:text-white">关于</nuxt-link>
        </div>
        <div><nuxt-link to="/" class="btn btn-ghost text-3xl text-gray-400 hover:text-white">海猴雷达</nuxt-link></div>
        <!-- 右侧头像部分 -->
        <div>
          <nuxt-link to="https://github.com/cunoe/SeaMonkey" target="_blank" class="btn btn-ghost text-xl text-gray-400 hover:text-white"><img src="/favicon.ico" alt="Avatar" class="w-10 h-10 rounded-full"></nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
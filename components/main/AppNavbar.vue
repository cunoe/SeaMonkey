<template>
  <div>
    <div class="bg-base-300">
      <div class="container mx-auto p-2 flex justify-between items-center">
        <!-- 左侧链接部分 -->
        <div>
          <nuxt-link to="/" class="btn btn-ghost text-xl text-gray-400 hover:text-white">首页</nuxt-link>
          <nuxt-link to="/settings" class="btn btn-ghost text-xl text-gray-400 hover:text-white">设置</nuxt-link>
          <nuxt-link to="/about" class="btn btn-ghost text-xl text-gray-400 hover:text-white">关于</nuxt-link>
        </div>
        <div><nuxt-link to="/" class="btn btn-ghost text-3xl text-gray-400 hover:text-white">海猴雷达</nuxt-link></div>
        <!-- 右侧头像部分 -->
        <div>
          <nuxt-link to="https://github.com/cunoe" target="_blank" class="btn btn-ghost text-xl text-gray-400 hover:text-white"><img src="/favicon.ico" alt="Avatar" class="w-10 h-10 rounded-full"></nuxt-link>
        </div>
      </div>
    </div>


<!--    <div class="bg-auto h-64 relative bg-center" style="background-image: url(https://s3.cunoe.com/files/background/bg-3.jpg)">-->
<!--      <div class="absolute bottom-0 left-0 right-0 bg-opacity-50 text-white py-4 px-6">-->
<!--        <div class="container mx-auto">-->
<!--          <nuxt-link to="/" class="text-white text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">-->
<!--            <strong>CUNOE&DIARY</strong>-->
<!--          </nuxt-link>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div class="bg-base-300">-->
<!--      <div class="container mx-auto text-3xl p-2">-->
<!--        &lt;!&ndash; 添加 flex 和 justify-end 类来实现靠右对齐 &ndash;&gt;-->
<!--        <div class="flex justify-end flex-1 space-x-4 text-gray-400">-->
<!--          <nuxt-link to="mailto:admin@cunoe.com" class=""><Icon name="ic:baseline-mail-outline" class="hover:text-white"/></nuxt-link>-->
<!--          <nuxt-link to="https://github.com/cunoe" target="_blank"><Icon name="uil:github" class="hover:text-white" /></nuxt-link>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>
<script setup lang="ts">
</script>
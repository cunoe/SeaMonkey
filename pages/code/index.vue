<script setup>
// const page = Number(path.replace('blog/', ''))
// const limit = 10

// const articles = await queryContent('blogs').sort({date: -1}).skip((page-1)*limit).limit(limit).find()
const articles = await queryContent('code').where({ published: {$exists: false} }).sort({date:-1}).find()
const convertDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  document.title = 'CUNOE&DIARY | LeetCode'
})
</script>

<template>
  <div>
    <swiper class="max-w-screen-md">
      <ul v-auto-animate class="container flex flex-row text-2xl justify-center space-x-0.5">
        <li
            v-for="item in items"
            :key="item"
            @click="moveItem(item)"
        >
          {{ item }}
        </li>
      </ul>
    </swiper>
    <div class="p-2" />
    <div class="container mx-auto max-w-screen-md">
      <div class="grid grid-cols-1 gap-4">
        <div v-for="(article, index) in articles" :key="index">
          <nuxt-link :to="`/code/${article.urlname}`">
            <div class="p-4 rounded-badge">
              <h2 class="text-2xl font-bold mb-2">{{ article.title }}</h2>
              <p class="my-4 text-gray-500">
                by CUNOE, {{ convertDate(article.date) }}
              </p>
              <div class="prose prose-stone max-w-none">
                {{ article.description }}
              </div>
            </div>
          </nuxt-link>
          <!-- 分割线 -->
          <hr class="my-4 border-t border-gray-600 opacity-50">
        </div>
      </div>
    </div>
  </div>
</template>


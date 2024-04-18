<script setup>
const { path } = useRoute()
const { data: doc } = await useAsyncData('blog-data', () => queryContent(path).findOne())

const convertDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div>
    <div class="container max-w-3xl mx-auto">
      <ContentDoc v-slot="{ doc }">
        <h2 class="my-4 text-4xl font-semibold">{{ doc.title }}</h2>
        <p class="my-4 text-gray-500">
          by CUNOE, {{ convertDate(doc.date) }}
        </p>
        <div>
<!--          <ContentRenderer class="prose prose-base dark:prose-light max-w-5xl mx-auto prose-zinc dark:prose-invert prose-img:rounded-lg" :value="doc"/>-->
          <div
              class="prose prose-pre:max-w-xs sm:prose-pre:max-w-full prose-sm sm:prose-base md:prose-lg prose-h3:no-underline no-underline
        prose-h2:no-underline max-w-5xl mx-auto prose-zinc dark:prose-invert prose-img:rounded-lg"
          >
            <ContentRenderer v-if="doc" :value="doc">
              <template #empty>
                <p>No content found.</p>
              </template>
            </ContentRenderer>
          </div>
        </div>
      </ContentDoc>
    </div>
  </div>
</template>
<script setup>
const about = await queryContent('about').findOne()

const convertDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <section>
    <div>
      <div class="container max-w-3xl mx-auto">
        <h1 class="text-4xl font-bold mb-4">{{ about.title }}</h1>
        <p class="my-4 text-gray-500">
          by CUNOE, {{ convertDate(about.date) }}
        </p>
        <div class="prose prose-pre:max-w-xs sm:prose-pre:max-w-full prose-sm sm:prose-base md:prose-lg
        prose-h1:no-underline max-w-5xl mx-auto prose-zinc dark:prose-invert prose-img:rounded-lg">
          <ContentRenderer v-if="about" :value="about" class="prose">
            <template #empty>
              <p>No content found.</p>
            </template>
          </ContentRenderer>
        </div>
      </div>
    </div>
  </section>
</template>

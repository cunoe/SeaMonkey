<script setup lang="ts">

</script>

<template>
  <div class="py-5">
    <div class="container max-w-xl mx-auto">
      <NuxtLayout name="404" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
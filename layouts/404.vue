<script lang="ts" setup></script>

<template>
  <div>
    <div>
      <div class="text-4xl m-4">唔……这里是哪里呢？</div>
      <span class="text-lg m-4">或许……这是另一个奇妙的世界</span>
    </div>
    <slot />
  </div>
</template>

<style scoped></style>

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
.button {
  padding: 4px 6px;
  margin: 10px 0px;
  background: black;
  color: white;
}
</style>
<template>
  <div class="h-screen">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import * as cowsay from 'cowsay'

console.log(cowsay.say({ text: "Kontol bapak kau pecah 🐄" }))
</script>

<style scoped>
html, body {
  overflow: auto;
}

</style>
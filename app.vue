<template>
  <div class="h-screen">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
    <UModals />
  </div>
</template>
<script setup lang="ts">
import * as cowsay from 'cowsay'

console.log(cowsay.say({ text: "Kontol bapak kau pecah 🐄", r: true }))
</script>

<style scoped>
html, body {
  overflow: auto;
}
</style>
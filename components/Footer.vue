<script setup lang="ts">
const links = [{
  label: 'Nuxt UI',
  to: 'https://ui.nuxt.com/'
}, {
  label: 'Nuxt Docs',
  to: 'https://nuxt.com'
}, {
  label: 'Nuxt Studio',
  to: 'https://nuxt.studio'
}]
</script>

<template>
  <UFooter :links="links">
    <template #left>
      Copyright © {{ new Date().getFullYear() }}
    </template>
  </UFooter>
</template>
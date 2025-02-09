<template>
  <UButton 
    icon="i-heroicons-pencil-square" 
    size="lg" 
    color="primary" 
    class="fixed bottom-6 right-6 z-50 shadow-lg"
    @click="isSidebarOpen = !isSidebarOpen"
  />
  <USlideover v-model="isSidebarOpen">
    <div class="p-3 flex flex-col gap-4">
      <h3>Color Menu</h3>
      <UDivider/>
      <UDashboardSidebarLinks :links="colorLinks" />
      <UDivider />
      <UDashboardSidebarLinks :links="bgLinks" />
    </div>
  </USlideover>
  <slot/>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAppConfig } from '#imports';

const route = useRoute();
const appConfig = useAppConfig();
const isSidebarOpen = ref(false);

const colorLinks = ref([
  { label: 'Colors', draggable: true, children: ['emerald', 'green', 'lime', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'fuchsia', 'red', 'rose', 'pink'].map(color => ({
    label: color,
    chip: color,
    click: () => appConfig.ui.primary = color
  })) }
]);

const bgLinks = ref([
  { label: 'Colors Background', draggable: true, children: ['slate', 'cool', 'zinc', 'neutral', 'stone'].map(color => ({
    label: color,
    click: () => appConfig.ui.gray = color
  })) }
]);
</script>

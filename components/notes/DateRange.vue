<script setup lang="ts">
import { sub, format, isSameDay, type Duration } from 'date-fns'

const selected = ref({ start: (new Date()), end: new Date() })

</script>

<template>
  <UPopover :popper="{ strategy: 'fixed' }">
    <UButton icon="i-heroicons-calendar-days-20-solid">
      {{ format(selected.start, 'd MMM, yyy') }} - {{ format(selected.end, 'd MMM, yyy') }}
    </UButton>

    <template #panel="{ close }">
      <div class="flex items-center sm:divide-x divide-gray-200 dark:divide-gray-800">
        <DatePicker v-model="selected" @close="close" />
      </div>
    </template>
  </UPopover>
</template>
<script setup lang="ts">
import type { Form } from '#ui/types'

interface Schema {
  title?: string
  email?: string
  password?: string
  isPriority?: boolean
  deadline?: string
}

const form = ref<Form<Schema>>()
const createdAt = new Date().toLocaleString()
const task = ref({
  title: '',
  isPriority: false,
  deadline: ''
})

const countries = ['United States', 'Canada', 'Mexico']

const country = ref(countries[0])
</script>

<template>
  <UDashboardPage>
    <div class="p-4">
      <UPopover overlay :popper="{ offsetDistance: 7, placement: 'auto-start' }">
        <UButton color="white" label="Open" trailing-icon="i-heroicons-chevron-down-20-solid" />
        <template #panel>
          <div class="p-4">
            <UForm :state="task" ref="form" class="space-y-4">
              <UFormGroup label="Judul">
                <UInput v-model="task.title" placeholder="Masukkan judul"/>
              </UFormGroup>
              <UFormGroup label="Tanggal Dibuat">
                <p class="text-gray-500">{{ createdAt }}</p>
              </UFormGroup>
              <UFormGroup label="Tipe">
                <USelect v-model="country" :options="countries" />
              </UFormGroup>
              <UFormGroup label="Priority">
                <UCheckbox v-model="task.isPriority"/>
              </UFormGroup>
              <UDivider/>
              <UFormGroup>
                <UButton label="Saved"/>
              </UFormGroup>
            </UForm>
          </div>
        </template>
      </UPopover>
    </div>
  </UDashboardPage>
</template>

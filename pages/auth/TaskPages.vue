<script setup lang="ts">
import { sub, format, isSameDay, type Duration } from 'date-fns'
import type { Form, FormSubmitEvent } from '#ui/types'
import DateRange from '../../components/task/DateRange.vue'

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

const selected = ref({ start: sub(new Date(), { days: 14 }), end: new Date() })

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
              <UFormGroup label="Tanggal Deadline">
                <DateRange/>
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

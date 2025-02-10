<script setup lang="ts">
import { sub, format, isSameDay, type Duration } from 'date-fns'
import type { Form, FormSubmitEvent } from '#ui/types'
import { useMouse, useWindowScroll } from '@vueuse/core'

interface Schema {
  title?: string
  email?: string
  password?: string
  isPriority?: boolean
  deadline?: string
}

const form = ref<Form<Schema>>()
const { x, y } = useMouse()
const { y: windowY } = useWindowScroll()
const isOpen = ref(false)
const virtualElement = ref({ getBoundingClientRect: () => ({}) })
const createdAt = new Date().toLocaleString()
const task = ref({
  title: '',
  isPriority: false,
  deadline: ''
})

const selected = ref({ start: sub(new Date(), { days: 14 }), end: new Date() })

function onContextMenu() {
  const top = unref(y) - unref(windowY)
  const left = unref(x)

  virtualElement.value.getBoundingClientRect = () => ({
    width: 0,
    height: 0,
    top,
    left
  })

  isOpen.value = true
}
</script>

<template>
  <UDashboardPage>
    <div class="w-full" @contextmenu.prevent="onContextMenu">
      <Placeholder class="h-full select-none w-full flex items-center justify-center">
        Right click To Add Task
      </Placeholder>
      
      <UContextMenu v-model="isOpen" :virtual-element="virtualElement" :popper="{ arrow: true, placement: 'right' }">
        <div class="p-4">
          <UForm :state="task" ref="form" class="space-y-4">
            <UFormGroup label="Judul">
              <UInput v-model="task.title" placeholder="Masukkan judul"/>
            </UFormGroup>
            <UFormGroup label="Tanggal Dibuat">
              <p class="text-gray-500">{{ createdAt }}</p>
            </UFormGroup>
            <UFormGroup label="Tanggal Deadline">
              <UPopover :popper="{ placement: 'bottom-start' }">
                <UButton icon="i-heroicons-calendar-days-20-solid">
                  {{ format(selected.start, 'd MMM, yyy') }} - {{ format(selected.end, 'd MMM, yyy') }}
                </UButton>
                <template #panel="{ close }">
                  <div class="flex items-center sm:divide-x divide-gray-200 dark:divide-gray-800">
                    <DatePicker v-model="selected" @close="close" />
                  </div>
                </template>
              </UPopover>
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
      </UContextMenu>
    </div>
  </UDashboardPage>
</template>

<script setup lang="ts">
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
  <div class="w-full" @contextmenu.prevent="onContextMenu">
    <Placeholder class="h-screen select-none w-full flex items-center justify-center">
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
            <UInput v-model="task.deadline" type="datetime-local" />
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
</template>

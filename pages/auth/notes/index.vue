<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
import DateRange from '~/components/notes/DateRange.vue'

const createdAt = new Date().toLocaleString()
const fileRef = ref<HTMLInputElement>()
const isDeleteAccountModalOpen = ref(false)

const state = reactive({
  title: '',
  username: '',
  date: '',
  bio: '',
  password_current: '',
  password_new: ''
})

const toast = useToast()

function validate(state: any): FormError[] {
  const errors = []
  if (!state.name) errors.push({ path: 'name', message: 'Please enter your name.' })
  if (!state.email) errors.push({ path: 'email', message: 'Please enter your email.' })
  if ((state.password_current && !state.password_new) || (!state.password_current && state.password_new)) errors.push({ path: 'password', message: 'Please enter a valid password.' })
  return errors
}

function onFileClick() {
  fileRef.value?.click()
}

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data)

  toast.add({ title: 'Profile updated', icon: 'i-heroicons-check-circle' })
}
</script>

<template>
  <UDashboardPanelContent class="pb-24">
    <UForm
      :state="state"
      :validate="validate"
      :validate-on="['submit']"
      @submit="onSubmit"
    >
      <UDashboardSection
        title="Notes Daily"
        description="This information will be displayed publicly so be careful what you share."
      >
        <template #links>
          <UButton type="submit" label="Save changes"/>
          <UButton color="red" label="Delete" @click="isDeleteAccountModalOpen = true"/>
        </template>
        <UFormGroup
          name="title"
          label="Title"
          description="Will appear on receipts, invoices, and other communication."
          required
          class="grid grid-cols-2 gap-2 items-center"
          :ui="{ container: '' }"
        >
          <UInput
            v-model="state.title"
            autocomplete="off"
            size="md"
          />
        </UFormGroup>
        <UFormGroup
          name="username"
          label="Username"
          description="Your unique username for logging in and your profile URL."
          required
          class="grid grid-cols-2 gap-2"
          :ui="{ container: '' }"
        >
          <UInput
            v-model="state.username"
            type="username"
            autocomplete="on"
            icon="i-heroicons-user"
            size="md"
          >
          </UInput>
        </UFormGroup>

        <UFormGroup
          name="daterange"
          label="Date"
          description="choose sec date for range"
          class="grid grid-cols-2 gap-2"
          :ui="{ container: 'flex flex-wrap items-center gap-3', help: 'mt-0' }"
        >
          <DateRange/>
          <p>created at {{ createdAt }}</p>
        </UFormGroup>

        <UFormGroup
          name="bio"
          label="Bio"
          description="Brief description for your profile. URLs are hyperlinked."
          class="grid grid-cols-2 gap-2"
          :ui="{ container: '' }"
        >
          <UTextarea
            v-model="state.bio"
            :rows="5"
            autoresize
            size="md"
          />
        </UFormGroup>
      </UDashboardSection>
    </UForm>
    <SettingsDeleteAccountModal v-model="isDeleteAccountModalOpen" />
  </UDashboardPanelContent>
</template>

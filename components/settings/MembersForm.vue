<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const emit = defineEmits(['close'])

const state = reactive({
  username: undefined,
  email: undefined,
  password: undefined
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.username) errors.push({ path: 'username', message: 'Please enter an username.' })
  if (!state.email) errors.push({ path: 'email', message: 'Please enter an email.' })
  if (!state.password) errors.push({ path: 'password', message: 'Please enter a password.' })
  return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
  console.log(event.data)

  emit('close')
}
</script>

<template>
  <UForm
    :validate="validate"
    :validate-on="['submit']"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >

  <UFormGroup
      label="Username"
      name="username"
    >
      <UInput
        v-model="state.username"
        type="username"
        placeholder="Enter your username"
      />
    </UFormGroup>

    <UFormGroup
      label="Email"
      name="email"
    >
      <UInput
        v-model="state.email"
        type="email"
        placeholder="john.doe@example.com"
        autofocus
      />
    </UFormGroup>

    <UFormGroup
      label="Password"
      name="password"
    >
      <UInput
        v-model="state.password"
        type="password"
        placeholder="Enter your password"
      />
    </UFormGroup>

    <div class="flex justify-end gap-3">
      <UButton
        label="Cancel"
        color="gray"
        variant="ghost"
        @click="emit('close')"
      />
      <UButton
        type="submit"
        label="Save"
      />
    </div>
  </UForm>
</template>

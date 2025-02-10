<script setup lang="ts">
import type { FormError } from '#ui/types'
definePageMeta({ layout: false })
import axios from 'axios';

const fields = [{
  name: 'email',
  type: 'text',
  label: 'Email',
  placeholder: 'Enter your email'
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password'
}]

const validate = (state: any) => {
  const errors: FormError[] = []
  if (!state.email) errors.push({ path: 'email', message: 'Email is required' })
  if (!state.password) errors.push({ path: 'password', message: 'Password is required' })
  return errors
}

async function onSubmit(data: any) {
  try {
    const response = await axios.post('', data)
    console.log('login success:', response.data)
  } catch (error) {
    console.error('error', error)
  }
}
</script>

<template>
  <div class="flex justify-center h-screen items-center">
    <UCard class="max-w-sm w-full">
    <UAuthForm
      :fields="fields"
      :validate="validate"
      title="Welcome back!"
      align="top"
      icon="i-heroicons-lock-closed"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      @submit="onSubmit"
    >
    </UAuthForm>
  </UCard>
  </div>
</template>


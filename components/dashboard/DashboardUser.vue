<template>
  <UDashboardCard title="Profile" icon="i-material-symbols:person-edit-rounded" description="Edit your profile" class="w-full max-w-md">
    <UDivider />
    <div class="flex items-center space-x-4 mt-4">
      <UAvatar :src="form.avatar" size="lg" />
      <UButton color="gray" @click="uploadAvatar">Change Photo</UButton>
      <input ref="fileInput" type="file" class="hidden" @change="onFileChange" accept="image/*" />
    </div>
    <UForm :state="form" @submit="updateProfile" class="space-y-4 mt-4">
      <template v-for="(field, index) in formFields" :key="index">
        <UFormGroup :name="field.name">
          <UInput v-model="form[field.name as keyof typeof form]" :type="field.type" :placeholder="field.placeholder" :required="field.required" />
        </UFormGroup>
      </template>
      <UButton type="submit" color="primary" :loading="loading">Save Changes</UButton>
    </UForm>
  </UDashboardCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const toast = useToast();
const loading = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const form = ref<{ avatar: string; name: string; email: string; password: string }>({
  avatar: 'https://via.placeholder.com/150',
  name: '',
  email: '',
  password: ''
});

const formFields = ref<
  { name: keyof typeof form.value; type: string; placeholder: string; required: boolean }[]
>([
  {  name: 'name', type: 'text', placeholder: 'Enter your name', required: true },
  {  name: 'email', type: 'email', placeholder: 'Enter your email', required: true },
  {  name: 'password', type: 'password', placeholder: 'Enter new password', required: false }
]);

const uploadAvatar = () => {
  fileInput.value?.click();
};

const onFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      form.value.avatar = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const updateProfile = async () => {
  loading.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.add({ title: 'Profile updated successfully!', color: 'green' });
  } catch (error) {
    toast.add({ title: 'Failed to update profile.', color: 'red' });
  } finally {
    loading.value = false;
  }
};
</script>

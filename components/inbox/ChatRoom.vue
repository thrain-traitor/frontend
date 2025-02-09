<template>
  <div class="h-full flex flex-col">
    <!-- Messages Container -->
    <UCard class="overflow-scroll space-y-4 p-4">
      <template v-for="(message, index) in messages" :key="index">
        <div class="flex gap-3" :class="{'flex-row-reverse': message.sender === 'me'}">
          <div>
            <UCard 
              class="max-w-[70%]"
              :class="message.sender === 'me' 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-800'"
            >
              <p>{{ message.text }}</p>
              <UText
                size="xs"
                class="mt-1 block text-right"
                :class="message.sender === 'me' ? 'text-primary-100' : 'text-gray-500'"
              >
                {{ message.time }}
              </UText>
            </UCard>
          </div>
        </div>
      </template>
    </UCard>

    <!-- Message Input -->
    <UCard class="space-y-4">
      <form @submit.prevent="sendMessage">
        <UInput
          v-model="newMessage"
          placeholder="Type a message..."
          size="xl"
          autocomplete="off"
          :ui="{
            rounded: 'rounded-full',
            icon: { trailing: { pointer: 'cursor-pointer' } }
          }"
        >
          <template #trailing>
            <UButton
              type="submit"
              variant="solid"
              icon="i-heroicons-paper-airplane"
              :ui="{ rounded: 'rounded-full' }"
            />
          </template>
        </UInput>
      </form>
    </UCard>
  </div>
</template>

<script setup lang="ts">
interface Message {
  text: string;
  time: string;
  sender: 'me' | 'them';
}

const props = defineProps({
  messages: {
    type: Array as () => Message[],
    required: true
  },
  avatar: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['send-message'])

const newMessage = ref('')

function sendMessage() {
  if (newMessage.value.trim()) {
    emit('send-message', newMessage.value)
    newMessage.value = ''
  }
}
</script>
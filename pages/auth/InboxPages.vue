<template>
  <div>
    <UPage>
      <UPageCard>
        <template #header>
          <div class="flex flex-col w-full">
            <!-- Tabs Navigation -->
            <UTabs 
              v-model="selectedTab"
              :items="items"
              :ui="{
                wrapper: 'w-full',
                list: {
                  width: 'w-full',
                  base: 'gap-0',
                  tab: {
                    base: 'relative rounded-none',
                    active: 'border-b-2 border-primary-500 dark:border-primary-400',
                    inactive: 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }
                }
              }"
            />
            
            <div class="flex gap-4 pt-4">
              <UAvatar size="xl" :src="activeTab.avatar" />
              <div class="h-full items-center">
                <p class="text-lg font-semibold">{{ activeTab.title }}</p>
                <p class="text-sm text-gray-500">{{ activeTab.subtitle }}</p>
              </div>
            </div>
          </div>
        </template>

        <div class="h-full flex flex-col">
          <!-- Messages Container (Scrollable) -->
          <UCard class="overflow-auto space-y-4 p-4 flex-1 max-h-[400px]">
            <template v-for="(message, index) in messages" :key="index">
              <div class="flex gap-3" :class="{'flex-row-reverse': message.sender === 'me'}">
                <div>
                  <UCard 
                    class=" max-w-96"
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
      </UPageCard>
    </UPage>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Message {
  text: string;
  time: string;
  sender: 'me' | 'them';
}

const selectedTab = ref(0)
const messages = ref<Message[]>([
  {
    text: 'Hello! How can I help you today?',
    time: '10:00 AM',
    sender: 'them'
  },
  {
    text: 'I need support with my recent order',
    time: '10:02 AM',
    sender: 'me'
  }
])

const items = [
  {
    label: 'General',
    icon: 'i-heroicons-chat-bubble-left-ellipsis',
    title: 'General Support',
    subtitle: "We're here to help",
    avatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
    roomId: 'general-1'
  },
  {
    label: 'Sales',
    icon: 'i-heroicons-shopping-cart',
    title: 'Sales Department',
    subtitle: 'Pre-sales inquiries',
    avatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
    roomId: 'sales-1'
  },
  {
    label: 'Technical',
    icon: 'i-heroicons-wrench-screwdriver',
    title: 'Technical Support',
    subtitle: 'Technical assistance',
    avatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
    roomId: 'tech-1'
  }
]

const activeTab = computed(() => items[selectedTab.value])

const newMessage = ref('')

function sendMessage() {
  if (newMessage.value.trim()) {
    messages.value.push({
      text: newMessage.value,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'me'
    })
    newMessage.value = ''
  }
}
</script>

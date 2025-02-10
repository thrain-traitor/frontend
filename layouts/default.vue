<template>
  <div>
    <UDashboardLayout>
      <UDashboardPanel :resizable="{ min: 270, max: 300 }" collapsible>
        <UDashboardNavbar>
          <template #left>
          </template>
        </UDashboardNavbar>
        <UDashboardSidebar>
          <template #header>
            <UDashboardSearchButton/>
          </template>
          <UDashboardSidebarLinks :links="links" />
          <div class="flex-1" />
          <UDashboardSidebarLinks :links="footerLinks" />
          <UDivider class="sticky bottom-0" />
          <template #footer>
            <UserDropdown />
          </template>
        </UDashboardSidebar>
      </UDashboardPanel>
      <UDashboardPanel grow class="flex flex-col min-h-screen">
        <UDashboardNavbar>  
          <template #left>
            <div class="pt-1">
              {{ pageTitle }}
            </div>
          </template>
          <template #right>
            <UButton icon="i-heroicons-bell" size="sm" color="gray" variant="ghost" @click="openNotifications = !openNotifications"/>
            <UButton icon="i-heroicons-swatch" size="sm" color="gray" variant="ghost" @click="isSidebarOpen = !isSidebarOpen"/>
          </template>
        </UDashboardNavbar>    
        <div class="flex overflow-auto">
          <slot/>
        </div>
      </UDashboardPanel>
    </UDashboardLayout>
    <USlideover v-model="openNotifications">
      <h3 class="m-5">Notification</h3>
      <UDivider/>
      <EmailNotifications/>
    </USlideover>
    <USlideover v-model="isSidebarOpen">
      <h3 class="m-5">Color Menu</h3>
        <UDivider/>
        <div class="p-3 flex flex-col gap-4">
        <UDashboardSidebarLinks :links="colorLinks" />
        <UDivider />
        <UDashboardSidebarLinks :links="bgLinks" />
      </div>
    </USlideover>
    <ClientOnly>
      <LazyUDashboardSearch :groups="groups" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAppConfig } from '#imports';

const route = useRoute();
const appConfig = useAppConfig();
const isSidebarOpen = ref(false);
const openNotifications = ref(false);

const pageTitle = computed(() => {
  const path = route.path.replace(/^\//, '').split('/');

  return path
    .map(segment => segment.replace(/-/g, ' '))
    .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' - ') || 'Dashboard';
});


const footerLinks = [{
  label: 'Invite people',
  icon: 'i-heroicons-plus',
  to: '/settings/members'
}, {
  label: 'Help & Support',
  icon: 'i-heroicons-question-mark-circle',
}]

const links = [{
  id: 'home',
  label: 'Home',
  icon: 'i-heroicons-home',
  to: '/auth/DashboardPages',
  tooltip: {
    text: 'Home',
    shortcuts: ['G', 'H']
  }}, {
  id: 'inbox',
  label: 'Inbox',
  icon: 'i-heroicons-inbox',
  to: '/auth/InboxPages',
  badge: '4',
  tooltip: {
    text: 'Inbox',
    shortcuts: ['G', 'I']
  }},{
  id: 'task',
  label: 'Task',
  icon: 'i-ix:tasks-all',
  to: '/auth/TaskPages',
  tooltip: {
    text: 'Task',
    shortcuts: ['G', 'T']
  }},{
  id: 'project',
  label: 'Project',
  to: '/auth/ProjectGeneral',
  icon: 'i-ix:project-scenarios',
  tooltip: {
    text: 'Project',
    shortcuts: ['P', 'T']
  }},{
  id: 'file',
  label: 'File Manager',
  to: '/auth/File Manager',
  icon: 'i-material-symbols:folder-shared',
  tooltip: {
    text: 'File Manager',
    shortcuts: ['P', 'T']
  }},{
  id: 'settings',
  label: 'Settings',
  icon: 'i-heroicons-cog-8-tooth',
  collapsible: true,
  children: [{
    label: 'General',
    to: '/settings',
    exact: true,
  }, {
    label: 'Members',
    to: '/settings/members'
  }, {
    label: 'Notifications',
    to: '/settings/notifications'
  }],
}];

const groups = [{
  key: 'links',
  label: 'Go to',
  commands: links.map(link => ({ ...link, shortcuts: link.tooltip?.shortcuts }))
}, {
  key: 'code',
  label: 'Code',
  commands: [{
    id: 'source',
    label: 'View page source',
    icon: 'i-simple-icons-github',
    click: () => {
      window.open(`${route.path === '/' ? '/index' : route.path}.vue`, '_blank')
    }
  }]
}];

const colorLinks = ref([
  { label: 'Colors', draggable: true, children: ['emerald', 'green', 'lime', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'fuchsia', 'red', 'rose', 'pink'].map(color => ({
    label: color,
    chip: color,
    click: () => appConfig.ui.primary = color
  })) }
]);

const bgLinks = ref([
  { label: 'Colors Background', draggable: true, children: ['slate', 'cool', 'zinc', 'neutral', 'stone'].map(color => ({
    label: color,
    click: () => appConfig.ui.gray = color
  })) }
]);
</script>

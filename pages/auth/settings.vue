<script setup lang="ts">
const links = [[{
  label: 'General',
  icon: 'i-heroicons-user-circle',
  to: '/auth/settings',
  exact: true
}, {
  label: 'Members',
  icon: 'i-heroicons-user-group',
  to: '/auth/settings/members'
}, {
  label: 'Notifications',
  icon: 'i-heroicons-bell',
  to: '/auth/settings/notifications'
}]]
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardToolbar class="py-0 px-1.5 overflow-x-auto">
        <UHorizontalNavigation :links="links" />
      </UDashboardToolbar>
      <NuxtPage />
    </UDashboardPanel>
  </UDashboardPage>
</template>
<script setup lang="ts">
const links = [[{
  label: 'General',
  icon: 'i-heroicons-user-circle',
  to: '/auth/notes',
  exact: true
}, {
  label: 'Note List',
  icon: 'i-heroicons-user-group',
  to: '/auth/notes/NotesList'
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

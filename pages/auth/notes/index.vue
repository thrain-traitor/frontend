<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <div class="p-4">
        <UDashboardCard>
          <template #header>
            
          </template>
          <ULandingGrid>
            <ULandingCard class="col-span-6 row-span-2" icon="i-heroicons-swatch" title="Color Palette" description="Choose a primary and a gray color from your Tailwind CSS color palette." />
            <ULandingCard class="col-span-6 row-span-4" icon="i-heroicons-wrench-screwdriver" title="Fully Customizable" description="Change the style of any component in your App Config or with ui prop." />
            <ULandingCard class="col-span-6 row-span-4" icon="i-heroicons-face-smile" title="Icons" description="Choose any of the 100k+ icons from the most popular icon libraries." />
            <ULandingCard class="col-span-6 row-span-2" icon="i-heroicons-computer-desktop" title="Keyboard Shortcuts" description="Nuxt UI comes with a set of Vue composables to easily handle shortcuts." />
          </ULandingGrid>
        </UDashboardCard>
      </div>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<script setup lang="ts">

</script>
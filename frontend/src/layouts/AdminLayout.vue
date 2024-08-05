<script setup lang="ts">
import HeaderAdminUI from '@/components/HeaderAdminUI.vue'
import SidebarUI from '@/components/SidebarUI.vue'
</script>

<template>
  <main class="overflow-y-auto overflow-x-hidden relative min-h-screen">
    <HeaderAdminUI />
    <slot />
    <SidebarUI />
  </main>
</template>

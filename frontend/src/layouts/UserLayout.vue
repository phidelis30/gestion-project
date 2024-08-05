<script setup lang="ts">
import HeaderUserUI from '@/components/HeaderUserUI.vue'
</script>

<template>
  <main class="overflow-y-auto overflow-x-hidden min-h-screen">
    <HeaderUserUI />
    <slot />
  </main>
</template>

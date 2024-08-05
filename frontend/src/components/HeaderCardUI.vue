<script setup lang="ts">
interface Task {
  title?: string
}

defineProps<Task>()
</script>

<template>
  <div class="flex justify-between items-center bg-white rounded-lg p-8 h-fit">
    <h3 class="text-2xl font-bold">{{ title }}</h3>
    <slot />
  </div>
</template>

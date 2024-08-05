<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg shadow-lg max-w-md w-full p-3">
      <header class="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
        <h3 class="text-lg font-semibold">{{ title }}</h3>
        <button @click="close" class="text-gray-500 hover:text-gray-700">
          <IconClose />
        </button>
      </header>
      <div class="mb-4">
        <!-- <slot name="body"></slot> -->
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import IconClose from './icons/IconClose.vue'

defineProps<{
  isOpen: boolean
  title: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const close = () => {
  emit('close')
}
</script>

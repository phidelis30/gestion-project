<template>
  <button
    class="inline-flex items-center justify-center px-4 py-2 border-2 border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none"
    :class="[
      variant === 'primary'
        ? 'bg-primary-600 hover:bg-primary-700 text-white'
        : variant === 'secondary'
          ? 'bg-gray-600 hover:bg-gray-700 text-white'
          : variant === 'success'
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : variant === 'danger'
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : variant === 'warning'
                ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                : 'bg-white hover:bg-gray-100 text-gray-800 border-gray-300',
      size === 'sm' ? 'text-xs px-2 py-1' : size === 'lg' ? 'text-lg px-6 py-3' : '',
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    ]"
    :type="type"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <span v-if="iconLeft" class="mr-2">
      <component :is="iconLeft" />
    </span>

    <slot />

    <span v-if="iconRight" class="ml-2">
      <component :is="iconRight" />
    </span>
  </button>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
import type { Component } from 'vue'

// declare props
interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  iconLeft?: Component
  iconRight?: Component
}

// declare default props
withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  iconLeft: undefined,
  iconRight: undefined
})

defineEmits(['click'])
</script>

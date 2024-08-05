<template>
  <div class="relative">
    <input
      v-bind="$attrs"
      v-model="localValue"
      :type="type"
      :disabled="disabled"
      class="w-full border py-2 focus:outline-none focus:border-primary-600 focus:border-2"
      :class="[
        size === 'sm'
          ? 'text-sm py-1 px-2'
          : size === 'lg'
            ? 'text-lg py-3 px-4'
            : 'text-base py-2 px-3',
        rounded ? 'rounded-full' : 'rounded-md',
        iconLeft ? 'px-8' : 'px-4',
        {
          'border-gray-300': !error,
          'border-red-500 border-2': error
        }
      ]"
    />
    <span v-if="iconLeft" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
      <component :is="iconLeft" />
    </span>
    <span
      v-if="iconRight"
      class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
      @click="clickButtonRight"
    >
      <component :is="iconRight" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, ref, watch } from 'vue'
import type { Component } from 'vue'

interface Props {
  modelValue?: string | number
  error?: boolean
  size?: 'sm' | 'md' | 'lg'
  type?: 'text' | 'email' | 'password'
  disabled?: boolean
  rounded?: boolean
  clickButtonRight?: () => void
  iconLeft?: Component
  iconRight?: Component
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  size: 'md',
  type: 'text',
  error: false,
  disabled: false,
  rounded: false,
  iconLeft: undefined,
  iconRight: undefined
})

const localValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newValue) => {
    localValue.value = newValue
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

watch(localValue, (value) => {
  emit('update:modelValue', value)
})
</script>

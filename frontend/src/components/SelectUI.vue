<template>
  <div class="relative">
    <select
      v-model="localValue"
      :disabled="disabled"
      @change="handleChange"
      :class="[
        'block appearance-none w-full bg-white border rounded-md shadow-sm focus:outline-none pr-10 focus:border-blue-600 focus:border-2',
        size === 'sm'
          ? 'text-sm py-1 px-2'
          : size === 'lg'
            ? 'text-lg py-3 px-4'
            : 'text-base py-2 px-3',
        localValue === undefined ? 'text-gray-400' : '',
        {
          'border-gray-300': !error && !localValue,
          'border-red-500 border-2': error,
          'cursor-not-allowed': disabled
        }
      ]"
    >
      <option :value="undefined" v-if="placeholder" disabled hidden>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        class="text-black"
      >
        {{ option.label }}
      </option>
    </select>
    <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
      <IconChevronDown />
    </span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed } from 'vue'
import IconChevronDown from './icons/IconChevronDown.vue'

interface Option {
  value: string | number
  label: string
}

interface Props {
  modelValue: string | number | undefined
  options: Option[]
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
  placeholder?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string | number | undefined): void }>()
const localValue = ref(props.modelValue)

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  localValue.value = target.value
  emit('update:modelValue', localValue.value)
}

const placeholder = computed(() => props.placeholder || 'Select an option')
</script>

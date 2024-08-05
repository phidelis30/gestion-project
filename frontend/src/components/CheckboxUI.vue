<template>
  <label
    :class="[
      'flex items-center cursor-pointer w-fit',
      size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'
    ]"
  >
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="handleChange"
      class="form-checkbox h-[18px] w-[18px] text-primary-600"
    />
    <span class="ml-2 text-gray-700">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'

interface Props {
  modelValue?: boolean
  disabled?: boolean
  label?: string
  size?: 'sm' | 'md' | 'lg'
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()
const localValue = ref(props.modelValue)

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  localValue.value = target.checked
  emit('update:modelValue', localValue.value)
}
</script>

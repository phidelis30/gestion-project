<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { QuillyEditor } from 'vue-quilly'
import { Delta, Range } from 'quill/core'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import katex from 'katex'
import 'katex/dist/katex.min.css'

// Expose Katex plugin to global window object
window.katex = katex
// Expose Quill to global window object
window.Quill = Quill

const props = defineProps<{
  modelValue: string
  placeholder?: string
  readOnly?: boolean
  theme?: 'bubble' | 'snow'
  onModelValueChange?: (value: string) => void
  onTextChange?: (delta: Delta) => void
  onSelectionChange?: (range: Range | undefined) => void
  onEditorChange?: (eventName: string) => void
}>()

const emit = defineEmits(['update:modelValue'])
const editor = ref<InstanceType<typeof QuillyEditor>>()
const model = ref<string>(props.modelValue)
const editorDelta = ref<Delta>()
const editorRange = ref<Range | undefined>()

let quill: Quill | null = null

const options = ref({
  theme: props.theme ?? 'snow',
  modules: {
    toolbar: [
      [{ font: [] }, { size: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'super' }, { script: 'sub' }],
      [{ header: '1' }, { header: '2' }, 'blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['direction', { align: [] }],
      ['link', 'image', 'video']
      // ['link', 'image', 'video', 'formula'],
      // ['clean']
    ],
    imageResize: {
      modules: ['Resize', 'DisplaySize', 'Toolbar']
    }
  },
  placeholder: props.placeholder ?? 'Insert text here ...',
  readOnly: props.readOnly ?? false
})

onMounted(async () => {
  window.Quill.imports.parchment.Attributor.Style = window.Quill.imports.parchment.StyleAttributor
  // @ts-ignore
  await import('quill-image-resize-module')
  quill = editor.value?.initialize(window.Quill)!
})

const onModelValueChange = (value: string) => {
  emit('update:modelValue', value)
  props.onModelValueChange?.(value)
}

const onTextChange = ({ delta }: { delta: Delta }) => {
  editorDelta.value = delta
  props.onTextChange?.(delta)
}

const onSelectionChange = ({ range }: { range: Range | undefined }) => {
  editorRange.value = range
  props.onSelectionChange?.(range)
}

const onEditorChange = (eventName: string) => {
  props.onEditorChange?.(eventName)
}

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== model.value) {
      model.value = newValue
    }
  }
)
</script>

<template>
  <QuillyEditor
    ref="editor"
    v-model="model"
    :options="options"
    @update:model-value="onModelValueChange"
    @text-change="onTextChange"
    @selection-change="onSelectionChange"
    @editor-change="onEditorChange"
  />
</template>

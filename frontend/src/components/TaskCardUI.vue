<template>
  <div
    class="task-card h-[400px] flex justify-between flex-col text-[#333] p-6 rounded-lg shadow-md bg-white hover:shadow-xl transform transition-all duration-300 ease-in-out relative"
  >
    <RouterLink :to="`/task/${task.id}`" class="flex items-start justify-between mb-4">
      <h3 class="text-lg font-bold">{{ task.name }}</h3>
      <div class="flex items-center space-x-2">
        <div
          v-if="isNew"
          class="text-xs font-semibold rounded-full bg-blue-100 text-blue-800 px-2 py-1"
        >
          Nouvelle
        </div>
        <div class="text-xs font-semibold rounded-full px-2 py-1" :class="statusClass">
          {{ task.status }}
        </div>
      </div>
    </RouterLink>
    <RouterLink :to="`/task/${task.id}`" class="flex-1 overflow-hidden mb-6">
      <p v-html="truncatedDescription" class="text-gray-700"></p>
    </RouterLink>
    <RouterLink :to="`/task/${task.id}`" class="flex items-center mb-6">
      <div
        class="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full text-xl font-bold"
      >
        {{ task.name.charAt(0) }}
      </div>
      <div class="ml-4">
        <div class="font-medium text-base">{{ task.User.firstName }}</div>
        <div class="text-sm text-gray-500">{{ task.User.email }}</div>
      </div>
    </RouterLink>
    <RouterLink
      :to="`/task/${task.id}`"
      class="flex items-center justify-between text-sm text-gray-600"
    >
      <span>Date créé: {{ formattedDueDate }}</span>
    </RouterLink>
    <hr class="my-4" />
    <div class="flex justify-between items-center mt-4" v-if="!isNotAdmin()">
      <ButtonUI size="sm" @click="emitDelete" variant="danger">Supprimer</ButtonUI>
      <ButtonUI size="sm" @click="emitEdit" variant="primary">Modifier</ButtonUI>
    </div>
    <div class="flex justify-end mt-4" v-if="isNotAdmin()">
      <ButtonUI size="sm" variant="primary" @click="emitEditStatus">Edit status</ButtonUI>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue'
import { RouterLink } from 'vue-router'
import ButtonUI from './ButtonUI.vue'
import { useAuthStore } from '@/stores/authStore'

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
}

interface Task {
  id: number
  name: string
  description: string
  status: string
  User: User
  pidPerson: number
  createdAt: Date
  inProgressAt?: Date
  inPendingAt?: Date
  completedAt?: Date
}

const props = defineProps<{ task: Task }>()
const emit = defineEmits(['edit', 'delete', 'editStatus'])

const { isNotAdmin } = useAuthStore()

const formattedDueDate = computed(() => {
  return new Date(props.task.createdAt).toLocaleDateString()
})

const emitEdit = () => {
  emit('edit', props.task)
}

const emitEditStatus = () => {
  emit('editStatus', props.task)
}

const emitDelete = () => {
  emit('delete', props.task.id)
}

const statusClass = computed(() => {
  switch (props.task.status) {
    case 'Completed':
      return 'bg-green-100 text-green-800'
    case 'In Progress':
      return 'bg-blue-100 text-blue-800'
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'Overdue':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
})

const truncatedDescription = computed(() => {
  const description = props.task.description || ''
  return description.length > 100 ? description.substring(0, 100) + '...' : description
})

const isNew = computed(() => {
  const oneDay = 24 * 60 * 60 * 1000
  const taskCreatedAt = new Date(props.task.createdAt)
  const now = new Date()
  return now.getTime() - taskCreatedAt.getTime() <= oneDay
})
</script>

<style scoped>
.task-card:hover {
  transform: translateY(-5px);
}
.task-card .text-gray-700 {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

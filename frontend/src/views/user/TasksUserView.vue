<script setup lang="ts">
import ButtonUI from '@/components/ButtonUI.vue'
import ModalUI from '@/components/ModalUI.vue'
import SelectUI from '@/components/SelectUI.vue'
import TaskCardUI from '@/components/TaskCardUI.vue'
import UserLayout from '@/layouts/UserLayout.vue'
import { useTaskStore } from '@/stores/taskStore'
import { onMounted, ref } from 'vue'

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

interface Option {
  value: string | number
  label: string
}

const { fetchAllTasksUser, loading, updateTaskStatus } = useTaskStore()
const showModal = ref(false)
const tasks = ref<Task[] | null>(null)
const selectedOption = ref<string | number | undefined>(undefined)
const id = ref('')
const options = ref<Option[]>([
  {
    value: 'Pending',
    label: 'En attente'
  },
  {
    value: 'In Progress',
    label: 'En cours'
  },
  {
    value: 'Completed',
    label: 'Terminé'
  }
])

const clearFrom = () => {
  id.value = ''
  selectedOption.value = undefined
}
const handleConfirm = () => {
  showModal.value = false
  clearFrom()
}

const getAllTaskOfUser = async () => {
  const response = await fetchAllTasksUser()
  tasks.value = response
}

const onSubmit = async () => {
  if (selectedOption.value) {
    await updateTaskStatus(parseInt(id.value), selectedOption.value as string)
  }
  await getAllTaskOfUser()
  clearFrom()
  showModal.value = false
}

const onEditTask = (task: any) => {
  id.value = task.id
  showModal.value = true
}

onMounted(async () => {
  await getAllTaskOfUser()
})
</script>

<template>
  <UserLayout>
    <section class="px-20 py-10 bg-gray-300 h-screen">
      <div v-if="loading">Chargement...</div>
      <div v-else-if="!tasks">Cette tâche n'est pas available</div>
      <div class="grid grid-cols-4 gap-4">
        <div v-for="task in tasks" :key="task.id">
          <TaskCardUI @editStatus="onEditTask(task)" :task="task" />
        </div>
      </div>
    </section>
    <ModalUI
      :isOpen="showModal"
      title="Mettre à jour status"
      @close="showModal = false"
      @confirm="handleConfirm"
    >
      <form @submit.prevent="onSubmit" class="flex flex-col gap-y-8">
        <div class="flex flex-col gap-y-3">
          <label for="pidPerson">
            <span>Status</span>
            <SelectUI v-model="selectedOption" :options="options" placeholder="Selecter status" />
          </label>
        </div>
        <div class="flex justify-between items-center">
          <ButtonUI variant="secondary" @click="handleConfirm">Annuler</ButtonUI>
          <ButtonUI type="submit">Mettre à jour</ButtonUI>
        </div>
      </form>
    </ModalUI>
  </UserLayout>
</template>

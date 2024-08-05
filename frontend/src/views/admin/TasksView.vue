<script setup lang="ts">
import ButtonUI from '@/components/ButtonUI.vue'
import HeaderCardUI from '@/components/HeaderCardUI.vue'
import InputUI from '@/components/InputUI.vue'
import ModalUI from '@/components/ModalUI.vue'
import RichTextUI from '@/components/RichTextUI.vue'
import SelectUI from '@/components/SelectUI.vue'
import TaskCardUI from '@/components/TaskCardUI.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useTaskStore } from '@/stores/taskStore'
import { useUserStore } from '@/stores/userStore'
import { onMounted, reactive, ref, watch } from 'vue'

interface AddTask {
  id?: number
  name: string
  description: string
  status: string
  pidPerson: string
}

interface Option {
  value: string | number
  label: string
}

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

const { fetchAllTasks, createTask, updateTask, loading: loadingTask, deleteTask } = useTaskStore()
const { fetchAllUsers, loading: loadingUser } = useUserStore()
const showModal = ref(false)
const form = reactive<AddTask>({
  name: '',
  description: '',
  status: '',
  pidPerson: ''
})
const selectedOption = ref<string | number | undefined>(undefined)
const options = ref<Option[]>([])
const tasks = ref<Task[]>([])
const users = ref<User[]>([])
const isUpdateMode = ref(false)

const handleConfirm = () => {
  showModal.value = false
}

const onSubmit = async () => {
  if (isUpdateMode.value && form.id) {
    await updateTask(form.id, form.name, form.description, form.status, parseInt(form.pidPerson))
  } else {
    await createTask(form.name, form.description, form.status, parseInt(form.pidPerson))
  }
  await getAllTasks()
  showModal.value = false
  resetForm()
}

const onEditTask = (task: any) => {
  form.id = task.id
  form.name = task.name
  form.description = task.description
  form.status = task.status
  form.pidPerson = task.pidPerson.toString()
  selectedOption.value = task.pidPerson
  isUpdateMode.value = true
  showModal.value = true
}

const onDeleteTask = async (id: number) => {
  await deleteTask(id)
  await getAllTasks()
}

const resetForm = () => {
  form.id = undefined
  form.name = ''
  form.description = ''
  form.status = ''
  form.pidPerson = ''
  selectedOption.value = undefined
  isUpdateMode.value = false
}

const onOpenModal = () => {
  resetForm()
  showModal.value = true
}

const onCloseModal = () => {
  resetForm()
  showModal.value = false
}

const getAllTasks = async () => {
  const response = await fetchAllTasks()
  tasks.value = response
}

onMounted(async () => {
  await getAllTasks()
  const response = await fetchAllUsers()
  users.value = response
  // Ensure that `users` is populated before mapping
  options.value = users.value.map((item) => ({
    value: item.id,
    label: `${item.firstName} ${item.lastName}`
  }))
})

watch(selectedOption, (newVal) => {
  form.pidPerson = newVal?.toString() || ''
})
</script>

<template>
  <AdminLayout>
    <section class="pt-8 ml-96 bg-gray-100 p-8 min-h-screen space-y-8">
      <HeaderCardUI title="Lists des tâches">
        <ButtonUI @click="onOpenModal">Ajouter tâche</ButtonUI>
      </HeaderCardUI>
      <div v-if="loadingTask">Chargement...</div>
      <div v-else-if="tasks.length === 0">Pas de tâche available</div>
      <div v-else class="grid grid-cols-3 gap-6 overflow-y-auto h-[70vh]">
        <div v-for="task in tasks" :key="task.id">
          <TaskCardUI :task="task" @edit="onEditTask(task)" @delete="onDeleteTask(task.id)" />
        </div>
      </div>
    </section>
    <!-- Modal component -->
    <ModalUI
      :isOpen="showModal"
      :title="isUpdateMode ? 'Mettre à jour tâche' : 'Ajouter tâche'"
      @close="showModal = false"
      @confirm="handleConfirm"
    >
      <form @submit.prevent="onSubmit" class="flex flex-col gap-y-8">
        <div class="flex flex-col gap-y-3">
          <label for="name">
            <span>Nom du tâche</span>
            <InputUI
              v-model="form.name"
              type="text"
              id="name"
              required
              placeholder="Entrer le nom du tâche"
            />
          </label>
          <label for="description">
            <span>Description</span>
            <RichTextUI v-model="form.description" placeholder="Description de tâche" />
          </label>
          <label for="pidPerson">
            <span>Selecter l'utilisateur</span>
            <SelectUI
              v-model="selectedOption"
              :options="options"
              placeholder="Selecter l'utilisateur"
            />
          </label>
        </div>
        <div class="flex justify-between items-center">
          <ButtonUI variant="secondary" @click="onCloseModal">Annuler</ButtonUI>
          <ButtonUI type="submit">{{ isUpdateMode ? 'Mettre à jour' : 'Ajouter' }}</ButtonUI>
        </div>
      </form>
    </ModalUI>
  </AdminLayout>
</template>

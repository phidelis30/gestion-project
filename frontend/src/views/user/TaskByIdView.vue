<template>
  <UserLayout>
    <section class="p-8 bg-gray-100 min-h-screen flex justify-center items-center">
      <div v-if="loading" class="text-center text-gray-600">Chargement...</div>
      <div v-else-if="error || !task" class="text-center text-red-500">{{ error }}</div>
      <div v-else class="bg-white rounded-xl p-8 shadow-lg max-w-3xl w-full">
        <div class="flex items-center mb-6">
          <div
            class="w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded-full text-2xl font-bold"
          >
            {{ task.name.charAt(0) }}
          </div>
          <h1 class="ml-4 text-3xl font-semibold text-gray-800">{{ task.name }}</h1>
        </div>
        <div class="border-b border-gray-200 pb-6 mb-6">
          <p class="text-gray-600" v-html="task.description"></p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <p class="text-sm text-gray-500">Statut</p>
            <p :class="statusClass" class="mt-1 font-semibold rounded-md px-3 py-1">
              {{ task.status }}
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Tâche par</p>
            <p class="mt-1 font-semibold">{{ task.User.firstName }} {{ task.User.lastName }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Email</p>
            <p class="mt-1 font-semibold">{{ task.User.email }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Date de création</p>
            <p class="mt-1 font-semibold">{{ formattedDate }}</p>
          </div>
        </div>
        <div class="flex justify-end">
          <ButtonUI @click="editTask" class="mr-2" variant="primary">Modifier</ButtonUI>
          <ButtonUI @click="deleteTask(task.id)" v-if(!isNotAdmin()) variant="danger"
            >Supprimer</ButtonUI
          >
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

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore'
import ButtonUI from '@/components/ButtonUI.vue'
import UserLayout from '@/layouts/UserLayout.vue'
import ModalUI from '@/components/ModalUI.vue'
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
const route = useRoute()
const router = useRouter()
const { fetchTaskById, updateTaskStatus } = useTaskStore()
const loading = ref(true)
const error = ref<string | null>(null)
const task = ref<Task | null>(null)
const { isNotAdmin } = useAuthStore()

const showModal = ref(false)
const selectedOption = ref<string | number | undefined>(undefined)
const id = ref('')
const options = ref([
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

const onSubmit = async () => {
  if (selectedOption.value && task.value) {
    await updateTaskStatus(task.value.id, selectedOption.value as string)
    await fetchTask(task.value.id)
  }
  clearFrom()
  showModal.value = false
}

const fetchTask = async (id: number) => {
  loading.value = true
  error.value = null
  try {
    await fetchTaskById(id)
  } catch (err) {
    error.value = 'Erreur lors de la récupération de la tâche.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const taskId = parseInt(route.params.id as string, 10)
  fetchTask(taskId)
})

const formattedDate = computed(() => {
  if (!task.value) return ''
  return new Date(task.value.createdAt).toLocaleDateString()
})

const editTask = () => {
  showModal.value === true
}

const deleteTask = async (id: number) => {
  if (!isNotAdmin()) {
    await deleteTask(id)
    router.push('/admin/tasks')
  }
}

const statusClass = computed(() => {
  switch (task.value?.status) {
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
</script>

<style scoped>
.prose p {
  margin-bottom: 0.5em;
}
</style>

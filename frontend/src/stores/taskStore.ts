import api from '@/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

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

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([])
  const task = ref<Task | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  // fetch all tasks
  const fetchAllTasks = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await api.get('/task/all')
      tasks.value = response.data
      return tasks.value
    } catch (err) {
      error.value = 'Erreur lors de la récupération des tâches.'
      return []
    } finally {
      loading.value = false
    }
  }

  // get task of user
  const fetchAllTasksUser = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await api.get('/task/user')
      return response.data as Task[]
    } catch (err) {
      error.value = 'Erreur lors de la récupération des tâches.'
      return []
    } finally {
      loading.value = false
    }
  }

  // fetch a task by ID
  const fetchTaskById = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.get(`/task/id/${id}`)
      task.value = response.data
      return task.value
    } catch (err) {
      error.value = 'Erreur lors de la récupération de la tâche.'
      return null
    } finally {
      loading.value = false
    }
  }

  // create a task
  // const createTask = async (newTask: Omit<Task, 'id'>) => {
  const createTask = async (
    name: string,
    description: string,
    status: string,
    pidPerson: number
  ) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.post('/task/create', {
        name,
        description,
        status,
        pidPerson
      })
      return response.data
    } catch (err) {
      error.value = 'Erreur lors de la création de la tâche.'
      return error.value
    } finally {
      loading.value = false
    }
  }

  // update a task
  const updateTask = async (
    id: number,
    name: string,
    description: string,
    status: string,
    pidPerson: number
  ) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.put(`/task/update/${id}`, {
        name,
        description,
        status,
        pidPerson
      })
      return response.data
    } catch (err) {
      error.value = 'Erreur lors de la mise à jour de la tâche.'
      return error.value
    } finally {
      loading.value = false
    }
  }
  // update status
  const updateTaskStatus = async (id: number, status: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.put(`/task/update-status/${id}`, {
        status
      })
      return response.data
    } catch (err) {
      error.value = 'Erreur lors de la mise à jour de la tâche.'
      return error.value
    } finally {
      loading.value = false
    }
  }

  // delete task
  const deleteTask = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.delete(`/task/delete/${id}`)
      return response.data
    } catch (err) {
      error.value = 'Erreur lors de la suppression de la tâche.'
      return error.value
    } finally {
      loading.value = false
    }
  }

  return {
    tasks,
    task,
    loading,
    error,
    fetchAllTasks,
    updateTaskStatus,
    fetchAllTasksUser,
    fetchTaskById,
    createTask,
    updateTask,
    deleteTask
  }
})

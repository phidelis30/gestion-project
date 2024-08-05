import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/api'

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const users = ref<User[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  // create user
  const createUser = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string
  ) => {
    loading.value = true
    error.value = null

    try {
      await api.post('/user/create', { firstName, lastName, email, password, role })
    } catch (err) {
      error.value = "Erreur lors de de la création d'utilisateur"
      console.error('Erreur:', err)
    } finally {
      loading.value = false
    }
  }

  // fetch a user by ID
  const fetchUser = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.get(`/user/${id}`)
      user.value = response.data
      return user.value
    } catch (err) {
      error.value = 'Erreur lors de la récupération de l’utilisateur.'
      return null
    } finally {
      loading.value = false
    }
  }

  // update a user
  const updateUser = async (id: number, updatedUser: Partial<User>) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.put(`/user/update/${id}`, updatedUser)
      user.value = response.data
    } catch (err) {
      error.value = 'Erreur lors de la mise à jour de l’utilisateur.'
    } finally {
      loading.value = false
    }
  }

  // fetch all users
  const fetchAllUsers = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await api.get('/user/all')

      users.value = response.data
      return users.value
    } catch (err) {
      error.value = 'Erreur lors de la récupération des utilisateurs.'
      return []
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    users,
    loading,
    error,
    createUser,
    fetchUser,
    updateUser,
    fetchAllUsers
  }
})

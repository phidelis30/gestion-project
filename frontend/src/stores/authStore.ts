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

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<User | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  // Login action
  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.post('/auth/login', { email, password })
      token.value = response.data.token
      if (token.value) {
        localStorage.setItem('token', token.value)
      }
      await fetchUser()
    } catch (err) {
      error.value = 'Login failed. Please check your credentials.'
      console.error('Login failed:', err)
    } finally {
      loading.value = false
    }
  }

  // Fetch current user action
  const fetchUser = async () => {
    if (!token.value) return
    console.log(token.value)

    loading.value = true
    error.value = null

    try {
      const response = await api.get('/user/me')
      user.value = response.data
    } catch (err) {
      error.value = "Erreur lors de requiperation d'utilisateur."
      console.error('Erreur:', err)
    } finally {
      loading.value = false
    }
  }

  // Logout action
  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }
  // Getter to check if the user is authenticated
  const isAuthenticated = () => !!token.value
  // Getter to check if the current user is an simple
  const isNotAdmin = () => user.value?.role === 'simple'

  return {
    user,
    loading,
    error,
    login,
    fetchUser,
    logout,
    isAuthenticated,
    isNotAdmin
  }
})

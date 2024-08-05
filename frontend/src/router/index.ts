import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import LoginView from '@/views/auth/LoginView.vue'
import AdminView from '@/views/admin/AdminView.vue'
import TasksUserView from '@/views/user/TasksUserView.vue'
import UsersView from '@/views/admin/UsersView.vue'
import TasksView from '@/views/admin/TasksView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import TaskByIdView from '@/views/user/TaskByIdView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: TasksUserView
  },
  {
    path: '/task/:id',
    name: 'task-id',
    component: TaskByIdView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: { requiresAdmin: true }
  },
  {
    path: '/admin/users',
    name: 'users',
    component: UsersView,
    meta: { requiresAdmin: true }
  },
  {
    path: '/admin/tasks',
    name: 'tasks',
    component: TasksView,
    meta: { requiresAdmin: true }
  },
  {
    path: '/not-found',
    name: 'access-denied',
    component: NotFoundView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authUserStore = useAuthStore()
  const { isAuthenticated, fetchUser, user, isNotAdmin } = authUserStore

  // If the user is already authenticated and tries to access the login page, redirect them
  if (to.name === 'login' && isAuthenticated()) {
    next(isNotAdmin() ? { name: 'home' } : { name: 'admin' })
    return
  }

  // If the route requires authentication and the user is not authenticated, redirect to the login page
  if (!isAuthenticated() && to.name !== 'login') {
    next({ name: 'login' })
    return
  }

  // If the user is authenticated but the user data is not yet loaded, load it
  if (isAuthenticated() && !user) {
    try {
      await fetchUser()
    } catch (error) {
      console.error('Error fetching user:', error)
      next({ name: 'login' })
      return
    }
  }

  // If the route requires admin privileges and the user is not an admin, redirect to the access denied page
  if (to.meta.requiresAdmin && isNotAdmin()) {
    next({ name: 'access-denied' })
    return
  }

  next()
})

export default router

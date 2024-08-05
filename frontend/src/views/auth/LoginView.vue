<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import ButtonUI from '@/components/ButtonUI.vue'
// import CheckboxUI from '@/components/CheckboxUI.vue'
import ChevronRightIcon from '@/components/icons/ChevronRightIcon.vue'
import IconEyes from '@/components/icons/IconEyes.vue'
import IconEyesClose from '@/components/icons/IconEyesClose.vue'
import InputUI from '@/components/InputUI.vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

interface Login {
  email: string
  password: string
}

const typePassword = ref()
// Define reactive state for email and password
const form = reactive<Login>({
  email: '',
  password: ''
})

// Access the auth store and router
const { login, isAuthenticated, isNotAdmin, fetchUser } = useAuthStore()
const router = useRouter()

// on submit
const handleLogin = async () => {
  try {
    // Attempt to log in using the auth store
    await login(form.email, form.password)
    // If authenticated, redirect to the home page
    if (isAuthenticated()) {
      await fetchUser()
      if (isNotAdmin()) {
        router.push('/')
      } else {
        router.push('/admin')
      }
    } else {
      alert('Login failed')
    }
  } catch (error) {
    console.error('Login error:', error)
    alert('Login failed')
  }
}

const clickButtonRight = () => {
  if (typePassword.value === 'password') {
    typePassword.value = 'text'
  } else {
    typePassword.value = 'password'
  }
}

onMounted(() => {
  typePassword.value = 'password'
})
</script>

<template>
  <main className="flex h-screen items-center justify-center p-5">
    <div
      className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl"
    >
      <div className="w-full space-y-20 overflow-y-auto p-10 md:w-1/2 ">
        <div class="flex flex-col gap-y-2">
          <h1 className="text-center text-3xl font-bold">Connexion</h1>
          <h3 class="text-center">Connecter pour avoir accès</h3>
        </div>
        <form @submit.prevent="handleLogin" class="space-y-16">
          <div class="flex flex-col gap-y-6">
            <label for="email">
              <span>E-mail</span>
              <InputUI
                v-model="form.email"
                type="email"
                id="email"
                required
                placeholder="example@gmail.com"
              />
            </label>
            <label for="password">
              <span>Mot de passe</span>
              <InputUI
                v-model="form.password"
                :type="typePassword"
                required
                placeholder="**********"
                :iconRight="typePassword === 'password' ? IconEyes : IconEyesClose"
                :clickButtonRight="clickButtonRight"
              />
            </label>
            <!-- <CheckboxUI label="Souviez moi" /> -->
          </div>
          <ButtonUI class="w-full" type="submit" :iconRight="ChevronRightIcon">Connexion</ButtonUI>
        </form>
      </div>
      <img
        src="@/assets/images/signup-image.jpg"
        alt=""
        className="hidden w-1/2 object-cover md:block"
      />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { RouterLink, useRouter } from 'vue-router'
import InputUI from './InputUI.vue'
import { useAuthStore } from '@/stores/authStore'
import { ref } from 'vue'
import IconSearch from './icons/IconSearch.vue'
import IconChevronDown from './icons/IconChevronDown.vue'

const { isNotAdmin, logout } = useAuthStore()
const router = useRouter()
const activeDropdown = ref('hidden')
const handleClickLogout = () => {
  logout()
  router.push('/login')
}
const showDropdown = () => {
  if (activeDropdown.value === 'hidden') {
    activeDropdown.value = 'show'
  } else {
    activeDropdown.value = 'hidden'
  }
}
</script>
<template>
  <header class="h-20 shadow-sm content-center px-8 py-4 sticky top-0">
    <div class="flex justify-between items-center">
      <RouterLink to="/" class="text-2xl uppercase font-bold">gestion des projets</RouterLink>
      <InputUI
        :rounded="true"
        size="sm"
        placeholder="Chercher projet..."
        class="w-60"
        :iconLeft="IconSearch"
      />

      <div class="relative">
        <button
          id="dropdownDividerButton"
          data-dropdown-toggle="dropdownDivider"
          class="inline-flex items-center"
          type="button"
          @click="showDropdown"
        >
          <img
            class="rounded-full cursor-pointer w-10 h-10"
            src="@/assets/images/avatar-placeholder.png"
            alt="avatar"
          />
          <IconChevronDown />
        </button>
        <!-- Dropdown menu -->
        <div
          id="dropdownDivider"
          :class="[
            'z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute top-12 right-1',
            activeDropdown === 'hidden' ? 'hidden' : ''
          ]"
        >
          <ul class="py-2 text-sm" aria-labelledby="dropdownDividerButton">
            <li>
              <RouterLink to="/me" class="block px-4 py-2 hover:bg-gray-100">Mon compte</RouterLink>
            </li>
            <li v-if="!isNotAdmin()">
              <RouterLink to="/admin" class="block px-4 py-2 hover:bg-gray-100"
                >Administrateur</RouterLink
              >
            </li>
          </ul>
          <div class="py-2">
            <span
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              @click="handleClickLogout"
              >Déconnexion</span
            >
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

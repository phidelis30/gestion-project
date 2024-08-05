<script lang="ts" setup>
import { RouterLink, useRoute } from 'vue-router'
const route = useRoute()
</script>
<template>
  <section class="max-h-screen h-screen bg-primary-600 max-w-sm w-96 absolute left-0 top-0">
    <div class="space-y-10">
      <h1 class="text-3xl text-center font-bold text-white uppercase p-6">gestion des projets</h1>
      <nav class="flex flex-col">
        <RouterLink
          :class="[
            'px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white text-lg',
            route.path === '/admin' && 'bg-primary-700'
          ]"
          to="/admin"
          >Tableau de board</RouterLink
        >
        <RouterLink
          :class="[
            'px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white text-lg',
            route.path === '/admin/users' && 'bg-primary-700'
          ]"
          to="/admin/users"
          >Utilisateurs</RouterLink
        >
        <RouterLink
          :class="[
            'px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white text-lg',
            route.path === '/admin/tasks' && 'bg-primary-700'
          ]"
          to="/admin/tasks"
          >Tâches</RouterLink
        >
      </nav>
    </div>
  </section>
</template>

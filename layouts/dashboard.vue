<template>
  <div>
    <DashboardNavigationDrawer v-model="drawer" />

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-app-bar-title>Book Finder</v-app-bar-title>
    </v-app-bar>

    <v-main>
        <slot />
    </v-main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(null)
</script>

<script>
export default {
  data: () => ({ drawer: null }),
}
</script>

<template>
  <v-navigation-drawer v-model="drawerOpened">
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Book Finder
          </v-list-item-title>
          <v-list-item-subtitle>
            Let's find your book!
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider />

    <v-list
      nav
      dense
    >
      <v-list-item
        key="dashboard"
        nuxt
        to="/"
        exact
      >
        <v-list-item-content>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        key="book"
        nuxt
        to="/book"
        exact
      >
        <v-list-item-content>
          <v-list-item-title>Book</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template #append>
      <div class="pa-2">
        <v-btn block nuxt to="/logout" color="red lighten-1" class="white--text"
          >Logout</v-btn
        >
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
// Data
const drawerOpened = defineModel({ type: Boolean, default: true })
</script>

<template>
  <v-container class="fill-height" fluid>
    <v-row>
      <v-col cols="auto">
        <v-btn nuxt to="/book/input" color="blue">Tambah</v-btn>
      </v-col>
      <v-col>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint optio cumque libero nostrum distinctio, tenetur voluptatem possimus ea itaque quaerat deleniti a maxime corporis, molestiae, sed cum at harum! Dolore.
      </v-col>
    </v-row>

    <v-row>
        <v-col cols="12" md="12">
            <EntitiesBookDataGridDefault />
        </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: 'dashboard',
    middleware: 'sanctum:auth',
})
</script>

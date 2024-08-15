<template>
  <v-container fluid>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, aut
    architecto repudiandae praesentium beatae animi cum dignissimos magni
    reprehenderit doloremque quia eum velit ducimus assumenda, reiciendis
    laudantium. Provident, a veritatis.
  </v-container>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
  middleware: ['sanctum:auth'],
})
</script>

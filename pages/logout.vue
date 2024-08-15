<template>
    <div>Proses logout...</div>
</template>
  
<script lang="ts" setup>
definePageMeta({
middleware: "sanctum:auth",
})

//   Data
const { logout } = useSanctumAuth()

onMounted(async function() {
await logout()
})
</script>

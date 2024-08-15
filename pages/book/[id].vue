<template>
<v-container fluid>
    <v-row>
        <v-col cols="auto">
            <v-btn nuxt to="/book">Kembali</v-btn>
        </v-col>
        <v-col>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet placeat sint dolore expedita maiores dicta fugit vero quae, quis, aut temporibus ducimus unde corporis sed, aliquam atque molestiae reprehenderit? Deleniti.
        </v-col>
    </v-row>

    <v-row>
        <v-col>
            <EntitiesBookFormDefault :initial-record="record.data" />
        </v-col>
    </v-row>
</v-container>
</template>

<script lang="ts" setup>
definePageMeta({
    middleware: 'sanctum:auth',
    layout: 'dashboard'
})

// Data
const route = useRoute()
const client = useSanctumClient()
const {data: record} = await useAsyncData('get-book-by-id', function(){
    return client('/api/book/' + route.params.id)
}, {
    server: false
})

// Method
</script>

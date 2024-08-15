<template>
    <DxDataGrid
        class='table-page'
        :show-borders='true'
        :allow-column-resizing='true'
        :column-auto-width='true'
        :load-panel='{showIndicator:false,showPane:false,text:""}'
        :data-source='dataGridSource'
        :key-expr="'id'"
        no-data-text='Tidak ada data'
    >
        <DxPaging :page-size='10' />
        <DxScrolling mode='standard' row-rendering-mode='standard' />
        <DxHeaderFilter :visible='true' />
        <DxFilterRow :visible='true' apply-filter='auto' />
        <DxSelection mode='multiple' show-check-boxes-mode='always' select-all-mode='allPages' />

        <!-- Columns -->
        <DxColumn data-field="title" caption="Judul Buku" alignment="left" :allow-filtering="true" :allow-sorting="true" cell-template="title-cell-template" />
        <DxColumn data-field="genre" caption="Genre" alignment="left" :allow-filtering="true" :allow-sorting="true" />
        <DxColumn data-field="author" caption="Penulis" alignment="left" :allow-filtering="true" :allow-sorting="true" />
        <DxColumn data-field="vote_count" caption="Disukai" :allow-filtering="true" :allow-sorting="true" />
        <!-- Column templates -->
        <template #title-cell-template="{ data: $data }">
            <NuxtLink :to="'/book/' + $data.data.id">{{ $data.data.title }}</NuxtLink>
        </template>
    </DxDataGrid>
</template>

<script lang="ts" setup>
import DxDataGrid, {DxPaging, DxScrolling, DxHeaderFilter, DxFilterRow, DxSelection, DxColumn} from 'devextreme-vue/data-grid';

// Custom types
interface ResponseData {
    data: Array<object>,
    status: string
}

// Data
const client = useSanctumClient()
const { data } = await useAsyncData('get-books', function() {
    return client('/api/book')
}, {
    server: false
});
const responseData: ResponseData = data.value
const dataGridSource = responseData.data
</script>

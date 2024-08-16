<template>
  <v-container fluid>
    <v-text-field v-model="keyword" placeholder="Cari buku dari judul, genre atau nama penulis" />

    <v-data-iterator :items="booksFound" :page="currentPage">
      <template #no-data>
        <div style="text-align: center;font-size: 14pt;">
          Tidak ada data untuk ditampilkan.
        </div>
      </template>
      <template #default="{ items }">
        <v-row>
          <template v-for="(item, key) in items" :key="key">
            <v-col xs="12" sm="6" md="4" lg="3">
              <v-card :loading="cardLoading && item.raw.id == cardIdLoading">
                <v-card-title>{{ item.raw.title }}</v-card-title>
                <v-card-subtitle>{{ item.raw.genre }}</v-card-subtitle>
                <v-card-text>
                  Penulis: {{ item.raw.author }}
                </v-card-text>

                <v-card-actions>
                  <v-btn color="blue" :disabled="cardLoading && item.raw.id == cardIdLoading" @click="addVote(item.raw.id)">Vote</v-btn>
                  <v-spacer/>
                  <span>{{ item.raw.vote_count }} voted</span>
                </v-card-actions>
              </v-card>
            </v-col>
          </template>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script lang="ts" setup>
import debounce from 'lodash.debounce'

definePageMeta({
  layout: 'dashboard',
  middleware: ['sanctum:auth'],
})

// Custom types
interface Book {
  id: number
  title: string
  genre: string
  author: string
  vote_count: number
}

// Data
const keyword = ref('')
const booksFound = ref([])
const currentPage = ref(1)
const cardLoading = ref(false)
const cardIdLoading = ref(0)

// Watch
watch(keyword, debounce(async function(newKeyword: string) {
  const client = useSanctumClient()
  const response = await client('/api/public/book/search', {
    query: {
      keyword: newKeyword
    }
  })
  booksFound.value = response.data
}, 500))

// Methods
async function addVote(bookId: number)
{
  cardIdLoading.value = bookId
  cardLoading.value = true
  const client = useSanctumClient()
  const votedBook = await client('/api/public/book/vote/' + bookId, {
    method: 'put'
  })
  booksFound.value = booksFound.value.map(function(book: Book){
    if (book.id == votedBook.data.id) {
      return votedBook.data
    }else{
      return book
    }
  })
  cardLoading.value = false
}
</script>

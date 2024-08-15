<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-card class="elevation-12">
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-toolbar-title>
              Login - {{ APPLICATION_NAME }}
            </v-toolbar-title>
            <v-spacer />
          </v-toolbar>

          <v-form @submit.prevent="submitLogin()">
            <v-card-text>
              <v-text-field
                v-model="email"
                :error-messages="errorMessage.email"
                label="Email"
                name="email"
                prepend-icon="mdi-account-lock"
                type="text"
              />

              <v-text-field
                v-model="password"
                :error-messages="errorMessage.password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
              />

              <v-checkbox
                v-model="remember"
                label="Ingat saya"
                color="primary"
              />
            </v-card-text>

            <v-card-actions>
              <v-btn
                prepend-icon="$vuetify"
                elevation="2"
                color="blue"
                type="submit"
                :disabled="disableSubmitButton"
                @click="submitLogin()"
              >
                LOGIN
              </v-btn>
              <v-spacer />
              <v-btn
                v-show="false"
                color="default"
              >
                <v-icon>mdi-account-circle</v-icon>&nbsp; Daftar...
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'sanctum:guest',
})

// Custom types
interface Errors {
  email: Array<string>
  password: Array<string>
}

// Data
const APPLICATION_NAME = 'Book Finder'
const email = ref('')
const password = ref('')
const remember = ref(false)
const disableSubmitButton = ref(false)
const errorMessage = reactive({
  email: [],
  password: [],
}) as Errors

// Methods
function submitLogin() {
  const { login } = useSanctumAuth()
  const router = useRouter()

  disableSubmitButton.value = true
  login({
    email: email.value,
    password: password.value,
    remember: remember.value,
  }).then(function (response) {
    console.log(response)
  }).then(function (_response) {
    router.push('/')
  }).catch(function (error) {
    const errorData = error.response._data
    Object.assign(errorMessage, errorData.errors as Errors)
  }).finally(function () {
    disableSubmitButton.value = false
  })
}
</script>

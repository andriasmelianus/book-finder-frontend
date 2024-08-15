// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  ssr: false,
  css: ['~/assets/devextreme/dx.material.css'],
  app: {
    head: {
      title: 'Book Finder with Nuxt 3',
      bodyAttrs: {
        class: 'dx-viewport',
      },
    },
  },

  modules: ['@nuxt/eslint', 'nuxt-auth-sanctum', 'vuetify-nuxt-module'],

  // Run-time configurations
  runtimeConfig: {
    public: {
      sanctum: {
        baseUrl: 'http://localhost:8000',
        redirect: {
          keepRequestedRoute: false,
          onAuthOnly: '/login',
        },
      },
    },
  },
})

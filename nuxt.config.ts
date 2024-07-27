// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    modules: [
        'vuetify-nuxt-module',
        '@nuxtjs/tailwindcss'
    ],
    css: [
        'vuetify/lib/styles/main.sass',
    ],
    build: {
        transpile: ['vuetify']
    },
    vuetify: {
        moduleOptions: {
        },
        vuetifyOptions: {
        }
    }
})
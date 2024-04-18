// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width,initial-scale=1',
      title: 'CUNOE&DIARY',
      meta: [{ name: 'description', content: 'CUNOE&DIARY' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  ssr: false,

  modules: [
    "@nuxt/content",
    'nuxt-icon',
    "@nuxt/image",
    '@formkit/auto-animate/nuxt',
    'nuxt-swiper'
  ],
})

import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-08-18',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxtjs/seo',
    'motion-v/nuxt',
    '@nuxt/test-utils/module',
  ],

  css: ['~/assets/css/main.css'],

  ogImage: { enabled: false },

  vite: {
    plugins: [tailwindcss()],
  },

  site: {
    url: 'https://devportfolio.vercel.app',
    name: 'R Herick Fauzi Komara Kusumah',
    description:
      'Fullstack developer building production systems for Indonesian government institutions. Laravel, Vue, and applied machine learning.',
    defaultLocale: 'en',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/projects', '/about'],
    },
  },

  future: { compatibilityVersion: 4 },
})

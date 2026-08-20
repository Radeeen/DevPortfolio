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

  runtimeConfig: {
    public: {
      whatsapp: '',
    },
  },

  ogImage: { enabled: false },

  vite: {
    plugins: [tailwindcss()],
  },

  site: {
    url: 'https://portfolio-herick.vercel.app',
    name: 'R Herick Fauzi Komara Kusumah',
    description:
      'Fullstack developer building production systems for Indonesian government institutions. Laravel, Vue, and applied machine learning.',
    defaultLocale: 'en',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        // Absolute URLs: LinkedIn, WhatsApp and X do not resolve relative
        // paths when scraping a shared link.
        { property: 'og:image', content: 'https://portfolio-herick.vercel.app/og.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        {
          property: 'og:image:alt',
          content: 'R Herick Fauzi Komara Kusumah — Fullstack Developer',
        },
        { name: 'twitter:image', content: 'https://portfolio-herick.vercel.app/og.jpg' },
      ],
    },
  },

  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/projects', '/about'],
    },
  },

  future: { compatibilityVersion: 4 },
})

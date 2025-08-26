export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "nuxt-aos",
    "@nuxtjs/sitemap",
    "nuxt-schema-org",
  ],

  app: {
    head: {
      htmlAttrs: {
        lang: "id",
      },
    },
  },

  css: ["~/assets/css/main.css"],

  aos: {
    duration: 800,
    easing: "ease-out-cubic",
    once: true,
    delay: 100,
    offset: 0,
  },

  sitemap: {
    autoLastmod: true,
  },

  nitro: {
    preset: "netlify",
  },

  runtimeConfig: {
    public: {
      siteUrl: "https://dailyjeds.netlify.app",
    },
  },
});

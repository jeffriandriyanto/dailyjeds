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

  css: ["~/assets/css/main.css", "@/assets/css/fonts.css"],

  aos: {
    duration: 800,
    easing: "ease-out-cubic",
    once: true,
    delay: 100,
    offset: 0,
  },

  app: {
    head: {
      script: [
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-64NDFVZN62",
          async: true,
        },
        {
          children: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-64NDFVZN62');
          `,
        },
      ],
    },
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

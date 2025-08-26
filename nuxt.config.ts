export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "nuxt-aos",
    "@nuxtjs/sitemap",
  ],

  css: ["~/assets/css/main.css"],

  app: {
    head: {
      title: "Jeds Journey (@daily.jeds) | Daily Activity, Home & Living, Review",
      meta: [
        {
          name: "description",
          content:
            "Daily Activity, Home & Living, Review, Tips & Tricks, Healthy Lifestyle, Mom’s Life. 📍 Salatiga, Indonesia | Follow @daily.jeds di TikTok & Instagram.",
        },
        {
          name: "keywords",
          content:
            "daily jeds, jeds journey, daily activity, home living, review, tips tricks, healthy lifestyle, mom life, salatiga",
        },
        { property: "og:type", content: "website" },
        {
          property: "og:title",
          content:
            "Jeds Journey (@daily.jeds) | Daily Activity, Home & Living, Review",
        },
        {
          property: "og:description",
          content:
            "Ikuti @daily.jeds (Jeds Journey) untuk Daily Activity, Home & Living, Tips, Healthy Lifestyle & Mom’s Life. 📍 Salatiga, Indonesia",
        },
        { property: "og:image", content: "/profile.jpg" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    },
  },

  aos: {
    duration: 800,
    easing: "ease-out-cubic",
    once: true,
    delay: 100,
    offset: 0,
  },

  sitemap: {
    siteUrl: "https://dailyjeds.netlify.app", // pakai domain Netlify dulu
    routes: ["/"],
  },

  nitro: {
    // preset: "netlify",
    preset: 'node-server' 
  },
});

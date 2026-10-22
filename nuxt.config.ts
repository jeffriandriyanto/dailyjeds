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

  image: {
    domains: [
      "scontent.cdninstagram.com",
      "scontent-cgk1-1.cdninstagram.com",
      "scontent-lax3-1.cdninstagram.com",
      "platform-lookaside.fbsbx.com",
    ],
  },

  aos: {
    duration: 800,
    easing: "ease-out-cubic",
    once: true,
    delay: 100,
    offset: 0,
  },

  app: {
    head: {
      link: [
        // Preload font lokal agar tidak block render teks hero (font display Est 220ms)
        {
          rel: "preload",
          href: "/fonts/lazy_dog.ttf",
          as: "font",
          type: "font/ttf",
          crossorigin: "anonymous",
        },
        // Preconnect 3rd-party agar handshake tidak di critical path
        { rel: "preconnect", href: "https://www.googletagmanager.com" },
        { rel: "preconnect", href: "https://www.google-analytics.com" },
      ],
      script: [
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-64NDFVZN62",
          async: true,
        },
        {
          innerHTML: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-64NDFVZN62'); gtag('config', 'G-TF7EZTTHX2');`,
        },
      ],
    },
  },

  site: {
    url: "https://dailyjeds.netlify.app",
  },

  sitemap: {
    autoLastmod: true,
    // Matikan XSL stylesheet agar tidak kena warning/removal XSLT Chrome 158.
    // Sitemap tetap valid untuk Googlebot, hanya tampil sebagai raw XML di browser.
    xsl: false,
  },

  nitro: {
    preset: "netlify",
  },

  prerender: {
    // Abaikan Netlify Image CDN saat prerender: endpoint /.netlify/images
    // hanya ada saat runtime, bukan saat build. Tanpa ini, crawler generate
    // gagal dengan 404 dan menggagalkan seluruh deploy.
    ignore: ["/.netlify/images"],
  },

  runtimeConfig: {
    // JANGAN baca process.env di sini: nilainya akan di-inline ke bundle
    // saat build dan bocor ke hasil build (gagal Netlify Secrets Scanning).
    // Nilai diisi saat runtime otomatis dari env:
    //   NUXT_INSTAGRAM_ACCOUNT_ID -> instagramAccountId
    //   NUXT_META_ACCESS_TOKEN    -> metaAccessToken
    instagramAccountId: '',
    metaAccessToken: '',
    public: {
      siteUrl: "https://dailyjeds.netlify.app",
    },
  },
});

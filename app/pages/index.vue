<script setup lang="ts">
useHead({
  title: 'Daily Jeds - Home Growth & Family Lifestyle',
  meta: [
    {
      name: 'description',
      content: 'Prioritizing audience trust and authentic storytelling over aggressive branding. A journey of home growth, family moments, and the beautiful chaos of everyday life.',
    },
    {
      property: 'og:title',
      content: 'Daily Jeds - Home Growth & Family Lifestyle',
    },
    {
      property: 'og:description',
      content: 'Cerita keluarga muda yang sedang membangun rumah, membangun ritme hidup, dan membangun satu sama lain.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://dailyjeds.netlify.app',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'keywords',
      content: 'daily jeds, family lifestyle, home growth, mom life, cottagecore, authentic storytelling',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://dailyjeds.netlify.app',
    },
  ],
})

useSchemaOrg([
  defineWebSite({
    name: 'Daily Jeds',
    description: 'Home Growth & Family Lifestyle - Authentic storytelling for modern families',
    url: 'https://dailyjeds.netlify.app',
  }),
  defineOrganization({
    name: 'Daily Jeds',
    url: 'https://dailyjeds.netlify.app',
    logo: '/favicon.ico',
    sameAs: [
      'https://www.instagram.com/daily.jeds',
      'https://www.tiktok.com/@daily.jeds',
      'https://www.facebook.com/dailyjeds.page',
    ],
  }),
])

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="min-h-screen bg-ghibli-cream">
    <AudioPlayer audio-src="/memories-jonny-easton-main-version-17339-03-22.mp3" />

    <main>
      <HeroSection
        title="Daily Jeds"
        subtitle="@daily.jeds"
        description="Prioritizing audience trust and authentic storytelling over aggressive branding. A journey of home growth, family moments, and the beautiful chaos of everyday life."
        hero-image="/hero-family.jpeg"
      />

      <StorySection />

      <JourneyTimeline />

      <ServicesGrid />

      <FaqSection />

      <InstagramFeed />
    </main>

    <FooterSection />

    <div class="fixed bottom-24 right-6 z-40">
      <button
        class="w-12 h-12 rounded-full bg-ghibli-green-500 text-white shadow-ghibli hover:shadow-ghibli-hover hover:bg-ghibli-green-600 transition-all duration-300 flex items-center justify-center group"
        aria-label="Back to top"
        @click="scrollToTop"
      >
        <Icon 
          name="mdi:arrow-up" 
          class="w-6 h-6 transition-transform group-hover:-translate-y-1" 
        />
      </button>
    </div>
  </div>
</template>

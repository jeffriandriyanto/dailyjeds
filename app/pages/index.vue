<script setup lang="ts">
useHead({
  title: 'Daily Jeds (@daily.jeds) - Home Growth, Cozy Living & Family Lifestyle Creator',
  meta: [
    {
      name: 'description',
      content: 'Official Creator Landing Page @daily.jeds. Menghubungkan brand dengan audiens keluarga muda melalui konten Reels berkualitas, warm aesthetic, dan storytelling otentik.',
    },
    {
      property: 'og:title',
      content: 'Daily Jeds (@daily.jeds) - Home Growth & Family Lifestyle Creator',
    },
    {
      property: 'og:description',
      content: 'Rate card kolaborasi Reels mulai Rp 350.000. Jangkau ribuan ibu muda dan keluarga dengan konten terpercaya.',
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
      content: 'daily jeds, content creator salatiga, home decor indonesia, parenting reels, kolaborasi brand, rate card influencer, micro influencer indonesia',
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
    logo: '/profile.jpg',
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
        description="Home Growth, Cozy Living, &amp; Parenting Lifestyle Creator berbasis di Salatiga. Membangun kedekatan otentik dengan audiens keluarga muda melalui konten Reels berestetika hangat."
        hero-image="/hero-family.jpeg"
      />

      <BrandPillarsSection />

      <StorySection />

      <ServicesGrid />

      <FaqSection />

      <InstagramFeed />
    </main>

    <FooterSection />

    <!-- Sticky Floating Action Bar for Brands -->
    <FloatingCollabBar />

    <!-- Back to top button -->
    <div class="fixed bottom-24 right-5 z-40">
      <button
        class="w-11 h-11 rounded-full bg-ghibli-green-500/90 text-white shadow-md hover:shadow-lg hover:bg-ghibli-green-600 transition-all duration-300 flex items-center justify-center group backdrop-blur-xs"
        aria-label="Back to top"
        @click="scrollToTop"
      >
        <Icon 
          name="mdi:arrow-up" 
          class="w-5 h-5 transition-transform group-hover:-translate-y-0.5" 
        />
      </button>
    </div>
  </div>
</template>

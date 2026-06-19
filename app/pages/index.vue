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

      <section
        id="story"
        class="relative py-24 lg:py-32 overflow-hidden ghibli-section"
        data-aos="fade-up"
      >
        <div class="absolute inset-0 bg-gradient-to-b from-ghibli-cream via-ghibli-cream-light to-ghibli-cream-warm" />
        
        <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16" data-aos="fade-up">
            <p class="text-ghibli-green-600 font-medium tracking-wider uppercase text-sm mb-4">
              Our Philosophy
            </p>
            <h2 class="text-4xl sm:text-5xl font-ghibli font-bold ghibli-text-gradient mb-6">
              Welcome to Our Home
            </h2>
          </div>

          <div class="space-y-8">
            <div 
              class="ghibli-card p-8"
              data-aos="fade-up" 
              data-aos-delay="200"
            >
              <p class="text-lg text-ghibli-brown-600 leading-relaxed">
                Daily Jeds tumbuh dari perjalanan dua orang yang sudah melewati fase 
                begadang, drama pagi karena sepatu hilang, sampai proyek rumah yang 
                tak pernah selesai tepat waktu. Sekarang kami hidup bersama seorang 
                anak umur enam tahun yang pertanyaannya makin sulit dijawab, tapi 
                justru bikin rumah makin penuh cerita.
              </p>
            </div>

            <div 
              class="ghibli-card p-8"
              data-aos="fade-up" 
              data-aos-delay="300"
            >
              <p class="text-lg text-ghibli-brown-600 leading-relaxed">
                Yang kami bagi di sini sederhana: potongan kehidupan keluarga yang nyata. 
                Rumah yang pelan-pelan dibangun, hubungan yang terus diperbaiki, dan 
                rutinitas yang berubah mengikuti anak yang makin besar dan makin banyak ide.
              </p>
            </div>

            <div 
              class="ghibli-card p-8"
              data-aos="fade-up" 
              data-aos-delay="400"
            >
              <p class="text-lg text-ghibli-brown-600 leading-relaxed">
                Jika kamu datang sebagai brand, kolaborasi bagi kami bukan soal 
                menempelkan produk. Kami memasukkannya ke momen yang memang terjadi— 
                hangat, jujur, dan relevan dengan perjalanan keluarga kami.
              </p>
            </div>

            <div 
              class="text-center pt-8"
              data-aos="fade-up" 
              data-aos-delay="500"
            >
              <p class="text-xl text-ghibli-brown-500 italic font-ghibli">
                Selamat datang di rumah digital kami. Tidak selalu rapi, tapi selalu punya cerita.
              </p>
            </div>
          </div>
        </div>
      </section>

      <JourneyTimeline />

      <ServicesGrid />
    </main>

    <FooterSection />

    <div class="fixed bottom-24 right-6 z-40">
      <button
        class="w-12 h-12 rounded-full bg-ghibli-green-500 text-white shadow-ghibli hover:shadow-ghibli-hover hover:bg-ghibli-green-600 transition-all duration-300 flex items-center justify-center group"
        aria-label="Back to top"
        @click="() => window.scrollTo({ top: 0, behavior: 'smooth' })"
      >
        <Icon 
          name="mdi:arrow-up" 
          class="w-6 h-6 transition-transform group-hover:-translate-y-1" 
        />
      </button>
    </div>
  </div>
</template>

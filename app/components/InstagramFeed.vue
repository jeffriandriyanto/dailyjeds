<script setup lang="ts">
const { trackClick } = useAnalytics()
const { formattedFollowers } = useInstagramData()

const curatorLoaded = ref(false)
const curatorError = ref(false)

onMounted(() => {
  if (typeof window === 'undefined') return

  const loadCurator = () => {
    // Check if script already exists
    const existingScript = document.querySelector('script[src*="cdn.curator.io"]')
    if (existingScript) {
      curatorLoaded.value = true
      return
    }

    const script = document.createElement('script')
    script.async = true
    script.charset = 'UTF-8'
    script.src = 'https://cdn.curator.io/published/c6fecf1c-6771-4716-922a-b523672ceaa8.js'

    script.onload = () => {
      curatorLoaded.value = true
    }

    script.onerror = () => {
      curatorError.value = true
    }

    // Fallback timeout if network blocks curator CDN
    setTimeout(() => {
      if (!curatorLoaded.value) {
        curatorLoaded.value = true
      }
    }, 3500)

    document.body.appendChild(script)
  }

  // Tunda load Curator (3rd-party berat) sampai section mendekati viewport.
  // Mengeluarkan JS pihak ketiga dari critical path LCP/TBT homepage.
  const section = document.querySelector('#instagram')
  if (section && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          loadCurator()
          observer.disconnect()
        }
      },
      { rootMargin: '600px 0px' },
    )
    observer.observe(section)
  } else {
    loadCurator()
  }
})
</script>

<template>
  <section id="instagram" class="relative py-24 lg:py-32 overflow-hidden ghibli-section">
    <div class="absolute inset-0 bg-gradient-to-b from-ghibli-cream-warm via-ghibli-cream to-ghibli-cream-light" />
    
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ghibli-green-200 to-transparent" />
    <div class="absolute top-20 left-10 w-56 h-56 bg-ghibli-amber-200 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-float" style="animation-delay: -2s;" />

    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-14" data-aos="fade-up">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-900 text-xs font-semibold uppercase tracking-wider mb-3">
          <Icon name="mdi:instagram" class="w-4 h-4 text-pink-600" />
          <span>Live Instagram Feed &bull; {{ formattedFollowers }} Community</span>
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-ghibli font-bold ghibli-text-gradient mb-3">
          Momen Terbaru di @daily.jeds
        </h2>
        <p class="text-sm sm:text-base text-ghibli-brown-500 max-w-lg mx-auto mb-4">
          Intip konten Reels dan inspirasi hunian hangat kami yang terus diperbarui setiap minggu.
        </p>
        <a
          href="https://www.instagram.com/daily.jeds"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-sm font-semibold text-ghibli-green-700 hover:text-ghibli-green-800 transition-colors"
          @click="trackClick('instagram_profile_link')"
        >
          <Icon name="mdi:instagram" class="w-4 h-4 text-pink-600" />
          <span>Kunjungi Profil Instagram @daily.jeds &rarr;</span>
        </a>
      </div>

      <!-- Curator Feed Wrapper -->
      <div class="ghibli-card p-4 sm:p-6 shadow-ghibli border border-ghibli-wood-200/50" data-aos="fade-up" data-aos-delay="200">
        <!-- Skeleton Loading State -->
        <div v-if="!curatorLoaded" class="py-16 flex flex-col items-center justify-center gap-4">
          <div class="w-10 h-10 border-3 border-ghibli-green-300 border-t-ghibli-green-600 rounded-full animate-spin" />
          <p class="text-xs sm:text-sm text-ghibli-brown-400">Menyinkronkan postingan terbaru dari @daily.jeds...</p>
        </div>

        <!-- Curator Widget Container -->
        <div
          id="curator-feed-default-feed-layout"
          :class="{ 'opacity-0 h-0 overflow-hidden': !curatorLoaded, 'opacity-100 transition-opacity duration-500 min-h-[300px]': curatorLoaded }"
        >
          <a href="https://curator.io" target="_blank" class="crt-logo crt-tag">Powered by Curator.io</a>
        </div>
      </div>

      <!-- Bottom Follow CTA -->
      <div class="text-center mt-12" data-aos="fade-up" data-aos-delay="300">
        <a
          href="https://www.instagram.com/daily.jeds"
          target="_blank"
          rel="noopener noreferrer"
          class="ghibli-button inline-flex items-center gap-2 text-sm sm:text-base font-semibold px-8 py-3.5 shadow-md"
          @click="trackClick('instagram_follow_bottom')"
        >
          <Icon name="mdi:instagram" class="w-5 h-5 text-white" />
          <span>Follow @daily.jeds di Instagram</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
#curator-feed-default-feed-layout :deep(.crt-logo.crt-tag) {
  display: none !important;
}
</style>

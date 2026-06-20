<script setup lang="ts">
const { trackClick } = useAnalytics()

const curatorLoaded = ref(false)

onMounted(() => {
  if (!process.client) return

  const script = document.createElement('script')
  script.async = true
  script.charset = 'UTF-8'
  script.src = 'https://cdn.curator.io/published/c6fecf1c-6771-4716-922a-b523672ceaa8.js'
  script.onload = () => {
    curatorLoaded.value = true
  }
  document.body.appendChild(script)
})
</script>

<template>
  <section id="instagram" class="relative py-24 lg:py-32 overflow-hidden ghibli-section">
    <div class="absolute inset-0 bg-gradient-to-b from-ghibli-cream-warm via-ghibli-cream to-ghibli-cream-light" />
    
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ghibli-green-200 to-transparent" />
    <div class="absolute top-20 left-10 w-56 h-56 bg-ghibli-amber-200 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-float" style="animation-delay: -2s;" />

    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16" data-aos="fade-up">
        <p class="text-ghibli-green-600 font-medium tracking-wider uppercase text-sm mb-4">
          @daily.jeds
        </p>
        <h2 class="text-4xl sm:text-5xl font-ghibli font-bold ghibli-text-gradient mb-6">
          Ikuti Perjalanan Kami
        </h2>
        <p class="text-ghibli-brown-400 max-w-lg mx-auto mb-2">
          Momen keseharian yang kami bagikan di Instagram
        </p>
        <a
          href="https://www.instagram.com/daily.jeds"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-ghibli-amber-600 hover:text-ghibli-amber-700 transition-colors font-medium"
          @click="trackClick('instagram_profile_link')"
        >
          <Icon name="mdi:instagram" class="w-5 h-5" />
          <span>@daily.jeds</span>
        </a>
      </div>

      <div class="ghibli-card p-4 sm:p-8 shadow-ghibli" data-aos="fade-up" data-aos-delay="200">
        <div v-if="!curatorLoaded" class="flex items-center justify-center py-20">
          <div class="flex flex-col items-center gap-4">
            <div class="w-10 h-10 border-3 border-ghibli-green-300 border-t-ghibli-green-600 rounded-full animate-spin" />
            <p class="text-ghibli-brown-400 text-sm">Memuat postingan...</p>
          </div>
        </div>

        <div
          id="curator-feed-default-feed-layout"
          :class="{ 'opacity-0': !curatorLoaded, 'opacity-100 transition-opacity duration-500': curatorLoaded }"
        >
          <a href="https://curator.io" target="_blank" class="crt-logo crt-tag">Powered by Curator.io</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#curator-feed-default-feed-layout :deep(.crt-logo.crt-tag) {
  display: none !important;
}
</style>

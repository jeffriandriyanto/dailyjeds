<script setup lang="ts">
const WHATSAPP_NUMBER = '6285179857522'
const WA_MESSAGE = 'Halo Kak! Saya tertarik untuk berkolaborasi dengan @daily.jeds (Paid Reels Rp 350rb / Barter). Boleh info ketersediaan slot?'

const { trackWaClick, trackScroll, trackClick } = useAnalytics()
const { formattedFollowers, formattedViews, formattedReach } = useInstagramData()

interface Props {
  title?: string
  subtitle?: string
  description?: string
  heroImage?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Daily Jeds',
  subtitle: '@daily.jeds',
  description: 'Home Growth, Cozy Living, & Parenting Lifestyle Creator berbasis di Salatiga. Membangun kedekatan otentik dengan audiens keluarga muda melalui konten Reels berestetika hangat.',
  heroImage: '/hero-family.jpeg',
})

const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`

const scrollToSection = (link: string) => {
  const element = document.querySelector(link)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <section class="relative min-h-[92vh] flex items-center justify-center overflow-hidden ghibli-pattern pt-20 pb-16">
    <div class="absolute inset-0 bg-gradient-to-b from-ghibli-cream via-ghibli-cream-light to-ghibli-cream-warm opacity-85" />
    
    <!-- Ambient Blur Circles -->
    <div class="absolute top-16 left-8 w-72 h-72 bg-ghibli-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-float" />
    <div class="absolute bottom-16 right-8 w-96 h-96 bg-ghibli-amber-200 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-float" style="animation-delay: -3s;" />

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-12 gap-12 items-center">
        <!-- Left Content -->
        <div class="lg:col-span-7 text-center lg:text-left space-y-7" data-aos="fade-right" data-aos-delay="150">
          <!-- Status Pill -->
          <div class="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold shadow-xs">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available for Brand Collaboration</span>
            </span>

            <span class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-100/80 text-amber-900 text-xs font-semibold">
              <Icon name="mdi:account-group" class="w-3.5 h-3.5 text-amber-700" />
              <span>{{ formattedFollowers }} Engaged Community</span>
            </span>
          </div>

          <!-- Main Headlines -->
          <div class="space-y-3">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-ghibli font-bold leading-[1.15] text-ghibli-brown-800">
              Cerita Otentik yang <br class="hidden sm:inline" />
              <span class="ghibli-text-gradient">Menghubungkan Brand Anda</span>
            </h1>
            <p class="text-xl sm:text-2xl text-ghibli-amber-600 font-lazy tracking-wide">
              {{ title }} &bull; {{ subtitle }}
            </p>
          </div>

          <!-- Description -->
          <p class="text-base sm:text-lg text-ghibli-brown-500 leading-relaxed max-w-xl mx-auto lg:mx-0">
            {{ description }}
          </p>

          <!-- Primary & Secondary CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start pt-1">
            <a
              :href="waLink"
              target="_blank"
              rel="noopener noreferrer"
              class="ghibli-button text-base px-7 py-3.5 flex items-center justify-center gap-2 group shadow-ghibli hover:shadow-ghibli-hover"
              @click="trackWaClick('hero_mulai_kolaborasi')"
            >
              <Icon name="mdi:whatsapp" class="w-5 h-5 text-white" />
              <span>Mulai Kolaborasi (Rp 350rb)</span>
            </a>

            <NuxtLink
              to="/mediakit"
              class="ghibli-button-secondary text-base px-7 py-3.5 flex items-center justify-center gap-2 group"
              @click="trackClick('hero_mediakit_link')"
            >
              <Icon name="mdi:chart-box-outline" class="w-5 h-5 text-ghibli-wood-500 group-hover:scale-110 transition-transform" />
              <span>Lihat Media Kit</span>
            </NuxtLink>
          </div>

          <!-- Quick Metrics Bar -->
          <div class="pt-4 border-t border-ghibli-wood-200/50 flex flex-wrap items-center gap-6 justify-center lg:justify-start text-xs sm:text-sm text-ghibli-brown-500">
            <div class="flex items-center gap-2">
              <Icon name="mdi:check-circle" class="w-4 h-4 text-ghibli-green-500" />
              <span><strong>{{ formattedFollowers }}</strong> Followers Aktif</span>
            </div>
            <div class="w-1 h-1 rounded-full bg-ghibli-wood-300 hidden sm:block" />
            <div class="flex items-center gap-2">
              <Icon name="mdi:eye-outline" class="w-4 h-4 text-ghibli-amber-600" />
              <span><strong>{{ formattedViews }}</strong> Total Views (API)</span>
            </div>
            <div class="w-1 h-1 rounded-full bg-ghibli-wood-300 hidden sm:block" />
            <div class="flex items-center gap-2">
              <Icon name="mdi:map-marker" class="w-4 h-4 text-ghibli-wood-500" />
              <span>Salatiga, Jawa Tengah</span>
            </div>
          </div>
        </div>

        <!-- Right Visual Showcase -->
        <div class="lg:col-span-5 relative" data-aos="fade-left" data-aos-delay="300">
          <div class="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80">
            <div class="absolute inset-0 bg-gradient-to-t from-ghibli-brown-900/40 via-transparent to-transparent z-10" />
            <NuxtImg
              :src="heroImage"
              alt="Daily Jeds - Home Growth & Family Lifestyle Content Creator"
              class="w-full h-[440px] sm:h-[500px] object-cover"
              loading="eager"
              placeholder
              sizes="sm:100vw md:50vw lg:500px"
            />

            <!-- Floating Overlay Card -->
            <div class="absolute bottom-5 left-5 right-5 z-20">
              <div class="glass-effect rounded-2xl p-4 shadow-lg border border-white/60">
                <div class="flex items-center justify-between mb-1.5">
                  <span class="text-xs font-bold text-ghibli-green-700 uppercase tracking-wider">Creator Profile</span>
                  <span class="text-xs font-semibold text-ghibli-amber-600">@daily.jeds</span>
                </div>
                <p class="text-ghibli-brown-700 text-xs sm:text-sm font-medium leading-snug">
                  "Konten yang mengalir natural seperti keseharian di rumah sendiri."
                </p>
                <div class="mt-2.5 flex items-center justify-between text-[11px] text-ghibli-brown-400 border-t border-ghibli-wood-200/40 pt-2">
                  <span>Reels &bull; Stories &bull; TikTok</span>
                  <span class="text-ghibli-green-600 font-semibold">100% High Engagement</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Ambient Floating Badges (Top Corners - No overlap with bottom card) -->
          <div class="absolute -top-4 -left-3 sm:-left-5 w-18 h-18 sm:w-20 sm:h-20 bg-emerald-100/95 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center shadow-lg border border-white/90 -rotate-6 animate-float z-20" style="animation-delay: -2s;">
            <span class="text-xl sm:text-2xl">🌱</span>
            <span class="text-[9px] sm:text-[10px] font-bold text-emerald-800 mt-0.5">Family First</span>
          </div>
          <div class="absolute -top-4 -right-3 sm:-right-5 w-18 h-18 sm:w-20 sm:h-20 bg-amber-100/95 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center shadow-lg border border-white/90 rotate-6 animate-float z-20">
            <span class="text-xl sm:text-2xl">🏡</span>
            <span class="text-[9px] sm:text-[10px] font-bold text-amber-800 mt-0.5">Home Living</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Down Indicator -->
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2">
      <button 
        class="text-ghibli-brown-400 hover:text-ghibli-amber-500 transition-colors animate-bounce p-2"
        @click="trackScroll('hero_to_pillars'); scrollToSection('#pillars')"
        aria-label="Scroll to Content Pillars"
      >
        <Icon name="mdi:chevron-double-down" class="w-6 h-6" />
      </button>
    </div>
  </section>
</template>

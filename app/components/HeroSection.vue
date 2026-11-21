<script setup lang="ts">
const WHATSAPP_NUMBER = '6285179857522'
const WA_MESSAGE = 'Halo Kak! Saya tertarik untuk berkolaborasi dengan @daily.jeds (1 Produksi Rp 400rb / Barter). Boleh info ketersediaan slot?'

const { trackWaClick, trackClick } = useAnalytics()
const { formattedFollowers } = useInstagramData()

interface Props {
  title?: string
  subtitle?: string
  description?: string
  heroImage?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Daily Jeds',
  subtitle: '@daily.jeds',
  description: 'Home Growth, Cozy Living, & Parenting — Reels jujur dari keseharian keluarga kami.',
  heroImage: '/hero-family.webp',
})

const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`
</script>

<template>
  <header class="relative bg-white pt-4 pb-12 sm:pb-16 overflow-hidden">
    <!-- Top Nav Bar (Like Soft Clay Studio header) -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5">
      <nav class="flex items-center justify-between py-3 border-b border-gray-100">
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <span class="text-xl sm:text-2xl font-serif font-black tracking-wide text-[#78383B]">DAILY JEDS</span>
        </NuxtLink>

        <div class="hidden md:flex items-center gap-7 text-sm font-medium text-[#6B4F4D]">
          <a href="#pillars" class="hover:text-[#78383B] transition-colors">Niche</a>
          <a href="#story" class="hover:text-[#78383B] transition-colors">Standar</a>
          <a href="#services" class="hover:text-[#78383B] transition-colors">Paket &amp; Rate</a>
          <a href="#faq" class="hover:text-[#78383B] transition-colors">FAQ</a>
          <NuxtLink to="/mediakit" class="hover:text-[#78383B] transition-colors">Media Kit</NuxtLink>
        </div>

        <a
          :href="waLink"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-[#7C9070] text-white hover:bg-[#5F7354] transition-all shadow-xs"
          @click="trackWaClick('nav_chat')"
        >
          <Icon name="mdi:whatsapp" class="w-4 h-4" />
          <span>Chat Slot</span>
        </a>
      </nav>
    </div>

    <!-- Main Clay Hero Box -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="relative bg-[#78383B] text-white rounded-3xl sm:rounded-[36px] overflow-hidden shadow-xl px-6 sm:px-10 lg:px-14 pt-12 sm:pt-16 pb-16 lg:pb-20">
        <!-- Floating clay flower motifs -->
        <div class="absolute -top-3 -right-3 text-[#E9BC55] opacity-25 select-none pointer-events-none">
          <Icon name="mdi:flower" class="w-32 h-32" />
        </div>
        <div class="absolute top-1/2 left-4 text-white opacity-15 select-none pointer-events-none hidden sm:block">
          <Icon name="mdi:flower-outline" class="w-20 h-20" />
        </div>

        <div class="grid lg:grid-cols-12 gap-10 items-center relative z-10">
          <!-- Left Text Column -->
          <div class="lg:col-span-7 text-left space-y-6">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-white text-xs font-semibold backdrop-blur-xs border border-white/20">
              <span class="w-2 h-2 rounded-full bg-[#E9BC55] animate-pulse" />
              <span>Available for Brand Collaboration</span>
            </div>

            <div class="space-y-3">
              <h1 class="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-[1.12] text-white tracking-tight">
                Hidup pelan,<br />
                <span class="text-[#E9BC55] italic">rumah hangat.</span>
              </h1>
              <p class="text-lg sm:text-xl text-[#FDF6E3] font-lazy tracking-wider">
                Journal keluarga muda &bull; {{ subtitle }}
              </p>
            </div>

            <p class="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl">
              {{ description }}
            </p>

            <div class="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
              <a
                :href="waLink"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-bold bg-[#E9BC55] text-[#3D2221] hover:bg-[#DEAB3D] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                @click="trackWaClick('hero_mulai_kolaborasi')"
              >
                <Icon name="mdi:whatsapp" class="w-5 h-5 text-[#3D2221]" />
                <span>Mulai Kolaborasi (Rp 400rb)</span>
              </a>

              <NuxtLink
                to="/mediakit"
                class="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-full text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/25 transition-all"
                @click="trackClick('hero_mediakit_link')"
              >
                <span>Lihat Media Kit &rarr;</span>
              </NuxtLink>
            </div>

            <div class="pt-5 border-t border-white/15 flex items-center gap-2 text-xs sm:text-sm text-white/80">
              <span class="font-bold text-white text-sm">{{ formattedFollowers }}</span>
              <span>Home &amp; Family Audience</span>
            </div>
          </div>

          <!-- Right Arch Photo Column -->
          <div class="lg:col-span-5 flex justify-center">
            <div class="relative w-full max-w-[360px] sm:max-w-[400px]">
              <!-- Playful decorative flower badge on top -->
              <div class="absolute -top-4 -right-3 z-20 w-12 h-12 rounded-full bg-[#E9BC55] text-[#3D2221] flex items-center justify-center shadow-lg transform rotate-12">
                <Icon name="mdi:flower" class="w-7 h-7" />
              </div>

              <!-- Arch Frame (Tombstone style like in the reference) -->
              <div class="relative overflow-hidden shadow-2xl rounded-t-[140px] sm:rounded-t-[180px] rounded-b-3xl border-4 border-white bg-white">
                <NuxtImg
                  :src="heroImage"
                  alt="Daily Jeds - Home Growth & Family Lifestyle Content Creator"
                  class="w-full h-[420px] sm:h-[480px] object-cover"
                  loading="eager"
                  fetchpriority="high"
                  sizes="sm:100vw md:50vw lg:400px"
                />
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-5 pt-10 pb-4 text-center">
                  <p class="text-white text-xs sm:text-sm font-medium">
                    Dapur hangat kami
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Scallop bottom cutout inside the hero banner -->
        <div class="scallop-bottom absolute bottom-0 left-0 right-0 opacity-90 pointer-events-none" />
      </div>
    </div>
  </header>
</template>


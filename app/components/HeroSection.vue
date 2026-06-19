<script setup lang="ts">
const WHATSAPP_NUMBER = '6285179857522'
const WA_MESSAGE = 'Halo Kak! Saya tertarik untuk berkolaborasi dengan @daily.jeds. Boleh info lebih lanjut?'

interface Props {
  title?: string
  subtitle?: string
  description?: string
  heroImage?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Daily Jeds',
  subtitle: '@daily.jeds',
  description: 'Prioritizing audience trust and authentic storytelling over aggressive branding. A journey of home growth, family moments, and the beautiful chaos of everyday life.',
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
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden ghibli-pattern">
    <div class="absolute inset-0 bg-gradient-to-b from-ghibli-cream via-ghibli-cream-light to-ghibli-cream-warm opacity-80" />
    
    <div class="absolute top-20 left-10 w-72 h-72 bg-ghibli-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" />
    <div class="absolute bottom-20 right-10 w-96 h-96 bg-ghibli-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style="animation-delay: -3s;" />
    <div class="absolute top-1/2 left-1/2 w-64 h-64 bg-ghibli-wood-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style="animation-delay: -1.5s;" />

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div class="text-center lg:text-left space-y-8" data-aos="fade-right" data-aos-delay="200">
          <div class="space-y-4">
            <p class="text-ghibli-green-600 font-medium tracking-wider uppercase text-sm">
              Home Growth & Family Lifestyle
            </p>
            <h1 class="text-5xl sm:text-6xl lg:text-7xl font-ghibli font-bold leading-tight">
              <span class="ghibli-text-gradient">{{ title }}</span>
            </h1>
            <p class="text-xl text-ghibli-amber-600 font-lazy tracking-wide">
              {{ subtitle }}
            </p>
          </div>

          <p class="text-lg text-ghibli-brown-500 leading-relaxed max-w-xl mx-auto lg:mx-0">
            {{ description }}
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              :href="waLink"
              target="_blank"
              rel="noopener noreferrer"
              class="ghibli-button text-lg px-8 py-4 flex items-center justify-center gap-2 group"
            >
              <Icon name="mdi:whatsapp" class="w-5 h-5" />
              <span>Mulai Kolaborasi</span>
            </a>
            <button
              class="ghibli-button-secondary text-lg px-8 py-4 flex items-center justify-center gap-2 group"
              @click="scrollToSection('#journey')"
            >
              <span>Cerita Kami</span>
              <Icon 
                name="mdi:heart-outline" 
                class="w-5 h-5 transition-transform group-hover:scale-110" 
              />
            </button>
          </div>

          <div class="flex items-center gap-6 justify-center lg:justify-start pt-4">
            <div class="flex items-center gap-2 text-ghibli-brown-400">
              <Icon name="mdi:map-marker" class="w-5 h-5 text-ghibli-green-500" />
              <span class="text-sm">Salatiga, ID</span>
            </div>
            <div class="w-1 h-1 rounded-full bg-ghibli-wood-300" />
            <div class="flex items-center gap-2 text-ghibli-brown-400">
              <Icon name="mdi:home-heart" class="w-5 h-5 text-ghibli-amber-500" />
              <span class="text-sm">Family First</span>
            </div>
          </div>
        </div>

        <div class="relative" data-aos="fade-left" data-aos-delay="400">
          <div class="relative rounded-3xl overflow-hidden shadow-ghibli-hover ghibli-glow">
            <div class="absolute inset-0 bg-gradient-to-t from-ghibli-brown-900/30 via-transparent to-transparent z-10" />
            <NuxtImg
              :src="heroImage"
              alt="Daily Jeds - Family lifestyle and home growth journey"
              class="w-full h-[500px] lg:h-[600px] object-cover"
              loading="eager"
              placeholder
              sizes="sm:100vw md:50vw lg:600px"
            />
            <div class="absolute bottom-6 left-6 right-6 z-20">
              <div class="glass-effect rounded-2xl p-4">
                <p class="text-ghibli-brown-700 font-medium text-sm">
                  "Cerita kecil tentang keseharian, rumah, dan proses tumbuh bersama."
                </p>
                <p class="text-ghibli-brown-400 text-xs mt-2">
                  - The Journey of @daily.jeds
                </p>
              </div>
            </div>
          </div>

          <div class="absolute -top-6 -right-6 w-24 h-24 bg-ghibli-amber-100 rounded-full flex items-center justify-center shadow-ghibli animate-float" style="animation-delay: -2s;">
            <span class="text-3xl">🌿</span>
          </div>
          <div class="absolute -bottom-4 -left-4 w-20 h-20 bg-ghibli-green-100 rounded-full flex items-center justify-center shadow-ghibli animate-float" style="animation-delay: -4s;">
            <span class="text-2xl">🏡</span>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
      <button 
        class="text-ghibli-brown-400 hover:text-ghibli-amber-500 transition-colors"
        @click="scrollToSection('#story')"
        aria-label="Scroll to content"
      >
        <Icon name="mdi:chevron-double-down" class="w-8 h-8" />
      </button>
    </div>
  </section>
</template>

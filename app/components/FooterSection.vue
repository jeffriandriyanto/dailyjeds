<script setup lang="ts">
const { trackWaClick, trackSocialClick, trackScroll } = useAnalytics()

interface SocialLink {
  name: string
  url: string
  icon: string
  color: string
  hoverColor: string
}

const socialLinks: SocialLink[] = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/daily.jeds',
    icon: 'mdi:instagram',
    color: 'bg-gradient-to-br from-purple-500 to-pink-500',
    hoverColor: 'hover:shadow-purple-500/30',
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@daily.jeds',
    icon: 'ri:tiktok-fill',
    color: 'bg-gradient-to-br from-gray-900 to-gray-700',
    hoverColor: 'hover:shadow-gray-900/30',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/dailyjeds.page',
    icon: 'mdi:facebook',
    color: 'bg-gradient-to-br from-blue-600 to-blue-500',
    hoverColor: 'hover:shadow-blue-600/30',
  },
  {
    name: 'Shopee',
    url: 'https://shpe.site/daily.jeds',
    icon: 'simple-icons:shopee',
    color: 'bg-gradient-to-br from-ghibli-green-500 to-ghibli-green-600',
    hoverColor: 'hover:shadow-ghibli-green-500/30',
  },
]

interface FooterLink {
  label: string
  to: string
}

const WHATSAPP_NUMBER = '6285179857522'
const WA_MESSAGE = 'Halo Kak! Saya ingin bertanya tentang kolaborasi dengan @daily.jeds'

const quickLinks: FooterLink[] = [
  { label: 'Cerita Kami', to: '#journey' },
  { label: 'Kolaborasi', to: '#services' },
  { label: 'Hubungi WhatsApp', to: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}` },
]

const currentYear = new Date().getFullYear()

const scrollToSection = (link: string) => {
  if (link.startsWith('#')) {
    const element = document.querySelector(link)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  } else {
    window.open(link, '_blank')
  }
}
</script>

<template>
  <footer class="relative overflow-hidden ghibli-section">
    <div class="absolute inset-0 bg-gradient-to-b from-ghibli-cream-warm via-ghibli-brown-100 to-ghibli-brown-200" />
    
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ghibli-wood-300 to-transparent" />

    <div class="relative z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div class="lg:col-span-2" data-aos="fade-up">
            <div class="mb-6">
              <h3 class="text-3xl font-lazy ghibli-text-gradient mb-2">
                Daily Jeds
              </h3>
              <p class="text-ghibli-amber-600 font-lazy tracking-wide">
                @daily.jeds
              </p>
            </div>
            <p class="text-ghibli-brown-500 leading-relaxed max-w-md mb-8">
              Cerita keluarga muda yang sedang membangun rumah, membangun ritme 
              hidup, dan membangun satu sama lain. Selamat datang di rumah digital kami.
            </p>
            <div class="flex items-center gap-2 text-ghibli-brown-400">
              <Icon name="mdi:map-marker" class="w-5 h-5 text-ghibli-green-500" />
              <span>Salatiga, Indonesia</span>
            </div>
          </div>

          <div data-aos="fade-up" data-aos-delay="100">
            <h4 class="text-lg font-ghibli font-semibold text-ghibli-brown-700 mb-6">
              Quick Links
            </h4>
            <ul class="space-y-4">
              <li
                v-for="link in quickLinks"
                :key="link.label"
              >
                <a
                  :href="link.to"
                  class="text-ghibli-brown-500 hover:text-ghibli-amber-600 transition-colors flex items-center gap-2 group"
                  @click.prevent="trackScroll(link.label); scrollToSection(link.to)"
                >
                  <Icon 
                    name="mdi:chevron-right" 
                    class="w-4 h-4 transition-transform group-hover:translate-x-1" 
                  />
                  <span>{{ link.label }}</span>
                </a>
              </li>
            </ul>
          </div>

          <div data-aos="fade-up" data-aos-delay="200">
            <h4 class="text-lg font-ghibli font-semibold text-ghibli-brown-700 mb-6">
              Connect With Us
            </h4>
            <div class="flex flex-wrap gap-3">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="social-icon"
                :class="[social.color, social.hoverColor]"
                :aria-label="`Follow us on ${social.name}`"
                @click="trackSocialClick(social.name.toLowerCase())"
              >
                <Icon :name="social.icon" class="w-5 h-5" />
              </a>
            </div>
            <div class="mt-6">
              <a
                :href="`https://wa.me/${WHATSAPP_NUMBER}`"
                target="_blank"
                rel="noopener noreferrer"
                class="ghibli-button-secondary inline-flex items-center gap-2 text-sm"
                @click="trackWaClick('footer_chat_whatsapp')"
              >
                <Icon name="mdi:whatsapp" class="w-4 h-4" />
                <span>Chat WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="border-t border-ghibli-wood-200/50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-ghibli-brown-400 text-sm text-center md:text-left">
              © {{ currentYear }} Daily Jeds (@daily.jeds) · Cerita rumah, cerita hidup
            </p>
            <div class="flex items-center gap-2 text-ghibli-brown-400 text-sm">
              <span>Made with</span>
              <Icon name="mdi:heart" class="w-4 h-4 text-ghibli-amber-500 animate-pulse" />
              <span>in Salatiga</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-20 right-20 w-64 h-64 bg-ghibli-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-10" />
    <div class="absolute top-20 left-20 w-48 h-48 bg-ghibli-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-10" />
  </footer>
</template>

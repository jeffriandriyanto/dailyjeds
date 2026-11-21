<script setup lang="ts">
const { trackWaClick, trackSocialClick, trackScroll } = useAnalytics()

interface SocialLink {
  name: string
  url: string
  icon: string
}

const socialLinks: SocialLink[] = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/daily.jeds',
    icon: 'mdi:instagram',
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@daily.jeds',
    icon: 'ri:tiktok-fill',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/dailyjeds.page',
    icon: 'mdi:facebook',
  },
  {
    name: 'Shopee',
    url: 'https://shpe.site/daily.jeds',
    icon: 'simple-icons:shopee',
  },
]

interface FooterLink {
  label: string
  to: string
}

const WHATSAPP_NUMBER = '6285179857522'
const WA_MESSAGE = 'Halo Kak! Saya ingin bertanya tentang kolaborasi dengan @daily.jeds'

const quickLinks: FooterLink[] = [
  { label: 'Niche Kami', to: '#pillars' },
  { label: 'Kebiasaan Kami', to: '#story' },
  { label: 'Paket & Rate Card', to: '#services' },
  { label: 'Media Kit', to: '/mediakit' },
  { label: 'Rate Card PDF', to: '/ratecard' },
]

const currentYear = new Date().getFullYear()

const goTo = (link: string) => {
  if (link.startsWith('#')) {
    const element = document.querySelector(link)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  } else if (link.startsWith('/')) {
    navigateTo(link)
  } else {
    window.open(link, '_blank')
  }
}
</script>

<template>
  <footer class="relative bg-[#78383B] text-[#FAF4EB] overflow-hidden pt-12 pb-8">
    <!-- Scallop top edge -->
    <div class="scallop-top absolute top-0 left-0 right-0 opacity-80 pointer-events-none" />

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div class="lg:col-span-2" data-aos="fade-up">
          <div class="mb-4">
            <h3 class="text-3xl font-serif font-black text-[#FFFDF9] mb-1">
              DAILY JEDS
            </h3>
            <p class="text-sm font-medium text-[#E9BC55] tracking-wider">
              @daily.jeds &bull; Home Growth &amp; Family Creator
            </p>
          </div>
          <p class="text-sm sm:text-base text-[#F2E8DA]/85 leading-relaxed max-w-md mb-8">
            Cerita keluarga muda yang sedang menata rumah, merawat ritme hidup, dan berbagi inspirasi hangat.
          </p>
        </div>

        <div data-aos="fade-up" data-aos-delay="100">
          <h4 class="text-base font-serif font-bold text-[#E9BC55] uppercase tracking-wider mb-5">
            Navigasi
          </h4>
          <ul class="space-y-3">
            <li
              v-for="link in quickLinks"
              :key="link.label"
            >
              <a
                :href="link.to"
                class="text-sm text-[#F2E8DA]/85 hover:text-white transition-colors flex items-center gap-2 group"
                @click.prevent="trackScroll(link.label); goTo(link.to)"
              >
                <Icon
                  name="mdi:arrow-right"
                  class="w-3.5 h-3.5 text-[#E9BC55] transition-transform group-hover:translate-x-1"
                />
                <span>{{ link.label }}</span>
              </a>
            </li>
          </ul>
        </div>

        <div data-aos="fade-up" data-aos-delay="200">
          <h4 class="text-base font-serif font-bold text-[#E9BC55] uppercase tracking-wider mb-5">
            Ikuti Kami
          </h4>
          <div class="flex flex-wrap gap-2.5 mb-6">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-[#E9BC55] hover:text-[#452726] transition-all"
              :aria-label="`Follow us on ${social.name}`"
              @click="trackSocialClick(social.name.toLowerCase())"
            >
              <Icon :name="social.icon" class="w-5 h-5" />
            </a>
          </div>

          <div>
            <a
              :href="`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#E9BC55] text-[#452726] hover:bg-[#DEAB3D] transition-all shadow-sm"
              @click="trackWaClick('footer_chat_whatsapp')"
            >
              <Icon name="mdi:whatsapp" class="w-4 h-4 text-[#452726]" />
              <span>Chat WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-white/15 pt-8 text-center">
        <p class="text-xs text-[#FAF0D2]/70">
          &sim; DAILY JEDS &bull; Objects &amp; Moments for a Kinder, Brighter Home &sim;
        </p>
        <p class="text-[11px] text-[#FAF0D2]/50 mt-1">
          &copy; {{ currentYear }} @daily.jeds &bull; All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

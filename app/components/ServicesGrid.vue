<script setup lang="ts">
const WHATSAPP_NUMBER = '6285179857522'

const { trackWaClick } = useAnalytics()

interface Service {
  id: string
  title: string
  price: string
  priceNote?: string
  description: string
  icon: string
  features: string[]
  ctaText: string
  waMessage: string
  gradient: string
  badge?: string
  badgeColor?: string
}

const services: Service[] = [
  {
    id: 'paid',
    title: 'Paid Collaboration',
    price: 'Rp 350.000',
    priceNote: '/ Reels',
    description: 'Produksi konten Reels vertikal 9:16 high-definition yang terintegrasi secara natural dalam keseharian keluarga kami.',
    icon: 'mdi:video-outline',
    features: [
      '1x Reels Content High-Definition (Instagram @daily.jeds)',
      'Tap Link Placement di Bio & Story 24 Jam',
      'Free Mirroring ke TikTok @daily.jeds',
      'Penyusunan naskah/konsep & 1x revisi minor',
      'Laporan screenshot insight performa H+3 posting',
    ],
    ctaText: 'Pesan Slot Reels (Rp 350rb)',
    waMessage: 'Halo Kak! Saya tertarik dengan Paid Collaboration Reels (Rp 350.000) di @daily.jeds. Boleh info ketersediaan slot terdekat?',
    gradient: 'from-ghibli-green-500 to-ghibli-green-700',
    badge: 'Paling Diminati',
    badgeColor: 'bg-emerald-600 text-white',
  },
  {
    id: 'barter',
    title: 'TOM Barter Collaboration',
    price: 'Barter Produk Premium',
    priceNote: '(Seleksi Produk)',
    description: 'Kolaborasi barter eksklusif untuk produk bernilai yang selaras dengan estetika hunian dan kebutuhan keluarga muda.',
    icon: 'mdi:gift-outline',
    features: [
      'Hanya kategori relevan: Home Growth, Dekorasi, & Kids',
      'Nilai retail produk minimal Rp 500.000 / campaign',
      '1x Reels Content + Free Mirroring TikTok',
      'Review organik yang menonjolkan fitur unggulan produk',
      'Produk menjadi hak milik creator (keep product)',
    ],
    ctaText: 'Ajukan Barter via WhatsApp',
    waMessage: 'Halo Kak! Saya ingin mengajukan kerjasama Barter Produk untuk @daily.jeds. Produk kami berupa: [isi jenis produk & estimasi nilai retail]. Boleh diskusi?',
    gradient: 'from-ghibli-amber-400 to-ghibli-amber-600',
    badge: 'Selective Brands',
    badgeColor: 'bg-amber-500 text-white',
  },
]

const hoveredCard = ref<string | null>(null)

const setHovered = (id: string | null) => {
  hoveredCard.value = id
}

const getWaLink = (message: string) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
</script>

<template>
  <section id="services" class="relative py-24 lg:py-32 overflow-hidden ghibli-section">
    <div class="absolute inset-0 bg-gradient-to-b from-ghibli-cream via-ghibli-cream-warm to-ghibli-cream-light" />
    
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ghibli-green-200 to-transparent" />

    <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16" data-aos="fade-up">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
          <Icon name="mdi:handshake-outline" class="w-3.5 h-3.5" />
          <span>Kolaborasi &amp; Rate Card</span>
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-ghibli font-bold ghibli-text-gradient mb-4">
          Pilihan Paket Kerjasama
        </h2>
        <p class="text-base sm:text-lg text-ghibli-brown-500 max-w-2xl mx-auto leading-relaxed">
          Harga terjangkau dengan dampak engagement nyata. Kami membatasi slot bulanan agar feed tetap organik dan audiens selalu antusias menyimak.
        </p>
      </div>

      <!-- Services Cards -->
      <div class="grid md:grid-cols-2 gap-8 mb-12">
        <div
          v-for="service in services"
          :key="service.id"
          class="relative group"
          data-aos="fade-up"
          :data-aos-delay="200 + services.indexOf(service) * 150"
          @mouseenter="setHovered(service.id)"
          @mouseleave="setHovered(null)"
        >
          <div 
            class="ghibli-card h-full p-8 transition-all duration-300 flex flex-col justify-between border"
            :class="{ 
              'shadow-xl -translate-y-1.5 border-ghibli-green-300': hoveredCard === service.id,
              'shadow-ghibli border-ghibli-wood-200/50': hoveredCard !== service.id 
            }"
          >
            <!-- Badge -->
            <div v-if="service.badge" class="absolute -top-3.5 -right-2 z-10">
              <span class="text-xs font-bold px-3 py-1.5 rounded-full shadow-md" :class="service.badgeColor">
                {{ service.badge }}
              </span>
            </div>

            <div>
              <div class="flex items-start justify-between mb-5">
                <div 
                  class="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br shadow-md text-white transition-all duration-300"
                  :class="[
                    service.gradient,
                    { 'scale-110': hoveredCard === service.id }
                  ]"
                >
                  <Icon :name="service.icon" class="w-7 h-7" />
                </div>
              </div>

              <h3 class="text-2xl font-ghibli font-bold text-ghibli-brown-700 mb-2">
                {{ service.title }}
              </h3>

              <div class="mb-4 flex items-baseline gap-1">
                <span class="text-3xl sm:text-4xl font-bold font-ghibli text-ghibli-green-700">{{ service.price }}</span>
                <span v-if="service.priceNote" class="text-ghibli-brown-400 text-xs sm:text-sm font-medium">{{ service.priceNote }}</span>
              </div>
              
              <p class="text-ghibli-brown-500 text-sm leading-relaxed mb-6">
                {{ service.description }}
              </p>

              <!-- Features List -->
              <ul class="space-y-3 mb-8">
                <li
                  v-for="feature in service.features"
                  :key="feature"
                  class="flex items-start gap-2.5 text-ghibli-brown-600"
                >
                  <Icon 
                    name="mdi:check-circle" 
                    class="w-5 h-5 text-ghibli-green-500 flex-shrink-0 mt-0.5" 
                  />
                  <span class="text-xs sm:text-sm leading-snug">{{ feature }}</span>
                </li>
              </ul>
            </div>

            <!-- CTA Button -->
            <a
              :href="getWaLink(service.waMessage)"
              target="_blank"
              rel="noopener noreferrer"
              class="ghibli-button w-full flex items-center justify-center gap-2 group/btn text-sm sm:text-base font-semibold shadow-md"
              @click="trackWaClick(`service_${service.id}`)"
            >
              <Icon name="mdi:whatsapp" class="w-5 h-5 text-white" />
              <span>{{ service.ctaText }}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Custom Project & Agency Banner -->
      <div class="ghibli-card p-6 sm:p-8 border border-ghibli-wood-200/50 shadow-sm" data-aos="fade-up" data-aos-delay="400">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 flex-shrink-0">
              <Icon name="mdi:star-box-multiple-outline" class="w-7 h-7" />
            </div>
            <div>
              <h4 class="text-lg font-ghibli font-bold text-ghibli-brown-700">
                Butuh Campaign Khusus atau Multi-Post?
              </h4>
              <p class="text-xs sm:text-sm text-ghibli-brown-500 mt-0.5">
                Tersedia paket bundling (Series Reels, Story Highlight, Giveaway, hingga Brand Ambassador).
              </p>
            </div>
          </div>
          <a
            :href="getWaLink('Halo Kak! Kami tertarik untuk mendiskusikan Custom Campaign / Bundling Project dengan @daily.jeds. Boleh minta waktu diskusi?')"
            target="_blank"
            rel="noopener noreferrer"
            class="ghibli-button-secondary text-sm px-5 py-2.5 flex items-center gap-2 flex-shrink-0"
            @click="trackWaClick('custom_campaign_cta')"
          >
            <Icon name="mdi:message-badge-outline" class="w-4 h-4 text-ghibli-amber-600" />
            <span>Diskusi Custom Campaign</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

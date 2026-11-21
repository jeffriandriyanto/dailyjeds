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
  badge?: string
  cardBg: string
  badgeBg: string
  badgeText: string
  buttonBg: string
  buttonText: string
  buttonHoverBg: string
}

const services: Service[] = [
  {
    id: 'paid',
    title: '1 Produksi',
    price: 'Rp 400.000',
    priceNote: '/ Reels + Story',
    description: 'Reels vertikal 9:16 high-definition dalam rutinitas keseharian keluarga kami.',
    icon: 'mdi:video-outline',
    features: [
      '1x Reels IG (slot tayang terjadwal)',
      'Tap link Bio & Story interaktif',
      'Naskah/konsep & 1x revisi minor',
      'Laporan performa insight H+3',
    ],
    ctaText: 'Pesan 1 Produksi (Rp 400rb)',
    waMessage: 'Halo Kak! Saya tertarik dengan 1 Produksi Reels IG + Story (Rp 400.000) di @daily.jeds. Boleh info ketersediaan slot?',
    badge: 'Paling Diminati',
    cardBg: 'bg-[#7C9070]', // Sage green (like Studio Picks)
    badgeBg: 'bg-[#E9BC55]',
    badgeText: 'text-[#452726]',
    buttonBg: 'bg-[#FFFDF9]',
    buttonText: 'text-[#5F7354]',
    buttonHoverBg: 'hover:bg-white',
  },
  {
    id: 'barter',
    title: 'Barter Selektif',
    price: 'Min. Rp 600.000',
    priceNote: '(nilai produk)',
    description: 'Kolaborasi barter kurasi khusus kategori Home, Dekorasi, & Kids.',
    icon: 'mdi:gift-outline',
    features: [
      'Kategori selektif: Home, Dekorasi, & Kids',
      'Ongkir ditanggung brand, produk jadi milik creator',
      '1x Reels + Story (tanpa mirroring)',
      'Review organik menonjolkan fitur unggulan',
    ],
    ctaText: 'Ajukan Barter via WhatsApp',
    waMessage: 'Halo Kak! Saya ingin mengajukan kerjasama Barter Produk (min. Rp 600.000) untuk @daily.jeds. Produk kami berupa: [isi jenis produk & estimasi nilai retail]. Boleh diskusi?',
    badge: 'Kurasi Selektif',
    cardBg: 'bg-[#DF8B7D]', // Coral pink (like Pieces of the Week)
    badgeBg: 'bg-[#FFFDF9]',
    badgeText: 'text-[#DF8B7D]',
    buttonBg: 'bg-[#E9BC55]',
    buttonText: 'text-[#452726]',
    buttonHoverBg: 'hover:bg-[#DEAB3D]',
  },
]

const getWaLink = (message: string) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

const customWaLink = getWaLink('Halo Kak! Saya mau diskusi paket custom (mirroring TikTok/Shopee, bundle, atau lainnya) dengan @daily.jeds. Boleh minta waktu diskusi?')
</script>

<template>
  <section id="services" class="relative py-20 lg:py-28 bg-white overflow-hidden">
    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up">
        <div class="inline-flex items-center justify-center gap-2 mb-3 text-[#DF8B7D]">
          <Icon name="mdi:sparkles" class="w-5 h-5 text-[#E9BC55]" />
          <span class="text-xs sm:text-sm font-bold tracking-widest uppercase">Pilihan Kolaborasi</span>
          <Icon name="mdi:sparkles" class="w-5 h-5 text-[#E9BC55]" />
        </div>
        
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#78383B] tracking-tight mb-3">
          Paket &amp; Rate Card
        </h2>
        <p class="text-sm sm:text-base text-[#6B4F4D] font-medium">
          Harga transparan tanpa biaya tersembunyi. Slot bulanan dibatasi ~
        </p>
      </div>

      <!-- 2 Earthy Clay Blocks (Studio Picks & Pieces of the Week inspired) -->
      <div class="grid md:grid-cols-2 gap-8 mb-10">
        <div
          v-for="service in services"
          :key="service.id"
          class="relative text-white rounded-[32px] p-8 sm:p-10 transition-all duration-300 hover:-translate-y-1.5 shadow-md flex flex-col justify-between"
          :class="service.cardBg"
          data-aos="fade-up"
        >
          <!-- Top Badge -->
          <div class="flex items-center justify-between gap-3 mb-6">
            <span class="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-black shadow-xs tracking-wide"
              :class="[service.badgeBg, service.badgeText]">
              <Icon name="mdi:check" class="w-3.5 h-3.5" />
              <span>{{ service.badge }}</span>
            </span>
            <Icon :name="service.icon" class="w-8 h-8 opacity-80" />
          </div>

          <div>
            <h3 class="text-2xl sm:text-3xl font-serif font-bold mb-2">
              {{ service.title }}
            </h3>

            <div class="mb-4 flex items-baseline gap-2">
              <span class="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif">{{ service.price }}</span>
              <span v-if="service.priceNote" class="text-white/80 text-xs sm:text-sm font-medium">{{ service.priceNote }}</span>
            </div>

            <p class="text-white/90 text-sm leading-relaxed mb-8">
              {{ service.description }}
            </p>

            <!-- Features list inside cream pill containers -->
            <ul class="space-y-3 mb-10">
              <li
                v-for="feature in service.features"
                :key="feature"
                class="flex items-start gap-3 bg-white/15 backdrop-blur-xs px-4 py-2.5 rounded-2xl border border-white/20 text-xs sm:text-sm"
              >
                <Icon
                  name="mdi:check-circle"
                  class="w-4 h-4 text-[#E9BC55] flex-shrink-0 mt-0.5"
                />
                <span class="leading-snug text-white font-medium">{{ feature }}</span>
              </li>
            </ul>
          </div>

          <!-- Pill CTA Button -->
          <a
            :href="getWaLink(service.waMessage)"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-full text-sm sm:text-base font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            :class="[service.buttonBg, service.buttonText, service.buttonHoverBg]"
            @click="trackWaClick(`service_${service.id}`)"
          >
            <Icon name="mdi:whatsapp" class="w-5 h-5" />
            <span>{{ service.ctaText }}</span>
          </a>
        </div>
      </div>

      <!-- Custom Link & Ratecard Navigation -->
      <div class="bg-[#FAFAFA] border border-gray-200/80 rounded-2xl p-6 text-center max-w-2xl mx-auto shadow-xs" data-aos="fade-up">
        <p class="text-sm text-[#6B4F4D] font-medium mb-3">
          Butuh kolaborasi custom (mirroring TikTok/Shopee, bundle, atau multi-reels)?
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <a
            :href="customWaLink"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 text-sm font-bold text-[#78383B] hover:text-[#5C2629] transition-colors"
            @click="trackWaClick('custom_campaign_cta')"
          >
            <Icon name="mdi:chat-outline" class="w-4 h-4 text-[#7C9070]" />
            <span>Diskusi via WhatsApp &rarr;</span>
          </a>

          <span class="text-gray-300 hidden sm:inline">&bull;</span>

          <NuxtLink
            to="/ratecard"
            class="inline-flex items-center gap-1 text-sm font-semibold text-[#7C9070] hover:text-[#5F7354] transition-colors"
          >
            <span>Buka Dokumen Rate Card Resmi &rarr;</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>


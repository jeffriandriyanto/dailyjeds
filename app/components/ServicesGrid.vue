<script setup lang="ts">
const WHATSAPP_NUMBER = '6285179857522'

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
}

const services: Service[] = [
  {
    id: 'paid',
    title: 'Paid Collaboration',
    price: 'Rp 300.000',
    priceNote: '/ Reels',
    description: 'Konten Reels profesional yang terintegrasi secara natural dalam keseharian keluarga kami.',
    icon: 'mdi:video-outline',
    features: [
      '1x Reels Content (Instagram)',
      'Tap Link Placement di bio/story',
      'Mirroring ke TikTok @daily.jeds',
    ],
    ctaText: 'Hubungi via WhatsApp',
    waMessage: 'Halo Kak! Saya tertarik dengan Paid Collaboration (Rp 300.000/Reels). Boleh info lebih lanjut?',
    gradient: 'from-ghibli-green-400 to-ghibli-green-600',
  },
  {
    id: 'barter',
    title: 'TOM Barter Collaboration',
    price: 'Barter Produk Premium',
    description: 'Kolaborasi barter dengan produk yang relevan dan bernilai. Prioritas untuk brand yang sevisi.',
    icon: 'mdi:gift-outline',
    features: [
      'Hanya produk relevan: Home Growth, DIY, & Estetika',
      'Nilai retail produk minimal Rp 500.000 / campaign',
      '1x Reels Content + Mirroring TikTok',
    ],
    ctaText: 'Ajukan Barter via WhatsApp',
    waMessage: 'Halo Kak! Saya ingin mengajukan kerjasama Barter Produk. Boleh diskusi lebih lanjut?',
    gradient: 'from-ghibli-amber-400 to-ghibli-amber-600',
    badge: 'Popular',
  },
]

const hoveredCard = ref<string | null>(null)

const getWaLink = (message: string) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
</script>

<template>
  <section id="services" class="relative py-24 lg:py-32 overflow-hidden ghibli-section">
    <div class="absolute inset-0 bg-gradient-to-b from-ghibli-cream via-ghibli-cream-warm to-ghibli-cream-light" />
    
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ghibli-green-200 to-transparent" />

    <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16" data-aos="fade-up">
        <p class="text-ghibli-amber-600 font-medium tracking-wider uppercase text-sm mb-4">
          Kolaborasi
        </p>
        <h2 class="text-4xl sm:text-5xl font-ghibli font-bold ghibli-text-gradient mb-6">
          Yuk Kerja Sama!
        </h2>
        <p class="text-lg text-ghibli-brown-500 max-w-2xl mx-auto leading-relaxed">
          Kami percaya kolaborasi yang baik dimulai dari kejujuran dan kesesuaian nilai. 
          Pilih paket yang paling cocok untuk brand-mu.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
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
            class="ghibli-card h-full p-8 transition-all duration-500 flex flex-col"
            :class="{ 
              'shadow-ghibli-hover scale-[1.02] -translate-y-1': hoveredCard === service.id,
              'shadow-ghibli': hoveredCard !== service.id 
            }"
          >
            <div v-if="service.badge" class="absolute -top-3 -right-3 z-10">
              <span class="bg-ghibli-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-ghibli">
                {{ service.badge }}
              </span>
            </div>

            <div class="flex items-start justify-between mb-6">
              <div 
                class="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br shadow-ghibli transition-all duration-500"
                :class="[
                  service.gradient,
                  { 'scale-110 rotate-3': hoveredCard === service.id }
                ]"
              >
                <Icon :name="service.icon" class="w-7 h-7 text-white" />
              </div>
            </div>

            <h3 class="text-2xl font-ghibli font-bold text-ghibli-brown-700 mb-2">
              {{ service.title }}
            </h3>

            <div class="mb-4">
              <span class="text-3xl font-bold text-ghibli-green-600">{{ service.price }}</span>
              <span v-if="service.priceNote" class="text-ghibli-brown-400 text-sm ml-1">{{ service.priceNote }}</span>
            </div>
            
            <p class="text-ghibli-brown-500 leading-relaxed mb-6">
              {{ service.description }}
            </p>

            <ul class="space-y-3 mb-8 flex-1">
              <li
                v-for="feature in service.features"
                :key="feature"
                class="flex items-start gap-3 text-ghibli-brown-600"
              >
                <Icon 
                  name="mdi:check-circle" 
                  class="w-5 h-5 text-ghibli-green-500 flex-shrink-0 mt-0.5" 
                />
                <span class="text-sm">{{ feature }}</span>
              </li>
            </ul>

            <a
              :href="getWaLink(service.waMessage)"
              target="_blank"
              rel="noopener noreferrer"
              class="ghibli-button w-full flex items-center justify-center gap-2 group/btn"
            >
              <Icon name="mdi:whatsapp" class="w-5 h-5" />
              <span>{{ service.ctaText }}</span>
            </a>
          </div>
        </div>
      </div>

      <div class="mt-16 text-center" data-aos="fade-up" data-aos-delay="500">
        <div class="ghibli-card inline-block p-8 max-w-3xl">
          <div class="flex flex-col md:flex-row items-center gap-6">
            <div class="flex-shrink-0">
              <div class="w-16 h-16 rounded-full bg-gradient-to-br from-ghibli-amber-400 to-ghibli-amber-600 flex items-center justify-center shadow-ghibli">
                <Icon name="mdi:heart" class="w-8 h-8 text-white" />
              </div>
            </div>
            <div class="text-center md:text-left">
              <h3 class="text-lg font-ghibli font-semibold text-ghibli-brown-700 mb-2">
                Komitmen Kami
              </h3>
              <p class="text-ghibli-brown-500 leading-relaxed text-sm">
                "Kolaborasi bagi kami bukan soal menempelkan produk. 
                Kami memasukkannya ke momen yang memang terjadi—hangat, jujur, 
                dan relevan dengan perjalanan keluarga kami."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

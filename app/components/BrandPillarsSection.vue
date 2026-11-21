<script setup lang="ts">
const { trackScroll } = useAnalytics()

const scrollToServices = () => {
  trackScroll('brand_pillars_to_services')
  const el = document.querySelector('#services')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

interface Pillar {
  id: string
  title: string
  icon: string
  description: string
  bestFor: string
  bgTint: string
  iconBg: string
  iconColor: string
}

const pillars: Pillar[] = [
  {
    id: 'home',
    title: 'Home Growth',
    icon: 'mdi:home-heart',
    description: 'Penataan rumah hangat dan fungsional untuk keluarga muda Indonesia.',
    bestFor: 'Dekorasi, perabot, dapur, organizer & home appliances',
    bgTint: 'bg-[#FDF3F1] border-[#F6DCD8]', // Soft blush
    iconBg: '#FFFFFF',
    iconColor: '#DF8B7D',
  },
  {
    id: 'parenting',
    title: 'Family Real Life',
    icon: 'mdi:account-child-circle',
    description: 'Keseharian jujur membersamai anak 6 tahun — relatable, bukan settingan.',
    bestFor: 'Edukasi anak, pakaian anak/ibu, nutrisi & family needs',
    bgTint: 'bg-[#F4F6F4] border-[#E0E7E1]', // Soft eucalyptus / clean sage-stone (not yellow)
    iconBg: '#FFFFFF',
    iconColor: '#5F7354',
  },
  {
    id: 'reviews',
    title: 'Honest Reviews',
    icon: 'mdi:thumb-up-outline',
    description: 'Produk masuk natural dalam rutinitas nyata. Tanpa hard-selling kaku.',
    bestFor: 'Kebutuhan harian rumah tangga, personal care & lifestyle',
    bgTint: 'bg-[#F1F6F8] border-[#D8E4E9]', // Soft mist / clean neutral
    iconBg: '#FFFFFF',
    iconColor: '#7C9070',
  },
]
</script>

<template>
  <section id="pillars" class="relative py-20 lg:py-28 bg-white overflow-hidden">
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header with Clay Floral Accents -->
      <div class="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up">
        <div class="inline-flex items-center justify-center gap-2 mb-3 text-[#7C9070]">
          <Icon name="mdi:flower-outline" class="w-5 h-5 text-[#E9BC55]" />
          <span class="text-xs sm:text-sm font-bold tracking-widest uppercase">Isi Jurnal</span>
          <Icon name="mdi:flower-outline" class="w-5 h-5 text-[#E9BC55]" />
        </div>
        
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#78383B] tracking-tight mb-3">
          Cerita yang kami tulis.
        </h2>
        <p class="text-sm sm:text-base text-[#6B4F4D] font-medium">
          Konten organik dari keseharian nyata keluarga kami ~
        </p>
      </div>

      <!-- 3 Arch Cards (Tombstone style like in reference image) -->
      <div class="grid md:grid-cols-3 gap-8 mb-14">
        <div
          v-for="(pillar, index) in pillars"
          :key="pillar.id"
          class="flex flex-col items-center text-center p-8 transition-all duration-300 hover:-translate-y-2 group shadow-xs hover:shadow-lg rounded-t-[100px] rounded-b-3xl border"
          :class="pillar.bgTint"
          data-aos="fade-up"
          :data-aos-delay="150 + index * 100"
        >
          <!-- Arch Top Icon Container -->
          <div class="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-xs group-hover:scale-105 transition-transform"
            :style="`background:${pillar.iconBg}`">
            <Icon :name="pillar.icon" class="w-10 h-10" :style="`color:${pillar.iconColor}`" />
          </div>

          <h3 class="text-2xl font-serif font-bold text-[#78383B] mb-3">
            {{ pillar.title }}
          </h3>

          <p class="text-[#6B4F4D] text-sm leading-relaxed mb-6 flex-1">
            {{ pillar.description }}
          </p>

          <div class="w-full pt-4 border-t border-black/5 text-xs text-[#6B4F4D] text-left bg-white/80 p-4 rounded-2xl shadow-2xs">
            <span class="font-bold text-[#78383B] block mb-1">Cocok untuk:</span>
            <span>{{ pillar.bestFor }}</span>
          </div>
        </div>
      </div>

      <!-- Bottom Action -->
      <div class="text-center" data-aos="fade-up">
        <button
          class="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm sm:text-base font-bold bg-[#7C9070] hover:bg-[#5F7354] text-white transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          @click="scrollToServices"
        >
          <Icon name="mdi:tag-outline" class="w-4 h-4" />
          <span>Lihat Paket Kolaborasi &rarr;</span>
        </button>
      </div>
    </div>
  </section>
</template>


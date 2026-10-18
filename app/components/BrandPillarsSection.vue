<script setup lang="ts">
const { trackCta, trackScroll, trackWaClick } = useAnalytics()
const { formattedFollowers, formattedViews, formattedReach, formattedInteractions } = useInstagramData()

const WHATSAPP_NUMBER = '6285179857522'
const WA_MESSAGE = 'Halo Kak! Saya ingin mendiskusikan ide kolaborasi konten di @daily.jeds. Boleh minta info slot dan briefnya?'
const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`

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
  subtitle: string
  icon: string
  accentBg: string
  accentColor: string
  description: string
  tags: string[]
  bestFor: string
}

const pillars: Pillar[] = [
  {
    id: 'home',
    title: 'Home Growth & Aesthetic',
    subtitle: 'Hunian Nyaman & Fungsional',
    icon: 'mdi:home-heart',
    accentBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    accentColor: 'text-emerald-700',
    description: 'Eksplorasi penataan rumah bernuansa hangat, sudut santai keluarga, dan ide dekorasi sederhana yang aplikatif untuk rumah keluarga muda Indonesia.',
    tags: ['#HomeDecor', '#CozyHome', '#InteriorAesthetic', '#DIYRumah'],
    bestFor: 'Dekorasi hunian, perabot rumah, perlengkapan dapur, organizer, & home appliances.',
  },
  {
    id: 'parenting',
    title: 'Family & Parenting Real Life',
    subtitle: 'Keseharian Hangat & Relatable',
    icon: 'mdi:account-child-circle',
    accentBg: 'bg-amber-50 text-amber-600 border-amber-200',
    accentColor: 'text-amber-700',
    description: 'Cerita jujur membersamai anak 6 tahun, dinamika peran orang tua baru, serta rutinitas harian yang membangun kedekatan emosional tinggi dengan followers.',
    tags: ['#ParentingRealita', '#MomLife', '#KeluargaMuda', '#DailyRoutines'],
    bestFor: 'Produk edukasi anak, pakaian anak/ibu, nutrisi & camilan sehat, serta family needs.',
  },
  {
    id: 'reviews',
    title: 'Honest Reviews & Natural In-Use',
    subtitle: 'Rekomendasi Terpercaya',
    icon: 'mdi:thumb-up-outline',
    accentBg: 'bg-stone-100 text-stone-700 border-stone-200',
    accentColor: 'text-stone-800',
    description: 'Kami menolak konten hard-selling yang kaku. Produk dimasukkan secara halus dalam rutinitas nyata, sehingga audiens merasa teredukasi tanpa merasa digurui.',
    tags: ['#SpillProduk', '#HonestReview', '#RekomendasiBunda', '#InUseDemo'],
    bestFor: 'Kebutuhan harian rumah tangga, skincare/personal care ibu, fashion, & lifestyle items.',
  },
]
</script>

<template>
  <section id="pillars" class="relative py-24 lg:py-32 overflow-hidden ghibli-section">
    <div class="absolute inset-0 bg-gradient-to-b from-ghibli-cream-warm via-ghibli-cream to-ghibli-cream-light" />
    
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ghibli-wood-200 to-transparent" />

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16 max-w-3xl mx-auto" data-aos="fade-up">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ghibli-green-100/70 text-ghibli-green-700 text-xs font-semibold uppercase tracking-wider mb-4">
          <Icon name="mdi:star-four-points" class="w-3.5 h-3.5" />
          <span>Content Pillars & Audience Value</span>
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-ghibli font-bold ghibli-text-gradient mb-5 leading-tight">
          Menghubungkan Brand Anda dengan Cerita yang Dipercaya
        </h2>
        <p class="text-base sm:text-lg text-ghibli-brown-500 leading-relaxed">
          Audiens @daily.jeds adalah komunitas loyal ibu muda dan keluarga yang mencari inspirasi nyata. Kami mengemas pesan brand Anda secara organik, estetik, dan relevan.
        </p>
      </div>

      <!-- Pillars Cards -->
      <div class="grid md:grid-cols-3 gap-8 mb-16">
        <div
          v-for="(pillar, index) in pillars"
          :key="pillar.id"
          class="ghibli-card p-7 flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300"
          data-aos="fade-up"
          :data-aos-delay="150 + index * 100"
        >
          <div>
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border shadow-sm transition-transform duration-300 group-hover:scale-110" :class="pillar.accentBg">
              <Icon :name="pillar.icon" class="w-7 h-7" />
            </div>

            <p class="text-xs uppercase font-bold tracking-wider text-ghibli-wood-400 mb-1">
              {{ pillar.subtitle }}
            </p>
            <h3 class="text-xl sm:text-2xl font-ghibli font-bold text-ghibli-brown-700 mb-3">
              {{ pillar.title }}
            </h3>
            
            <p class="text-ghibli-brown-500 text-sm leading-relaxed mb-5">
              {{ pillar.description }}
            </p>

            <div class="flex flex-wrap gap-1.5 mb-6">
              <span
                v-for="tag in pillar.tags"
                :key="tag"
                class="px-2.5 py-1 rounded-md text-[11px] font-medium bg-ghibli-cream-warm/80 text-ghibli-brown-600"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <div class="pt-4 border-t border-ghibli-wood-200/40">
            <p class="text-xs font-semibold text-ghibli-brown-700 mb-1 flex items-center gap-1.5">
              <Icon name="mdi:check-decagram" class="w-4 h-4 text-ghibli-green-500" />
              <span>Cocok untuk Kategori:</span>
            </p>
            <p class="text-xs text-ghibli-brown-500 leading-normal">
              {{ pillar.bestFor }}
            </p>
          </div>
        </div>
      </div>

      <!-- Audience Demographic & Social Proof Card -->
      <div class="ghibli-card p-8 sm:p-10 shadow-ghibli-hover mb-12" data-aos="fade-up" data-aos-delay="400">
        <div class="grid lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-5 space-y-4 text-center lg:text-left">
            <div class="inline-flex items-center gap-2 text-xs font-semibold text-ghibli-amber-700 bg-ghibli-amber-100/80 px-3 py-1 rounded-full">
              <Icon name="mdi:chart-box" class="w-4 h-4 text-ghibli-amber-600" />
              <span>Verified Audience Profile</span>
            </div>
            <h3 class="text-2xl sm:text-3xl font-ghibli font-bold text-ghibli-brown-700">
              Kenapa Brand Memilih @daily.jeds?
            </h3>
            <p class="text-sm text-ghibli-brown-500 leading-relaxed">
              Bukan sekadar angka followers, melainkan jangkauan konten nyata dan kedekatan emosional tinggi dengan komunitas keluarga muda.
            </p>
            <div class="pt-2 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                class="ghibli-button text-sm px-6 py-3 flex items-center justify-center gap-2"
                @click="scrollToServices"
              >
                <Icon name="mdi:tag-outline" class="w-4 h-4" />
                <span>Lihat Paket Kolaborasi</span>
              </button>
              <a
                :href="waLink"
                target="_blank"
                rel="noopener noreferrer"
                class="ghibli-button-secondary text-sm px-6 py-3 flex items-center justify-center gap-2"
                @click="trackWaClick('pillars_discuss_cta')"
              >
                <Icon name="mdi:whatsapp" class="w-4 h-4 text-ghibli-green-600" />
                <span>Konsultasi Ide Campaign</span>
              </a>
            </div>
          </div>

          <div class="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div class="p-4 sm:p-5 rounded-2xl bg-[#FFFEF9] border border-ghibli-wood-200/50 text-center shadow-sm">
              <p class="text-2xl sm:text-3xl font-bold font-ghibli text-ghibli-green-600 mb-1">
                {{ formattedFollowers }}
              </p>
              <p class="text-xs font-semibold text-ghibli-brown-700">Followers Aktif</p>
              <p class="text-[10px] text-ghibli-brown-400 mt-1">Live Instagram API</p>
            </div>

            <div class="p-4 sm:p-5 rounded-2xl bg-[#FFFEF9] border border-ghibli-wood-200/50 text-center shadow-sm">
              <p class="text-2xl sm:text-3xl font-bold font-ghibli text-ghibli-amber-600 mb-1">
                {{ formattedViews }}
              </p>
              <p class="text-xs font-semibold text-ghibli-brown-700">Total Tayangan</p>
              <p class="text-[10px] text-ghibli-brown-400 mt-1">Video Views (API)</p>
            </div>

            <div class="p-4 sm:p-5 rounded-2xl bg-[#FFFEF9] border border-ghibli-wood-200/50 text-center shadow-sm">
              <p class="text-2xl sm:text-3xl font-bold font-ghibli text-ghibli-wood-500 mb-1">
                {{ formattedReach }}
              </p>
              <p class="text-xs font-semibold text-ghibli-brown-700">Akun Dijangkau</p>
              <p class="text-[10px] text-ghibli-brown-400 mt-1">Unique Reach (API)</p>
            </div>

            <div class="p-4 sm:p-5 rounded-2xl bg-[#FFFEF9] border border-ghibli-wood-200/50 text-center shadow-sm">
              <p class="text-2xl sm:text-3xl font-bold font-ghibli text-ghibli-green-700 mb-1">
                {{ formattedInteractions }}
              </p>
              <p class="text-xs font-semibold text-ghibli-brown-700">Total Interaksi</p>
              <p class="text-[10px] text-ghibli-brown-400 mt-1">Likes, Save, Shares</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


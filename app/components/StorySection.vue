<script setup lang="ts">
const { trackCta, trackWaClick } = useAnalytics()
const { formattedFollowers, mediaCount } = useInstagramData()

const WHATSAPP_NUMBER = '6285179857522'
const WA_MESSAGE = 'Halo Kak! Saya ingin mendiskusikan kolaborasi konten di @daily.jeds. Boleh minta rate card dan info jadwalnya?'
const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`

interface StandardBlock {
  id: string
  icon: string
  title: string
  highlight: string
  content: string
  accent: string
}

const standardBlocks: StandardBlock[] = [
  {
    id: 'authenticity',
    icon: '✨',
    title: 'Storytelling yang Dipercaya',
    highlight: 'Bukan sekadar membaca skrip iklan',
    content: 'Kami menyematkan produk ke dalam aktivitas harian yang memang terjadi—saat beberes rumah, bermain bersama anak, atau memasak di dapur. Kejujuran ini yang membuat audiens terdorong mencoba rekomendasi kami.',
    accent: 'bg-emerald-50/80 border-emerald-200/80',
  },
  {
    id: 'visual-quality',
    icon: '🎥',
    title: 'Estetika Visual Warm & Cozy',
    highlight: 'Tone warna hangat khas hunian nyaman',
    content: 'Konten direkam dengan format vertikal 9:16 berkualitas tinggi, pencahayaan alami, audio jernih, dan grading warna hangat yang membuat penonton betah menonton Reels sampai selesai (high retention rate).',
    accent: 'bg-amber-50/80 border-amber-200/80',
  },
  {
    id: 'professionalism',
    icon: '🤝',
    title: 'Proses Kerja Cepat & Transparan',
    highlight: 'Komunikasi responsif & 100% on-time',
    content: 'Penyusunan outline ide yang terarah, konsultasi angle pesan sebelum shooting, kesempatan revisi naskah, serta pengiriman insight performa postingan secara transparan untuk laporan campaign Anda.',
    accent: 'bg-stone-50 border-stone-200/80',
  },
]

const activeBlock = ref<string | null>('authenticity')

const stats = computed(() => [
  { label: 'Followers Aktif', value: formattedFollowers.value, icon: 'mdi:account-group' },
  { label: 'Konten Reels/Posts', value: mediaCount.value ? `${mediaCount.value}+` : '350+', icon: 'mdi:video-vintage' },
  { label: 'On-Time Delivery', value: '100%', icon: 'mdi:clock-check-outline' },
])

const toggleBlock = (id: string) => {
  activeBlock.value = activeBlock.value === id ? null : id
  trackCta('story_expand', id)
}
</script>

<template>
  <section
    id="story"
    class="relative py-20 lg:py-28 overflow-hidden ghibli-section"
  >
    <div
      class="absolute inset-0 bg-gradient-to-b from-ghibli-cream via-ghibli-cream-light to-ghibli-cream-warm"
    />

    <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-14" data-aos="fade-up">
        <p class="text-ghibli-green-600 font-semibold tracking-wider uppercase text-xs sm:text-sm mb-3">
          The Creator Standard
        </p>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-ghibli font-bold mb-4">
          <span class="ghibli-text-gradient">Standar Kualitas Konten Daily Jeds</span>
        </h2>
        <p class="text-ghibli-brown-500 max-w-xl mx-auto text-sm sm:text-base">
          Tiga komitmen utama kami saat bermitra dengan setiap brand partner.
        </p>
      </div>

      <!-- Stats Bar -->
      <div class="grid grid-cols-3 gap-3 sm:gap-6 mb-14 max-w-2xl mx-auto">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="ghibli-card p-4 sm:p-6 text-center group hover:scale-105 transition-all duration-300 shadow-sm"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div
            class="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-xl bg-ghibli-green-100 flex items-center justify-center group-hover:bg-ghibli-amber-100 transition-colors"
          >
            <Icon
              :name="stat.icon"
              class="w-5 h-5 sm:w-6 sm:h-6 text-ghibli-green-600 group-hover:text-ghibli-amber-600 transition-colors"
            />
          </div>
          <p class="text-2xl sm:text-3xl font-bold text-ghibli-brown-700 font-ghibli">
            {{ stat.value }}
          </p>
          <p class="text-[11px] sm:text-xs text-ghibli-brown-400 mt-1 font-medium">{{ stat.label }}</p>
        </div>
      </div>

      <!-- Feature Interactive Cards -->
      <div class="space-y-4 max-w-3xl mx-auto">
        <div
          v-for="(block, index) in standardBlocks"
          :key="block.id"
          class="relative"
          data-aos="fade-up"
          :data-aos-delay="150 + index * 100"
        >
          <div
            class="ghibli-card cursor-pointer transition-all duration-300 overflow-hidden border"
            :class="[
              block.accent,
              activeBlock === block.id
                ? 'shadow-ghibli-hover ring-2 ring-ghibli-green-400/40'
                : 'shadow-sm',
            ]"
            @click="toggleBlock(block.id)"
          >
            <div class="p-5 sm:p-6 flex items-start gap-4">
              <span class="text-2xl sm:text-3xl flex-shrink-0">
                {{ block.icon }}
              </span>

              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-2">
                  <div>
                    <h3 class="text-lg sm:text-xl font-ghibli font-bold text-ghibli-brown-700">
                      {{ block.title }}
                    </h3>
                    <p class="text-xs sm:text-sm text-ghibli-green-700 font-medium mt-0.5">
                      {{ block.highlight }}
                    </p>
                  </div>
                  <Icon
                    name="mdi:chevron-down"
                    class="w-5 h-5 text-ghibli-brown-400 transition-transform duration-300 flex-shrink-0"
                    :class="{ 'rotate-180': activeBlock === block.id }"
                  />
                </div>

                <div
                  v-show="activeBlock === block.id"
                  class="pt-3.5 mt-3.5 border-t border-ghibli-wood-200/40"
                >
                  <p class="text-xs sm:text-sm text-ghibli-brown-600 leading-relaxed">
                    {{ block.content }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Direct Collaboration Prompt -->
      <div class="mt-12 text-center" data-aos="fade-up" data-aos-delay="400">
        <a
          :href="waLink"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-sm font-semibold text-ghibli-green-700 hover:text-ghibli-green-800 transition-colors py-2 px-4 rounded-xl bg-ghibli-green-50 border border-ghibli-green-200"
          @click="trackWaClick('story_inquiry_cta')"
        >
          <Icon name="mdi:chat-processing-outline" class="w-4 h-4" />
          <span>Ingin custom campaign atau paket khusus? Chat langsung di WhatsApp &rarr;</span>
        </a>
      </div>
    </div>
  </section>
</template>

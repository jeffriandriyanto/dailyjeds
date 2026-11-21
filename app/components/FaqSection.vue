<script setup lang="ts">
const { trackCta } = useAnalytics()

interface FaqItem {
  id: string
  question: string
  answer: string
}

const faqItems = computed<FaqItem[]>(() => [
  {
    id: 'harga',
    question: 'Berapa harga 1 produksi konten?',
    answer: 'Rp 400.000 untuk 1x Reels IG + Story 24 jam (highlight 7 hari) + naskah/konsep & 1x revisi + laporan performa insight H+3.',
  },
  {
    id: 'barter',
    question: 'Bagaimana syarat skema barter produk?',
    answer: 'Minimal nilai produk Rp 600.000, ongkir ditanggung brand, dan khusus kategori Home, Dekorasi, atau Kids yang selaras dengan keluarga kami.',
  },
  {
    id: 'alur',
    question: 'Bagaimana alur kerja dari awal sampai tayang?',
    answer: 'Diskusi & booking WA → pengiriman produk → penyusunan konsep naskah → produksi video → preview & revisi minor → penayangan terjadwal → laporan insight H+3.',
  },
  {
    id: 'booking',
    question: 'Bagaimana cara booking slot kolaborasi?',
    answer: 'Cukup klik tombol WhatsApp di website ini. Sebutkan nama brand dan rencana tanggal tayang, kami akan merespons maksimal 1×24 jam.',
  },
])

const activeFaq = ref<string | null>(null)

const toggleFaq = (id: string) => {
  const newState = activeFaq.value === id ? null : id
  activeFaq.value = newState
  if (newState) {
    trackCta('faq_expand', id)
  }
}
</script>

<template>
  <section id="faq" class="relative py-20 lg:py-28 bg-[#FAFAFA] border-t border-gray-100 overflow-hidden">
    <div class="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-14" data-aos="fade-up">
        <div class="inline-flex items-center justify-center gap-2 mb-3 text-[#E9BC55]">
          <Icon name="mdi:help-circle-outline" class="w-5 h-5 text-[#7C9070]" />
          <span class="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#78383B]">Tanya Jawab</span>
          <Icon name="mdi:help-circle-outline" class="w-5 h-5 text-[#7C9070]" />
        </div>
        
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#78383B] tracking-tight mb-3">
          Sering Ditanyakan
        </h2>
        <p class="text-sm sm:text-base text-[#6B4F4D] font-medium">
          Hal-hal penting sebelum memulai kolaborasi ~
        </p>
      </div>

      <div class="space-y-4">
        <div
          v-for="(item, index) in faqItems"
          :key="item.id"
          data-aos="fade-up"
          :data-aos-delay="100 + index * 80"
        >
          <div
            class="bg-white border rounded-2xl overflow-hidden transition-all duration-300"
            :class="activeFaq === item.id ? 'border-[#78383B]/30 shadow-md' : 'border-gray-200/80 hover:border-gray-300'"
          >
            <button
              class="w-full p-6 flex items-start justify-between gap-4 text-left group"
              @click="toggleFaq(item.id)"
            >
              <h3 class="text-base sm:text-lg font-serif font-bold text-[#78383B] group-hover:text-[#5C2629] transition-colors">
                {{ item.question }}
              </h3>

              <div
                class="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-[#78383B] flex-shrink-0 transition-transform duration-300"
                :class="{ 'rotate-180 bg-[#7C9070] text-white': activeFaq === item.id }">
                <Icon
                  name="mdi:chevron-down"
                  class="w-5 h-5"
                />
              </div>
            </button>

            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-64"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 max-h-64"
              leave-to-class="opacity-0 max-h-0"
            >
              <div v-show="activeFaq === item.id" class="overflow-hidden">
                <div class="px-6 pb-6 pt-0 border-t border-gray-100 mt-1 pt-4">
                  <p class="text-sm sm:text-base text-[#6B4F4D] leading-relaxed">
                    {{ item.answer }}
                  </p>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { trackCta } = useAnalytics()

interface FaqItem {
  id: string
  question: string
  answer: string
  icon: string
}

const faqItems: FaqItem[] = [
  {
    id: 'siapa',
    question: 'Siapa itu Daily Jeds?',
    answer: 'Keluarga muda dari Salatiga yang berbagi cerita keseharian, membangun rumah, dan proses tumbuh bersama. Dimulai dari dua orang yang melewati fase begadang, drama pagi, sampai proyek rumah yang tak pernah selesai tepat waktu.',
    icon: '🏡',
  },
  {
    id: 'konten',
    question: 'Konten apa yang dibagikan?',
    answer: 'Home growth, family lifestyle, DIY, dan estetika rumah. Cerita nyata tanpa settingan—potongan kehidupan keluarga yang autentik dan relevan dengan kebanyakan keluarga muda Indonesia.',
    icon: '📸',
  },
  {
    id: 'kolaborasi',
    question: 'Apakah menerima kolaborasi?',
    answer: 'Ya! Ada Paid Collaboration seharga Rp 300.000 per Reels (termasuk Tap Link dan Mirroring ke TikTok), dan juga Barter Produk Premium untuk produk yang relevan dengan niche kami (minimal nilai retail Rp 500.000).',
    icon: '🤝',
  },
  {
    id: 'hubungi',
    question: 'Bagaimana cara menghubungi?',
    answer: 'Langsung via WhatsApp dari tombol yang ada di website ini. Kami biasanya merespons dalam 1×24 jam. Untuk pertanyaan kolaborasi, sebutkan brand dan kebutuhanmu ya!',
    icon: '💬',
  },
  {
    id: 'follow',
    question: 'Di mana bisa follow Daily Jeds?',
    answer: 'Kamu bisa temukan kami di Instagram (@daily.jeds), TikTok (@daily.jeds), Facebook (dailyjeds.page), dan Shopee. Follow untuk ikuti keseharian kami!',
    icon: '📱',
  },
]

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
  <section id="faq" class="relative py-24 lg:py-32 overflow-hidden ghibli-section">
    <div class="absolute inset-0 bg-gradient-to-b from-ghibli-cream-light via-ghibli-cream to-ghibli-cream-warm" />
    
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ghibli-amber-200 to-transparent" />
    <div class="absolute bottom-20 right-10 w-48 h-48 bg-ghibli-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-float" />

    <div class="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16" data-aos="fade-up">
        <p class="text-ghibli-amber-600 font-medium tracking-wider uppercase text-sm mb-4">
          FAQ
        </p>
        <h2 class="text-4xl sm:text-5xl font-ghibli font-bold ghibli-text-gradient mb-6">
          Pertanyaan yang Sering Ditanya
        </h2>
        <p class="text-ghibli-brown-400 max-w-lg mx-auto">
          Jawaban singkat untuk pertanyaan yang paling sering masuk
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
            class="ghibli-card overflow-hidden transition-all duration-400"
            :class="[
              activeFaq === item.id ? 'shadow-ghibli-hover' : 'shadow-ghibli'
            ]"
          >
            <button
              class="w-full p-6 flex items-start gap-4 text-left group"
              @click="toggleFaq(item.id)"
            >
              <span class="text-2xl flex-shrink-0 transition-transform duration-300" :class="{ 'scale-125': activeFaq === item.id }">
                {{ item.icon }}
              </span>
              
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-ghibli font-semibold text-ghibli-brown-700 group-hover:text-ghibli-green-700 transition-colors">
                  {{ item.question }}
                </h3>
              </div>

              <Icon
                name="mdi:chevron-down"
                class="w-5 h-5 text-ghibli-brown-400 flex-shrink-0 transition-transform duration-300 mt-1"
                :class="{ 'rotate-180 text-ghibli-amber-500': activeFaq === item.id }"
              />
            </button>

            <Transition
              enter-active-class="transition-all duration-400 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-64"
              leave-active-class="transition-all duration-300 ease-in"
              leave-from-class="opacity-100 max-h-64"
              leave-to-class="opacity-0 max-h-0"
            >
              <div v-show="activeFaq === item.id" class="overflow-hidden">
                <div class="px-6 pb-6 pt-0 pl-[68px]">
                  <p class="text-ghibli-brown-500 leading-relaxed">
                    {{ item.answer }}
                  </p>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>

      <div class="mt-12 text-center" data-aos="fade-up" data-aos-delay="600">
        <p class="text-ghibli-brown-400 mb-4">
          Masih ada pertanyaan?
        </p>
        <a
          href="https://wa.me/6285179857522?text=Halo%20Kak!%20Saya%20ada%20pertanyaan%20tentang%20Daily%20Jeds"
          target="_blank"
          rel="noopener noreferrer"
          class="ghibli-button-secondary inline-flex items-center gap-2"
          @click="trackCta('faq_wa_click', 'faq_bottom_cta')"
        >
          <Icon name="mdi:whatsapp" class="w-5 h-5" />
          <span>Tanya via WhatsApp</span>
        </a>
      </div>
    </div>
  </section>
</template>

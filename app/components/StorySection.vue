<script setup lang="ts">
const { trackCta } = useAnalytics()

interface StoryBlock {
  id: string
  icon: string
  title: string
  content: string
  accent: string
}

const storyBlocks: StoryBlock[] = [
  {
    id: 'origin',
    icon: '💕',
    title: 'Awal Mula',
    content: 'Daily Jeds tumbuh dari perjalanan dua orang yang sudah melewati fase begadang, drama pagi karena sepatu hilang, sampai proyek rumah yang tak pernah selesai tepat waktu. Sekarang kami hidup bersama seorang anak umur enam tahun yang pertanyaannya makin sulit dijawab, tapi justru bikin rumah makin penuh cerita.',
    accent: 'bg-ghibli-green-100 border-ghibli-green-300',
  },
  {
    id: 'content',
    icon: '🏡',
    title: 'Yang Kami Bagi',
    content: 'Yang kami bagi di sini sederhana: potongan kehidupan keluarga yang nyata. Rumah yang pelan-pelan dibangun, hubungan yang terus diperbaiki, dan rutinitas yang berubah mengikuti anak yang makin besar dan makin banyak ide.',
    accent: 'bg-ghibli-amber-100 border-ghibli-amber-300',
  },
  {
    id: 'collab',
    icon: '🤝',
    title: 'Kolaborasi',
    content: 'Jika kamu datang sebagai brand, kolaborasi bagi kami bukan soal menempelkan produk. Kami memasukkannya ke momen yang memang terjadi— hangat, jujur, dan relevan dengan perjalanan keluarga kami.',
    accent: 'bg-ghibli-wood-100 border-ghibli-wood-300',
  },
]

const activeBlock = ref<string | null>(null)
const isVisible = ref(false)
const typedText = ref('')
const fullText = 'Welcome to Our Home'

const stats = [
  { label: 'Tahun Bersama', value: '14+', icon: 'mdi:heart' },
  { label: 'Followers', value: '8K+', icon: 'mdi:account-group' },
  { label: 'Kolaborasi Brand', value: '30+', icon: 'mdi:handshake' },
]

const toggleBlock = (id: string) => {
  activeBlock.value = activeBlock.value === id ? null : id
  trackCta('story_expand', id)
}

const typeWriter = () => {
  let i = 0
  const interval = setInterval(() => {
    if (i < fullText.length) {
      typedText.value += fullText.charAt(i)
      i++
    } else {
      clearInterval(interval)
    }
  }, 80)
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          typeWriter()
          observer.disconnect()
        }
      })
    },
    { threshold: 0.2 }
  )

  const section = document.getElementById('story')
  if (section) observer.observe(section)
})
</script>

<template>
  <section
    id="story"
    class="relative py-24 lg:py-32 overflow-hidden ghibli-section"
  >
    <div class="absolute inset-0 bg-gradient-to-b from-ghibli-cream via-ghibli-cream-light to-ghibli-cream-warm" />

    <div class="absolute top-10 right-10 w-40 h-40 bg-ghibli-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-float" />
    <div class="absolute bottom-20 left-10 w-56 h-56 bg-ghibli-amber-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-float" style="animation-delay: -3s;" />
    
    <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16" data-aos="fade-up">
        <p class="text-ghibli-green-600 font-medium tracking-wider uppercase text-sm mb-4">
          Our Philosophy
        </p>
        <h2 class="text-4xl sm:text-5xl font-ghibli font-bold mb-6 min-h-[60px]">
          <span class="ghibli-text-gradient">{{ typedText }}</span>
          <span class="animate-pulse text-ghibli-amber-500">|</span>
        </h2>
        <p class="text-ghibli-brown-400 max-w-lg mx-auto">
          Klik setiap kartu untuk membaca cerita lengkapnya
        </p>
      </div>

      <div class="grid sm:grid-cols-3 gap-6 mb-16">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="ghibli-card p-6 text-center group hover:scale-105 transition-all duration-300"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-ghibli-green-100 flex items-center justify-center group-hover:bg-ghibli-amber-100 transition-colors">
            <Icon :name="stat.icon" class="w-6 h-6 text-ghibli-green-600 group-hover:text-ghibli-amber-600 transition-colors" />
          </div>
          <p class="text-3xl font-bold text-ghibli-brown-700 font-ghibli">{{ stat.value }}</p>
          <p class="text-sm text-ghibli-brown-400 mt-1">{{ stat.label }}</p>
        </div>
      </div>

      <div class="space-y-4">
        <div
          v-for="(block, index) in storyBlocks"
          :key="block.id"
          class="relative"
          :data-aos="index % 2 === 0 ? 'fade-right' : 'fade-left'"
          :data-aos-delay="200 + index * 100"
        >
          <div
            class="ghibli-card cursor-pointer transition-all duration-500 overflow-hidden"
            :class="[
              block.accent,
              activeBlock === block.id ? 'shadow-ghibli-hover' : 'shadow-ghibli'
            ]"
            @click="toggleBlock(block.id)"
          >
            <div class="p-6 flex items-start gap-4">
              <span class="text-3xl flex-shrink-0 transition-transform duration-300" :class="{ 'scale-125': activeBlock === block.id }">
                {{ block.icon }}
              </span>
              
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <h3 class="text-xl font-ghibli font-semibold text-ghibli-brown-700">
                    {{ block.title }}
                  </h3>
                  <Icon
                    name="mdi:chevron-down"
                    class="w-5 h-5 text-ghibli-brown-400 transition-transform duration-300"
                    :class="{ 'rotate-180': activeBlock === block.id }"
                  />
                </div>
                
                <Transition
                  enter-active-class="transition-all duration-500 ease-out"
                  enter-from-class="opacity-0 max-h-0"
                  enter-to-class="opacity-100 max-h-96"
                  leave-active-class="transition-all duration-300 ease-in"
                  leave-from-class="opacity-100 max-h-96"
                  leave-to-class="opacity-0 max-h-0"
                >
                  <div v-show="activeBlock === block.id" class="overflow-hidden">
                    <p class="text-ghibli-brown-600 leading-relaxed mt-4 pt-4 border-t border-ghibli-wood-200/50">
                      {{ block.content }}
                    </p>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div 
        class="mt-16 text-center"
        data-aos="fade-up" 
        data-aos-delay="600"
      >
        <div class="inline-block ghibli-card p-8 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ghibli-green-400 via-ghibli-amber-400 to-ghibli-wood-400" />
          <div class="absolute -top-2 -right-2 w-16 h-16 bg-ghibli-amber-100 rounded-full opacity-50" />
          
          <p class="text-xl text-ghibli-brown-500 italic font-ghibli relative z-10">
            "Selamat datang di rumah digital kami.<br>
            <span class="text-ghibli-brown-700 font-semibold">Tidak selalu rapi, tapi selalu punya cerita.</span>"
          </p>
          <div class="mt-4 flex items-center justify-center gap-3">
            <div class="w-8 h-px bg-ghibli-amber-300" />
            <span class="text-ghibli-amber-500 font-lazy text-sm">@daily.jeds</span>
            <div class="w-8 h-px bg-ghibli-amber-300" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

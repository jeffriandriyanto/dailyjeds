<script setup lang="ts">
interface StandardBlock {
  id: string
  icon: string
  title: string
  content: string
  iconBg: string
  iconColor: string
}

const standardBlocks: StandardBlock[] = [
  {
    id: 'authenticity',
    icon: 'mdi:eye-outline',
    title: 'Masuk Natural',
    content: 'Produk masuk dalam rutinitas nyata yang memang dijalani — beberes rumah, masak, dan bermain.',
    iconBg: '#DFEAE0',
    iconColor: '#5F7354',
  },
  {
    id: 'visual-quality',
    icon: 'mdi:video-outline',
    title: 'Visual Hangat & Rapi',
    content: 'Format vertikal 9:16, pencahayaan alami, audio jernih, dan pacing nyaman yang disukai brand.',
    iconBg: '#FAF0D2',
    iconColor: '#B58424',
  },
  {
    id: 'direct',
    icon: 'mdi:chat-outline',
    title: 'Komunikasi Langsung',
    content: 'Diskusi naskah dan preview langsung dengan creator. Respons cepat maksimal 1×24 jam.',
    iconBg: '#F6DDD8',
    iconColor: '#C67062',
  },
]
</script>

<template>
  <section
    id="story"
    class="relative py-20 lg:py-28 bg-[#FAFAFA] border-y border-gray-100 overflow-hidden"
  >
    <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-14" data-aos="fade-up">
        <div class="inline-flex items-center justify-center gap-2 mb-3 text-[#78383B]">
          <Icon name="mdi:check-decagram-outline" class="w-5 h-5 text-[#E9BC55]" />
          <span class="text-xs sm:text-sm font-bold tracking-widest uppercase">Kebiasaan Kami</span>
          <Icon name="mdi:check-decagram-outline" class="w-5 h-5 text-[#E9BC55]" />
        </div>
        
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#78383B] tracking-tight mb-3">
          Cara kami bekerja.
        </h2>
        <p class="text-sm sm:text-base text-[#6B4F4D] font-medium">
          Menjaga kepercayaan audiens sekaligus memberikan hasil terbaik bagi brand ~
        </p>
      </div>

      <!-- 3 Clay Cards -->
      <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div
          v-for="(block, index) in standardBlocks"
          :key="block.id"
          class="bg-white border border-gray-200/70 p-7 rounded-[28px] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-start"
          data-aos="fade-up"
          :data-aos-delay="150 + index * 100"
        >
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
            :style="`background:${block.iconBg}`">
            <Icon :name="block.icon" class="w-7 h-7" :style="`color:${block.iconColor}`" />
          </div>
          <div>
            <h3 class="text-xl font-serif font-bold text-[#78383B] mb-2">
              {{ block.title }}
            </h3>
            <p class="text-sm text-[#6B4F4D] leading-relaxed">
              {{ block.content }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


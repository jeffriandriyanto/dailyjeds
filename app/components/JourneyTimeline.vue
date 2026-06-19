<script setup lang="ts">
interface Milestone {
  year: string
  title: string
  description: string
  icon: string
  image?: string
}

const milestones: Milestone[] = [
  {
    year: '2018',
    title: 'Where It All Began',
    description: 'Two hearts, one tiny apartment, and a dream of building something beautiful together. The journey of @daily.jeds started with simple moments shared online.',
    icon: '💕',
  },
  {
    year: '2020',
    title: 'Our Little Miracle',
    description: 'Welcoming our first child changed everything. Sleepless nights became the new normal, but so did a love we never knew was possible.',
    icon: '👶',
  },
  {
    year: '2022',
    title: 'Building Our Nest',
    description: 'We took the leap and started building our dream home. Every brick, every wall choice became a story worth sharing with our growing community.',
    icon: '🏠',
  },
  {
    year: '2024',
    title: 'Growing Together',
    description: 'Our family grew, our home took shape, and our community blossomed. We learned that the best stories are the ones lived authentically.',
    icon: '🌱',
  },
]

const activeIndex = ref(0)

const setActive = (index: number) => {
  activeIndex.value = index
}
</script>

<template>
  <section id="journey" class="relative py-24 lg:py-32 overflow-hidden ghibli-section">
    <div class="absolute inset-0 bg-gradient-to-b from-ghibli-cream-warm via-ghibli-cream to-ghibli-cream-light" />
    
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ghibli-wood-200 to-transparent" />

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20" data-aos="fade-up">
        <p class="text-ghibli-green-600 font-medium tracking-wider uppercase text-sm mb-4">
          Our Journey
        </p>
        <h2 class="text-4xl sm:text-5xl font-ghibli font-bold ghibli-text-gradient mb-6">
          The Story of Us
        </h2>
        <p class="text-lg text-ghibli-brown-500 max-w-2xl mx-auto leading-relaxed">
          Every family has a story. Ours is written in tiny moments, 
          messy kitchens, and the laughter that fills our home.
        </p>
      </div>

      <div class="hidden lg:block relative" data-aos="fade-up" data-aos-delay="200">
        <div class="timeline-line" />
        
        <div class="grid grid-cols-4 gap-8">
          <div
            v-for="(milestone, index) in milestones"
            :key="milestone.year"
            class="relative cursor-pointer group"
            @mouseenter="setActive(index)"
          >
            <div 
              class="timeline-dot transition-all duration-500"
              :class="{ 'scale-150 bg-ghibli-amber-400': activeIndex === index }"
              :style="{ top: '40px' }"
            />

            <div 
              class="ghibli-card p-6 mt-16 transition-all duration-500"
              :class="{ 
                'shadow-ghibli-hover scale-105': activeIndex === index,
                'opacity-70': activeIndex !== index 
              }"
            >
              <div class="text-center mb-4">
                <span class="text-4xl block mb-3">{{ milestone.icon }}</span>
                <span class="text-3xl font-ghibli font-bold text-ghibli-amber-500">
                  {{ milestone.year }}
                </span>
              </div>
              
              <h3 class="text-xl font-ghibli font-semibold text-ghibli-brown-700 mb-3 text-center">
                {{ milestone.title }}
              </h3>
              
              <p class="text-ghibli-brown-500 text-sm leading-relaxed text-center">
                {{ milestone.description }}
              </p>

              <div 
                v-if="milestone.image"
                class="mt-4 rounded-xl overflow-hidden shadow-ghibli transition-all duration-500"
                :class="{ 'opacity-100 max-h-48': activeIndex === index, 'opacity-0 max-h-0': activeIndex !== index }"
              >
                <NuxtImg
                  :src="milestone.image"
                  :alt="milestone.title"
                  class="w-full h-48 object-cover"
                  loading="lazy"
                  placeholder
                  sizes="sm:100vw md:300px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:hidden space-y-8" data-aos="fade-up" data-aos-delay="200">
        <div
          v-for="(milestone, index) in milestones"
          :key="milestone.year"
          class="relative pl-8 border-l-2 border-ghibli-green-200"
          :data-aos="index % 2 === 0 ? 'fade-right' : 'fade-left'"
          :data-aos-delay="200 + index * 100"
        >
          <div class="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-gradient-to-r from-ghibli-green-400 to-ghibli-amber-400 border-2 border-white shadow-ghibli" />
          
          <div class="ghibli-card p-6">
            <div class="flex items-center gap-4 mb-4">
              <span class="text-3xl">{{ milestone.icon }}</span>
              <div>
                <span class="text-2xl font-ghibli font-bold text-ghibli-amber-500">
                  {{ milestone.year }}
                </span>
                <h3 class="text-lg font-ghibli font-semibold text-ghibli-brown-700">
                  {{ milestone.title }}
                </h3>
              </div>
            </div>
            
            <p class="text-ghibli-brown-500 text-sm leading-relaxed">
              {{ milestone.description }}
            </p>

            <div v-if="milestone.image" class="mt-4 rounded-xl overflow-hidden shadow-ghibli">
              <NuxtImg
                :src="milestone.image"
                :alt="milestone.title"
                class="w-full h-48 object-cover"
                loading="lazy"
                placeholder
                sizes="sm:100vw md:300px"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="mt-20 text-center" data-aos="fade-up" data-aos-delay="400">
        <div class="ghibli-card inline-block p-8 max-w-2xl">
          <p class="text-lg text-ghibli-brown-600 leading-relaxed italic font-ghibli">
            "Yang kami bagi di sini sederhana: potongan kehidupan keluarga yang nyata. 
            Rumah yang pelan-pelan dibangun, hubungan yang terus diperbaiki, dan 
            rutinitas yang berubah mengikuti anak yang makin besar dan makin banyak ide."
          </p>
          <div class="mt-4 flex items-center justify-center gap-2">
            <div class="w-12 h-px bg-ghibli-amber-300" />
            <span class="text-ghibli-amber-500 font-lazy">@daily.jeds</span>
            <div class="w-12 h-px bg-ghibli-amber-300" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

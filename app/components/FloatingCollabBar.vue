<script setup lang="ts">
const WHATSAPP_NUMBER = '6285179857522'
const WA_MESSAGE = 'Halo Kak! Saya tertarik untuk kolaborasi dengan @daily.jeds (Paid Reels Rp 350rb / Barter). Boleh diskusi ketersediaan slot?'
const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`

const { trackWaClick } = useAnalytics()
const { formattedFollowers } = useInstagramData()

const isVisible = ref(false)

const handleScroll = () => {
  if (typeof window !== 'undefined') {
    isVisible.value = window.scrollY > 400
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-8"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-8"
  >
    <div
      v-if="isVisible"
      class="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-xl"
    >
      <div
        class="bg-[#FFFEF9]/95 backdrop-blur-md border border-ghibli-wood-300/30 rounded-2xl p-2.5 sm:p-3 shadow-2xl flex items-center justify-between gap-3"
      >
        <!-- Status Indicator -->
        <div class="flex items-center gap-2.5 pl-2 min-w-0">
          <span class="relative flex h-3 w-3 flex-shrink-0">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </span>
          <div class="min-w-0">
            <p class="text-xs font-semibold text-ghibli-brown-700 truncate">
              Open Collaboration
            </p>
            <p class="text-[11px] text-ghibli-green-700 font-medium truncate">
              Paid Reels Rp 350rb • {{ formattedFollowers }} Audience
            </p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-2 flex-shrink-0">
          <NuxtLink
            to="/mediakit"
            class="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-ghibli-brown-600 bg-ghibli-cream-warm/70 hover:bg-ghibli-cream-warm transition-colors"
          >
            <Icon name="mdi:chart-line" class="w-3.5 h-3.5 text-ghibli-wood-500" />
            <span>Media Kit</span>
          </NuxtLink>

          <a
            :href="waLink"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-ghibli-green-500 to-ghibli-green-600 hover:from-ghibli-green-600 hover:to-ghibli-green-700 shadow-md hover:shadow-lg transition-all"
            @click="trackWaClick('floating_bar_cta')"
          >
            <Icon name="mdi:whatsapp" class="w-4 h-4" />
            <span>Chat WA</span>
          </a>
        </div>
      </div>
    </div>
  </Transition>
</template>


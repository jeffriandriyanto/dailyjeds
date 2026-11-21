<script setup lang="ts">
const WHATSAPP_NUMBER = '6285179857522'
const WA_MESSAGE = 'Halo Kak! Saya tertarik untuk kolaborasi dengan @daily.jeds (1 Produksi Rp 400rb / Barter). Boleh info ketersediaan slot?'
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
      class="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-lg"
    >
      <a
        :href="waLink"
        target="_blank"
        rel="noopener noreferrer"
        class="bg-white/95 backdrop-blur-md rounded-full px-5 py-3 shadow-2xl border border-gray-200/90 flex items-center justify-between gap-3 hover:-translate-y-0.5 transition-all"
        @click="trackWaClick('floating_bar_cta')"
      >
        <div class="flex items-center gap-2 truncate">
          <span class="w-2.5 h-2.5 rounded-full bg-[#7C9070] flex-shrink-0" />
          <span class="text-xs sm:text-sm font-bold text-[#78383B] truncate">
            Slot Kolaborasi Rp 400rb &bull; {{ formattedFollowers }} Audien
          </span>
        </div>
        <span class="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#452726] bg-[#E9BC55] hover:bg-[#DEAB3D] px-4 py-2 rounded-full flex-shrink-0 shadow-xs transition-colors">
          <Icon name="mdi:whatsapp" class="w-4 h-4" />
          <span>Chat WA</span>
        </span>
      </a>
    </div>
  </Transition>
</template>

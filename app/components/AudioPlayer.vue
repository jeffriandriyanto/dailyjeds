<script setup lang="ts">
interface Props {
  audioSrc?: string
}

withDefaults(defineProps<Props>(), {
  audioSrc: '/memories-jonny-easton-main-version-17339-03-22.mp3',
})

const isPlaying = ref(false)
const isMuted = ref(false)
const audioElement = ref<HTMLAudioElement | null>(null)

const togglePlay = () => {
  if (!audioElement.value) return

  if (isPlaying.value) {
    audioElement.value.pause()
    isPlaying.value = false
  } else {
    audioElement.value.play().catch(() => {
      console.log('Autoplay prevented by browser policy')
    })
    isPlaying.value = true
  }
}

const toggleMute = () => {
  if (!audioElement.value) return

  isMuted.value = !isMuted.value
  audioElement.value.muted = isMuted.value
}

onUnmounted(() => {
  if (audioElement.value) {
    audioElement.value.pause()
    audioElement.value = null
  }
})
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50 flex items-center gap-3">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-75"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-75"
    >
      <button
        v-if="isPlaying"
        class="glass-effect w-10 h-10 rounded-full flex items-center justify-center shadow-ghibli hover:shadow-ghibli-hover transition-all duration-300 group"
        :aria-label="isMuted ? 'Unmute music' : 'Mute music'"
        @click="toggleMute"
      >
        <Icon
          :name="isMuted ? 'mdi:volume-off' : 'mdi:volume-high'"
          class="w-5 h-5 text-ghibli-brown-500 group-hover:text-ghibli-amber-500 transition-colors"
        />
      </button>
    </Transition>

    <button
      class="relative w-14 h-14 rounded-full shadow-ghibli hover:shadow-ghibli-hover transition-all duration-300 group"
      :class="[
        isPlaying
          ? 'bg-gradient-to-br from-ghibli-green-400 to-ghibli-green-600 animate-glow-pulse'
          : 'bg-gradient-to-br from-ghibli-amber-400 to-ghibli-amber-600'
      ]"
      :aria-label="isPlaying ? 'Pause music' : 'Play music'"
      @click="togglePlay"
    >
      <div class="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div class="absolute inset-0 flex items-center justify-center">
        <div v-if="isPlaying" class="vinyl-record vinyl-spinning" />
        <div v-else class="flex flex-col items-center">
          <Icon name="mdi:music-note" class="w-6 h-6 text-white" />
        </div>
      </div>
    </button>

    <audio
      ref="audioElement"
      :src="audioSrc"
      loop
      preload="none"
      @ended="isPlaying = false"
    />
  </div>
</template>

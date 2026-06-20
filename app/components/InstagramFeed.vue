<script setup lang="ts">
const { trackClick } = useAnalytics()

interface InstagramPost {
  id: string
  caption?: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  thumbnail_url?: string
  permalink: string
  timestamp: string
}

const posts = ref<InstagramPost[]>([])
const loading = ref(true)
const error = ref(false)

const { data, status } = await useFetch('/api/instagram/feed', {
  key: 'instagram-feed',
  getCachedData: (key, nuxt) => {
    return nuxt.payload.data[key] || nuxt.static.data[key]
  },
})

watchEffect(() => {
  if (data.value) {
    posts.value = (data.value as any).posts || []
    loading.value = false
    if ((data.value as any).error) {
      error.value = true
    }
  }
  if (status.value === 'error') {
    loading.value = false
    error.value = true
  }
})

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const truncateCaption = (caption?: string, maxLength = 80) => {
  if (!caption) return ''
  if (caption.length <= maxLength) return caption
  return caption.substring(0, maxLength).trim() + '...'
}

const getMediaUrl = (post: InstagramPost) => {
  if (post.media_type === 'VIDEO') {
    return post.thumbnail_url || post.media_url
  }
  return post.media_url
}
</script>

<template>
  <section id="instagram" class="relative py-24 lg:py-32 overflow-hidden ghibli-section">
    <div class="absolute inset-0 bg-gradient-to-b from-ghibli-cream-warm via-ghibli-cream to-ghibli-cream-light" />
    
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ghibli-green-200 to-transparent" />
    <div class="absolute top-20 left-10 w-56 h-56 bg-ghibli-amber-200 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-float" style="animation-delay: -2s;" />

    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16" data-aos="fade-up">
        <p class="text-ghibli-green-600 font-medium tracking-wider uppercase text-sm mb-4">
          @daily.jeds
        </p>
        <h2 class="text-4xl sm:text-5xl font-ghibli font-bold ghibli-text-gradient mb-6">
          Ikuti Perjalanan Kami
        </h2>
        <p class="text-ghibli-brown-400 max-w-lg mx-auto mb-2">
          Momen keseharian yang kami bagikan di Instagram
        </p>
        <a
          href="https://www.instagram.com/daily.jeds"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-ghibli-amber-600 hover:text-ghibli-amber-700 transition-colors font-medium"
          @click="trackClick('instagram_profile_link')"
        >
          <Icon name="mdi:instagram" class="w-5 h-5" />
          <span>@daily.jeds</span>
        </a>
      </div>

      <div v-if="loading" class="flex items-center justify-center py-20" data-aos="fade-up">
        <div class="flex flex-col items-center gap-4">
          <div class="w-10 h-10 border-3 border-ghibli-green-300 border-t-ghibli-green-600 rounded-full animate-spin" />
          <p class="text-ghibli-brown-400 text-sm">Memuat postingan...</p>
        </div>
      </div>

      <div v-else-if="error || posts.length === 0" class="text-center py-16" data-aos="fade-up">
        <div class="ghibli-card p-8 max-w-md mx-auto">
          <Icon name="mdi:instagram" class="w-12 h-12 text-ghibli-brown-300 mx-auto mb-4" />
          <p class="text-ghibli-brown-500 mb-4">
            Postingan Instagram akan segera tersedia
          </p>
          <a
            href="https://www.instagram.com/daily.jeds"
            target="_blank"
            rel="noopener noreferrer"
            class="ghibli-button inline-flex items-center gap-2"
            @click="trackClick('instagram_follow_cta')"
          >
            <Icon name="mdi:instagram" class="w-5 h-5" />
            <span>Follow @daily.jeds</span>
          </a>
        </div>
      </div>

      <div v-else class="grid grid-cols-2 sm:grid-cols-3 gap-4" data-aos="fade-up" data-aos-delay="200">
        <a
          v-for="post in posts"
          :key="post.id"
          :href="post.permalink"
          target="_blank"
          rel="noopener noreferrer"
          class="group relative aspect-square rounded-2xl overflow-hidden shadow-ghibli hover:shadow-ghibli-hover transition-all duration-300 hover:scale-[1.02]"
          @click="trackClick(`instagram_post_${post.id}`)"
        >
          <NuxtImg
            :src="getMediaUrl(post)"
            :alt="truncateCaption(post.caption)"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            placeholder
            sizes="sm:50vw md:33vw lg:300px"
          />
          
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="absolute bottom-0 left-0 right-0 p-4">
              <p class="text-white text-sm leading-relaxed line-clamp-2">
                {{ truncateCaption(post.caption, 100) }}
              </p>
              <div class="flex items-center gap-2 mt-2">
                <Icon v-if="post.media_type === 'VIDEO'" name="mdi:play-circle" class="w-4 h-4 text-white/80" />
                <Icon v-else-if="post.media_type === 'CAROUSEL_ALBUM'" name="mdi:camera-burst" class="w-4 h-4 text-white/80" />
                <span class="text-white/70 text-xs">{{ formatDate(post.timestamp) }}</span>
              </div>
            </div>
          </div>
        </a>
      </div>

      <div v-if="posts.length > 0" class="text-center mt-10" data-aos="fade-up" data-aos-delay="400">
        <a
          href="https://www.instagram.com/daily.jeds"
          target="_blank"
          rel="noopener noreferrer"
          class="ghibli-button-secondary inline-flex items-center gap-2"
          @click="trackClick('instagram_see_more')"
        >
          <Icon name="mdi:instagram" class="w-5 h-5" />
          <span>Lihat Lebih Banyak</span>
        </a>
      </div>
    </div>
  </section>
</template>

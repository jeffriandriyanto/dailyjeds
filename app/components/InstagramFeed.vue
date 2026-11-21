<script setup lang="ts">
const { trackClick } = useAnalytics()
const { formattedFollowers } = useInstagramData()

interface FeedPost {
  id: string
  caption?: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  like_count: number
  comments_count: number
  timestamp: string
  permalink: string
  media_url?: string
  thumbnail_url?: string
}

const { data: feedData, status } = await useFetch('/api/instagram/feed', {
  key: 'instagram-feed',
  lazy: true,
  getCachedData: (key, nuxt) => {
    return nuxt.payload.data[key] || nuxt.static.data[key]
  },
})

const posts = computed<FeedPost[]>(() => {
  const raw = feedData.value as any
  return raw?.posts || []
})

const formatNumber = (num: number | undefined | null): string => {
  if (num === undefined || num === null || isNaN(num)) return '0'
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}
</script>

<template>
  <section id="instagram" class="relative py-20 lg:py-28 bg-white overflow-hidden">
    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-end justify-between gap-4 mb-8" data-aos="fade-up">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#78383B]">
          Galeri Terbaru
        </h2>
        <a
          href="https://www.instagram.com/daily.jeds"
          target="_blank"
          rel="noopener noreferrer"
          class="flex-shrink-0 text-sm font-semibold text-[#7C9070] hover:text-[#78383B] transition-colors"
          @click="trackClick('instagram_profile_link')"
        >
          <span>@daily.jeds &bull; {{ formattedFollowers }} &rarr;</span>
        </a>
      </div>

      <div v-if="status === 'pending'" class="py-16 flex flex-col items-center justify-center gap-4">
        <div class="w-10 h-10 border-3 border-[#7C9070]/30 border-t-[#7C9070] rounded-full animate-spin" />
        <p class="text-xs sm:text-sm text-[#6B4F4D]">Memuat postingan terbaru...</p>
      </div>

      <div
        v-else-if="posts.length"
        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        data-aos="fade-up"
      >
        <a
          v-for="post in posts"
          :key="post.id"
          :href="post.permalink"
          target="_blank"
          rel="noopener noreferrer"
          class="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-xs hover:shadow-md transition-all duration-300"
        >
          <img
            :src="post.thumbnail_url || post.media_url"
            :alt="(post.caption || 'Postingan @daily.jeds').substring(0, 80)"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <span
            v-if="post.media_type === 'VIDEO'"
            class="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center"
          >
            <Icon name="mdi:play" class="w-4 h-4 text-white" />
          </span>
          <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent p-3 pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span class="text-white text-xs sm:text-sm font-semibold flex items-center gap-3">
              <span class="flex items-center gap-1">
                <Icon name="mdi:heart" class="w-4 h-4" />
                {{ formatNumber(post.like_count) }}
              </span>
              <span class="flex items-center gap-1">
                <Icon name="mdi:comment" class="w-4 h-4" />
                {{ formatNumber(post.comments_count) }}
              </span>
            </span>
          </div>
        </a>
      </div>

      <div v-else class="py-14 text-center" data-aos="fade-up">
        <p class="text-sm text-[#6B4F4D] mb-3">
          Feed sedang tidak tersedia — intip langsung di Instagram.
        </p>
        <a
          href="https://www.instagram.com/daily.jeds"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm font-semibold text-[#7C9070] hover:text-[#78383B] transition-colors"
          @click="trackClick('instagram_feed_fallback')"
        >
          <span>Buka @daily.jeds &rarr;</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

interface MediaPost {
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

const { data: insightsData, status } = await useFetch('/api/instagram/insights', {
  key: 'instagram-insights',
  getCachedData: (key, nuxt) => {
    return nuxt.payload.data[key] || nuxt.static.data[key]
  },
})

const account = computed(() => {
  const raw = insightsData.value as any
  return raw?.account || { name: 'Daily Jeds', username: 'daily.jeds', followers_count: 12997, media_count: 368, profile_picture_url: '/profile.webp' }
})

const isMock = computed(() => {
  const raw = insightsData.value as any
  return raw?.isMock === true || raw?.isEstimate === true || !!raw?.error || !!raw?.estimateReason
})

const lastUpdatedLabel = computed(() => {
  const raw = insightsData.value as any
  const ts = raw?.lastUpdated
  if (!ts) return ''
  try {
    return new Date(ts).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return ''
  }
})

const insights = computed(() => {
  const raw = insightsData.value as any
  return raw?.insights?.data || []
})

const mediaPosts = computed<MediaPost[]>(() => {
  const raw = insightsData.value as any
  return raw?.media?.data || []
})

const metrics = computed(() => {
  const getMetricValue = (name: string) => {
    const metric = insights.value.find((m: any) => m.name === name)
    return metric?.values?.[0]?.value || metric?.total_value?.value || 0
  }

  const followers = account.value?.followers_count || 12997

  return {
    reach: getMetricValue('reach'),
    followers,
    mediaCount: account.value?.media_count || 368,
  }
})

const contentStats = computed(() => {
  const posts = mediaPosts.value
  if (!posts.length) {
    return {
      avgLikes: 0,
      engagementRate: 0,
      topPosts: [],
    }
  }

  const totalLikes = posts.reduce((sum, p) => sum + (p.like_count || 0), 0)
  const totalComments = posts.reduce((sum, p) => sum + (p.comments_count || 0), 0)
  const avgLikes = Math.round(totalLikes / posts.length)
  const engagementRate = metrics.value.followers > 0
    ? Number(((totalLikes + totalComments) / (metrics.value.followers * posts.length) * 100).toFixed(2))
    : 0

  const topPosts = [...posts].sort((a, b) => (b.like_count || 0) - (a.like_count || 0)).slice(0, 3)

  return {
    avgLikes,
    engagementRate,
    topPosts,
  }
})

const recentTrendData = computed(() => {
  const posts = [...mediaPosts.value].slice(0, 10).reverse()
  if (!posts.length) {
    return { labels: [], datasets: [] }
  }

  const formatShortDate = (timestamp: string) => {
    const d = new Date(timestamp)
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
  }

  return {
    labels: posts.map(p => formatShortDate(p.timestamp)),
    datasets: [
      {
        label: 'Likes',
        data: posts.map(p => p.like_count || 0),
        borderColor: '#7C9070',
        backgroundColor: 'rgba(124, 144, 112, 0.12)',
        fill: true,
        tension: 0.3,
        pointBackgroundColor: '#7C9070',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
      {
        label: 'Komentar',
        data: posts.map(p => p.comments_count || 0),
        borderColor: '#E9BC55',
        backgroundColor: 'rgba(233, 188, 85, 0.12)',
        fill: true,
        tension: 0.3,
        pointBackgroundColor: '#E9BC55',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  }
})

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        padding: 20,
        usePointStyle: true,
        pointStyleWidth: 8,
        font: { size: 12 },
        color: '#6D5538',
      },
    },
    tooltip: {
      backgroundColor: '#4B3928',
      titleFont: { size: 13 },
      bodyFont: { size: 12 },
      padding: 12,
      cornerRadius: 8,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#9C7C4C', font: { size: 11 } },
    },
    y: {
      grid: { color: 'rgba(139, 105, 20, 0.08)' },
      ticks: {
        color: '#9C7C4C',
        font: { size: 11 },
        callback: (value: any) => {
          if (value >= 1000) return (value / 1000).toFixed(0) + 'K'
          return value
        },
      },
    },
  },
}

const formatNumber = (num: number | undefined | null): string => {
  if (num === undefined || num === null || isNaN(num)) return '0'
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

const truncateCaption = (caption?: string, maxLength = 40) => {
  if (!caption) return 'No caption'
  if (caption.length <= maxLength) return caption
  return caption.substring(0, maxLength).trim() + '...'
}
</script>

<template>
  <section id="mediakit" class="relative py-16 lg:py-20 overflow-hidden">
    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="status === 'pending'" class="flex items-center justify-center py-20">
        <div class="flex flex-col items-center gap-4">
          <div class="w-10 h-10 border-3 border-ghibli-green-300 border-t-ghibli-green-600 rounded-full animate-spin" />
          <p class="text-ghibli-brown-400 text-sm">Memuat data insights...</p>
        </div>
      </div>

      <div v-else>
        <p
          class="mb-6 text-xs sm:text-sm rounded-2xl px-4 py-3 border"
          :class="isMock ? 'border-amber-200 bg-amber-50/70 text-ghibli-brown-700' : 'border-emerald-200 bg-emerald-50/70 text-ghibli-brown-700'"
          data-aos="fade-up"
        >
          <span class="font-bold" :class="isMock ? 'text-amber-800' : 'text-emerald-800'">{{ isMock ? 'Data Estimasi' : 'Data Live' }}</span>
          {{ isMock
            ? ` — hubungkan ulang token Meta agar live${lastUpdatedLabel ? ' • update ' + lastUpdatedLabel : ''}.`
            : ' — langsung dari Meta Graph API.' }}
        </p>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div
            v-for="(metric, index) in [
              { label: 'Followers', value: metrics.followers },
              { label: 'Jangkauan', value: metrics.reach },
              { label: 'Engagement', value: contentStats.engagementRate, suffix: '%' },
              { label: 'Rata-rata Likes', value: contentStats.avgLikes },
            ]"
            :key="metric.label"
            class="ghibli-card p-5 text-center shadow-ghibli"
            data-aos="fade-up"
            :data-aos-delay="100 + index * 80"
          >
            <p class="text-2xl sm:text-3xl font-bold text-ghibli-brown-700 font-ghibli">
              {{ metric.suffix ? metric.value + metric.suffix : formatNumber(metric.value) }}
            </p>
            <p class="text-ghibli-brown-400 text-xs sm:text-sm mt-1">{{ metric.label }}</p>
          </div>
        </div>

        <div class="ghibli-card p-6 shadow-ghibli mb-8" data-aos="fade-up">
          <h3 class="text-lg font-ghibli font-semibold text-ghibli-brown-700 mb-4">
            Tren 10 Postingan Terakhir
          </h3>
          <div class="h-[280px]">
            <Line :data="recentTrendData" :options="lineChartOptions" />
          </div>
        </div>

        <div v-if="contentStats.topPosts.length" data-aos="fade-up">
          <h3 class="text-lg font-ghibli font-semibold text-ghibli-brown-700 mb-4">
            Top 3 Postingan
          </h3>
          <div class="grid grid-cols-3 gap-4">
            <a
              v-for="post in contentStats.topPosts"
              :key="post.id"
              :href="post.permalink"
              target="_blank"
              rel="noopener noreferrer"
              class="group relative aspect-square rounded-xl overflow-hidden shadow-ghibli hover:shadow-ghibli-hover transition-all duration-300"
            >
              <img
                :src="post.thumbnail_url || post.media_url"
                :alt="truncateCaption(post.caption)"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <span class="text-white text-xs sm:text-sm font-semibold flex items-center gap-1">
                  <Icon name="mdi:heart" class="w-4 h-4" />
                  {{ formatNumber(post.like_count) }}
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

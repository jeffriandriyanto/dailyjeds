<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line, Doughnut, Bar } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

type TabId = 'overview' | 'audience' | 'performance'

interface Tab {
  id: TabId
  label: string
  icon: string
}

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

const tabs: Tab[] = [
  { id: 'overview', label: 'Account Overview', icon: 'mdi:chart-line' },
  { id: 'audience', label: 'Audience Demographics', icon: 'mdi:account-group' },
  { id: 'performance', label: 'Content Performance', icon: 'mdi:video-outline' },
]

const activeTab = ref<TabId>('overview')

const setActiveTab = (tabId: TabId) => {
  activeTab.value = tabId
}

const { data: insightsData, status } = await useFetch('/api/instagram/insights', {
  key: 'instagram-insights',
  getCachedData: (key, nuxt) => {
    return nuxt.payload.data[key] || nuxt.static.data[key]
  },
})

const account = computed(() => {
  const raw = insightsData.value as any
  return raw?.account || { name: '', username: '', followers_count: 0, media_count: 0, profile_picture_url: null }
})

const isMock = computed(() => {
  const raw = insightsData.value as any
  return raw?.isMock === true || !!raw?.error
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

  const followers = account.value?.followers_count || 0

  return {
    impressions: getMetricValue('impressions'),
    reach: getMetricValue('reach'),
    profileViews: getMetricValue('profile_views'),
    followers,
    mediaCount: account.value?.media_count || 0,
  }
})

const contentStats = computed(() => {
  const posts = mediaPosts.value
  if (!posts.length) {
    return {
      avgLikes: 0,
      avgComments: 0,
      totalLikes: 0,
      totalComments: 0,
      engagementRate: 0,
      videoCount: 0,
      imageCount: 0,
      carouselCount: 0,
      topPost: null,
      recentPosts: [],
    }
  }

  const totalLikes = posts.reduce((sum, p) => sum + (p.like_count || 0), 0)
  const totalComments = posts.reduce((sum, p) => sum + (p.comments_count || 0), 0)
  const avgLikes = Math.round(totalLikes / posts.length)
  const avgComments = Math.round(totalComments / posts.length)
  const engagementRate = metrics.value.followers > 0 
    ? Number(((totalLikes + totalComments) / (metrics.value.followers * posts.length) * 100).toFixed(2))
    : 0

  const videoCount = posts.filter(p => p.media_type === 'VIDEO').length
  const imageCount = posts.filter(p => p.media_type === 'IMAGE').length
  const carouselCount = posts.filter(p => p.media_type === 'CAROUSEL_ALBUM').length

  const topPost = [...posts].sort((a, b) => (b.like_count || 0) - (a.like_count || 0))[0]

  return {
    avgLikes,
    avgComments,
    totalLikes,
    totalComments,
    engagementRate,
    videoCount,
    imageCount,
    carouselCount,
    topPost,
    recentPosts: posts.slice(0, 6),
  }
})

const monthlyTrendData = computed(() => {
  const posts = mediaPosts.value
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des']
  
  const monthlyData: Record<string, { likes: number; comments: number; count: number }> = {}
  
  posts.forEach(post => {
    const date = new Date(post.timestamp)
    const monthKey = months[date.getMonth()]
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { likes: 0, comments: 0, count: 0 }
    }
    monthlyData[monthKey].likes += post.like_count || 0
    monthlyData[monthKey].comments += post.comments_count || 0
    monthlyData[monthKey].count++
  })

  const currentMonth = new Date().getMonth()
  const last6Months = []
  for (let i = 2; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12
    last6Months.push(months[monthIndex])
  }

  return {
    labels: last6Months,
    datasets: [
      {
        label: 'Total Likes',
        data: last6Months.map(m => monthlyData[m]?.likes || 0),
        borderColor: '#80B165',
        backgroundColor: 'rgba(128, 177, 101, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#80B165',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
      {
        label: 'Total Comments',
        data: last6Months.map(m => monthlyData[m]?.comments || 0),
        borderColor: '#FFCA28',
        backgroundColor: 'rgba(255, 202, 40, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#FFCA28',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  }
})

const contentTypeData = computed(() => ({
  labels: ['Reels/Video', 'Foto', 'Carousel'],
  datasets: [
    {
      data: [contentStats.value.videoCount, contentStats.value.imageCount, contentStats.value.carouselCount],
      backgroundColor: ['#80B165', '#FFCA28', '#B07D4F'],
      borderColor: ['#6B9F50', '#FFB300', '#8B6914'],
      borderWidth: 2,
      hoverOffset: 4,
    },
  ],
}))

const topPostsData = computed(() => {
  const posts = [...mediaPosts.value]
    .sort((a, b) => (b.like_count || 0) - (a.like_count || 0))
    .slice(0, 5)

  return {
    labels: posts.map(p => {
      const caption = p.caption || 'No caption'
      return caption.length > 25 ? caption.substring(0, 25) + '...' : caption
    }),
    datasets: [
      {
        label: 'Likes',
        data: posts.map(p => p.like_count || 0),
        backgroundColor: 'rgba(128, 177, 101, 0.8)',
        borderColor: '#80B165',
        borderWidth: 1,
        borderRadius: 4,
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

const doughnutChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '65%',
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
}

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
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
      ticks: {
        color: '#9C7C4C',
        font: { size: 11 },
        callback: (value: any) => {
          if (value >= 1000) return (value / 1000).toFixed(0) + 'K'
          return value
        },
      },
    },
    y: {
      grid: { color: 'rgba(139, 105, 20, 0.08)' },
      ticks: { color: '#6D5538', font: { size: 10 } },
    },
  },
}

const formatNumber = (num: number | undefined | null): string => {
  if (num === undefined || num === null || isNaN(num)) return '0'
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

const truncateCaption = (caption?: string, maxLength = 40) => {
  if (!caption) return 'No caption'
  if (caption.length <= maxLength) return caption
  return caption.substring(0, maxLength).trim() + '...'
}
</script>

<template>
  <section id="mediakit" class="relative py-24 lg:py-32 overflow-hidden ghibli-section">
    <div class="absolute inset-0 bg-gradient-to-b from-ghibli-cream via-ghibli-cream-light to-ghibli-cream-warm" />
    
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ghibli-green-200 to-transparent" />
    <div class="absolute top-40 right-0 w-72 h-72 bg-ghibli-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-float" />
    <div class="absolute bottom-40 left-0 w-64 h-64 bg-ghibli-amber-200 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-float" style="animation-delay: -3s;" />

    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12" data-aos="fade-up">
        <p class="text-ghibli-green-600 font-medium tracking-wider uppercase text-sm mb-4">
          Media Kit
        </p>
        <h2 class="text-4xl sm:text-5xl font-ghibli font-bold ghibli-text-gradient mb-4">
          Instagram Insights
        </h2>
        <p class="text-ghibli-brown-400 max-w-lg mx-auto">
          Data analitik @daily.jeds sebagai referensi kolaborasi
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-2 mb-10" data-aos="fade-up" data-aos-delay="100">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300"
          :class="[
            activeTab === tab.id
              ? 'bg-ghibli-green-500 text-white shadow-ghibli'
              : 'bg-ghibli-cream-light text-ghibli-brown-500 hover:bg-ghibli-green-100 hover:text-ghibli-green-700'
          ]"
          @click="setActiveTab(tab.id)"
        >
          <Icon :name="tab.icon" class="w-5 h-5" />
          <span class="hidden sm:inline">{{ tab.label }}</span>
        </button>
      </div>

      <div v-if="status === 'pending'" class="flex items-center justify-center py-20">
        <div class="flex flex-col items-center gap-4">
          <div class="w-10 h-10 border-3 border-ghibli-green-300 border-t-ghibli-green-600 rounded-full animate-spin" />
          <p class="text-ghibli-brown-400 text-sm">Memuat data insights...</p>
        </div>
      </div>

      <div v-else>
        <div v-if="isMock" class="mb-6" data-aos="fade-up">
          <div class="ghibli-card p-4 border-l-4 border-ghibli-amber-400 bg-ghibli-amber-50">
            <div class="flex items-center gap-3">
              <Icon name="mdi:information-outline" class="w-5 h-5 text-ghibli-amber-600 flex-shrink-0" />
              <p class="text-ghibli-brown-600 text-sm">
                <span class="font-semibold">Preview Mode:</span> Menampilkan data contoh. Data real akan muncul setelah integrasi Instagram Graph API aktif.
              </p>
            </div>
          </div>
        </div>

        <Transition
          enter-active-class="transition-all duration-400 ease-out"
          enter-from-class="opacity-0 translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-4"
          mode="out-in"
        >
          <div v-if="activeTab === 'overview'" key="overview">
            <div v-if="account?.name" class="ghibli-card p-6 shadow-ghibli mb-6" data-aos="fade-up" data-aos-delay="150">
              <div class="flex flex-col sm:flex-row items-center gap-6">
                <div v-if="account.profile_picture_url" class="w-20 h-20 rounded-full overflow-hidden shadow-ghibli flex-shrink-0">
                  <img :src="account.profile_picture_url" :alt="account.name" class="w-full h-full object-cover" />
                </div>
                <div v-else class="w-20 h-20 rounded-full bg-gradient-to-br from-ghibli-green-400 to-ghibli-amber-400 flex items-center justify-center shadow-ghibli flex-shrink-0">
                  <Icon name="mdi:account" class="w-10 h-10 text-white" />
                </div>
                <div class="text-center sm:text-left flex-1">
                  <h3 class="text-2xl font-ghibli font-bold text-ghibli-brown-700">{{ account.name }}</h3>
                  <p class="text-ghibli-amber-600 font-lazy">@{{ account.username }}</p>
                  <p class="text-ghibli-brown-400 text-sm mt-1">{{ formatNumber(account.media_count) }} posts</p>
                </div>
              </div>
            </div>

            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div
                v-for="(metric, index) in [
                  { label: 'Followers', value: metrics.followers, icon: 'mdi:account-group', color: 'text-ghibli-green-600', bg: 'bg-ghibli-green-100' },
                  { label: 'Impressions', value: metrics.impressions, icon: 'mdi:eye', color: 'text-ghibli-amber-600', bg: 'bg-ghibli-amber-100' },
                  { label: 'Reach', value: metrics.reach, icon: 'mdi:chart-bar', color: 'text-ghibli-wood-500', bg: 'bg-ghibli-wood-100' },
                  { label: 'Profile Visits', value: metrics.profileViews, icon: 'mdi:account-arrow-right', color: 'text-ghibli-brown-500', bg: 'bg-ghibli-brown-100' },
                ]"
                :key="metric.label"
                class="ghibli-card p-6 shadow-ghibli hover:shadow-ghibli-hover transition-all duration-300 hover:-translate-y-1"
                data-aos="fade-up"
                :data-aos-delay="200 + index * 80"
              >
                <div class="flex items-center gap-3 mb-3">
                  <div :class="[metric.bg, 'w-10 h-10 rounded-lg flex items-center justify-center']">
                    <Icon :name="metric.icon" class="w-5 h-5" :class="metric.color" />
                  </div>
                  <span class="text-ghibli-brown-400 text-sm">{{ metric.label }}</span>
                </div>
                <p class="text-3xl font-bold text-ghibli-brown-700 font-ghibli">
                  {{ formatNumber(metric.value) }}
                </p>
              </div>
            </div>

            <div class="ghibli-card p-6 shadow-ghibli" data-aos="fade-up" data-aos-delay="500">
              <h3 class="text-lg font-ghibli font-semibold text-ghibli-brown-700 mb-4">
                Tren Engagement (3 Bulan Terakhir)
              </h3>
              <div class="h-[300px] sm:h-[350px]">
                <Line :data="monthlyTrendData" :options="lineChartOptions" />
              </div>
            </div>
          </div>

          <div v-else-if="activeTab === 'audience'" key="audience">
            <div class="ghibli-card p-6 shadow-ghibli mb-6" data-aos="fade-up" data-aos-delay="200">
              <h3 class="text-lg font-ghibli font-semibold text-ghibli-brown-700 mb-6">
                Statistik Engagement
              </h3>
              <div class="grid sm:grid-cols-3 gap-6">
                <div class="text-center p-6 bg-ghibli-cream-light rounded-xl">
                  <div class="w-14 h-14 mx-auto mb-3 rounded-full bg-ghibli-green-100 flex items-center justify-center">
                    <Icon name="mdi:chart-areaspline" class="w-7 h-7 text-ghibli-green-600" />
                  </div>
                  <p class="text-3xl font-bold text-ghibli-green-600 font-ghibli">{{ contentStats.engagementRate }}%</p>
                  <p class="text-ghibli-brown-400 text-sm mt-1">Engagement Rate</p>
                </div>
                <div class="text-center p-6 bg-ghibli-cream-light rounded-xl">
                  <div class="w-14 h-14 mx-auto mb-3 rounded-full bg-ghibli-amber-100 flex items-center justify-center">
                    <Icon name="mdi:heart" class="w-7 h-7 text-ghibli-amber-600" />
                  </div>
                  <p class="text-3xl font-bold text-ghibli-amber-600 font-ghibli">{{ formatNumber(contentStats.avgLikes) }}</p>
                  <p class="text-ghibli-brown-400 text-sm mt-1">Avg. Likes/Post</p>
                </div>
                <div class="text-center p-6 bg-ghibli-cream-light rounded-xl">
                  <div class="w-14 h-14 mx-auto mb-3 rounded-full bg-ghibli-wood-100 flex items-center justify-center">
                    <Icon name="mdi:comment" class="w-7 h-7 text-ghibli-wood-500" />
                  </div>
                  <p class="text-3xl font-bold text-ghibli-wood-500 font-ghibli">{{ formatNumber(contentStats.avgComments) }}</p>
                  <p class="text-ghibli-brown-400 text-sm mt-1">Avg. Comments/Post</p>
                </div>
              </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-6">
              <div class="ghibli-card p-6 shadow-ghibli" data-aos="fade-up" data-aos-delay="300">
                <h3 class="text-lg font-ghibli font-semibold text-ghibli-brown-700 mb-4">
                  Total Engagement
                </h3>
                <div class="space-y-4">
                  <div class="flex items-center justify-between p-4 bg-ghibli-cream-light rounded-xl">
                    <div class="flex items-center gap-3">
                      <Icon name="mdi:heart" class="w-6 h-6 text-red-500" />
                      <span class="text-ghibli-brown-600">Total Likes</span>
                    </div>
                    <span class="text-xl font-bold text-ghibli-brown-700 font-ghibli">{{ formatNumber(contentStats.totalLikes) }}</span>
                  </div>
                  <div class="flex items-center justify-between p-4 bg-ghibli-cream-light rounded-xl">
                    <div class="flex items-center gap-3">
                      <Icon name="mdi:comment" class="w-6 h-6 text-blue-500" />
                      <span class="text-ghibli-brown-600">Total Comments</span>
                    </div>
                    <span class="text-xl font-bold text-ghibli-brown-700 font-ghibli">{{ formatNumber(contentStats.totalComments) }}</span>
                  </div>
                </div>
              </div>

              <div class="ghibli-card p-6 shadow-ghibli" data-aos="fade-up" data-aos-delay="400">
                <h3 class="text-lg font-ghibli font-semibold text-ghibli-brown-700 mb-4">
                  Reach & Impressions
                </h3>
                <div class="space-y-4">
                  <div class="flex items-center justify-between p-4 bg-ghibli-cream-light rounded-xl">
                    <div class="flex items-center gap-3">
                      <Icon name="mdi:eye" class="w-6 h-6 text-ghibli-amber-600" />
                      <span class="text-ghibli-brown-600">Impressions</span>
                    </div>
                    <span class="text-xl font-bold text-ghibli-brown-700 font-ghibli">{{ formatNumber(metrics.impressions) }}</span>
                  </div>
                  <div class="flex items-center justify-between p-4 bg-ghibli-cream-light rounded-xl">
                    <div class="flex items-center gap-3">
                      <Icon name="mdi:chart-bar" class="w-6 h-6 text-ghibli-wood-500" />
                      <span class="text-ghibli-brown-600">Reach</span>
                    </div>
                    <span class="text-xl font-bold text-ghibli-brown-700 font-ghibli">{{ formatNumber(metrics.reach) }}</span>
                  </div>
                  <div class="flex items-center justify-between p-4 bg-ghibli-cream-light rounded-xl">
                    <div class="flex items-center gap-3">
                      <Icon name="mdi:account-arrow-right" class="w-6 h-6 text-ghibli-brown-500" />
                      <span class="text-ghibli-brown-600">Profile Visits</span>
                    </div>
                    <span class="text-xl font-bold text-ghibli-brown-700 font-ghibli">{{ formatNumber(metrics.profileViews) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="activeTab === 'performance'" key="performance">
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div
                v-for="(metric, index) in [
                  { label: 'Avg. Likes', value: contentStats.avgLikes, icon: 'mdi:heart', color: 'text-red-500', bg: 'bg-red-50' },
                  { label: 'Avg. Comments', value: contentStats.avgComments, icon: 'mdi:comment', color: 'text-blue-500', bg: 'bg-blue-50' },
                  { label: 'Engagement Rate', value: contentStats.engagementRate, suffix: '%', icon: 'mdi:chart-areaspline', color: 'text-ghibli-green-600', bg: 'bg-ghibli-green-100' },
                  { label: 'Total Posts', value: metrics.mediaCount, icon: 'mdi:image-multiple', color: 'text-ghibli-amber-600', bg: 'bg-ghibli-amber-100' },
                ]"
                :key="metric.label"
                class="ghibli-card p-6 shadow-ghibli hover:shadow-ghibli-hover transition-all duration-300 hover:-translate-y-1"
                data-aos="fade-up"
                :data-aos-delay="200 + index * 80"
              >
                <div class="flex items-center gap-3 mb-3">
                  <div :class="[metric.bg, 'w-10 h-10 rounded-lg flex items-center justify-center']">
                    <Icon :name="metric.icon" class="w-5 h-5" :class="metric.color" />
                  </div>
                  <span class="text-ghibli-brown-400 text-sm">{{ metric.label }}</span>
                </div>
                <p class="text-3xl font-bold text-ghibli-brown-700 font-ghibli">
                  {{ metric.suffix ? metric.value + metric.suffix : formatNumber(metric.value) }}
                </p>
              </div>
            </div>

            <div class="grid lg:grid-cols-2 gap-6 mb-6">
              <div class="ghibli-card p-6 shadow-ghibli" data-aos="fade-up" data-aos-delay="500">
                <h3 class="text-lg font-ghibli font-semibold text-ghibli-brown-700 mb-4">
                  Distribusi Tipe Konten
                </h3>
                <div class="h-[250px] flex items-center justify-center">
                  <Doughnut :data="contentTypeData" :options="doughnutChartOptions" />
                </div>
              </div>

              <div class="ghibli-card p-6 shadow-ghibli" data-aos="fade-up" data-aos-delay="600">
                <h3 class="text-lg font-ghibli font-semibold text-ghibli-brown-700 mb-4">
                  Top 5 Posts by Likes
                </h3>
                <div class="h-[250px]">
                  <Bar :data="topPostsData" :options="barChartOptions" />
                </div>
              </div>
            </div>

            <div v-if="contentStats.topPost" class="ghibli-card p-6 shadow-ghibli" data-aos="fade-up" data-aos-delay="700">
              <h3 class="text-lg font-ghibli font-semibold text-ghibli-brown-700 mb-4">
                Top Performing Post
              </h3>
              <div class="flex flex-col sm:flex-row gap-6">
                <div class="w-full sm:w-48 aspect-square rounded-xl overflow-hidden shadow-ghibli flex-shrink-0">
                  <img
                    :src="contentStats.topPost.thumbnail_url || contentStats.topPost.media_url"
                    :alt="truncateCaption(contentStats.topPost.caption)"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="flex-1">
                  <p class="text-ghibli-brown-600 leading-relaxed mb-4">
                    {{ contentStats.topPost.caption?.substring(0, 200) }}{{ contentStats.topPost.caption && contentStats.topPost.caption.length > 200 ? '...' : '' }}
                  </p>
                  <div class="flex flex-wrap gap-4">
                    <div class="flex items-center gap-2">
                      <Icon name="mdi:heart" class="w-5 h-5 text-red-500" />
                      <span class="text-ghibli-brown-700 font-medium">{{ formatNumber(contentStats.topPost.like_count) }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <Icon name="mdi:comment" class="w-5 h-5 text-blue-500" />
                      <span class="text-ghibli-brown-700 font-medium">{{ contentStats.topPost.comments_count }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <Icon name="mdi:calendar" class="w-5 h-5 text-ghibli-brown-400" />
                      <span class="text-ghibli-brown-500 text-sm">{{ formatDate(contentStats.topPost.timestamp) }}</span>
                    </div>
                  </div>
                  <a
                    :href="contentStats.topPost.permalink"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 mt-4 text-ghibli-green-600 hover:text-ghibli-green-700 transition-colors text-sm font-medium"
                  >
                    <Icon name="mdi:instagram" class="w-4 h-4" />
                    <span>Lihat di Instagram</span>
                  </a>
                </div>
              </div>
            </div>

            <div class="ghibli-card p-6 shadow-ghibli mt-6" data-aos="fade-up" data-aos-delay="800">
              <h3 class="text-lg font-ghibli font-semibold text-ghibli-brown-700 mb-4">
                Recent Posts
              </h3>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <a
                  v-for="post in contentStats.recentPosts"
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
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div class="absolute bottom-0 left-0 right-0 p-3">
                      <div class="flex items-center gap-3 text-white text-sm">
                        <span class="flex items-center gap-1">
                          <Icon name="mdi:heart" class="w-4 h-4" />
                          {{ formatNumber(post.like_count) }}
                        </span>
                        <span class="flex items-center gap-1">
                          <Icon name="mdi:comment" class="w-4 h-4" />
                          {{ post.comments_count }}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

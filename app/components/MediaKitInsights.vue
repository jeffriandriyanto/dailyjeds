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
  return raw?.account || {}
})

const metrics = computed(() => {
  const raw = insightsData.value as any
  const insights = raw?.insights?.data || []
  
  const getMetricValue = (name: string) => {
    const metric = insights.find((m: any) => m.name === name)
    return metric?.values?.[0]?.value || 0
  }

  return {
    impressions: getMetricValue('impressions'),
    reach: getMetricValue('reach'),
    profileViews: getMetricValue('profile_views'),
    followers: account.value.followers_count || 8500,
  }
})

const monthlyTrendData = computed(() => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des']
  const currentMonth = new Date().getMonth()
  const last6Months = []
  
  for (let i = 5; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12
    last6Months.push(months[monthIndex])
  }

  return {
    labels: last6Months,
    datasets: [
      {
        label: 'Reach',
        data: [18500, 22300, 25800, 28400, 30200, 32800],
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
        label: 'Impressions',
        data: [28000, 32500, 36200, 40100, 42800, 45200],
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

const genderData = computed(() => ({
  labels: ['Female', 'Male'],
  datasets: [
    {
      data: [85, 15],
      backgroundColor: ['#B8D3A9', '#FFE082'],
      borderColor: ['#80B165', '#FFCA28'],
      borderWidth: 2,
      hoverOffset: 4,
    },
  ],
}))

const ageData = computed(() => ({
  labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
  datasets: [
    {
      label: 'Persentase Audiens',
      data: [15, 45, 25, 10, 5],
      backgroundColor: [
        'rgba(128, 177, 101, 0.7)',
        'rgba(128, 177, 101, 1)',
        'rgba(128, 177, 101, 0.8)',
        'rgba(128, 177, 101, 0.5)',
        'rgba(128, 177, 101, 0.3)',
      ],
      borderColor: '#80B165',
      borderWidth: 1,
      borderRadius: 4,
    },
  ],
}))

const cityData = computed(() => ({
  labels: ['Salatiga', 'Semarang', 'Jakarta', 'Surabaya', 'Yogyakarta'],
  datasets: [
    {
      label: 'Followers',
      data: [2800, 1500, 1200, 800, 600],
      backgroundColor: 'rgba(255, 202, 40, 0.8)',
      borderColor: '#FFCA28',
      borderWidth: 1,
      borderRadius: 4,
    },
  ],
}))

const contentPerformance = computed(() => {
  const raw = insightsData.value as any
  const media = raw?.media?.data || []
  
  const totalLikes = media.reduce((sum: number, m: any) => sum + (m.like_count || 0), 0)
  const totalComments = media.reduce((sum: number, m: any) => sum + (m.comments_count || 0), 0)
  const avgLikes = media.length ? Math.round(totalLikes / media.length) : 0
  const avgComments = media.length ? Math.round(totalComments / media.length) : 0
  
  const reelsCount = media.filter((m: any) => m.media_type === 'VIDEO').length
  const imageCount = media.filter((m: any) => m.media_type === 'IMAGE').length
  const carouselCount = media.filter((m: any) => m.media_type === 'CAROUSEL_ALBUM').length

  return {
    avgLikes,
    avgComments,
    avgViews: Math.round(avgLikes * 8.5),
    totalPosts: media.length || 245,
    reelsCount,
    imageCount,
    carouselCount,
    topPillars: [
      { name: 'Home Growth & DIY', percentage: 35 },
      { name: 'Family Lifestyle', percentage: 28 },
      { name: 'Product Reviews', percentage: 22 },
      { name: 'Tips & Hacks', percentage: 15 },
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
      callbacks: {
        label: (context: any) => ` ${context.label}: ${context.parsed}%`,
      },
    },
  },
}

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y' as const,
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
      grid: { color: 'rgba(139, 105, 20, 0.08)' },
      ticks: {
        color: '#9C7C4C',
        font: { size: 11 },
        callback: (value: any) => value + '%',
      },
    },
    y: {
      grid: { display: false },
      ticks: { color: '#6D5538', font: { size: 12 } },
    },
  },
}

const cityChartOptions = {
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
      ticks: { color: '#9C7C4C', font: { size: 11 } },
    },
    y: {
      grid: { color: 'rgba(139, 105, 20, 0.08)' },
      ticks: { color: '#6D5538', font: { size: 11 } },
    },
  },
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
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
                Tren Reach & Impressions (6 Bulan Terakhir)
              </h3>
              <div class="h-[300px] sm:h-[350px]">
                <Line :data="monthlyTrendData" :options="lineChartOptions" />
              </div>
            </div>
          </div>

          <div v-else-if="activeTab === 'audience'" key="audience">
            <div class="grid lg:grid-cols-2 gap-6 mb-6">
              <div class="ghibli-card p-6 shadow-ghibli" data-aos="fade-up" data-aos-delay="200">
                <h3 class="text-lg font-ghibli font-semibold text-ghibli-brown-700 mb-4">
                  Demografi Gender
                </h3>
                <div class="h-[280px] flex items-center justify-center">
                  <Doughnut :data="genderData" :options="doughnutChartOptions" />
                </div>
              </div>

              <div class="ghibli-card p-6 shadow-ghibli" data-aos="fade-up" data-aos-delay="300">
                <h3 class="text-lg font-ghibli font-semibold text-ghibli-brown-700 mb-4">
                  Rentang Usia
                </h3>
                <div class="h-[280px]">
                  <Bar :data="ageData" :options="barChartOptions" />
                </div>
              </div>
            </div>

            <div class="ghibli-card p-6 shadow-ghibli" data-aos="fade-up" data-aos-delay="400">
              <h3 class="text-lg font-ghibli font-semibold text-ghibli-brown-700 mb-4">
                Top Lokasi Kota
              </h3>
              <div class="h-[280px]">
                <Bar :data="cityData" :options="cityChartOptions" />
              </div>
            </div>
          </div>

          <div v-else-if="activeTab === 'performance'" key="performance">
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div
                v-for="(metric, index) in [
                  { label: 'Avg. Likes/Post', value: contentPerformance.avgLikes, icon: 'mdi:heart', color: 'text-red-500', bg: 'bg-red-50' },
                  { label: 'Avg. Comments', value: contentPerformance.avgComments, icon: 'mdi:comment', color: 'text-blue-500', bg: 'bg-blue-50' },
                  { label: 'Avg. Views/Reels', value: contentPerformance.avgViews, icon: 'mdi:play-circle', color: 'text-ghibli-green-600', bg: 'bg-ghibli-green-100' },
                  { label: 'Total Posts', value: contentPerformance.totalPosts, icon: 'mdi:image-multiple', color: 'text-ghibli-amber-600', bg: 'bg-ghibli-amber-100' },
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

            <div class="grid lg:grid-cols-2 gap-6">
              <div class="ghibli-card p-6 shadow-ghibli" data-aos="fade-up" data-aos-delay="500">
                <h3 class="text-lg font-ghibli font-semibold text-ghibli-brown-700 mb-4">
                  Distribusi Tipe Konten
                </h3>
                <div class="space-y-4">
                  <div
                    v-for="type in [
                      { label: 'Reels/Video', count: contentPerformance.releasesCount, total: contentPerformance.totalPosts, color: 'bg-ghibli-green-500' },
                      { label: 'Foto', count: contentPerformance.imageCount, total: contentPerformance.totalPosts, color: 'bg-ghibli-amber-500' },
                      { label: 'Carousel', count: contentPerformance.carouselCount, total: contentPerformance.totalPosts, color: 'bg-ghibli-wood-500' },
                    ]"
                    :key="type.label"
                  >
                    <div class="flex items-center justify-between mb-1">
                      <span class="text-ghibli-brown-600 text-sm">{{ type.label }}</span>
                      <span class="text-ghibli-brown-500 text-sm font-medium">
                        {{ type.total ? Math.round((type.count / type.total) * 100) : 0 }}%
                      </span>
                    </div>
                    <div class="w-full h-3 bg-ghibli-cream rounded-full overflow-hidden">
                      <div
                        class="h-full rounded-full transition-all duration-700"
                        :class="type.color"
                        :style="{ width: `${type.total ? (type.count / type.total) * 100 : 0}%` }"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="ghibli-card p-6 shadow-ghibli" data-aos="fade-up" data-aos-delay="600">
                <h3 class="text-lg font-ghibli font-semibold text-ghibli-brown-700 mb-4">
                  Top Content Pillars
                </h3>
                <div class="space-y-4">
                  <div
                    v-for="pillar in contentPerformance.topPillars"
                    :key="pillar.name"
                    class="flex items-center gap-4"
                  >
                    <div class="flex-1">
                      <div class="flex items-center justify-between mb-1">
                        <span class="text-ghibli-brown-600 text-sm">{{ pillar.name }}</span>
                        <span class="text-ghibli-brown-500 text-sm font-medium">{{ pillar.percentage }}%</span>
                      </div>
                      <div class="w-full h-3 bg-ghibli-cream rounded-full overflow-hidden">
                        <div
                          class="h-full bg-ghibli-green-500 rounded-full transition-all duration-700"
                          :style="{ width: `${pillar.percentage}%` }"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

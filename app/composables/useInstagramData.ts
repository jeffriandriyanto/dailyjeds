export const useInstagramData = () => {
  const { data, status, error, refresh } = useFetch('/api/instagram/insights', {
    key: 'instagram-insights',
    // Lazy: jangan block SSR/TTFB homepage menunggu Meta API.
    // Komponen sudah punya fallback angka sehingga aman render duluan.
    lazy: true,
    // Refresh berkala di client agar angka tidak beku sampai redeploy.
    // Server juga sudah di-cache 6 jam (stale 24 jam).
    dedupe: 'defer',
    getCachedData: (key, nuxt) => {
      return nuxt.payload.data[key] || nuxt.static.data[key]
    },
  })

  const account = computed(() => {
    const raw = data.value as any
    return raw?.account || {
      name: 'Daily Jeds',
      username: 'daily.jeds',
      followers_count: 0,
      media_count: 0,
      profile_picture_url: null,
    }
  })

  const insights = computed(() => {
    const raw = data.value as any
    return raw?.insights?.data || []
  })

  const media = computed(() => {
    const raw = data.value as any
    return raw?.media?.data || []
  })

  const getMetric = (name: string): number => {
    const metric = insights.value.find((m: any) => m.name === name)
    return metric?.total_value?.value || metric?.values?.[0]?.value || 0
  }

  const followersCount = computed(() => account.value?.followers_count || 12997)
  const viewsCount = computed(() => getMetric('views') || getMetric('impressions') || 37105)
  const reachCount = computed(() => getMetric('reach') || 21296)
  const interactionsCount = computed(() => getMetric('total_interactions') || 2492)
  const accountsEngagedCount = computed(() => getMetric('accounts_engaged') || 1746)
  const profileViewsCount = computed(() => getMetric('profile_views') || 331)
  const mediaCount = computed(() => account.value?.media_count || 368)

  const formatNumber = (num: number): string => {
    if (!num) return '0'
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const formattedFollowers = computed(() => {
    const count = followersCount.value
    if (!count) return '13K'
    return formatNumber(count)
  })

  const formattedViews = computed(() => formatNumber(viewsCount.value))
  const formattedReach = computed(() => formatNumber(reachCount.value))
  const formattedInteractions = computed(() => formatNumber(interactionsCount.value))
  const formattedAccountsEngaged = computed(() => formatNumber(accountsEngagedCount.value))

  const isEstimate = computed(() => {
    const raw = data.value as any
    return raw?.isMock === true || raw?.isEstimate === true || !!raw?.estimateReason
  })

  const lastUpdated = computed(() => (data.value as any)?.lastUpdated || null)

  return {
    data,
    status,
    error,
    refresh,
    isEstimate,
    lastUpdated,
    account,
    media,
    followersCount,
    formattedFollowers,
    viewsCount,
    formattedViews,
    reachCount,
    formattedReach,
    interactionsCount,
    formattedInteractions,
    accountsEngagedCount,
    formattedAccountsEngaged,
    profileViewsCount,
    mediaCount,
    formatNumber,
  }
}

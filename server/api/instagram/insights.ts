export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  const INSTAGRAM_ACCOUNT_ID = config.instagramAccountId
  const ACCESS_TOKEN = config.instagramToken
  
  if (!INSTAGRAM_ACCOUNT_ID || !ACCESS_TOKEN) {
    return getMockInsights()
  }

  try {
    const [accountData, insightsData, mediaData] = await Promise.all([
      fetchAccountData(INSTAGRAM_ACCOUNT_ID, ACCESS_TOKEN),
      fetchInsights(INSTAGRAM_ACCOUNT_ID, ACCESS_TOKEN),
      fetchRecentMedia(INSTAGRAM_ACCOUNT_ID, ACCESS_TOKEN),
    ])

    return {
      account: accountData,
      insights: insightsData,
      media: mediaData,
    }
  } catch (error: any) {
    console.error('Instagram Insights Error:', error?.message || error)
    return getMockInsights()
  }
})

async function fetchAccountData(accountId: string, token: string) {
  const fields = 'name,username,followers_count,media_count,profile_picture_url'
  const url = `https://graph.facebook.com/v21.0/${accountId}?fields=${fields}&access_token=${token}`
  return await $fetch(url)
}

async function fetchInsights(accountId: string, token: string) {
  const metrics = 'impressions,reach,profile_views,follower_count'
  const period = 'day'
  const url = `https://graph.facebook.com/v21.0/${accountId}/insights?metric=${metrics}&period=${period}&access_token=${token}`
  return await $fetch(url)
}

async function fetchRecentMedia(accountId: string, token: string) {
  const fields = 'id,caption,media_type,like_count,comments_count,timestamp,permalink'
  const limit = 12
  const url = `https://graph.facebook.com/v21.0/${accountId}/media?fields=${fields}&limit=${limit}&access_token=${token}`
  return await $fetch(url)
}

function getMockInsights() {
  return {
    account: {
      name: 'Daily Jeds',
      username: 'daily.jeds',
      followers_count: 8500,
      media_count: 245,
      profile_picture_url: null,
    },
    insights: {
      data: [
        { name: 'impressions', values: [{ value: 45200 }] },
        { name: 'reach', values: [{ value: 32800 }] },
        { name: 'profile_views', values: [{ value: 1250 }] },
        { name: 'follower_count', values: [{ value: 8500 }] },
      ],
    },
    media: {
      data: generateMockMediaData(),
    },
    isMock: true,
  }
}

function generateMockMediaData() {
  const types = ['IMAGE', 'VIDEO', 'CAROUSEL_ALBUM']
  const captions = [
    'Momen pagi di rumah, anak-anak lagi asik main di ruang tamu #HomeGrowth #FamilyFirst',
    'Proyek DIY weekend: bikin rak dari palet bekas! #DIY #HomeDecor',
    'Review produk kebersihan yang aman buat keluarga #CleanHome #MomLife',
    'Cerita hari ini: drama pagi karena sepatu hilang 😅 #DailyJeds',
    'Before-after ruang kerja yang cozy #HomeOffice #Aesthetic',
    'Resep masakan simpel buat keluarga #HomeCooking #FamilyMeals',
    'Tips organize mainan anak biar rapi #Organization #MomHacks',
    'Weekend vibes di rumah aja #WeekendAtHome #FamilyTime',
  ]

  return captions.map((caption, i) => ({
    id: `mock_${i}`,
    caption,
    media_type: types[i % 3],
    like_count: Math.floor(Math.random() * 500) + 100,
    comments_count: Math.floor(Math.random() * 50) + 5,
    timestamp: new Date(Date.now() - i * 86400000 * 3).toISOString(),
    permalink: 'https://www.instagram.com/daily.jeds',
  }))
}

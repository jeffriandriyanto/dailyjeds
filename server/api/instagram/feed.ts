export default defineCachedEventHandler(async () => {
  const config = useRuntimeConfig()

  const accountId = config.instagramAccountId as string | undefined
  const token = config.metaAccessToken as string | undefined

  if (!accountId || !token) {
    return { posts: [], isMock: true, reason: 'missing_env' }
  }

  try {
    const fields = 'id,caption,media_type,like_count,comments_count,timestamp,permalink,media_url,thumbnail_url'
    const res = await $fetch<{ data: any[] }>(
      `https://graph.facebook.com/v25.0/${accountId}/media?fields=${fields}&limit=25&access_token=${encodeURIComponent(token)}`,
    )

    const all = res.data || []
    // Video (Reels) dulu, kekurangannya dilengkapi foto/carousel.
    const videos = all.filter((m) => m.media_type === 'VIDEO')
    const others = all.filter((m) => m.media_type !== 'VIDEO')
    const posts = [...videos, ...others].slice(0, 12)

    return { posts, isMock: false, lastUpdated: new Date().toISOString() }
  } catch (e: any) {
    console.warn('Instagram feed fetch failed:', e?.message)
    return { posts: [], isMock: true, reason: 'api_error' }
  }
}, {
  // Sama seperti insights: cache 6 jam, stale 24 jam.
  maxAge: 6 * 60 * 60,
  staleMaxAge: 24 * 60 * 60,
  swr: true,
})

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  const INSTAGRAM_ACCOUNT_ID = config.instagramAccountId
  const ACCESS_TOKEN = config.instagramToken
  
  if (!INSTAGRAM_ACCOUNT_ID || !ACCESS_TOKEN) {
    return {
      error: 'Instagram API not configured',
      posts: [],
    }
  }

  const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp'
  const limit = 9
  
  const url = `https://graph.facebook.com/v25.0/${INSTAGRAM_ACCOUNT_ID}/media?fields=${fields}&limit=${limit}&access_token=${ACCESS_TOKEN}`

  try {
    const response = await $fetch<{
      data: Array<{
        id: string
        caption?: string
        media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
        media_url: string
        thumbnail_url?: string
        permalink: string
        timestamp: string
      }>
      paging?: {
        next?: string
        previous?: string
      }
    }>(url)

    return {
      posts: response.data || [],
    }
  } catch (error: any) {
    console.error('Instagram API Error:', error?.message || error)
    return {
      error: 'Failed to fetch Instagram posts',
      posts: [],
    }
  }
})

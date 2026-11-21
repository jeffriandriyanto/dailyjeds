export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const accountId = config.instagramAccountId as string | undefined
  const token = config.metaAccessToken as string | undefined

  if (!accountId || !token) {
    return {
      ok: false,
      reason: 'missing_env',
      message: 'NUXT_INSTAGRAM_ACCOUNT_ID / NUXT_META_ACCESS_TOKEN belum dipasang.',
    }
  }

  try {
    const me = await $fetch<any>(`https://graph.facebook.com/v25.0/me?access_token=${token}`)
    const account = await $fetch<any>(
      `https://graph.facebook.com/v25.0/${accountId}?fields=username,followers_count,media_count&access_token=${token}`,
    )
    return {
      ok: true,
      user: me?.name || me?.id || 'connected',
      account,
      checkedAt: new Date().toISOString(),
    }
  } catch (e: any) {
    return {
      ok: false,
      reason: 'invalid_token',
      message: e?.message || 'Token tidak valid / expired.',
      checkedAt: new Date().toISOString(),
    }
  }
})

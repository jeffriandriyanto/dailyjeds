#!/usr/bin/env node
/**
 * Tukar short-lived Meta User Token jadi long-lived (~60 hari)
 * + validasi ke Instagram Graph API.
 *
 * Cara pakai:
 *   APP_ID=xxx APP_SECRET=yyy node scripts/refresh-ig-token.mjs SHORT_TOKEN
 *   atau:
 *   node scripts/refresh-ig-token.mjs --app-id xxx --app-secret yyy --token SHORT_TOKEN --account-id 17841466398772538
 *
 * Output: LONG_TOKEN siap pasang ke .env / Netlify:
 *   NUXT_META_ACCESS_TOKEN=<long_token>
 */

const args = process.argv.slice(2)

function getArg(name) {
  const i = args.findIndex((a) => a === name || a.startsWith(name + '='))
  if (i === -1) return undefined
  const a = args[i]
  if (a.includes('=')) return a.split('=').slice(1).join('=')
  return args[i + 1]
}

const APP_ID = getArg('--app-id') || process.env.APP_ID || process.env.META_APP_ID
const APP_SECRET = getArg('--app-secret') || process.env.APP_SECRET || process.env.META_APP_SECRET
const SHORT_TOKEN =
  getArg('--token') || args.find((a) => !a.startsWith('--')) || process.env.SHORT_TOKEN
const ACCOUNT_ID =
  getArg('--account-id') || process.env.NUXT_INSTAGRAM_ACCOUNT_ID || '17841466398772538'

if (!APP_ID || !APP_SECRET || !SHORT_TOKEN) {
  console.error(`Pakai:
  APP_ID=xxx APP_SECRET=yyy node scripts/refresh-ig-token.mjs SHORT_TOKEN

Opsional:
  --account-id 17841466398772538`)
  process.exit(1)
}

async function main() {
  // 1. Tukar ke long-lived
  const exchangeUrl =
    `https://graph.facebook.com/v25.0/oauth/access_token` +
    `?grant_type=fb_exchange_token&client_id=${encodeURIComponent(APP_ID)}` +
    `&client_secret=${encodeURIComponent(APP_SECRET)}` +
    `&fb_exchange_token=${encodeURIComponent(SHORT_TOKEN)}`

  const exRes = await fetch(exchangeUrl)
  const exJson = await exRes.json()
  if (!exRes.ok || !exJson.access_token) {
    console.error('Gagal tukar token:', JSON.stringify(exJson, null, 2))
    process.exit(1)
  }
  const longToken = exJson.access_token
  console.log('\n✅ LONG_TOKEN (±60 hari):\n')
  console.log(longToken)
  console.log(`\nExpires in: ${exJson.expires_in || '?'} detik`)

  // 2. Validasi IG account
  const checkUrl =
    `https://graph.facebook.com/v25.0/${ACCOUNT_ID}` +
    `?fields=username,followers_count,media_count&access_token=${encodeURIComponent(longToken)}`
  const accRes = await fetch(checkUrl)
  const accJson = await accRes.json()
  if (!accRes.ok) {
    console.error('\n⚠️ Token tertukar tapi gagal baca IG account:', JSON.stringify(accJson, null, 2))
    process.exit(1)
  }

  console.log('\n✅ Valid! Account:')
  console.log(JSON.stringify(accJson, null, 2))
  console.log(`\nPasang ke .env lokal:
NUXT_INSTAGRAM_ACCOUNT_ID=${ACCOUNT_ID}
NUXT_META_ACCESS_TOKEN=${longToken}
`)
  console.log('Netlify: Site settings > Environment > tambah 2 var di atas > Trigger deploy ulang.')
}

main().catch((e) => {
  console.error('Error:', e?.message || e)
  process.exit(1)
})

# Cara Ambil Token Meta Terbaru (@daily.jeds)

Feed galeri homepage pakai **Meta Graph API sendiri** (`/api/instagram/feed`, 12 terakhir, video dulu). Token mati = grid disembunyikan + tampil link ke profil.
Angka follower / reach / chart di `/mediakit` pakai **Meta Graph API** — ini yang perlu token hidup.

## 1. Syarat
- IG `@daily.jeds` sudah Business/Creator dan terhubung ke FB Page
- Punya akses ke App di developers.facebook.com

## 2. Ambil Short-Lived Token (5 menit)
1. Buka `developers.facebook.com > App > Graph API Explorer`
2. `Get User Access Token`, centang:
   `pages_show_list, pages_read_engagement, instagram_basic, instagram_manage_insights`
3. Copy token pendeknya.

## 3. Tukar jadi Long-Lived (~60 hari)
```bash
APP_ID=xxx APP_SECRET=yyy node scripts/refresh-ig-token.mjs SHORT_TOKEN
```
Script akan output `LONG_TOKEN` + validasi `username,followers_count,media_count`.
Kalau mau manual via browser:
```
https://graph.facebook.com/v25.0/oauth/access_token?grant_type=fb_exchange_token&client_id=APP_ID&client_secret=APP_SECRET&fb_exchange_token=SHORT_TOKEN
```

## 4. Pasang
Lokal (jangan commit `.env`):
```
NUXT_INSTAGRAM_ACCOUNT_ID=17841466398772538
NUXT_META_ACCESS_TOKEN=<LONG_TOKEN>
```

Netlify:
`Site settings > Environment > NUXT_INSTAGRAM_ACCOUNT_ID + NUXT_META_ACCESS_TOKEN > Save > Trigger deploy`
Wajib redeploy karena `/api/instagram/insights` di-cache 6 jam + prerender.

## 5. Cek token masih hidup?
```bash
curl "https://graph.facebook.com/v25.0/me?access_token=TOKEN_LAMA"
curl "https://graph.facebook.com/v25.0/17841466398772538?fields=username,followers_count,media_count&access_token=TOKEN"
# atau:
curl "https://dailyjeds.netlify.app/api/instagram/status"
```
`Invalid OAuth` = expired, ulangi langkah 2-3.

Catat tanggal expired (H+60) di kalender — set reminder H+50.

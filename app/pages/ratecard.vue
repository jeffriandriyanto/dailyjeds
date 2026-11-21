<script setup lang="ts">
useHead({
  title: 'Rate Card - Daily Jeds (@daily.jeds)',
  meta: [
    {
      name: 'description',
      content:
        'Rate Card @daily.jeds: 1 produksi Reels IG + Story Rp 400.000, Barter min. Rp 600.000. Tambahan lain custom by diskusi.',
    },
    { property: 'og:title', content: 'Rate Card - Daily Jeds (@daily.jeds)' },
  ],
  link: [{ rel: 'canonical', href: 'https://dailyjeds.netlify.app/ratecard' }],
})

const { formattedFollowers } = useInstagramData()
const { trackWaClick } = useAnalytics()

const WHATSAPP_NUMBER = '6285179857522'
const waPaid = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Halo Kak! Saya tertarik dengan 1 Produksi Reels IG + Story (Rp 400.000) di @daily.jeds. Boleh info ketersediaan slot?')}`
const waCustom = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Halo Kak! Saya mau diskusi paket custom (mirroring TikTok/Shopee, bundle, atau lainnya) dengan @daily.jeds. Boleh minta waktu diskusi?')}`
const waBarter = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Halo Kak! Saya ingin mengajukan Barter Produk (min. Rp 600.000) untuk @daily.jeds. Produk kami berupa: [isi jenis produk & estimasi nilai retail]. Boleh diskusi?')}`

const printPage = () => {
  if (typeof window !== 'undefined') window.print()
}
</script>

<template>
  <div class="min-h-screen bg-white print:bg-white text-[#3D2221]">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12 print:py-4">
      <div class="mb-8 print:mb-4">
        <NuxtLink to="/" class="inline-flex items-center gap-1.5 text-xs font-bold text-[#7C9070] hover:text-[#78383B] mb-4 print:hidden">
          <Icon name="mdi:arrow-left" class="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </NuxtLink>
        <h1 class="text-3xl sm:text-4xl font-serif font-bold text-[#78383B]">
          Rate Card — Daily Jeds
        </h1>
        <p class="text-sm text-[#6B4F4D] mt-1 font-medium">
          @daily.jeds &bull; Home Growth &amp; Family &bull; {{ formattedFollowers }} audiens
        </p>
      </div>

      <div class="bg-[#FAFAFA] rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs mb-6 print:border-none print:p-0">
        <table class="w-full mb-6 text-sm border-collapse print:text-xs">
          <thead>
            <tr class="text-left text-[#6B4F4D] border-b border-gray-200">
              <th class="py-3 pr-4 font-bold text-xs uppercase tracking-wider text-[#78383B]">Paket</th>
              <th class="py-3 pr-4 font-bold text-xs uppercase tracking-wider text-[#78383B]">Deliverables</th>
              <th class="py-3 pr-4 font-bold text-xs uppercase tracking-wider text-[#78383B] text-right">Harga</th>
              <th class="py-3 font-bold text-xs uppercase tracking-wider text-[#78383B] text-right print:hidden">Aksi</th>
            </tr>
          </thead>
          <tbody class="text-[#3D2221]">
            <tr class="border-b border-gray-200/60">
              <td class="py-4 pr-4 font-serif font-bold text-base text-[#78383B]">1 Produksi</td>
              <td class="py-4 pr-4 text-[#6B4F4D]">1x Reels IG + Story + naskah &amp; 1x revisi + insight H+3</td>
              <td class="py-4 pr-4 text-right font-bold text-base whitespace-nowrap text-[#78383B]">Rp 400rb</td>
              <td class="py-4 text-right print:hidden">
                <a :href="waPaid" target="_blank" rel="noopener" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-[#E9BC55] text-[#3D2221] hover:bg-[#DEAB3D] whitespace-nowrap" @click="trackWaClick('ratecard_paid')">
                  Booking &rarr;
                </a>
              </td>
            </tr>
            <tr class="border-b border-gray-200/60">
              <td class="py-4 pr-4 font-serif font-bold text-base text-[#78383B]">Barter Selektif</td>
              <td class="py-4 pr-4 text-[#6B4F4D]">Min. nilai produk Rp 600rb, ongkir brand. Reels + Story, tanpa mirroring. Khusus Home/Dekorasi/Kids.</td>
              <td class="py-4 pr-4 text-right font-bold text-base whitespace-nowrap text-[#78383B]">Min. 600rb</td>
              <td class="py-4 text-right print:hidden">
                <a :href="waBarter" target="_blank" rel="noopener" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-[#DFEAE0] text-[#4B5E41] hover:bg-[#7C9070] hover:text-white whitespace-nowrap" @click="trackWaClick('ratecard_barter')">
                  Ajukan &rarr;
                </a>
              </td>
            </tr>
            <tr>
              <td class="py-4 pr-4 font-serif font-bold text-base text-[#78383B]">Custom Campaign</td>
              <td class="py-4 pr-4 text-[#6B4F4D]">Mirroring TikTok/Shopee, series, bundling, whitelisting — by diskusi.</td>
              <td class="py-4 pr-4 text-right font-bold text-base whitespace-nowrap text-[#78383B]">Diskusi</td>
              <td class="py-4 text-right print:hidden">
                <a :href="waCustom" target="_blank" rel="noopener" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-white border border-gray-300 text-[#78383B] hover:bg-gray-50 whitespace-nowrap" @click="trackWaClick('ratecard_custom')">
                  Diskusi &rarr;
                </a>
              </td>
            </tr>
          </tbody>
        </table>

        <p class="text-xs text-[#6B4F4D] print:mb-0">
          Slot bulanan dibatasi &bull; Kontak resmi: wa.me/6285179857522 &bull; @daily.jeds
        </p>
      </div>

      <div class="flex justify-center gap-3 print:hidden">
        <button class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-white border border-gray-300 text-[#78383B] hover:bg-gray-50 shadow-2xs" @click="printPage">
          <Icon name="mdi:printer" class="w-4 h-4" />
          <span>Cetak / Simpan PDF</span>
        </button>
        <NuxtLink to="/mediakit" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold bg-[#7C9070] text-white hover:bg-[#5F7354] shadow-2xs">
          <span>Lihat Media Kit</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

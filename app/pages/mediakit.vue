<script setup lang="ts">
useHead({
  title: "Media Kit - Daily Jeds (@daily.jeds)",
  meta: [
    {
      name: "description",
      content:
        "Media Kit Resmi @daily.jeds - Data analitik performa Instagram dan rate card kolaborasi 1 produksi Rp 400.000.",
    },
    {
      property: "og:title",
      content: "Media Kit - Daily Jeds (@daily.jeds)",
    },
  ],
});

const { trackWaClick } = useAnalytics();
const { formattedFollowers } = useInstagramData();

const WHATSAPP_NUMBER = "6285179857522";
const waMessage =
  "Halo Kak! Saya tertarik untuk kolaborasi dengan @daily.jeds setelah melihat Media Kit (1 Produksi Rp 400rb / Barter). Boleh info ketersediaan slot?";
const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;
</script>

<template>
  <div class="min-h-screen bg-white">
    <section class="relative py-12 overflow-hidden border-b border-gray-100">
      <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-[#6B4F4D] hover:text-[#78383B] transition-colors mb-6 text-sm font-semibold"
        >
          <Icon name="mdi:arrow-left" class="w-4 h-4 text-[#78383B]" />
          <span>Kembali ke Beranda</span>
        </NuxtLink>

        <div class="flex items-center gap-5 mb-6" data-aos="fade-up">
          <div
            class="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-md border-3 border-gray-100 flex-shrink-0"
          >
            <img src="/profile.webp" alt="Daily Jeds Profile" class="w-full h-full object-cover" loading="lazy" />
          </div>
          <div class="min-w-0">
            <h1 class="text-2xl sm:text-3xl font-serif font-bold text-[#78383B]">
              Daily Jeds <span class="text-[#E9BC55] font-lazy text-lg sm:text-xl">@daily.jeds</span>
            </h1>
            <p class="text-[#6B4F4D] text-xs sm:text-sm mt-1 font-medium">
              Home Growth &amp; Family &bull; <strong class="text-[#78383B]">{{ formattedFollowers }}</strong> audiens
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Insights Component with Verified Baseline Data -->
    <MediaKitInsights />

    <!-- Harga + CTA -->
    <section class="relative py-14 overflow-hidden border-t border-gray-100">
      <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-[#6B4F4D] text-sm sm:text-base mb-6 font-medium" data-aos="fade-up">
          1 Produksi <strong class="text-[#78383B]">Rp 400rb</strong> &bull; Barter min. <strong class="text-[#78383B]">600rb</strong> &bull; Sisanya by diskusi.
          <NuxtLink to="/ratecard" class="font-bold text-[#7C9070] hover:text-[#5F7354] transition-colors ml-1">
            Lihat dokumen rate card &rarr;
          </NuxtLink>
        </p>
        <a
          :href="waLink"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-[#E9BC55] text-[#3D2221] hover:bg-[#DEAB3D] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          data-aos="fade-up"
          @click="trackWaClick('mediakit_bottom_cta')"
        >
          <Icon name="mdi:whatsapp" class="w-5 h-5" />
          <span>Mulai Kolaborasi (Rp 400rb)</span>
        </a>
        <p class="text-[#6B4F4D]/70 text-xs mt-4">
          Slot bulanan dibatasi &bull; Respons maksimal 1×24 jam
        </p>
      </div>
    </section>

    <FloatingCollabBar />
  </div>
</template>

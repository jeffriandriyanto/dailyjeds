<script setup lang="ts">
useHead({
  title: "Media Kit - Daily Jeds (@daily.jeds)",
  meta: [
    {
      name: "description",
      content:
        "Media Kit Resmi @daily.jeds - Data analitik performa Instagram dan rate card kolaborasi mulai Rp 350.000.",
    },
    {
      property: "og:title",
      content: "Media Kit - Daily Jeds (@daily.jeds)",
    },
  ],
});

const { trackWaClick } = useAnalytics();
const { formattedFollowers, formattedReach } = useInstagramData();

const WHATSAPP_NUMBER = "6285179857522";
const waMessage =
  "Halo Kak! Saya tertarik untuk kolaborasi dengan @daily.jeds setelah melihat Media Kit (Paid Reels Rp 350rb / Barter). Boleh info ketersediaan slot?";
const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;
</script>

<template>
  <div class="min-h-screen bg-ghibli-cream">
    <section class="relative py-12 overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-b from-ghibli-cream via-ghibli-cream-light to-ghibli-cream-warm"
      />

      <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-2 text-ghibli-brown-500 hover:text-ghibli-green-700 transition-colors mb-6 text-sm font-medium"
          >
            <Icon name="mdi:arrow-left" class="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </NuxtLink>

          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Icon name="mdi:chart-line" class="w-3.5 h-3.5" />
            <span>Official Media Kit &bull; {{ formattedFollowers }} Community</span>
          </div>

          <h1
            class="text-4xl sm:text-5xl font-ghibli font-bold ghibli-text-gradient mb-3"
          >
            Creator Media Kit
          </h1>
          <p class="text-ghibli-brown-500 max-w-2xl mx-auto text-sm sm:text-base">
            Profil analitik lengkap dan performa audiens @daily.jeds untuk referensi kolaborasi brand terpercaya.
          </p>
        </div>

        <div
          class="ghibli-card p-6 sm:p-8 shadow-ghibli mb-8 border border-ghibli-wood-200/50"
          data-aos="fade-up"
        >
          <div class="flex flex-col sm:flex-row items-center gap-6">
            <div
              class="w-20 h-20 rounded-full overflow-hidden shadow-md border-2 border-white flex-shrink-0"
            >
              <img src="/profile.webp" alt="Daily Jeds Profile" class="w-full h-full object-cover" loading="lazy" />
            </div>
            <div class="text-center sm:text-left flex-1">
              <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 class="text-2xl font-ghibli font-bold text-ghibli-brown-700">
                  Daily Jeds
                </h2>
                <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">{{ formattedFollowers }} Followers</span>
                <span class="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">Rate: Rp 350rb / Reels</span>
              </div>
              <p class="text-ghibli-amber-600 font-lazy text-lg">@daily.jeds</p>
              <p class="text-ghibli-brown-400 text-xs sm:text-sm mt-1">
                Home Growth &amp; Family Lifestyle &bull; Salatiga, Indonesia
              </p>
            </div>
            <a
              :href="waLink"
              target="_blank"
              rel="noopener noreferrer"
              class="ghibli-button flex items-center gap-2 text-sm sm:text-base px-6 py-3 font-semibold shadow-md"
              @click="trackWaClick('mediakit_cta')"
            >
              <Icon name="mdi:whatsapp" class="w-5 h-5" />
              <span>Hubungi untuk Kolaborasi</span>
            </a>
          </div>
        </div>

        <div
          class="grid sm:grid-cols-3 gap-4 mb-8"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div class="ghibli-card p-5 text-center shadow-sm border border-ghibli-wood-200/40">
            <Icon
              name="mdi:home-heart"
              class="w-8 h-8 text-ghibli-green-500 mx-auto mb-2"
            />
            <h3 class="font-ghibli font-semibold text-ghibli-brown-700 mb-1">
              Fokus Niche
            </h3>
            <p class="text-ghibli-brown-400 text-xs sm:text-sm">
              Home Growth, Cozy Living, Family &amp; DIY
            </p>
          </div>
          <div class="ghibli-card p-5 text-center shadow-sm border border-ghibli-wood-200/40">
            <Icon
              name="mdi:bullseye-arrow"
              class="w-8 h-8 text-ghibli-amber-500 mx-auto mb-2"
            />
            <h3 class="font-ghibli font-semibold text-ghibli-brown-700 mb-1">
              Jangkauan Akun
            </h3>
            <p class="text-ghibli-brown-400 text-xs sm:text-sm">
              {{ formattedReach }} Total Accounts Reached
            </p>
          </div>
          <div class="ghibli-card p-5 text-center shadow-sm border border-ghibli-wood-200/40">
            <Icon
              name="mdi:map-marker"
              class="w-8 h-8 text-ghibli-wood-500 mx-auto mb-2"
            />
            <h3 class="font-ghibli font-semibold text-ghibli-brown-700 mb-1">
              Domisili &amp; Lokasi
            </h3>
            <p class="text-ghibli-brown-400 text-xs sm:text-sm">Salatiga, Jawa Tengah, Indonesia</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Insights Component with Verified Baseline Data -->
    <MediaKitInsights />

    <!-- Bottom Collaboration Prompt -->
    <section class="relative py-16 overflow-hidden ghibli-section">
      <div
        class="absolute inset-0 bg-gradient-to-b from-ghibli-cream-warm to-ghibli-cream"
      />
      <div
        class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <div class="ghibli-card p-8 sm:p-10 shadow-ghibli border border-ghibli-wood-200/50" data-aos="fade-up">
          <div class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Icon name="mdi:handshake" class="w-8 h-8" />
          </div>
          <h3 class="text-2xl sm:text-3xl font-ghibli font-bold text-ghibli-brown-700 mb-3">
            Siap Berkolaborasi dengan @daily.jeds?
          </h3>
          <p class="text-ghibli-brown-500 mb-6 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
            Slot bulanan kami batasi agar setiap konten mendapatkan perhatian maksimal dari followers. Konsultasikan ide campaign brand Anda sekarang.
          </p>
          <a
            :href="waLink"
            target="_blank"
            rel="noopener noreferrer"
            class="ghibli-button inline-flex items-center gap-2 text-base px-8 py-3.5 shadow-md"
            @click="trackWaClick('mediakit_bottom_cta')"
          >
            <Icon name="mdi:whatsapp" class="w-5 h-5" />
            <span>Mulai Kolaborasi (Rp 350rb)</span>
          </a>
        </div>
      </div>
    </section>

    <FloatingCollabBar />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Media Kit - Daily Jeds",
  meta: [
    {
      name: "description",
      content:
        "Media Kit @daily.jeds - Data analitik Instagram, demografi audiens, dan performa konten untuk referensi kolaborasi brand.",
    },
    {
      property: "og:title",
      content: "Media Kit - Daily Jeds (@daily.jeds)",
    },
  ],
});

const { trackWaClick } = useAnalytics();

const WHATSAPP_NUMBER = "6285179857522";
const waMessage =
  "Halo Kak! Saya tertarik untuk berkolaborasi dengan @daily.jeds. Boleh info lebih lanjut?";
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
            class="inline-flex items-center gap-2 text-ghibli-brown-400 hover:text-ghibli-green-600 transition-colors mb-6"
          >
            <Icon name="mdi:arrow-left" class="w-5 h-5" />
            <span>Kembali ke Beranda</span>
          </NuxtLink>

          <h1
            class="text-4xl sm:text-5xl font-ghibli font-bold ghibli-text-gradient mb-4"
          >
            Media Kit
          </h1>
          <p class="text-ghibli-brown-500 max-w-2xl mx-auto">
            Profil lengkap @daily.jeds untuk brand dan agensi yang ingin
            berkolaborasi
          </p>
        </div>

        <div
          class="ghibli-card p-6 sm:p-8 shadow-ghibli mb-8"
          data-aos="fade-up"
        >
          <div class="flex flex-col sm:flex-row items-center gap-6">
            <div
              class="w-20 h-20 rounded-full bg-gradient-to-br from-ghibli-green-400 to-ghibli-amber-400 flex items-center justify-center shadow-ghibli"
            >
              <Icon name="mdi:account" class="w-10 h-10 text-white" />
            </div>
            <div class="text-center sm:text-left flex-1">
              <h2 class="text-2xl font-ghibli font-bold text-ghibli-brown-700">
                Daily Jeds
              </h2>
              <p class="text-ghibli-amber-600 font-lazy">@daily.jeds</p>
              <p class="text-ghibli-brown-400 text-sm mt-1">
                Home Growth &amp; Family Lifestyle &bull; Salatiga, Indonesia
              </p>
            </div>
            <a
              :href="waLink"
              target="_blank"
              rel="noopener noreferrer"
              class="ghibli-button flex items-center gap-2"
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
          <div class="ghibli-card p-5 text-center shadow-ghibli">
            <Icon
              name="mdi:home-heart"
              class="w-8 h-8 text-ghibli-green-500 mx-auto mb-2"
            />
            <h3 class="font-ghibli font-semibold text-ghibli-brown-700 mb-1">
              Niche
            </h3>
            <p class="text-ghibli-brown-400 text-sm">
              Home Growth, DIY, Estetika
            </p>
          </div>
          <div class="ghibli-card p-5 text-center shadow-ghibli">
            <Icon
              name="mdi:account-group"
              class="w-8 h-8 text-ghibli-amber-500 mx-auto mb-2"
            />
            <h3 class="font-ghibli font-semibold text-ghibli-brown-700 mb-1">
              Target Audiens
            </h3>
            <p class="text-ghibli-brown-400 text-sm">
              Perempuan 25-34, Ibu Rumah Tangga
            </p>
          </div>
          <div class="ghibli-card p-5 text-center shadow-ghibli">
            <Icon
              name="mdi:map-marker"
              class="w-8 h-8 text-ghibli-wood-500 mx-auto mb-2"
            />
            <h3 class="font-ghibli font-semibold text-ghibli-brown-700 mb-1">
              Lokasi
            </h3>
            <p class="text-ghibli-brown-400 text-sm">Salatiga, Jawa Tengah</p>
          </div>
        </div>
      </div>
    </section>

    <MediaKitInsights />

    <section class="relative py-16 overflow-hidden ghibli-section">
      <div
        class="absolute inset-0 bg-gradient-to-b from-ghibli-cream-warm to-ghibli-cream"
      />
      <div
        class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <div class="ghibli-card p-8 shadow-ghibli" data-aos="fade-up">
          <h3 class="text-2xl font-ghibli font-bold text-ghibli-brown-700 mb-4">
            Tertarik Bekerja Sama?
          </h3>
          <p class="text-ghibli-brown-500 mb-6 max-w-lg mx-auto">
            Kami terbuka untuk kolaborasi brand yang sesuai dengan nilai dan
            niche kami. Hubungi kami untuk diskusi lebih lanjut!
          </p>
          <a
            :href="waLink"
            target="_blank"
            rel="noopener noreferrer"
            class="ghibli-button inline-flex items-center gap-2 text-lg px-8 py-4"
            @click="trackWaClick('mediakit_bottom_cta')"
          >
            <Icon name="mdi:whatsapp" class="w-6 h-6" />
            <span>Mulai Kolaborasi</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

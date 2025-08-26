<template>
  <div class="min-h-screen flex justify-center bg-black text-white/90">
    <div class="w-full lg:max-w-md text-center">
      <!-- Hero / Profile -->
      <section id="hero" class="relative" data-aos="fade-up">
        <div
          class="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black via-black/70 to-transparent z-10"
        />
        <NuxtImg
          src="/profile.jpg"
          alt="Profile picture of daily.jeds"
          class="w-full z-0 shadow-md"
        />
      </section>

      <!-- Profile Info -->
      <section
        id="body-profile"
        class="py-6 font-sans"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <h1 class="text-2xl font-black tracking-wide">Jeds Journey</h1>
        <p class="text-sm text-amber-100 mt-1">@daily.jeds</p>
        <p class="text-sm text-white/70 mt-3 leading-relaxed">
          Daily Activity | Home & Living | Review <br />
          Tips & Tricks | Healthy Lifestyle | Mom's Life <br />
          📍 S a l a t i g a , I D
        </p>
      </section>

      <!-- Social Links -->
      <section id="links" class="flex flex-col gap-3 mt-6 px-4">
        <!-- Instagram -->
        <a
          href="https://www.instagram.com/daily.jeds"
          target="_blank"
          class="bg-[#f5f0e6]/90 text-black rounded-xl py-3 px-4 flex items-center justify-center gap-2 hover:bg-[#f5f0e6] transition"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <Icon name="mdi:instagram" class="text-lg" />
          <span class="font-medium">Instagram</span>
        </a>

        <!-- Shopee -->
        <a
          href="https://shpe.site/daily.jeds"
          target="_blank"
          class="bg-[#a8b5a2]/90 rounded-xl py-3 px-4 flex items-center justify-center gap-2 hover:bg-[#a8b5a2] transition"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <Icon name="simple-icons:shopee" class="text-lg" />
          <span class="font-medium">Shopee</span>
        </a>

        <!-- TikTok -->
        <a
          href="https://www.tiktok.com/@daily.jeds"
          target="_blank"
          class="bg-[#8d6e63]/90 rounded-xl py-3 px-4 flex items-center justify-center gap-2 hover:bg-[#8d6e63] transition"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <Icon name="ri:tiktok-fill" class="text-lg" />
          <span class="font-medium">TikTok</span>
        </a>

        <!-- Facebook -->
        <a
          href="https://www.facebook.com/dailyjeds.page"
          target="_blank"
          class="bg-[#4267B2]/90 rounded-xl py-3 px-4 flex items-center justify-center gap-2 hover:bg-[#4267B2] transition"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <Icon name="mdi:facebook" class="text-lg" />
          <span class="font-medium">Facebook</span>
        </a>
      </section>

      <!-- Optional Footer -->
      <footer class="my-10 text-xs text-white/50">
        © 2025 Jeds Journey (@daily.jeds) · All Rights Reserved
      </footer>
    </div>
  </div>
</template>

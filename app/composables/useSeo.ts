import { defineWebPage, definePerson } from "nuxt-schema-org/schema";
import { useHead } from "#imports";

export const useSeo = () => {
  useHead({
    htmlAttrs: {
      lang: "id",
    },
    title: "Jeds Journey (@daily.jeds) | Daily Activity, Home & Living, Review",
    titleTemplate: "%s · DailyJeds",
    meta: [
      {
        name: "description",
        content:
          "Daily Activity, Home & Living, Review, Tips & Tricks, Healthy Lifestyle, Mom’s Life. 📍 Salatiga, Indonesia | Follow @daily.jeds di TikTok & Instagram.",
      },
      {
        name: "keywords",
        content:
          "daily jeds, jeds journey, daily activity, home living, review, tips tricks, healthy lifestyle, mom life, salatiga",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:title",
        content:
          "Jeds Journey (@daily.jeds) | Daily Activity, Home & Living, Review",
      },
      {
        property: "og:description",
        content:
          "Ikuti @daily.jeds (Jeds Journey) untuk Daily Activity, Home & Living, Tips, Healthy Lifestyle & Mom’s Life. 📍 Salatiga, Indonesia",
      },
      {
        property: "og:url",
        content: "https://dailyjeds.netlify.app",
      },
      {
        property: "og:image",
        content: "https://dailyjeds.netlify.app/profile.jpg",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content:
          "Jeds Journey (@daily.jeds) | Daily Activity, Home & Living, Review",
      },
      {
        name: "twitter:description",
        content:
          "Ikuti @daily.jeds (Jeds Journey) untuk Daily Activity, Home & Living, Tips, Healthy Lifestyle & Mom’s Life.",
      },
      {
        name: "twitter:image",
        content: "https://dailyjeds.netlify.app/profile.jpg",
      },
    ],
    link: [
      {
        rel: "canonical",
        href: "https://dailyjeds.netlify.app",
      },
    ],
  });

  useSchemaOrg([
    defineWebPage({
      name: "Jeds Journey (@daily.jeds) | Daily Activity, Home & Living, Review",
      description:
        "Daily Activity, Home & Living, Review, Tips & Tricks, Healthy Lifestyle, Mom’s Life. 📍 Salatiga, Indonesia | Follow @daily.jeds di TikTok & Instagram.",
    }),
    definePerson({
      name: "Jeds Journey",
      alternateName: "@daily.jeds",
      url: "https://dailyjeds.netlify.app",
      image: "https://dailyjeds.netlify.app/profile.jpg",
      sameAs: [
        "https://www.instagram.com/daily.jeds",
        "https://www.tiktok.com/@daily.jeds",
        "https://shpe.site/daily.jeds",
        "https://www.facebook.com/dailyjeds.page",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Salatiga",
        addressRegion: "Central Java",
        addressCountry: "ID",
      },
    }),
  ]);
};

import { defineWebPage, definePerson } from "nuxt-schema-org/schema";

export const useSeo = () => {
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

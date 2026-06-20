import { defineComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { defineWebPage, definePerson } from '@unhead/schema-org';
import { u as useHead, d as useSchemaOrg } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@iconify/utils';
import 'consola';
import 'node:url';
import 'ipx';
import 'vue-router';
import '@unhead/schema-org/vue';
import 'tailwindcss/colors';
import '@iconify/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const useSeo = () => {
  useHead({
    htmlAttrs: {
      lang: "id"
    },
    title: "Jeds Journey (@daily.jeds) | Daily Activity, Home & Living, Review",
    titleTemplate: "%s \xB7 DailyJeds",
    meta: [
      {
        name: "description",
        content: "Daily Activity, Home & Living, Review, Tips & Tricks, Healthy Lifestyle, Mom\u2019s Life. \u{1F4CD} Salatiga, Indonesia | Follow @daily.jeds di TikTok & Instagram."
      },
      {
        name: "keywords",
        content: "daily jeds, jeds journey, daily activity, home living, review, tips tricks, healthy lifestyle, mom life, salatiga"
      },
      { property: "og:type", content: "website" },
      {
        property: "og:title",
        content: "Jeds Journey (@daily.jeds) | Daily Activity, Home & Living, Review"
      },
      {
        property: "og:description",
        content: "Ikuti @daily.jeds (Jeds Journey) untuk Daily Activity, Home & Living, Tips, Healthy Lifestyle & Mom\u2019s Life. \u{1F4CD} Salatiga, Indonesia"
      },
      {
        property: "og:url",
        content: "https://dailyjeds.netlify.app"
      },
      {
        property: "og:image",
        content: "https://dailyjeds.netlify.app/profile.jpg"
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Jeds Journey (@daily.jeds) | Daily Activity, Home & Living, Review"
      },
      {
        name: "twitter:description",
        content: "Ikuti @daily.jeds (Jeds Journey) untuk Daily Activity, Home & Living, Tips, Healthy Lifestyle & Mom\u2019s Life."
      },
      {
        name: "twitter:image",
        content: "https://dailyjeds.netlify.app/profile.jpg"
      }
    ],
    link: [
      {
        rel: "canonical",
        href: "https://dailyjeds.netlify.app"
      }
    ]
  });
  useSchemaOrg([
    defineWebPage({
      name: "Jeds Journey (@daily.jeds) | Daily Activity, Home & Living, Review",
      description: "Daily Activity, Home & Living, Review, Tips & Tricks, Healthy Lifestyle, Mom\u2019s Life. \u{1F4CD} Salatiga, Indonesia | Follow @daily.jeds di TikTok & Instagram."
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
        "https://www.facebook.com/dailyjeds.page"
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Salatiga",
        addressRegion: "Central Java",
        addressCountry: "ID"
      }
    })
  ]);
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    useSeo();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-9U3DUHpd.mjs.map

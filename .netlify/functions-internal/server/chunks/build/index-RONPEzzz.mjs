import { _ as __nuxt_component_1$1 } from './index-D86bI_Ad.mjs';
import { defineComponent, mergeProps, ref, unref, withAsyncContext, watchEffect, useAttrs, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderSlot } from 'vue/server-renderer';
import { q as defu, D as withLeadingSlash, m as hasProtocol, o as joinURL, C as parseURL, G as encodeParam, H as encodePath } from '../nitro/nitro.mjs';
import { u as useHead, d as useSchemaOrg, a as useNuxtApp, b as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch-CEiOac5D.mjs';
import { defineWebSite, defineOrganization } from '@unhead/schema-org/vue';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
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
import 'tailwindcss/colors';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import '@vue/shared';

const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "AudioPlayer",
  __ssrInlineRender: true,
  props: {
    audioSrc: { default: "/memories-jonny-easton-main-version-17339-03-22.mp3" }
  },
  setup(__props) {
    const isPlaying = ref(false);
    const isMuted = ref(false);
    ref(null);
    const showTooltip = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3" }, _attrs))}>`);
      if (unref(showTooltip) && !unref(isPlaying)) {
        _push(`<div class="glass-effect rounded-xl px-4 py-2 shadow-ghibli text-sm text-ghibli-brown-600 max-w-[200px]"><p class="flex items-center gap-2"><span class="text-ghibli-amber-500">♪</span><span>Play gentle Ghibli music?</span></p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center gap-3">`);
      if (unref(isPlaying)) {
        _push(`<button class="glass-effect w-10 h-10 rounded-full flex items-center justify-center shadow-ghibli hover:shadow-ghibli-hover transition-all duration-300 group"${ssrRenderAttr("aria-label", unref(isMuted) ? "Unmute music" : "Mute music")}>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: unref(isMuted) ? "mdi:volume-off" : "mdi:volume-high",
          class: "w-5 h-5 text-ghibli-brown-500 group-hover:text-ghibli-amber-500 transition-colors"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="${ssrRenderClass([[
        unref(isPlaying) ? "bg-gradient-to-br from-ghibli-green-400 to-ghibli-green-600 animate-glow-pulse" : "bg-gradient-to-br from-ghibli-amber-400 to-ghibli-amber-600"
      ], "relative w-14 h-14 rounded-full shadow-ghibli hover:shadow-ghibli-hover transition-all duration-300 group"])}"${ssrRenderAttr("aria-label", unref(isPlaying) ? "Pause music" : "Play music")}><div class="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div><div class="absolute inset-0 flex items-center justify-center">`);
      if (unref(isPlaying)) {
        _push(`<div class="vinyl-record vinyl-spinning"></div>`);
      } else {
        _push(`<div class="flex flex-col items-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:music-note",
          class: "w-6 h-6 text-white"
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
      if (unref(isPlaying)) {
        _push(`<div class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-ghibli-green-300 flex items-center justify-center"><div class="w-2 h-2 rounded-full bg-white animate-pulse"></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div><audio${ssrRenderAttr("src", _ctx.audioSrc)} loop preload="none"></audio></div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AudioPlayer.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_0$1 = Object.assign(_sfc_main$9, { __name: "AudioPlayer" });
async function imageMeta(_ctx, url) {
  const meta = await _imageMeta(url).catch((err) => {
    console.error("Failed to get image meta for " + url, err + "");
    return {
      width: 0,
      height: 0,
      ratio: 0
    };
  });
  return meta;
}
async function _imageMeta(url) {
  {
    const imageMeta2 = await import('image-meta').then((r) => r.imageMeta);
    const data = await fetch(url).then((res) => res.buffer());
    const metadata = imageMeta2(data);
    if (!metadata) {
      throw new Error(`No metadata could be extracted from the image \`${url}\`.`);
    }
    const { width, height } = metadata;
    const meta = {
      width,
      height,
      ratio: width && height ? width / height : void 0
    };
    return meta;
  }
}
function createMapper(map) {
  return (key) => {
    return key ? map[key] || key : map.missingValue;
  };
}
function createOperationsGenerator({ formatter, keyMap, joinWith = "/", valueMap } = {}) {
  if (!formatter) {
    formatter = (key, value) => `${key}=${value}`;
  }
  if (keyMap && typeof keyMap !== "function") {
    keyMap = createMapper(keyMap);
  }
  const map = valueMap || {};
  Object.keys(map).forEach((valueKey) => {
    if (typeof map[valueKey] !== "function") {
      map[valueKey] = createMapper(map[valueKey]);
    }
  });
  return (modifiers = {}) => {
    const operations = Object.entries(modifiers).filter(([_, value]) => typeof value !== "undefined").map(([key, value]) => {
      const mapper = map[key];
      if (typeof mapper === "function") {
        value = mapper(modifiers[key]);
      }
      key = typeof keyMap === "function" ? keyMap(key) : key;
      return formatter(key, value);
    });
    return operations.join(joinWith);
  };
}
function parseSize(input = "") {
  if (typeof input === "number") {
    return input;
  }
  if (typeof input === "string") {
    if (input.replace("px", "").match(/^\d+$/g)) {
      return Number.parseInt(input, 10);
    }
  }
}
function parseDensities(input = "") {
  if (input === void 0 || !input.length) {
    return [];
  }
  const densities = /* @__PURE__ */ new Set();
  for (const density of input.split(" ")) {
    const d = Number.parseInt(density.replace("x", ""));
    if (d) {
      densities.add(d);
    }
  }
  return Array.from(densities);
}
function checkDensities(densities) {
  if (densities.length === 0) {
    throw new Error("`densities` must not be empty, configure to `1` to render regular size only (DPR 1.0)");
  }
}
function parseSizes(input) {
  const sizes = {};
  if (typeof input === "string") {
    for (const entry of input.split(/[\s,]+/).filter((e) => e)) {
      const s = entry.split(":");
      if (s.length !== 2) {
        sizes["1px"] = s[0].trim();
      } else {
        sizes[s[0].trim()] = s[1].trim();
      }
    }
  } else {
    Object.assign(sizes, input);
  }
  return sizes;
}
function createImage(globalOptions) {
  const ctx = {
    options: globalOptions
  };
  const getImage2 = (input, options = {}) => {
    const image = resolveImage(ctx, input, options);
    return image;
  };
  const $img = (input, modifiers = {}, options = {}) => {
    return getImage2(input, {
      ...options,
      modifiers: defu(modifiers, options.modifiers || {})
    }).url;
  };
  for (const presetName in globalOptions.presets) {
    $img[presetName] = (source, modifiers, options) => $img(source, modifiers, { ...globalOptions.presets[presetName], ...options });
  }
  $img.options = globalOptions;
  $img.getImage = getImage2;
  $img.getMeta = (input, options) => getMeta(ctx, input, options);
  $img.getSizes = (input, options) => getSizes(ctx, input, options);
  ctx.$img = $img;
  return $img;
}
async function getMeta(ctx, input, options) {
  const image = resolveImage(ctx, input, { ...options });
  if (typeof image.getMeta === "function") {
    return await image.getMeta();
  } else {
    return await imageMeta(ctx, image.url);
  }
}
function resolveImage(ctx, input, options) {
  if (input && typeof input !== "string") {
    throw new TypeError(`input must be a string (received ${typeof input}: ${JSON.stringify(input)})`);
  }
  if (!input || input.startsWith("data:")) {
    return {
      url: input
    };
  }
  const { provider, defaults } = getProvider(ctx, options.provider || ctx.options.provider);
  const preset = getPreset(ctx, options.preset);
  input = hasProtocol(input) ? input : withLeadingSlash(input);
  if (!provider.supportsAlias) {
    for (const base in ctx.options.alias) {
      if (input.startsWith(base)) {
        const alias = ctx.options.alias[base];
        if (alias) {
          input = joinURL(alias, input.slice(base.length));
        }
      }
    }
  }
  if (provider.validateDomains && hasProtocol(input)) {
    const inputHost = parseURL(input).host;
    if (!ctx.options.domains.find((d) => d === inputHost)) {
      return {
        url: input
      };
    }
  }
  const _options = defu(options, preset, defaults);
  _options.modifiers = { ..._options.modifiers };
  const expectedFormat = _options.modifiers.format;
  if (_options.modifiers?.width) {
    _options.modifiers.width = parseSize(_options.modifiers.width);
  }
  if (_options.modifiers?.height) {
    _options.modifiers.height = parseSize(_options.modifiers.height);
  }
  const image = provider.getImage(input, _options, ctx);
  image.format = image.format || expectedFormat || "";
  return image;
}
function getProvider(ctx, name) {
  const provider = ctx.options.providers[name];
  if (!provider) {
    throw new Error("Unknown provider: " + name);
  }
  return provider;
}
function getPreset(ctx, name) {
  if (!name) {
    return {};
  }
  if (!ctx.options.presets[name]) {
    throw new Error("Unknown preset: " + name);
  }
  return ctx.options.presets[name];
}
function getSizes(ctx, input, opts) {
  const width = parseSize(opts.modifiers?.width);
  const height = parseSize(opts.modifiers?.height);
  const sizes = parseSizes(opts.sizes);
  const densities = opts.densities?.trim() ? parseDensities(opts.densities.trim()) : ctx.options.densities;
  checkDensities(densities);
  const hwRatio = width && height ? height / width : 0;
  const sizeVariants = [];
  const srcsetVariants = [];
  if (Object.keys(sizes).length >= 1) {
    for (const key in sizes) {
      const variant = getSizesVariant(key, String(sizes[key]), height, hwRatio, ctx);
      if (variant === void 0) {
        continue;
      }
      sizeVariants.push({
        size: variant.size,
        screenMaxWidth: variant.screenMaxWidth,
        media: `(max-width: ${variant.screenMaxWidth}px)`
      });
      for (const density of densities) {
        srcsetVariants.push({
          width: variant._cWidth * density,
          src: getVariantSrc(ctx, input, opts, variant, density)
        });
      }
    }
    finaliseSizeVariants(sizeVariants);
  } else {
    for (const density of densities) {
      const key = Object.keys(sizes)[0];
      let variant = key ? getSizesVariant(key, String(sizes[key]), height, hwRatio, ctx) : void 0;
      if (variant === void 0) {
        variant = {
          size: "",
          screenMaxWidth: 0,
          _cWidth: opts.modifiers?.width,
          _cHeight: opts.modifiers?.height
        };
      }
      srcsetVariants.push({
        width: density,
        src: getVariantSrc(ctx, input, opts, variant, density)
      });
    }
  }
  finaliseSrcsetVariants(srcsetVariants);
  const defaultVariant = srcsetVariants[srcsetVariants.length - 1];
  const sizesVal = sizeVariants.length ? sizeVariants.map((v) => `${v.media ? v.media + " " : ""}${v.size}`).join(", ") : void 0;
  const suffix = sizesVal ? "w" : "x";
  const srcsetVal = srcsetVariants.map((v) => `${v.src} ${v.width}${suffix}`).join(", ");
  return {
    sizes: sizesVal,
    srcset: srcsetVal,
    src: defaultVariant?.src
  };
}
function getSizesVariant(key, size, height, hwRatio, ctx) {
  const screenMaxWidth = ctx.options.screens && ctx.options.screens[key] || Number.parseInt(key);
  const isFluid = size.endsWith("vw");
  if (!isFluid && /^\d+$/.test(size)) {
    size = size + "px";
  }
  if (!isFluid && !size.endsWith("px")) {
    return void 0;
  }
  let _cWidth = Number.parseInt(size);
  if (!screenMaxWidth || !_cWidth) {
    return void 0;
  }
  if (isFluid) {
    _cWidth = Math.round(_cWidth / 100 * screenMaxWidth);
  }
  const _cHeight = hwRatio ? Math.round(_cWidth * hwRatio) : height;
  return {
    size,
    screenMaxWidth,
    _cWidth,
    _cHeight
  };
}
function getVariantSrc(ctx, input, opts, variant, density) {
  return ctx.$img(
    input,
    {
      ...opts.modifiers,
      width: variant._cWidth ? variant._cWidth * density : void 0,
      height: variant._cHeight ? variant._cHeight * density : void 0
    },
    opts
  );
}
function finaliseSizeVariants(sizeVariants) {
  sizeVariants.sort((v1, v2) => v1.screenMaxWidth - v2.screenMaxWidth);
  let previousMedia = null;
  for (let i = sizeVariants.length - 1; i >= 0; i--) {
    const sizeVariant = sizeVariants[i];
    if (sizeVariant.media === previousMedia) {
      sizeVariants.splice(i, 1);
    }
    previousMedia = sizeVariant.media;
  }
  for (let i = 0; i < sizeVariants.length; i++) {
    sizeVariants[i].media = sizeVariants[i + 1]?.media || "";
  }
}
function finaliseSrcsetVariants(srcsetVariants) {
  srcsetVariants.sort((v1, v2) => v1.width - v2.width);
  let previousWidth = null;
  for (let i = srcsetVariants.length - 1; i >= 0; i--) {
    const sizeVariant = srcsetVariants[i];
    if (sizeVariant.width === previousWidth) {
      srcsetVariants.splice(i, 1);
    }
    previousWidth = sizeVariant.width;
  }
}
const operationsGenerator = createOperationsGenerator({
  keyMap: {
    format: "f",
    fit: "fit",
    width: "w",
    height: "h",
    resize: "s",
    quality: "q",
    background: "b"
  },
  joinWith: "&",
  formatter: (key, val) => encodeParam(key) + "_" + encodeParam(val)
});
const getImage = (src, { modifiers = {}, baseURL } = {}, ctx) => {
  if (modifiers.width && modifiers.height) {
    modifiers.resize = `${modifiers.width}x${modifiers.height}`;
    delete modifiers.width;
    delete modifiers.height;
  }
  const params = operationsGenerator(modifiers) || "_";
  if (!baseURL) {
    baseURL = joinURL(ctx.options.nuxt.baseURL, "/_ipx");
  }
  return {
    url: joinURL(baseURL, params, encodePath(src))
  };
};
const validateDomains = true;
const supportsAlias = true;
const ipxRuntime$m5cmOPuSEHrq7MtqzAmn_45HyOqQ6EshQRSlFOxKl_3TE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getImage,
  operationsGenerator,
  supportsAlias,
  validateDomains
}, Symbol.toStringTag, { value: "Module" }));
const imageOptions = {
  ...{
    "screens": {
      "xs": 320,
      "sm": 640,
      "md": 768,
      "lg": 1024,
      "xl": 1280,
      "xxl": 1536,
      "2xl": 1536
    },
    "presets": {},
    "provider": "ipx",
    "domains": [
      "scontent.cdninstagram.com",
      "scontent-cgk1-1.cdninstagram.com",
      "scontent-lax3-1.cdninstagram.com",
      "platform-lookaside.fbsbx.com"
    ],
    "alias": {},
    "densities": [
      1,
      2
    ],
    "format": [
      "webp"
    ]
  },
  providers: {
    ["ipx"]: { provider: ipxRuntime$m5cmOPuSEHrq7MtqzAmn_45HyOqQ6EshQRSlFOxKl_3TE, defaults: {} }
  }
};
const useImage = (event) => {
  const config = useRuntimeConfig();
  const nuxtApp = useNuxtApp();
  return nuxtApp.$img || nuxtApp._img || (nuxtApp._img = createImage({
    ...imageOptions,
    event: nuxtApp.ssrContext?.event,
    nuxt: {
      baseURL: config.app.baseURL
    },
    runtimeConfig: config
  }));
};
const baseImageProps = {
  // input source
  src: { type: String, required: false },
  // modifiers
  format: { type: String, required: false },
  quality: { type: [Number, String], required: false },
  background: { type: String, required: false },
  fit: { type: String, required: false },
  modifiers: { type: Object, required: false },
  // options
  preset: { type: String, required: false },
  provider: { type: String, required: false },
  sizes: { type: [Object, String], required: false },
  densities: { type: String, required: false },
  preload: {
    type: [Boolean, Object],
    required: false
  },
  // <img> attributes
  width: { type: [String, Number], required: false },
  height: { type: [String, Number], required: false },
  alt: { type: String, required: false },
  referrerpolicy: { type: String, required: false },
  usemap: { type: String, required: false },
  longdesc: { type: String, required: false },
  ismap: { type: Boolean, required: false },
  loading: {
    type: String,
    required: false,
    validator: (val) => ["lazy", "eager"].includes(val)
  },
  crossorigin: {
    type: [Boolean, String],
    required: false,
    validator: (val) => ["anonymous", "use-credentials", "", true, false].includes(val)
  },
  decoding: {
    type: String,
    required: false,
    validator: (val) => ["async", "auto", "sync"].includes(val)
  },
  // csp
  nonce: { type: [String], required: false }
};
const useBaseImage = (props) => {
  const options = computed(() => {
    return {
      provider: props.provider,
      preset: props.preset
    };
  });
  const attrs = computed(() => {
    return {
      width: parseSize(props.width),
      height: parseSize(props.height),
      alt: props.alt,
      referrerpolicy: props.referrerpolicy,
      usemap: props.usemap,
      longdesc: props.longdesc,
      ismap: props.ismap,
      crossorigin: props.crossorigin === true ? "anonymous" : props.crossorigin || void 0,
      loading: props.loading,
      decoding: props.decoding,
      nonce: props.nonce
    };
  });
  const $img = useImage();
  const modifiers = computed(() => {
    return {
      ...props.modifiers,
      width: parseSize(props.width),
      height: parseSize(props.height),
      format: props.format,
      quality: props.quality || $img.options.quality,
      background: props.background,
      fit: props.fit
    };
  });
  return {
    options,
    attrs,
    modifiers
  };
};
const imgProps = {
  ...baseImageProps,
  placeholder: { type: [Boolean, String, Number, Array], required: false },
  placeholderClass: { type: String, required: false },
  custom: { type: Boolean, required: false }
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "NuxtImg",
  __ssrInlineRender: true,
  props: imgProps,
  emits: ["load", "error"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const attrs = useAttrs();
    const isServer = true;
    const $img = useImage();
    const _base = useBaseImage(props);
    const placeholderLoaded = ref(false);
    const imgEl = ref();
    const sizes = computed(() => $img.getSizes(props.src, {
      ..._base.options.value,
      sizes: props.sizes,
      densities: props.densities,
      modifiers: {
        ..._base.modifiers.value,
        width: parseSize(props.width),
        height: parseSize(props.height)
      }
    }));
    const imgAttrs = computed(() => {
      const attrs2 = { ..._base.attrs.value, "data-nuxt-img": "" };
      if (!props.placeholder || placeholderLoaded.value) {
        attrs2.sizes = sizes.value.sizes;
        attrs2.srcset = sizes.value.srcset;
      }
      return attrs2;
    });
    const placeholder = computed(() => {
      let placeholder2 = props.placeholder;
      if (placeholder2 === "") {
        placeholder2 = true;
      }
      if (!placeholder2 || placeholderLoaded.value) {
        return false;
      }
      if (typeof placeholder2 === "string") {
        return placeholder2;
      }
      const size = Array.isArray(placeholder2) ? placeholder2 : typeof placeholder2 === "number" ? [placeholder2, placeholder2] : [10, 10];
      return $img(props.src, {
        ..._base.modifiers.value,
        width: size[0],
        height: size[1],
        quality: size[2] || 50,
        blur: size[3] || 3
      }, _base.options.value);
    });
    const mainSrc = computed(
      () => props.sizes ? sizes.value.src : $img(props.src, _base.modifiers.value, _base.options.value)
    );
    const src = computed(() => placeholder.value ? placeholder.value : mainSrc.value);
    if (props.preload) {
      const isResponsive = Object.values(sizes.value).every((v) => v);
      useHead({
        link: [{
          rel: "preload",
          as: "image",
          nonce: props.nonce,
          ...!isResponsive ? { href: src.value } : {
            href: sizes.value.src,
            imagesizes: sizes.value.sizes,
            imagesrcset: sizes.value.srcset
          },
          ...typeof props.preload !== "boolean" && props.preload.fetchPriority ? { fetchpriority: props.preload.fetchPriority } : {}
        }]
      });
    }
    const nuxtApp = useNuxtApp();
    nuxtApp.isHydrating;
    return (_ctx, _push, _parent, _attrs) => {
      if (!_ctx.custom) {
        _push(`<img${ssrRenderAttrs(mergeProps({
          ref_key: "imgEl",
          ref: imgEl,
          class: placeholder.value && !placeholderLoaded.value ? _ctx.placeholderClass : void 0
        }, {
          ...unref(isServer) ? { onerror: "this.setAttribute('data-error', 1)" } : {},
          ...imgAttrs.value,
          ...unref(attrs)
        }, { src: src.value }, _attrs))}>`);
      } else {
        ssrRenderSlot(_ctx.$slots, "default", {
          ...unref(isServer) ? { onerror: "this.setAttribute('data-error', 1)" } : {},
          imgAttrs: {
            ...imgAttrs.value,
            ...unref(attrs)
          },
          isLoaded: placeholderLoaded.value,
          src: src.value
        }, null, _push, _parent);
      }
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$8, { __name: "NuxtImg" });
const WHATSAPP_NUMBER$2 = "6285179857522";
const WA_MESSAGE$1 = "Halo Kak! Saya tertarik untuk berkolaborasi dengan @daily.jeds. Boleh info lebih lanjut?";
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "HeroSection",
  __ssrInlineRender: true,
  props: {
    title: { default: "Daily Jeds" },
    subtitle: { default: "@daily.jeds" },
    description: { default: "Prioritizing audience trust and authentic storytelling over aggressive branding. A journey of home growth, family moments, and the beautiful chaos of everyday life." },
    heroImage: { default: "/hero-family.jpeg" }
  },
  setup(__props) {
    const waLink = `https://wa.me/${WHATSAPP_NUMBER$2}?text=${encodeURIComponent(WA_MESSAGE$1)}`;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      const _component_NuxtImg = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "relative min-h-screen flex items-center justify-center overflow-hidden ghibli-pattern" }, _attrs))}><div class="absolute inset-0 bg-gradient-to-b from-ghibli-cream via-ghibli-cream-light to-ghibli-cream-warm opacity-80"></div><div class="absolute top-20 left-10 w-72 h-72 bg-ghibli-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div><div class="absolute bottom-20 right-10 w-96 h-96 bg-ghibli-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style="${ssrRenderStyle({ "animation-delay": "-3s" })}"></div><div class="absolute top-1/2 left-1/2 w-64 h-64 bg-ghibli-wood-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style="${ssrRenderStyle({ "animation-delay": "-1.5s" })}"></div><div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"><div class="grid lg:grid-cols-2 gap-12 items-center"><div class="text-center lg:text-left space-y-8" data-aos="fade-right" data-aos-delay="200"><div class="space-y-4"><p class="text-ghibli-green-600 font-medium tracking-wider uppercase text-sm"> Home Growth &amp; Family Lifestyle </p><h1 class="text-5xl sm:text-6xl lg:text-7xl font-ghibli font-bold leading-tight"><span class="ghibli-text-gradient">${ssrInterpolate(_ctx.title)}</span></h1><p class="text-xl text-ghibli-amber-600 font-lazy tracking-wide">${ssrInterpolate(_ctx.subtitle)}</p></div><p class="text-lg text-ghibli-brown-500 leading-relaxed max-w-xl mx-auto lg:mx-0">${ssrInterpolate(_ctx.description)}</p><div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"><a${ssrRenderAttr("href", waLink)} target="_blank" rel="noopener noreferrer" class="ghibli-button text-lg px-8 py-4 flex items-center justify-center gap-2 group">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:whatsapp",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`<span>Mulai Kolaborasi</span></a><button class="ghibli-button-secondary text-lg px-8 py-4 flex items-center justify-center gap-2 group"><span>Cerita Kami</span>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:heart-outline",
        class: "w-5 h-5 transition-transform group-hover:scale-110"
      }, null, _parent));
      _push(`</button></div><div class="flex items-center gap-6 justify-center lg:justify-start pt-4"><div class="flex items-center gap-2 text-ghibli-brown-400">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:map-marker",
        class: "w-5 h-5 text-ghibli-green-500"
      }, null, _parent));
      _push(`<span class="text-sm">Salatiga, ID</span></div><div class="w-1 h-1 rounded-full bg-ghibli-wood-300"></div><div class="flex items-center gap-2 text-ghibli-brown-400">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:home-heart",
        class: "w-5 h-5 text-ghibli-amber-500"
      }, null, _parent));
      _push(`<span class="text-sm">Family First</span></div></div></div><div class="relative" data-aos="fade-left" data-aos-delay="400"><div class="relative rounded-3xl overflow-hidden shadow-ghibli-hover ghibli-glow"><div class="absolute inset-0 bg-gradient-to-t from-ghibli-brown-900/30 via-transparent to-transparent z-10"></div>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: _ctx.heroImage,
        alt: "Daily Jeds - Family lifestyle and home growth journey",
        class: "w-full h-[500px] lg:h-[600px] object-cover",
        loading: "eager",
        placeholder: "",
        sizes: "sm:100vw md:50vw lg:600px"
      }, null, _parent));
      _push(`<div class="absolute bottom-6 left-6 right-6 z-20"><div class="glass-effect rounded-2xl p-4"><p class="text-ghibli-brown-700 font-medium text-sm"> &quot;Cerita kecil tentang keseharian, rumah, dan proses tumbuh bersama.&quot; </p><p class="text-ghibli-brown-400 text-xs mt-2"> - The Journey of @daily.jeds </p></div></div></div><div class="absolute -top-6 -right-6 w-24 h-24 bg-ghibli-amber-100 rounded-full flex items-center justify-center shadow-ghibli animate-float" style="${ssrRenderStyle({ "animation-delay": "-2s" })}"><span class="text-3xl">🌿</span></div><div class="absolute -bottom-4 -left-4 w-20 h-20 bg-ghibli-green-100 rounded-full flex items-center justify-center shadow-ghibli animate-float" style="${ssrRenderStyle({ "animation-delay": "-4s" })}"><span class="text-2xl">🏡</span></div></div></div></div><div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"><button class="text-ghibli-brown-400 hover:text-ghibli-amber-500 transition-colors" aria-label="Scroll to content">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:chevron-double-down",
        class: "w-8 h-8"
      }, null, _parent));
      _push(`</button></div></section>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeroSection.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$7, { __name: "HeroSection" });
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "StorySection",
  __ssrInlineRender: true,
  setup(__props) {
    const storyBlocks = [
      {
        id: "origin",
        icon: "💕",
        title: "Awal Mula",
        content: "Daily Jeds tumbuh dari perjalanan dua orang yang sudah melewati fase begadang, drama pagi karena sepatu hilang, sampai proyek rumah yang tak pernah selesai tepat waktu. Sekarang kami hidup bersama seorang anak umur enam tahun yang pertanyaannya makin sulit dijawab, tapi justru bikin rumah makin penuh cerita.",
        accent: "bg-ghibli-green-100 border-ghibli-green-300"
      },
      {
        id: "content",
        icon: "🏡",
        title: "Yang Kami Bagi",
        content: "Yang kami bagi di sini sederhana: potongan kehidupan keluarga yang nyata. Rumah yang pelan-pelan dibangun, hubungan yang terus diperbaiki, dan rutinitas yang berubah mengikuti anak yang makin besar dan makin banyak ide.",
        accent: "bg-ghibli-amber-100 border-ghibli-amber-300"
      },
      {
        id: "collab",
        icon: "🤝",
        title: "Kolaborasi",
        content: "Jika kamu datang sebagai brand, kolaborasi bagi kami bukan soal menempelkan produk. Kami memasukkannya ke momen yang memang terjadi— hangat, jujur, dan relevan dengan perjalanan keluarga kami.",
        accent: "bg-ghibli-wood-100 border-ghibli-wood-300"
      }
    ];
    const activeBlock = ref(null);
    ref(false);
    const typedText = ref("");
    const stats = [
      { label: "Tahun Bersama", value: "17+", icon: "mdi:heart" },
      { label: "Followers", value: "8K+", icon: "mdi:account-group" },
      { label: "Kolaborasi Brand", value: "30+", icon: "mdi:handshake" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "story",
        class: "relative py-24 lg:py-32 overflow-hidden ghibli-section"
      }, _attrs))}><div class="absolute inset-0 bg-gradient-to-b from-ghibli-cream via-ghibli-cream-light to-ghibli-cream-warm"></div><div class="absolute top-10 right-10 w-40 h-40 bg-ghibli-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-float"></div><div class="absolute bottom-20 left-10 w-56 h-56 bg-ghibli-amber-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-float" style="${ssrRenderStyle({ "animation-delay": "-3s" })}"></div><div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-16" data-aos="fade-up"><p class="text-ghibli-green-600 font-medium tracking-wider uppercase text-sm mb-4"> Our Philosophy </p><h2 class="text-4xl sm:text-5xl font-ghibli font-bold mb-6 min-h-[60px]"><span class="ghibli-text-gradient">${ssrInterpolate(unref(typedText))}</span><span class="animate-pulse text-ghibli-amber-500">|</span></h2><p class="text-ghibli-brown-400 max-w-lg mx-auto"> Klik setiap kartu untuk membaca cerita lengkapnya </p></div><div class="grid grid-cols-3 gap-4 sm:gap-6 mb-16 max-w-2xl mx-auto"><!--[-->`);
      ssrRenderList(stats, (stat) => {
        _push(`<div class="ghibli-card p-4 sm:p-6 text-center group hover:scale-105 transition-all duration-300" data-aos="fade-up" data-aos-delay="100"><div class="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-full bg-ghibli-green-100 flex items-center justify-center group-hover:bg-ghibli-amber-100 transition-colors">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: stat.icon,
          class: "w-5 h-5 sm:w-6 sm:h-6 text-ghibli-green-600 group-hover:text-ghibli-amber-600 transition-colors"
        }, null, _parent));
        _push(`</div><p class="text-2xl sm:text-3xl font-bold text-ghibli-brown-700 font-ghibli">${ssrInterpolate(stat.value)}</p><p class="text-xs sm:text-sm text-ghibli-brown-400 mt-1">${ssrInterpolate(stat.label)}</p></div>`);
      });
      _push(`<!--]--></div><div class="space-y-4"><!--[-->`);
      ssrRenderList(storyBlocks, (block, index) => {
        _push(`<div class="relative"${ssrRenderAttr("data-aos", index % 2 === 0 ? "fade-right" : "fade-left")}${ssrRenderAttr("data-aos-delay", 200 + index * 100)}><div class="${ssrRenderClass([[
          block.accent,
          unref(activeBlock) === block.id ? "shadow-ghibli-hover" : "shadow-ghibli"
        ], "ghibli-card cursor-pointer transition-all duration-500 overflow-hidden"])}"><div class="p-6 flex items-start gap-4"><span class="${ssrRenderClass([{ "scale-125": unref(activeBlock) === block.id }, "text-3xl flex-shrink-0 transition-transform duration-300"])}">${ssrInterpolate(block.icon)}</span><div class="flex-1"><div class="flex items-center justify-between"><h3 class="text-xl font-ghibli font-semibold text-ghibli-brown-700">${ssrInterpolate(block.title)}</h3>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:chevron-down",
          class: ["w-5 h-5 text-ghibli-brown-400 transition-transform duration-300", { "rotate-180": unref(activeBlock) === block.id }]
        }, null, _parent));
        _push(`</div><div style="${ssrRenderStyle(unref(activeBlock) === block.id ? null : { display: "none" })}" class="overflow-hidden"><p class="text-ghibli-brown-600 leading-relaxed mt-4 pt-4 border-t border-ghibli-wood-200/50">${ssrInterpolate(block.content)}</p></div></div></div></div></div>`);
      });
      _push(`<!--]--></div><div class="mt-16 text-center" data-aos="fade-up" data-aos-delay="600"><div class="inline-block ghibli-card p-8 relative overflow-hidden"><div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ghibli-green-400 via-ghibli-amber-400 to-ghibli-wood-400"></div><div class="absolute -top-2 -right-2 w-16 h-16 bg-ghibli-amber-100 rounded-full opacity-50"></div><p class="text-xl text-ghibli-brown-500 italic font-ghibli relative z-10"> &quot;Selamat datang di rumah digital kami.<br><span class="text-ghibli-brown-700 font-semibold">Tidak selalu rapi, tapi selalu punya cerita.</span>&quot; </p><div class="mt-4 flex items-center justify-center gap-3"><div class="w-8 h-px bg-ghibli-amber-300"></div><span class="text-ghibli-amber-500 font-lazy text-sm">@daily.jeds</span><div class="w-8 h-px bg-ghibli-amber-300"></div></div></div></div></div></section>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/StorySection.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$6, { __name: "StorySection" });
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "JourneyTimeline",
  __ssrInlineRender: true,
  setup(__props) {
    const milestones = [
      {
        year: "2018",
        title: "Where It All Began",
        description: "Two hearts and a dream of building something beautiful together. The journey of @daily.jeds started with simple moments.",
        icon: "💕"
      },
      {
        year: "2019",
        title: "Our Little Miracle",
        description: "Welcoming our first child changed everything. Sleepless nights became the new normal, but so did a love we never knew was possible.",
        icon: "👶"
      },
      {
        year: "2022",
        title: "Building Our Nest",
        description: "We took the leap and started building our dream home. Every brick, every wall choice became a story worth sharing with our growing community.",
        icon: "🏠"
      },
      {
        year: "2024",
        title: "Growing Together",
        description: "Our family grew, our home took shape, and our community blossomed. We learned that the best stories are the ones lived authentically.",
        icon: "🌱"
      }
    ];
    const activeIndex = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "journey",
        class: "relative py-24 lg:py-32 overflow-hidden ghibli-section"
      }, _attrs))}><div class="absolute inset-0 bg-gradient-to-b from-ghibli-cream-warm via-ghibli-cream to-ghibli-cream-light"></div><div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ghibli-wood-200 to-transparent"></div><div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-20" data-aos="fade-up"><p class="text-ghibli-green-600 font-medium tracking-wider uppercase text-sm mb-4"> Our Journey </p><h2 class="text-4xl sm:text-5xl font-ghibli font-bold ghibli-text-gradient mb-6"> The Story of Us </h2><p class="text-lg text-ghibli-brown-500 max-w-2xl mx-auto leading-relaxed"> Every family has a story. Ours is written in tiny moments, messy kitchens, and the laughter that fills our home. </p></div><div class="hidden lg:block relative" data-aos="fade-up" data-aos-delay="200"><div class="timeline-line"></div><div class="grid grid-cols-4 gap-8"><!--[-->`);
      ssrRenderList(milestones, (milestone, index) => {
        _push(`<div class="relative cursor-pointer group"><div class="${ssrRenderClass([{ "scale-150 bg-ghibli-amber-400": unref(activeIndex) === index }, "timeline-dot transition-all duration-500"])}" style="${ssrRenderStyle({ top: "40px" })}"></div><div class="${ssrRenderClass([{
          "shadow-ghibli-hover scale-105": unref(activeIndex) === index,
          "opacity-70": unref(activeIndex) !== index
        }, "ghibli-card p-6 mt-16 transition-all duration-500"])}"><div class="text-center mb-4"><span class="text-4xl block mb-3">${ssrInterpolate(milestone.icon)}</span><span class="text-3xl font-ghibli font-bold text-ghibli-amber-500">${ssrInterpolate(milestone.year)}</span></div><h3 class="text-xl font-ghibli font-semibold text-ghibli-brown-700 mb-3 text-center">${ssrInterpolate(milestone.title)}</h3><p class="text-ghibli-brown-500 text-sm leading-relaxed text-center">${ssrInterpolate(milestone.description)}</p>`);
        if (milestone.image) {
          _push(`<div class="${ssrRenderClass([{ "opacity-100 max-h-48": unref(activeIndex) === index, "opacity-0 max-h-0": unref(activeIndex) !== index }, "mt-4 rounded-xl overflow-hidden shadow-ghibli transition-all duration-500"])}">`);
          _push(ssrRenderComponent(_component_NuxtImg, {
            src: milestone.image,
            alt: milestone.title,
            class: "w-full h-48 object-cover",
            loading: "lazy",
            placeholder: "",
            sizes: "sm:100vw md:300px"
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></div><div class="lg:hidden space-y-8" data-aos="fade-up" data-aos-delay="200"><!--[-->`);
      ssrRenderList(milestones, (milestone, index) => {
        _push(`<div class="relative pl-8 border-l-2 border-ghibli-green-200"${ssrRenderAttr("data-aos", index % 2 === 0 ? "fade-right" : "fade-left")}${ssrRenderAttr("data-aos-delay", 200 + index * 100)}><div class="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-gradient-to-r from-ghibli-green-400 to-ghibli-amber-400 border-2 border-white shadow-ghibli"></div><div class="ghibli-card p-6"><div class="flex items-center gap-4 mb-4"><span class="text-3xl">${ssrInterpolate(milestone.icon)}</span><div><span class="text-2xl font-ghibli font-bold text-ghibli-amber-500">${ssrInterpolate(milestone.year)}</span><h3 class="text-lg font-ghibli font-semibold text-ghibli-brown-700">${ssrInterpolate(milestone.title)}</h3></div></div><p class="text-ghibli-brown-500 text-sm leading-relaxed">${ssrInterpolate(milestone.description)}</p>`);
        if (milestone.image) {
          _push(`<div class="mt-4 rounded-xl overflow-hidden shadow-ghibli">`);
          _push(ssrRenderComponent(_component_NuxtImg, {
            src: milestone.image,
            alt: milestone.title,
            class: "w-full h-48 object-cover",
            loading: "lazy",
            placeholder: "",
            sizes: "sm:100vw md:300px"
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div><div class="mt-20 text-center" data-aos="fade-up" data-aos-delay="400"><div class="ghibli-card inline-block p-8 max-w-2xl"><p class="text-lg text-ghibli-brown-600 leading-relaxed italic font-ghibli"> &quot;Yang kami bagi di sini sederhana: potongan kehidupan keluarga yang nyata. Rumah yang pelan-pelan dibangun, hubungan yang terus diperbaiki, dan rutinitas yang berubah mengikuti anak yang makin besar dan makin banyak ide.&quot; </p><div class="mt-4 flex items-center justify-center gap-2"><div class="w-12 h-px bg-ghibli-amber-300"></div><span class="text-ghibli-amber-500 font-lazy">@daily.jeds</span><div class="w-12 h-px bg-ghibli-amber-300"></div></div></div></div></div></section>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/JourneyTimeline.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$5, { __name: "JourneyTimeline" });
const WHATSAPP_NUMBER$1 = "6285179857522";
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ServicesGrid",
  __ssrInlineRender: true,
  setup(__props) {
    const services = [
      {
        id: "paid",
        title: "Paid Collaboration",
        price: "Rp 300.000",
        priceNote: "/ Reels",
        description: "Konten Reels profesional yang terintegrasi secara natural dalam keseharian keluarga kami.",
        icon: "mdi:video-outline",
        features: [
          "1x Reels Content (Instagram)",
          "Tap Link Placement di bio/story",
          "Mirroring ke TikTok @daily.jeds"
        ],
        ctaText: "Hubungi via WhatsApp",
        waMessage: "Halo Kak! Saya tertarik dengan Paid Collaboration (Rp 300.000/Reels). Boleh info lebih lanjut?",
        gradient: "from-ghibli-green-400 to-ghibli-green-600"
      },
      {
        id: "barter",
        title: "TOM Barter Collaboration",
        price: "Barter Produk Premium",
        description: "Kolaborasi barter dengan produk yang relevan dan bernilai. Prioritas untuk brand yang sevisi.",
        icon: "mdi:gift-outline",
        features: [
          "Hanya produk relevan: Home Growth, DIY, & Estetika",
          "Nilai retail produk minimal Rp 500.000 / campaign",
          "1x Reels Content + Mirroring TikTok"
        ],
        ctaText: "Ajukan Barter via WhatsApp",
        waMessage: "Halo Kak! Saya ingin mengajukan kerjasama Barter Produk. Boleh diskusi lebih lanjut?",
        gradient: "from-ghibli-amber-400 to-ghibli-amber-600",
        badge: "Popular"
      }
    ];
    const hoveredCard = ref(null);
    const getWaLink = (message) => {
      return `https://wa.me/${WHATSAPP_NUMBER$1}?text=${encodeURIComponent(message)}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "services",
        class: "relative py-24 lg:py-32 overflow-hidden ghibli-section"
      }, _attrs))}><div class="absolute inset-0 bg-gradient-to-b from-ghibli-cream via-ghibli-cream-warm to-ghibli-cream-light"></div><div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ghibli-green-200 to-transparent"></div><div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-16" data-aos="fade-up"><p class="text-ghibli-amber-600 font-medium tracking-wider uppercase text-sm mb-4"> Kolaborasi </p><h2 class="text-4xl sm:text-5xl font-ghibli font-bold ghibli-text-gradient mb-6"> Yuk Kerja Sama! </h2><p class="text-lg text-ghibli-brown-500 max-w-2xl mx-auto leading-relaxed"> Kami percaya kolaborasi yang baik dimulai dari kejujuran dan kesesuaian nilai. Pilih paket yang paling cocok untuk brand-mu. </p></div><div class="grid md:grid-cols-2 gap-8"><!--[-->`);
      ssrRenderList(services, (service) => {
        _push(`<div class="relative group" data-aos="fade-up"${ssrRenderAttr("data-aos-delay", 200 + services.indexOf(service) * 150)}><div class="${ssrRenderClass([{
          "shadow-ghibli-hover scale-[1.02] -translate-y-1": unref(hoveredCard) === service.id,
          "shadow-ghibli": unref(hoveredCard) !== service.id
        }, "ghibli-card h-full p-8 transition-all duration-500 flex flex-col"])}">`);
        if (service.badge) {
          _push(`<div class="absolute -top-3 -right-3 z-10"><span class="bg-ghibli-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-ghibli">${ssrInterpolate(service.badge)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex items-start justify-between mb-6"><div class="${ssrRenderClass([[
          service.gradient,
          { "scale-110 rotate-3": unref(hoveredCard) === service.id }
        ], "w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br shadow-ghibli transition-all duration-500"])}">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: service.icon,
          class: "w-7 h-7 text-white"
        }, null, _parent));
        _push(`</div></div><h3 class="text-2xl font-ghibli font-bold text-ghibli-brown-700 mb-2">${ssrInterpolate(service.title)}</h3><div class="mb-4"><span class="text-3xl font-bold text-ghibli-green-600">${ssrInterpolate(service.price)}</span>`);
        if (service.priceNote) {
          _push(`<span class="text-ghibli-brown-400 text-sm ml-1">${ssrInterpolate(service.priceNote)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><p class="text-ghibli-brown-500 leading-relaxed mb-6">${ssrInterpolate(service.description)}</p><ul class="space-y-3 mb-8 flex-1"><!--[-->`);
        ssrRenderList(service.features, (feature) => {
          _push(`<li class="flex items-start gap-3 text-ghibli-brown-600">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:check-circle",
            class: "w-5 h-5 text-ghibli-green-500 flex-shrink-0 mt-0.5"
          }, null, _parent));
          _push(`<span class="text-sm">${ssrInterpolate(feature)}</span></li>`);
        });
        _push(`<!--]--></ul><a${ssrRenderAttr("href", getWaLink(service.waMessage))} target="_blank" rel="noopener noreferrer" class="ghibli-button w-full flex items-center justify-center gap-2 group/btn">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:whatsapp",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(service.ctaText)}</span></a></div></div>`);
      });
      _push(`<!--]--></div><div class="mt-16 text-center" data-aos="fade-up" data-aos-delay="500"><div class="ghibli-card inline-block p-8 max-w-3xl"><div class="flex flex-col md:flex-row items-center gap-6"><div class="flex-shrink-0"><div class="w-16 h-16 rounded-full bg-gradient-to-br from-ghibli-amber-400 to-ghibli-amber-600 flex items-center justify-center shadow-ghibli">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:heart",
        class: "w-8 h-8 text-white"
      }, null, _parent));
      _push(`</div></div><div class="text-center md:text-left"><h3 class="text-lg font-ghibli font-semibold text-ghibli-brown-700 mb-2"> Komitmen Kami </h3><p class="text-ghibli-brown-500 leading-relaxed text-sm"> &quot;Kolaborasi bagi kami bukan soal menempelkan produk. Kami memasukkannya ke momen yang memang terjadi—hangat, jujur, dan relevan dengan perjalanan keluarga kami.&quot; </p></div></div></div></div></div></section>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ServicesGrid.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main$4, { __name: "ServicesGrid" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "FaqSection",
  __ssrInlineRender: true,
  setup(__props) {
    const faqItems = [
      {
        id: "siapa",
        question: "Siapa itu Daily Jeds?",
        answer: "Keluarga muda dari Salatiga yang berbagi cerita keseharian, membangun rumah, dan proses tumbuh bersama. Dimulai dari dua orang yang melewati fase begadang, drama pagi, sampai proyek rumah yang tak pernah selesai tepat waktu.",
        icon: "🏡"
      },
      {
        id: "konten",
        question: "Konten apa yang dibagikan?",
        answer: "Home growth, family lifestyle, DIY, dan estetika rumah. Cerita nyata tanpa settingan—potongan kehidupan keluarga yang autentik dan relevan dengan kebanyakan keluarga muda Indonesia.",
        icon: "📸"
      },
      {
        id: "kolaborasi",
        question: "Apakah menerima kolaborasi?",
        answer: "Ya! Ada Paid Collaboration seharga Rp 300.000 per Reels (termasuk Tap Link dan Mirroring ke TikTok), dan juga Barter Produk Premium untuk produk yang relevan dengan niche kami (minimal nilai retail Rp 500.000).",
        icon: "🤝"
      },
      {
        id: "hubungi",
        question: "Bagaimana cara menghubungi?",
        answer: "Langsung via WhatsApp dari tombol yang ada di website ini. Kami biasanya merespons dalam 1×24 jam. Untuk pertanyaan kolaborasi, sebutkan brand dan kebutuhanmu ya!",
        icon: "💬"
      },
      {
        id: "follow",
        question: "Di mana bisa follow Daily Jeds?",
        answer: "Kamu bisa temukan kami di Instagram (@daily.jeds), TikTok (@daily.jeds), Facebook (dailyjeds.page), dan Shopee. Follow untuk ikuti keseharian kami!",
        icon: "📱"
      }
    ];
    const activeFaq = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "faq",
        class: "relative py-24 lg:py-32 overflow-hidden ghibli-section"
      }, _attrs))}><div class="absolute inset-0 bg-gradient-to-b from-ghibli-cream-light via-ghibli-cream to-ghibli-cream-warm"></div><div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ghibli-amber-200 to-transparent"></div><div class="absolute bottom-20 right-10 w-48 h-48 bg-ghibli-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-float"></div><div class="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-16" data-aos="fade-up"><p class="text-ghibli-amber-600 font-medium tracking-wider uppercase text-sm mb-4"> FAQ </p><h2 class="text-4xl sm:text-5xl font-ghibli font-bold ghibli-text-gradient mb-6"> Pertanyaan yang Sering Ditanya </h2><p class="text-ghibli-brown-400 max-w-lg mx-auto"> Jawaban singkat untuk pertanyaan yang paling sering masuk </p></div><div class="space-y-4"><!--[-->`);
      ssrRenderList(faqItems, (item, index) => {
        _push(`<div data-aos="fade-up"${ssrRenderAttr("data-aos-delay", 100 + index * 80)}><div class="${ssrRenderClass([[
          unref(activeFaq) === item.id ? "shadow-ghibli-hover" : "shadow-ghibli"
        ], "ghibli-card overflow-hidden transition-all duration-400"])}"><button class="w-full p-6 flex items-start gap-4 text-left group"><span class="${ssrRenderClass([{ "scale-125": unref(activeFaq) === item.id }, "text-2xl flex-shrink-0 transition-transform duration-300"])}">${ssrInterpolate(item.icon)}</span><div class="flex-1 min-w-0"><h3 class="text-lg font-ghibli font-semibold text-ghibli-brown-700 group-hover:text-ghibli-green-700 transition-colors">${ssrInterpolate(item.question)}</h3></div>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:chevron-down",
          class: ["w-5 h-5 text-ghibli-brown-400 flex-shrink-0 transition-transform duration-300 mt-1", { "rotate-180 text-ghibli-amber-500": unref(activeFaq) === item.id }]
        }, null, _parent));
        _push(`</button><div style="${ssrRenderStyle(unref(activeFaq) === item.id ? null : { display: "none" })}" class="overflow-hidden"><div class="px-6 pb-6 pt-0 pl-[68px]"><p class="text-ghibli-brown-500 leading-relaxed">${ssrInterpolate(item.answer)}</p></div></div></div></div>`);
      });
      _push(`<!--]--></div><div class="mt-12 text-center" data-aos="fade-up" data-aos-delay="600"><p class="text-ghibli-brown-400 mb-4"> Masih ada pertanyaan? </p><a href="https://wa.me/6285179857522?text=Halo%20Kak!%20Saya%20ada%20pertanyaan%20tentang%20Daily%20Jeds" target="_blank" rel="noopener noreferrer" class="ghibli-button-secondary inline-flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:whatsapp",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`<span>Tanya via WhatsApp</span></a></div></div></section>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FaqSection.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_5 = Object.assign(_sfc_main$3, { __name: "FaqSection" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "InstagramFeed",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const posts = ref([]);
    const loading = ref(true);
    const error = ref(false);
    const { data, status } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/instagram/feed", {
      key: "instagram-feed",
      getCachedData: (key, nuxt) => {
        return nuxt.payload.data[key] || nuxt.static.data[key];
      }
    }, "$afEt7WobUL")), __temp = await __temp, __restore(), __temp);
    watchEffect(() => {
      if (data.value) {
        posts.value = data.value.posts || [];
        loading.value = false;
        if (data.value.error) {
          error.value = true;
        }
      }
      if (status.value === "error") {
        loading.value = false;
        error.value = true;
      }
    });
    const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    };
    const truncateCaption = (caption, maxLength = 80) => {
      if (!caption) return "";
      if (caption.length <= maxLength) return caption;
      return caption.substring(0, maxLength).trim() + "...";
    };
    const getMediaUrl = (post) => {
      if (post.media_type === "VIDEO") {
        return post.thumbnail_url || post.media_url;
      }
      return post.media_url;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "instagram",
        class: "relative py-24 lg:py-32 overflow-hidden ghibli-section"
      }, _attrs))}><div class="absolute inset-0 bg-gradient-to-b from-ghibli-cream-warm via-ghibli-cream to-ghibli-cream-light"></div><div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ghibli-green-200 to-transparent"></div><div class="absolute top-20 left-10 w-56 h-56 bg-ghibli-amber-200 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-float" style="${ssrRenderStyle({ "animation-delay": "-2s" })}"></div><div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-16" data-aos="fade-up"><p class="text-ghibli-green-600 font-medium tracking-wider uppercase text-sm mb-4"> @daily.jeds </p><h2 class="text-4xl sm:text-5xl font-ghibli font-bold ghibli-text-gradient mb-6"> Ikuti Perjalanan Kami </h2><p class="text-ghibli-brown-400 max-w-lg mx-auto mb-2"> Momen keseharian yang kami bagikan di Instagram </p><a href="https://www.instagram.com/daily.jeds" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-ghibli-amber-600 hover:text-ghibli-amber-700 transition-colors font-medium">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:instagram",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`<span>@daily.jeds</span></a></div>`);
      if (unref(loading)) {
        _push(`<div class="flex items-center justify-center py-20" data-aos="fade-up"><div class="flex flex-col items-center gap-4"><div class="w-10 h-10 border-3 border-ghibli-green-300 border-t-ghibli-green-600 rounded-full animate-spin"></div><p class="text-ghibli-brown-400 text-sm">Memuat postingan...</p></div></div>`);
      } else if (unref(error) || unref(posts).length === 0) {
        _push(`<div class="text-center py-16" data-aos="fade-up"><div class="ghibli-card p-8 max-w-md mx-auto">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:instagram",
          class: "w-12 h-12 text-ghibli-brown-300 mx-auto mb-4"
        }, null, _parent));
        _push(`<p class="text-ghibli-brown-500 mb-4"> Postingan Instagram akan segera tersedia </p><a href="https://www.instagram.com/daily.jeds" target="_blank" rel="noopener noreferrer" class="ghibli-button inline-flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:instagram",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`<span>Follow @daily.jeds</span></a></div></div>`);
      } else {
        _push(`<div class="grid grid-cols-2 sm:grid-cols-3 gap-4" data-aos="fade-up" data-aos-delay="200"><!--[-->`);
        ssrRenderList(unref(posts), (post) => {
          _push(`<a${ssrRenderAttr("href", post.permalink)} target="_blank" rel="noopener noreferrer" class="group relative aspect-square rounded-2xl overflow-hidden shadow-ghibli hover:shadow-ghibli-hover transition-all duration-300 hover:scale-[1.02]"><div class="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style="${ssrRenderStyle({ backgroundImage: `url(${getMediaUrl(post)})` })}"${ssrRenderAttr("aria-label", truncateCaption(post.caption))}></div><div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"><div class="absolute bottom-0 left-0 right-0 p-4"><p class="text-white text-sm leading-relaxed line-clamp-2">${ssrInterpolate(truncateCaption(post.caption, 100))}</p><div class="flex items-center gap-2 mt-2">`);
          if (post.media_type === "VIDEO") {
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:play-circle",
              class: "w-4 h-4 text-white/80"
            }, null, _parent));
          } else if (post.media_type === "CAROUSEL_ALBUM") {
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:camera-burst",
              class: "w-4 h-4 text-white/80"
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`<span class="text-white/70 text-xs">${ssrInterpolate(formatDate(post.timestamp))}</span></div></div></div></a>`);
        });
        _push(`<!--]--></div>`);
      }
      if (unref(posts).length > 0) {
        _push(`<div class="text-center mt-10" data-aos="fade-up" data-aos-delay="400"><a href="https://www.instagram.com/daily.jeds" target="_blank" rel="noopener noreferrer" class="ghibli-button-secondary inline-flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:instagram",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`<span>Lihat Lebih Banyak</span></a></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/InstagramFeed.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_6 = Object.assign(_sfc_main$2, { __name: "InstagramFeed" });
const WHATSAPP_NUMBER = "6285179857522";
const WA_MESSAGE = "Halo Kak! Saya ingin bertanya tentang kolaborasi dengan @daily.jeds";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FooterSection",
  __ssrInlineRender: true,
  setup(__props) {
    const socialLinks = [
      {
        name: "Instagram",
        url: "https://www.instagram.com/daily.jeds",
        icon: "mdi:instagram",
        color: "bg-gradient-to-br from-purple-500 to-pink-500",
        hoverColor: "hover:shadow-purple-500/30"
      },
      {
        name: "TikTok",
        url: "https://www.tiktok.com/@daily.jeds",
        icon: "ri:tiktok-fill",
        color: "bg-gradient-to-br from-gray-900 to-gray-700",
        hoverColor: "hover:shadow-gray-900/30"
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/dailyjeds.page",
        icon: "mdi:facebook",
        color: "bg-gradient-to-br from-blue-600 to-blue-500",
        hoverColor: "hover:shadow-blue-600/30"
      },
      {
        name: "Shopee",
        url: "https://shpe.site/daily.jeds",
        icon: "simple-icons:shopee",
        color: "bg-gradient-to-br from-ghibli-green-500 to-ghibli-green-600",
        hoverColor: "hover:shadow-ghibli-green-500/30"
      }
    ];
    const quickLinks = [
      { label: "Cerita Kami", to: "#journey" },
      { label: "Kolaborasi", to: "#services" },
      { label: "Hubungi WhatsApp", to: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}` }
    ];
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "relative overflow-hidden ghibli-section" }, _attrs))}><div class="absolute inset-0 bg-gradient-to-b from-ghibli-cream-warm via-ghibli-brown-100 to-ghibli-brown-200"></div><div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ghibli-wood-300 to-transparent"></div><div class="relative z-10"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"><div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12"><div class="lg:col-span-2" data-aos="fade-up"><div class="mb-6"><h3 class="text-3xl font-lazy ghibli-text-gradient mb-2"> Daily Jeds </h3><p class="text-ghibli-amber-600 font-lazy tracking-wide"> @daily.jeds </p></div><p class="text-ghibli-brown-500 leading-relaxed max-w-md mb-8"> Cerita keluarga muda yang sedang membangun rumah, membangun ritme hidup, dan membangun satu sama lain. Selamat datang di rumah digital kami. </p><div class="flex items-center gap-2 text-ghibli-brown-400">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:map-marker",
        class: "w-5 h-5 text-ghibli-green-500"
      }, null, _parent));
      _push(`<span>Salatiga, Indonesia</span></div></div><div data-aos="fade-up" data-aos-delay="100"><h4 class="text-lg font-ghibli font-semibold text-ghibli-brown-700 mb-6"> Quick Links </h4><ul class="space-y-4"><!--[-->`);
      ssrRenderList(quickLinks, (link) => {
        _push(`<li><a${ssrRenderAttr("href", link.to)} class="text-ghibli-brown-500 hover:text-ghibli-amber-600 transition-colors flex items-center gap-2 group">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:chevron-right",
          class: "w-4 h-4 transition-transform group-hover:translate-x-1"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(link.label)}</span></a></li>`);
      });
      _push(`<!--]--></ul></div><div data-aos="fade-up" data-aos-delay="200"><h4 class="text-lg font-ghibli font-semibold text-ghibli-brown-700 mb-6"> Connect With Us </h4><div class="flex flex-wrap gap-3"><!--[-->`);
      ssrRenderList(socialLinks, (social) => {
        _push(`<a${ssrRenderAttr("href", social.url)} target="_blank" rel="noopener noreferrer" class="${ssrRenderClass([[social.color, social.hoverColor], "social-icon"])}"${ssrRenderAttr("aria-label", `Follow us on ${social.name}`)}>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: social.icon,
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</a>`);
      });
      _push(`<!--]--></div><div class="mt-6"><a${ssrRenderAttr("href", `https://wa.me/${WHATSAPP_NUMBER}`)} target="_blank" rel="noopener noreferrer" class="ghibli-button-secondary inline-flex items-center gap-2 text-sm">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:whatsapp",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span>Chat WhatsApp</span></a></div></div></div></div><div class="border-t border-ghibli-wood-200/50"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"><div class="flex flex-col md:flex-row justify-between items-center gap-4"><p class="text-ghibli-brown-400 text-sm text-center md:text-left"> © ${ssrInterpolate(unref(currentYear))} Daily Jeds (@daily.jeds) · Cerita rumah, cerita hidup </p><div class="flex items-center gap-2 text-ghibli-brown-400 text-sm"><span>Made with</span>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:heart",
        class: "w-4 h-4 text-ghibli-amber-500 animate-pulse"
      }, null, _parent));
      _push(`<span>in Salatiga</span></div></div></div></div></div><div class="absolute bottom-20 right-20 w-64 h-64 bg-ghibli-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div><div class="absolute top-20 left-20 w-48 h-48 bg-ghibli-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div></footer>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FooterSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_7 = Object.assign(_sfc_main$1, { __name: "FooterSection" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Daily Jeds - Home Growth & Family Lifestyle",
      meta: [
        {
          name: "description",
          content: "Prioritizing audience trust and authentic storytelling over aggressive branding. A journey of home growth, family moments, and the beautiful chaos of everyday life."
        },
        {
          property: "og:title",
          content: "Daily Jeds - Home Growth & Family Lifestyle"
        },
        {
          property: "og:description",
          content: "Cerita keluarga muda yang sedang membangun rumah, membangun ritme hidup, dan membangun satu sama lain."
        },
        {
          property: "og:type",
          content: "website"
        },
        {
          property: "og:url",
          content: "https://dailyjeds.netlify.app"
        },
        {
          name: "twitter:card",
          content: "summary_large_image"
        },
        {
          name: "keywords",
          content: "daily jeds, family lifestyle, home growth, mom life, cottagecore, authentic storytelling"
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
      defineWebSite({
        name: "Daily Jeds",
        description: "Home Growth & Family Lifestyle - Authentic storytelling for modern families",
        url: "https://dailyjeds.netlify.app"
      }),
      defineOrganization({
        name: "Daily Jeds",
        url: "https://dailyjeds.netlify.app",
        logo: "/favicon.ico",
        sameAs: [
          "https://www.instagram.com/daily.jeds",
          "https://www.tiktok.com/@daily.jeds",
          "https://www.facebook.com/dailyjeds.page"
        ]
      })
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AudioPlayer = __nuxt_component_0$1;
      const _component_HeroSection = __nuxt_component_1;
      const _component_StorySection = __nuxt_component_2;
      const _component_JourneyTimeline = __nuxt_component_3;
      const _component_ServicesGrid = __nuxt_component_4;
      const _component_FaqSection = __nuxt_component_5;
      const _component_InstagramFeed = __nuxt_component_6;
      const _component_FooterSection = __nuxt_component_7;
      const _component_Icon = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-ghibli-cream" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_AudioPlayer, { "audio-src": "/memories-jonny-easton-main-version-17339-03-22.mp3" }, null, _parent));
      _push(`<main>`);
      _push(ssrRenderComponent(_component_HeroSection, {
        title: "Daily Jeds",
        subtitle: "@daily.jeds",
        description: "Prioritizing audience trust and authentic storytelling over aggressive branding. A journey of home growth, family moments, and the beautiful chaos of everyday life.",
        "hero-image": "/hero-family.jpeg"
      }, null, _parent));
      _push(ssrRenderComponent(_component_StorySection, null, null, _parent));
      _push(ssrRenderComponent(_component_JourneyTimeline, null, null, _parent));
      _push(ssrRenderComponent(_component_ServicesGrid, null, null, _parent));
      _push(ssrRenderComponent(_component_FaqSection, null, null, _parent));
      _push(ssrRenderComponent(_component_InstagramFeed, null, null, _parent));
      _push(`</main>`);
      _push(ssrRenderComponent(_component_FooterSection, null, null, _parent));
      _push(`<div class="fixed bottom-24 right-6 z-40"><button class="w-12 h-12 rounded-full bg-ghibli-green-500 text-white shadow-ghibli hover:shadow-ghibli-hover hover:bg-ghibli-green-600 transition-all duration-300 flex items-center justify-center group" aria-label="Back to top">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:arrow-up",
        class: "w-6 h-6 transition-transform group-hover:-translate-y-1"
      }, null, _parent));
      _push(`</button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-RONPEzzz.mjs.map

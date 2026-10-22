import { _ as __nuxt_component_1$1 } from './index-D86bI_Ad.mjs';
import { defineComponent, mergeProps, ref, unref, withCtx, createVNode, computed, useAttrs, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderSlot } from 'vue/server-renderer';
import { _ as __nuxt_component_0$1 } from './nuxt-link-Cb0x7L2U.mjs';
import { q as defu, D as withLeadingSlash, m as hasProtocol, o as joinURL, C as parseURL, G as encodeParam, H as encodePath } from '../nitro/nitro.mjs';
import { u as useHead, d as useSchemaOrg, _ as _export_sfc, a as useNuxtApp, b as useRuntimeConfig } from './server.mjs';
import { _ as __nuxt_component_3$1, u as useInstagramData } from './FloatingCollabBar-DrlUVjJG.mjs';
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
const __nuxt_component_0 = Object.assign(_sfc_main$9, { __name: "AudioPlayer" });
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
const __nuxt_component_2$1 = Object.assign(_sfc_main$8, { __name: "NuxtImg" });
const useAnalytics = () => {
  const trackCta = (eventName, label) => {
  };
  const trackClick = (label) => trackCta();
  const trackWaClick = (label) => trackCta();
  const trackSocialClick = (platform) => trackCta();
  const trackScroll = (section) => trackCta();
  return {
    trackCta,
    trackClick,
    trackWaClick,
    trackSocialClick,
    trackScroll
  };
};
const WHATSAPP_NUMBER$4 = "6285179857522";
const WA_MESSAGE$3 = "Halo Kak! Saya tertarik untuk berkolaborasi dengan @daily.jeds (Paid Reels Rp 350rb / Barter). Boleh info ketersediaan slot?";
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "HeroSection",
  __ssrInlineRender: true,
  props: {
    title: { default: "Daily Jeds" },
    subtitle: { default: "@daily.jeds" },
    description: { default: "Home Growth, Cozy Living, & Parenting Lifestyle Creator berbasis di Salatiga. Membangun kedekatan otentik dengan audiens keluarga muda melalui konten Reels berestetika hangat." },
    heroImage: { default: "/hero-family.webp" }
  },
  setup(__props) {
    const { trackClick } = useAnalytics();
    const { formattedFollowers, formattedViews } = useInstagramData();
    const waLink = `https://wa.me/${WHATSAPP_NUMBER$4}?text=${encodeURIComponent(WA_MESSAGE$3)}`;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_NuxtImg = __nuxt_component_2$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "relative min-h-[92vh] flex items-center justify-center overflow-hidden ghibli-pattern pt-20 pb-16" }, _attrs))}><div class="absolute inset-0 bg-gradient-to-b from-ghibli-cream via-ghibli-cream-light to-ghibli-cream-warm opacity-85"></div><div class="absolute top-16 left-8 w-72 h-72 bg-ghibli-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-float"></div><div class="absolute bottom-16 right-8 w-96 h-96 bg-ghibli-amber-200 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-float" style="${ssrRenderStyle({ "animation-delay": "-3s" })}"></div><div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="grid lg:grid-cols-12 gap-12 items-center"><div class="lg:col-span-7 text-center lg:text-left space-y-7"><div class="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2.5"><span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold shadow-xs"><span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span><span>Available for Brand Collaboration</span></span><span class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-100/80 text-amber-900 text-xs font-semibold">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:account-group",
        class: "w-3.5 h-3.5 text-amber-700"
      }, null, _parent));
      _push(`<span>${ssrInterpolate(unref(formattedFollowers))} Engaged Community</span></span></div><div class="space-y-3"><h1 class="text-4xl sm:text-5xl lg:text-6xl font-ghibli font-bold leading-[1.15] text-ghibli-brown-800"> Cerita Otentik yang <br class="hidden sm:inline"><span class="ghibli-text-gradient">Menghubungkan Brand Anda</span></h1><p class="text-xl sm:text-2xl text-ghibli-amber-600 font-lazy tracking-wide">${ssrInterpolate(_ctx.title)} • ${ssrInterpolate(_ctx.subtitle)}</p></div><p class="text-base sm:text-lg text-ghibli-brown-500 leading-relaxed max-w-xl mx-auto lg:mx-0">${ssrInterpolate(_ctx.description)}</p><div class="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start pt-1"><a${ssrRenderAttr("href", waLink)} target="_blank" rel="noopener noreferrer" class="ghibli-button text-base px-7 py-3.5 flex items-center justify-center gap-2 group shadow-ghibli hover:shadow-ghibli-hover">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:whatsapp",
        class: "w-5 h-5 text-white"
      }, null, _parent));
      _push(`<span>Mulai Kolaborasi (Rp 350rb)</span></a>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/mediakit",
        class: "ghibli-button-secondary text-base px-7 py-3.5 flex items-center justify-center gap-2 group",
        onClick: ($event) => unref(trackClick)("hero_mediakit_link")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "mdi:chart-box-outline",
              class: "w-5 h-5 text-ghibli-wood-500 group-hover:scale-110 transition-transform"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Lihat Media Kit</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "mdi:chart-box-outline",
                class: "w-5 h-5 text-ghibli-wood-500 group-hover:scale-110 transition-transform"
              }),
              createVNode("span", null, "Lihat Media Kit")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="pt-4 border-t border-ghibli-wood-200/50 flex flex-wrap items-center gap-6 justify-center lg:justify-start text-xs sm:text-sm text-ghibli-brown-500"><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:check-circle",
        class: "w-4 h-4 text-ghibli-green-500"
      }, null, _parent));
      _push(`<span><strong>${ssrInterpolate(unref(formattedFollowers))}</strong> Followers Aktif</span></div><div class="w-1 h-1 rounded-full bg-ghibli-wood-300 hidden sm:block"></div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:eye-outline",
        class: "w-4 h-4 text-ghibli-amber-600"
      }, null, _parent));
      _push(`<span><strong>${ssrInterpolate(unref(formattedViews))}</strong> Total Views (API)</span></div><div class="w-1 h-1 rounded-full bg-ghibli-wood-300 hidden sm:block"></div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:map-marker",
        class: "w-4 h-4 text-ghibli-wood-500"
      }, null, _parent));
      _push(`<span>Salatiga, Jawa Tengah</span></div></div></div><div class="lg:col-span-5 relative"><div class="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80"><div class="absolute inset-0 bg-gradient-to-t from-ghibli-brown-900/40 via-transparent to-transparent z-10"></div>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: _ctx.heroImage,
        alt: "Daily Jeds - Home Growth & Family Lifestyle Content Creator",
        class: "w-full h-[440px] sm:h-[500px] object-cover",
        loading: "eager",
        fetchpriority: "high",
        preload: "",
        sizes: "sm:100vw md:50vw lg:500px"
      }, null, _parent));
      _push(`<div class="absolute bottom-5 left-5 right-5 z-20"><div class="glass-effect rounded-2xl p-4 shadow-lg border border-white/60"><div class="flex items-center justify-between mb-1.5"><span class="text-xs font-bold text-ghibli-green-700 uppercase tracking-wider">Creator Profile</span><span class="text-xs font-semibold text-ghibli-amber-600">@daily.jeds</span></div><p class="text-ghibli-brown-700 text-xs sm:text-sm font-medium leading-snug"> &quot;Konten yang mengalir natural seperti keseharian di rumah sendiri.&quot; </p><div class="mt-2.5 flex items-center justify-between text-[11px] text-ghibli-brown-400 border-t border-ghibli-wood-200/40 pt-2"><span>Reels • Stories • TikTok</span><span class="text-ghibli-green-600 font-semibold">100% High Engagement</span></div></div></div></div><div class="absolute -top-4 -left-3 sm:-left-5 w-18 h-18 sm:w-20 sm:h-20 bg-emerald-100/95 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center shadow-lg border border-white/90 -rotate-6 animate-float z-20" style="${ssrRenderStyle({ "animation-delay": "-2s" })}"><span class="text-xl sm:text-2xl">🌱</span><span class="text-[9px] sm:text-[10px] font-bold text-emerald-800 mt-0.5">Family First</span></div><div class="absolute -top-4 -right-3 sm:-right-5 w-18 h-18 sm:w-20 sm:h-20 bg-amber-100/95 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center shadow-lg border border-white/90 rotate-6 animate-float z-20"><span class="text-xl sm:text-2xl">🏡</span><span class="text-[9px] sm:text-[10px] font-bold text-amber-800 mt-0.5">Home Living</span></div></div></div></div><div class="absolute bottom-4 left-1/2 transform -translate-x-1/2"><button class="text-ghibli-brown-400 hover:text-ghibli-amber-500 transition-colors animate-bounce p-2" aria-label="Scroll to Content Pillars">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:chevron-double-down",
        class: "w-6 h-6"
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
const WHATSAPP_NUMBER$3 = "6285179857522";
const WA_MESSAGE$2 = "Halo Kak! Saya ingin mendiskusikan ide kolaborasi konten di @daily.jeds. Boleh minta info slot dan briefnya?";
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "BrandPillarsSection",
  __ssrInlineRender: true,
  setup(__props) {
    const { formattedFollowers, formattedViews, formattedReach, formattedInteractions } = useInstagramData();
    const waLink = `https://wa.me/${WHATSAPP_NUMBER$3}?text=${encodeURIComponent(WA_MESSAGE$2)}`;
    const pillars = [
      {
        id: "home",
        title: "Home Growth & Aesthetic",
        subtitle: "Hunian Nyaman & Fungsional",
        icon: "mdi:home-heart",
        accentBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
        accentColor: "text-emerald-700",
        description: "Eksplorasi penataan rumah bernuansa hangat, sudut santai keluarga, dan ide dekorasi sederhana yang aplikatif untuk rumah keluarga muda Indonesia.",
        tags: ["#HomeDecor", "#CozyHome", "#InteriorAesthetic", "#DIYRumah"],
        bestFor: "Dekorasi hunian, perabot rumah, perlengkapan dapur, organizer, & home appliances."
      },
      {
        id: "parenting",
        title: "Family & Parenting Real Life",
        subtitle: "Keseharian Hangat & Relatable",
        icon: "mdi:account-child-circle",
        accentBg: "bg-amber-50 text-amber-600 border-amber-200",
        accentColor: "text-amber-700",
        description: "Cerita jujur membersamai anak 6 tahun, dinamika peran orang tua baru, serta rutinitas harian yang membangun kedekatan emosional tinggi dengan followers.",
        tags: ["#ParentingRealita", "#MomLife", "#KeluargaMuda", "#DailyRoutines"],
        bestFor: "Produk edukasi anak, pakaian anak/ibu, nutrisi & camilan sehat, serta family needs."
      },
      {
        id: "reviews",
        title: "Honest Reviews & Natural In-Use",
        subtitle: "Rekomendasi Terpercaya",
        icon: "mdi:thumb-up-outline",
        accentBg: "bg-stone-100 text-stone-700 border-stone-200",
        accentColor: "text-stone-800",
        description: "Kami menolak konten hard-selling yang kaku. Produk dimasukkan secara halus dalam rutinitas nyata, sehingga audiens merasa teredukasi tanpa merasa digurui.",
        tags: ["#SpillProduk", "#HonestReview", "#RekomendasiBunda", "#InUseDemo"],
        bestFor: "Kebutuhan harian rumah tangga, skincare/personal care ibu, fashion, & lifestyle items."
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "pillars",
        class: "relative py-24 lg:py-32 overflow-hidden ghibli-section"
      }, _attrs))}><div class="absolute inset-0 bg-gradient-to-b from-ghibli-cream-warm via-ghibli-cream to-ghibli-cream-light"></div><div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ghibli-wood-200 to-transparent"></div><div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-16 max-w-3xl mx-auto" data-aos="fade-up"><div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ghibli-green-100/70 text-ghibli-green-700 text-xs font-semibold uppercase tracking-wider mb-4">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:star-four-points",
        class: "w-3.5 h-3.5"
      }, null, _parent));
      _push(`<span>Content Pillars &amp; Audience Value</span></div><h2 class="text-3xl sm:text-4xl lg:text-5xl font-ghibli font-bold ghibli-text-gradient mb-5 leading-tight"> Menghubungkan Brand Anda dengan Cerita yang Dipercaya </h2><p class="text-base sm:text-lg text-ghibli-brown-500 leading-relaxed"> Audiens @daily.jeds adalah komunitas loyal ibu muda dan keluarga yang mencari inspirasi nyata. Kami mengemas pesan brand Anda secara organik, estetik, dan relevan. </p></div><div class="grid md:grid-cols-3 gap-8 mb-16"><!--[-->`);
      ssrRenderList(pillars, (pillar, index) => {
        _push(`<div class="ghibli-card p-7 flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300" data-aos="fade-up"${ssrRenderAttr("data-aos-delay", 150 + index * 100)}><div><div class="${ssrRenderClass([pillar.accentBg, "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border shadow-sm transition-transform duration-300 group-hover:scale-110"])}">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: pillar.icon,
          class: "w-7 h-7"
        }, null, _parent));
        _push(`</div><p class="text-xs uppercase font-bold tracking-wider text-ghibli-wood-400 mb-1">${ssrInterpolate(pillar.subtitle)}</p><h3 class="text-xl sm:text-2xl font-ghibli font-bold text-ghibli-brown-700 mb-3">${ssrInterpolate(pillar.title)}</h3><p class="text-ghibli-brown-500 text-sm leading-relaxed mb-5">${ssrInterpolate(pillar.description)}</p><div class="flex flex-wrap gap-1.5 mb-6"><!--[-->`);
        ssrRenderList(pillar.tags, (tag) => {
          _push(`<span class="px-2.5 py-1 rounded-md text-[11px] font-medium bg-ghibli-cream-warm/80 text-ghibli-brown-600">${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div></div><div class="pt-4 border-t border-ghibli-wood-200/40"><p class="text-xs font-semibold text-ghibli-brown-700 mb-1 flex items-center gap-1.5">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:check-decagram",
          class: "w-4 h-4 text-ghibli-green-500"
        }, null, _parent));
        _push(`<span>Cocok untuk Kategori:</span></p><p class="text-xs text-ghibli-brown-500 leading-normal">${ssrInterpolate(pillar.bestFor)}</p></div></div>`);
      });
      _push(`<!--]--></div><div class="ghibli-card p-8 sm:p-10 shadow-ghibli-hover mb-12" data-aos="fade-up" data-aos-delay="400"><div class="grid lg:grid-cols-12 gap-8 items-center"><div class="lg:col-span-5 space-y-4 text-center lg:text-left"><div class="inline-flex items-center gap-2 text-xs font-semibold text-ghibli-amber-700 bg-ghibli-amber-100/80 px-3 py-1 rounded-full">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:chart-box",
        class: "w-4 h-4 text-ghibli-amber-600"
      }, null, _parent));
      _push(`<span>Verified Audience Profile</span></div><h3 class="text-2xl sm:text-3xl font-ghibli font-bold text-ghibli-brown-700"> Kenapa Brand Memilih @daily.jeds? </h3><p class="text-sm text-ghibli-brown-500 leading-relaxed"> Bukan sekadar angka followers, melainkan jangkauan konten nyata dan kedekatan emosional tinggi dengan komunitas keluarga muda. </p><div class="pt-2 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"><button class="ghibli-button text-sm px-6 py-3 flex items-center justify-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:tag-outline",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span>Lihat Paket Kolaborasi</span></button><a${ssrRenderAttr("href", waLink)} target="_blank" rel="noopener noreferrer" class="ghibli-button-secondary text-sm px-6 py-3 flex items-center justify-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:whatsapp",
        class: "w-4 h-4 text-ghibli-green-600"
      }, null, _parent));
      _push(`<span>Konsultasi Ide Campaign</span></a></div></div><div class="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4"><div class="p-4 sm:p-5 rounded-2xl bg-[#FFFEF9] border border-ghibli-wood-200/50 text-center shadow-sm"><p class="text-2xl sm:text-3xl font-bold font-ghibli text-ghibli-green-600 mb-1">${ssrInterpolate(unref(formattedFollowers))}</p><p class="text-xs font-semibold text-ghibli-brown-700">Followers Aktif</p><p class="text-[10px] text-ghibli-brown-400 mt-1">Live Instagram API</p></div><div class="p-4 sm:p-5 rounded-2xl bg-[#FFFEF9] border border-ghibli-wood-200/50 text-center shadow-sm"><p class="text-2xl sm:text-3xl font-bold font-ghibli text-ghibli-amber-600 mb-1">${ssrInterpolate(unref(formattedViews))}</p><p class="text-xs font-semibold text-ghibli-brown-700">Total Tayangan</p><p class="text-[10px] text-ghibli-brown-400 mt-1">Video Views (API)</p></div><div class="p-4 sm:p-5 rounded-2xl bg-[#FFFEF9] border border-ghibli-wood-200/50 text-center shadow-sm"><p class="text-2xl sm:text-3xl font-bold font-ghibli text-ghibli-wood-500 mb-1">${ssrInterpolate(unref(formattedReach))}</p><p class="text-xs font-semibold text-ghibli-brown-700">Akun Dijangkau</p><p class="text-[10px] text-ghibli-brown-400 mt-1">Unique Reach (API)</p></div><div class="p-4 sm:p-5 rounded-2xl bg-[#FFFEF9] border border-ghibli-wood-200/50 text-center shadow-sm"><p class="text-2xl sm:text-3xl font-bold font-ghibli text-ghibli-green-700 mb-1">${ssrInterpolate(unref(formattedInteractions))}</p><p class="text-xs font-semibold text-ghibli-brown-700">Total Interaksi</p><p class="text-[10px] text-ghibli-brown-400 mt-1">Likes, Save, Shares</p></div></div></div></div></div></section>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BrandPillarsSection.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$6, { __name: "BrandPillarsSection" });
const WHATSAPP_NUMBER$2 = "6285179857522";
const WA_MESSAGE$1 = "Halo Kak! Saya ingin mendiskusikan kolaborasi konten di @daily.jeds. Boleh minta rate card dan info jadwalnya?";
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "StorySection",
  __ssrInlineRender: true,
  setup(__props) {
    const { formattedFollowers, mediaCount } = useInstagramData();
    const waLink = `https://wa.me/${WHATSAPP_NUMBER$2}?text=${encodeURIComponent(WA_MESSAGE$1)}`;
    const standardBlocks = [
      {
        id: "authenticity",
        icon: "✨",
        title: "Storytelling yang Dipercaya",
        highlight: "Bukan sekadar membaca skrip iklan",
        content: "Kami menyematkan produk ke dalam aktivitas harian yang memang terjadi—saat beberes rumah, bermain bersama anak, atau memasak di dapur. Kejujuran ini yang membuat audiens terdorong mencoba rekomendasi kami.",
        accent: "bg-emerald-50/80 border-emerald-200/80"
      },
      {
        id: "visual-quality",
        icon: "🎥",
        title: "Estetika Visual Warm & Cozy",
        highlight: "Tone warna hangat khas hunian nyaman",
        content: "Konten direkam dengan format vertikal 9:16 berkualitas tinggi, pencahayaan alami, audio jernih, dan grading warna hangat yang membuat penonton betah menonton Reels sampai selesai (high retention rate).",
        accent: "bg-amber-50/80 border-amber-200/80"
      },
      {
        id: "professionalism",
        icon: "🤝",
        title: "Proses Kerja Cepat & Transparan",
        highlight: "Komunikasi responsif & 100% on-time",
        content: "Penyusunan outline ide yang terarah, konsultasi angle pesan sebelum shooting, kesempatan revisi naskah, serta pengiriman insight performa postingan secara transparan untuk laporan campaign Anda.",
        accent: "bg-stone-50 border-stone-200/80"
      }
    ];
    const activeBlock = ref("authenticity");
    const stats = computed(() => [
      { label: "Followers Aktif", value: formattedFollowers.value, icon: "mdi:account-group" },
      { label: "Konten Reels/Posts", value: mediaCount.value ? `${mediaCount.value}+` : "350+", icon: "mdi:video-vintage" },
      { label: "On-Time Delivery", value: "100%", icon: "mdi:clock-check-outline" }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "story",
        class: "relative py-20 lg:py-28 overflow-hidden ghibli-section"
      }, _attrs))}><div class="absolute inset-0 bg-gradient-to-b from-ghibli-cream via-ghibli-cream-light to-ghibli-cream-warm"></div><div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-14" data-aos="fade-up"><p class="text-ghibli-green-600 font-semibold tracking-wider uppercase text-xs sm:text-sm mb-3"> The Creator Standard </p><h2 class="text-3xl sm:text-4xl lg:text-5xl font-ghibli font-bold mb-4"><span class="ghibli-text-gradient">Standar Kualitas Konten Daily Jeds</span></h2><p class="text-ghibli-brown-500 max-w-xl mx-auto text-sm sm:text-base"> Tiga komitmen utama kami saat bermitra dengan setiap brand partner. </p></div><div class="grid grid-cols-3 gap-3 sm:gap-6 mb-14 max-w-2xl mx-auto"><!--[-->`);
      ssrRenderList(unref(stats), (stat) => {
        _push(`<div class="ghibli-card p-4 sm:p-6 text-center group hover:scale-105 transition-all duration-300 shadow-sm" data-aos="fade-up" data-aos-delay="100"><div class="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-xl bg-ghibli-green-100 flex items-center justify-center group-hover:bg-ghibli-amber-100 transition-colors">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: stat.icon,
          class: "w-5 h-5 sm:w-6 sm:h-6 text-ghibli-green-600 group-hover:text-ghibli-amber-600 transition-colors"
        }, null, _parent));
        _push(`</div><p class="text-2xl sm:text-3xl font-bold text-ghibli-brown-700 font-ghibli">${ssrInterpolate(stat.value)}</p><p class="text-[11px] sm:text-xs text-ghibli-brown-400 mt-1 font-medium">${ssrInterpolate(stat.label)}</p></div>`);
      });
      _push(`<!--]--></div><div class="space-y-4 max-w-3xl mx-auto"><!--[-->`);
      ssrRenderList(standardBlocks, (block, index) => {
        _push(`<div class="relative" data-aos="fade-up"${ssrRenderAttr("data-aos-delay", 150 + index * 100)}><div class="${ssrRenderClass([[
          block.accent,
          unref(activeBlock) === block.id ? "shadow-ghibli-hover ring-2 ring-ghibli-green-400/40" : "shadow-sm"
        ], "ghibli-card cursor-pointer transition-all duration-300 overflow-hidden border"])}"><div class="p-5 sm:p-6 flex items-start gap-4"><span class="text-2xl sm:text-3xl flex-shrink-0">${ssrInterpolate(block.icon)}</span><div class="flex-1 min-w-0"><div class="flex items-center justify-between gap-2"><div><h3 class="text-lg sm:text-xl font-ghibli font-bold text-ghibli-brown-700">${ssrInterpolate(block.title)}</h3><p class="text-xs sm:text-sm text-ghibli-green-700 font-medium mt-0.5">${ssrInterpolate(block.highlight)}</p></div>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:chevron-down",
          class: ["w-5 h-5 text-ghibli-brown-400 transition-transform duration-300 flex-shrink-0", { "rotate-180": unref(activeBlock) === block.id }]
        }, null, _parent));
        _push(`</div><div style="${ssrRenderStyle(unref(activeBlock) === block.id ? null : { display: "none" })}" class="pt-3.5 mt-3.5 border-t border-ghibli-wood-200/40"><p class="text-xs sm:text-sm text-ghibli-brown-600 leading-relaxed">${ssrInterpolate(block.content)}</p></div></div></div></div></div>`);
      });
      _push(`<!--]--></div><div class="mt-12 text-center" data-aos="fade-up" data-aos-delay="400"><a${ssrRenderAttr("href", waLink)} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-sm font-semibold text-ghibli-green-700 hover:text-ghibli-green-800 transition-colors py-2 px-4 rounded-xl bg-ghibli-green-50 border border-ghibli-green-200">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:chat-processing-outline",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span>Ingin custom campaign atau paket khusus? Chat langsung di WhatsApp →</span></a></div></div></section>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/StorySection.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$5, { __name: "StorySection" });
const WHATSAPP_NUMBER$1 = "6285179857522";
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ServicesGrid",
  __ssrInlineRender: true,
  setup(__props) {
    const services = [
      {
        id: "paid",
        title: "Paid Collaboration",
        price: "Rp 350.000",
        priceNote: "/ Reels",
        description: "Produksi konten Reels vertikal 9:16 high-definition yang terintegrasi secara natural dalam keseharian keluarga kami.",
        icon: "mdi:video-outline",
        features: [
          "1x Reels Content High-Definition (Instagram @daily.jeds)",
          "Tap Link Placement di Bio & Story 24 Jam",
          "Free Mirroring ke TikTok @daily.jeds",
          "Penyusunan naskah/konsep & 1x revisi minor",
          "Laporan screenshot insight performa H+3 posting"
        ],
        ctaText: "Pesan Slot Reels (Rp 350rb)",
        waMessage: "Halo Kak! Saya tertarik dengan Paid Collaboration Reels (Rp 350.000) di @daily.jeds. Boleh info ketersediaan slot terdekat?",
        gradient: "from-ghibli-green-500 to-ghibli-green-700",
        badge: "Paling Diminati",
        badgeColor: "bg-emerald-600 text-white"
      },
      {
        id: "barter",
        title: "TOM Barter Collaboration",
        price: "Barter Produk Premium",
        priceNote: "(Seleksi Produk)",
        description: "Kolaborasi barter eksklusif untuk produk bernilai yang selaras dengan estetika hunian dan kebutuhan keluarga muda.",
        icon: "mdi:gift-outline",
        features: [
          "Hanya kategori relevan: Home Growth, Dekorasi, & Kids",
          "Nilai retail produk minimal Rp 500.000 / campaign",
          "1x Reels Content + Free Mirroring TikTok",
          "Review organik yang menonjolkan fitur unggulan produk",
          "Produk menjadi hak milik creator (keep product)"
        ],
        ctaText: "Ajukan Barter via WhatsApp",
        waMessage: "Halo Kak! Saya ingin mengajukan kerjasama Barter Produk untuk @daily.jeds. Produk kami berupa: [isi jenis produk & estimasi nilai retail]. Boleh diskusi?",
        gradient: "from-ghibli-amber-400 to-ghibli-amber-600",
        badge: "Selective Brands",
        badgeColor: "bg-amber-500 text-white"
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
      }, _attrs))}><div class="absolute inset-0 bg-gradient-to-b from-ghibli-cream via-ghibli-cream-warm to-ghibli-cream-light"></div><div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ghibli-green-200 to-transparent"></div><div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-16" data-aos="fade-up"><div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:handshake-outline",
        class: "w-3.5 h-3.5"
      }, null, _parent));
      _push(`<span>Kolaborasi &amp; Rate Card</span></div><h2 class="text-3xl sm:text-4xl lg:text-5xl font-ghibli font-bold ghibli-text-gradient mb-4"> Pilihan Paket Kerjasama </h2><p class="text-base sm:text-lg text-ghibli-brown-500 max-w-2xl mx-auto leading-relaxed"> Harga terjangkau dengan dampak engagement nyata. Kami membatasi slot bulanan agar feed tetap organik dan audiens selalu antusias menyimak. </p></div><div class="grid md:grid-cols-2 gap-8 mb-12"><!--[-->`);
      ssrRenderList(services, (service) => {
        _push(`<div class="relative group" data-aos="fade-up"${ssrRenderAttr("data-aos-delay", 200 + services.indexOf(service) * 150)}><div class="${ssrRenderClass([{
          "shadow-xl -translate-y-1.5 border-ghibli-green-300": unref(hoveredCard) === service.id,
          "shadow-ghibli border-ghibli-wood-200/50": unref(hoveredCard) !== service.id
        }, "ghibli-card h-full p-8 transition-all duration-300 flex flex-col justify-between border"])}">`);
        if (service.badge) {
          _push(`<div class="absolute -top-3.5 -right-2 z-10"><span class="${ssrRenderClass([service.badgeColor, "text-xs font-bold px-3 py-1.5 rounded-full shadow-md"])}">${ssrInterpolate(service.badge)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div><div class="flex items-start justify-between mb-5"><div class="${ssrRenderClass([[
          service.gradient,
          { "scale-110": unref(hoveredCard) === service.id }
        ], "w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br shadow-md text-white transition-all duration-300"])}">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: service.icon,
          class: "w-7 h-7"
        }, null, _parent));
        _push(`</div></div><h3 class="text-2xl font-ghibli font-bold text-ghibli-brown-700 mb-2">${ssrInterpolate(service.title)}</h3><div class="mb-4 flex items-baseline gap-1"><span class="text-3xl sm:text-4xl font-bold font-ghibli text-ghibli-green-700">${ssrInterpolate(service.price)}</span>`);
        if (service.priceNote) {
          _push(`<span class="text-ghibli-brown-400 text-xs sm:text-sm font-medium">${ssrInterpolate(service.priceNote)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><p class="text-ghibli-brown-500 text-sm leading-relaxed mb-6">${ssrInterpolate(service.description)}</p><ul class="space-y-3 mb-8"><!--[-->`);
        ssrRenderList(service.features, (feature) => {
          _push(`<li class="flex items-start gap-2.5 text-ghibli-brown-600">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:check-circle",
            class: "w-5 h-5 text-ghibli-green-500 flex-shrink-0 mt-0.5"
          }, null, _parent));
          _push(`<span class="text-xs sm:text-sm leading-snug">${ssrInterpolate(feature)}</span></li>`);
        });
        _push(`<!--]--></ul></div><a${ssrRenderAttr("href", getWaLink(service.waMessage))} target="_blank" rel="noopener noreferrer" class="ghibli-button w-full flex items-center justify-center gap-2 group/btn text-sm sm:text-base font-semibold shadow-md">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:whatsapp",
          class: "w-5 h-5 text-white"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(service.ctaText)}</span></a></div></div>`);
      });
      _push(`<!--]--></div><div class="ghibli-card p-6 sm:p-8 border border-ghibli-wood-200/50 shadow-sm" data-aos="fade-up" data-aos-delay="400"><div class="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"><div class="flex items-center gap-4"><div class="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 flex-shrink-0">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:star-box-multiple-outline",
        class: "w-7 h-7"
      }, null, _parent));
      _push(`</div><div><h4 class="text-lg font-ghibli font-bold text-ghibli-brown-700"> Butuh Campaign Khusus atau Multi-Post? </h4><p class="text-xs sm:text-sm text-ghibli-brown-500 mt-0.5"> Tersedia paket bundling (Series Reels, Story Highlight, Giveaway, hingga Brand Ambassador). </p></div></div><a${ssrRenderAttr("href", getWaLink("Halo Kak! Kami tertarik untuk mendiskusikan Custom Campaign / Bundling Project dengan @daily.jeds. Boleh minta waktu diskusi?"))} target="_blank" rel="noopener noreferrer" class="ghibli-button-secondary text-sm px-5 py-2.5 flex items-center gap-2 flex-shrink-0">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:message-badge-outline",
        class: "w-4 h-4 text-ghibli-amber-600"
      }, null, _parent));
      _push(`<span>Diskusi Custom Campaign</span></a></div></div></div></section>`);
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
    const { formattedFollowers } = useInstagramData();
    const faqItems = computed(() => [
      {
        id: "siapa",
        question: "Siapa itu Daily Jeds & seperti apa audiensnya?",
        answer: `Daily Jeds (@daily.jeds) adalah content creator berbasis di Salatiga yang berfokus pada Home Living, Cozy Growth, & Parenting Lifestyle. Komunitas kami mencapai ${formattedFollowers.value} followers yang aktif mencari inspirasi penataan rumah bernuansa hangat, rutinitas keluarga muda, dan rekomendasi produk berkualitas.`,
        icon: "🏡"
      },
      {
        id: "konten",
        question: "Konten apa saja yang diproduksi?",
        answer: "Reels vertikal 9:16 high-definition tentang penataan rumah estetik sederhana, rutinitas keluarga muda, DIY praktis, dan honest review produk harian. Konten dibawakan dengan tone hangat dan storytelling natural tanpa kesan iklan kaku.",
        icon: "📸"
      },
      {
        id: "kolaborasi",
        question: "Berapa rate card dan paket kolaborasi yang tersedia?",
        answer: "Paid Collaboration Reels seharga Rp 350.000 per video (sudah termasuk placement Tap Link di Bio & Story 24 jam, free mirroring ke TikTok @daily.jeds, serta laporan insight performa H+3). Kami juga menerima TOM Barter Collaboration untuk produk terpilih kategori home & kids dengan nilai retail minimal Rp 500.000.",
        icon: "🤝"
      },
      {
        id: "alur",
        question: "Bagaimana alur kerja kolaborasinya?",
        answer: "Sangat praktis: 1) Kontak kami via WhatsApp untuk booking slot & kirim brief produk -> 2) Pengiriman produk -> 3) Penyusunan naskah/outline konsep -> 4) Pengambilan video & editing -> 5) Preview ke brand & revisi minor -> 6) Tayang di Instagram & TikTok -> 7) Pengiriman laporan insight H+3.",
        icon: "📋"
      },
      {
        id: "hubungi",
        question: "Bagaimana cara cepat booking slot kolaborasi?",
        answer: "Langsung klik tombol WhatsApp di website ini. Kami merespons cepat dalam 1×24 jam. Sebutkan nama brand dan rencana jadwal postingan yang diinginkan ya!",
        icon: "💬"
      }
    ]);
    const activeFaq = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "faq",
        class: "relative py-24 lg:py-32 overflow-hidden ghibli-section"
      }, _attrs))}><div class="absolute inset-0 bg-gradient-to-b from-ghibli-cream-light via-ghibli-cream to-ghibli-cream-warm"></div><div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ghibli-amber-200 to-transparent"></div><div class="absolute bottom-20 right-10 w-48 h-48 bg-ghibli-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-float"></div><div class="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-16" data-aos="fade-up"><p class="text-ghibli-amber-600 font-medium tracking-wider uppercase text-sm mb-4"> FAQ </p><h2 class="text-4xl sm:text-5xl font-ghibli font-bold ghibli-text-gradient mb-6"> Pertanyaan yang Sering Ditanya </h2><p class="text-ghibli-brown-400 max-w-lg mx-auto"> Jawaban singkat untuk pertanyaan yang paling sering masuk </p></div><div class="space-y-4"><!--[-->`);
      ssrRenderList(unref(faqItems), (item, index) => {
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
  setup(__props) {
    const { formattedFollowers } = useInstagramData();
    const curatorLoaded = ref(false);
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "instagram",
        class: "relative py-24 lg:py-32 overflow-hidden ghibli-section"
      }, _attrs))} data-v-eb6f92fd><div class="absolute inset-0 bg-gradient-to-b from-ghibli-cream-warm via-ghibli-cream to-ghibli-cream-light" data-v-eb6f92fd></div><div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ghibli-green-200 to-transparent" data-v-eb6f92fd></div><div class="absolute top-20 left-10 w-56 h-56 bg-ghibli-amber-200 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-float" style="${ssrRenderStyle({ "animation-delay": "-2s" })}" data-v-eb6f92fd></div><div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" data-v-eb6f92fd><div class="text-center mb-14" data-aos="fade-up" data-v-eb6f92fd><div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-900 text-xs font-semibold uppercase tracking-wider mb-3" data-v-eb6f92fd>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:instagram",
        class: "w-4 h-4 text-pink-600"
      }, null, _parent));
      _push(`<span data-v-eb6f92fd>Live Instagram Feed • ${ssrInterpolate(unref(formattedFollowers))} Community</span></div><h2 class="text-3xl sm:text-4xl lg:text-5xl font-ghibli font-bold ghibli-text-gradient mb-3" data-v-eb6f92fd> Momen Terbaru di @daily.jeds </h2><p class="text-sm sm:text-base text-ghibli-brown-500 max-w-lg mx-auto mb-4" data-v-eb6f92fd> Intip konten Reels dan inspirasi hunian hangat kami yang terus diperbarui setiap minggu. </p><a href="https://www.instagram.com/daily.jeds" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-sm font-semibold text-ghibli-green-700 hover:text-ghibli-green-800 transition-colors" data-v-eb6f92fd>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:instagram",
        class: "w-4 h-4 text-pink-600"
      }, null, _parent));
      _push(`<span data-v-eb6f92fd>Kunjungi Profil Instagram @daily.jeds →</span></a></div><div class="ghibli-card p-4 sm:p-6 shadow-ghibli border border-ghibli-wood-200/50" data-aos="fade-up" data-aos-delay="200" data-v-eb6f92fd>`);
      if (!unref(curatorLoaded)) {
        _push(`<div class="py-16 flex flex-col items-center justify-center gap-4" data-v-eb6f92fd><div class="w-10 h-10 border-3 border-ghibli-green-300 border-t-ghibli-green-600 rounded-full animate-spin" data-v-eb6f92fd></div><p class="text-xs sm:text-sm text-ghibli-brown-400" data-v-eb6f92fd>Menyinkronkan postingan terbaru dari @daily.jeds...</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div id="curator-feed-default-feed-layout" class="${ssrRenderClass({ "opacity-0 h-0 overflow-hidden": !unref(curatorLoaded), "opacity-100 transition-opacity duration-500 min-h-[300px]": unref(curatorLoaded) })}" data-v-eb6f92fd><a href="https://curator.io" target="_blank" class="crt-logo crt-tag" data-v-eb6f92fd>Powered by Curator.io</a></div></div><div class="text-center mt-12" data-aos="fade-up" data-aos-delay="300" data-v-eb6f92fd><a href="https://www.instagram.com/daily.jeds" target="_blank" rel="noopener noreferrer" class="ghibli-button inline-flex items-center gap-2 text-sm sm:text-base font-semibold px-8 py-3.5 shadow-md" data-v-eb6f92fd>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:instagram",
        class: "w-5 h-5 text-white"
      }, null, _parent));
      _push(`<span data-v-eb6f92fd>Follow @daily.jeds di Instagram</span></a></div></div></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/InstagramFeed.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-eb6f92fd"]]), { __name: "InstagramFeed" });
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
      title: "Daily Jeds (@daily.jeds) - Home Growth, Cozy Living & Family Lifestyle Creator",
      meta: [
        {
          name: "description",
          content: "Official Creator Landing Page @daily.jeds. Menghubungkan brand dengan audiens keluarga muda melalui konten Reels berkualitas, warm aesthetic, dan storytelling otentik."
        },
        {
          property: "og:title",
          content: "Daily Jeds (@daily.jeds) - Home Growth & Family Lifestyle Creator"
        },
        {
          property: "og:description",
          content: "Rate card kolaborasi Reels mulai Rp 350.000. Jangkau ribuan ibu muda dan keluarga dengan konten terpercaya."
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
          content: "daily jeds, content creator salatiga, home decor indonesia, parenting reels, kolaborasi brand, rate card influencer, micro influencer indonesia"
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
        logo: "/profile.jpg",
        sameAs: [
          "https://www.instagram.com/daily.jeds",
          "https://www.tiktok.com/@daily.jeds",
          "https://www.facebook.com/dailyjeds.page"
        ]
      })
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AudioPlayer = __nuxt_component_0;
      const _component_HeroSection = __nuxt_component_1;
      const _component_BrandPillarsSection = __nuxt_component_2;
      const _component_StorySection = __nuxt_component_3;
      const _component_ServicesGrid = __nuxt_component_4;
      const _component_FaqSection = __nuxt_component_5;
      const _component_InstagramFeed = __nuxt_component_6;
      const _component_FooterSection = __nuxt_component_7;
      const _component_FloatingCollabBar = __nuxt_component_3$1;
      const _component_Icon = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-ghibli-cream" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_AudioPlayer, { "audio-src": "/memories-jonny-easton-main-version-17339-03-22.mp3" }, null, _parent));
      _push(`<main>`);
      _push(ssrRenderComponent(_component_HeroSection, {
        title: "Daily Jeds",
        subtitle: "@daily.jeds",
        description: "Home Growth, Cozy Living, & Parenting Lifestyle Creator berbasis di Salatiga. Membangun kedekatan otentik dengan audiens keluarga muda melalui konten Reels berestetika hangat.",
        "hero-image": "/hero-family.jpeg"
      }, null, _parent));
      _push(ssrRenderComponent(_component_BrandPillarsSection, null, null, _parent));
      _push(ssrRenderComponent(_component_StorySection, null, null, _parent));
      _push(ssrRenderComponent(_component_ServicesGrid, null, null, _parent));
      _push(ssrRenderComponent(_component_FaqSection, null, null, _parent));
      _push(ssrRenderComponent(_component_InstagramFeed, null, null, _parent));
      _push(`</main>`);
      _push(ssrRenderComponent(_component_FooterSection, null, null, _parent));
      _push(ssrRenderComponent(_component_FloatingCollabBar, null, null, _parent));
      _push(`<div class="fixed bottom-24 right-5 z-40"><button class="w-11 h-11 rounded-full bg-ghibli-green-500/90 text-white shadow-md hover:shadow-lg hover:bg-ghibli-green-600 transition-all duration-300 flex items-center justify-center group backdrop-blur-xs" aria-label="Back to top">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:arrow-up",
        class: "w-5 h-5 transition-transform group-hover:-translate-y-0.5"
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
//# sourceMappingURL=index-BQBCWf9l.mjs.map

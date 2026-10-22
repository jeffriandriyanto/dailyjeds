import { _ as __nuxt_component_0 } from './nuxt-link-Cb0x7L2U.mjs';
import { _ as __nuxt_component_1, u as useAsyncData } from './index-D86bI_Ad.mjs';
import { defineComponent, computed, ref, unref, mergeProps, withCtx, createVNode, toValue, reactive, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { I as hash } from '../nitro/nitro.mjs';
import { isPlainObject } from '@vue/shared';
import { f as fetchDefaults, e as useRequestFetch } from './server.mjs';

function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _request = computed(() => toValue(request));
  const key = computed(() => toValue(opts.key) || "$f" + hash([autoKey, typeof _request.value === "string" ? _request.value : "", ...generateOptionSegments(opts)]));
  if (!opts.baseURL && typeof _request.value === "string" && (_request.value[0] === "/" && _request.value[1] === "/")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick,
    watch: watchSources,
    immediate,
    getCachedData,
    deep,
    dedupe,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchDefaults,
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick,
    immediate,
    getCachedData,
    deep,
    dedupe,
    watch: watchSources === false ? [] : [...watchSources || [], _fetchOptions]
  };
  let controller;
  const asyncData = useAsyncData(watchSources === false ? key.value : key, () => {
    controller?.abort?.(new DOMException("Request aborted as another request to the same endpoint was initiated.", "AbortError"));
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    const timeoutLength = toValue(opts.timeout);
    let timeoutId;
    if (timeoutLength) {
      timeoutId = setTimeout(() => controller.abort(new DOMException("Request aborted due to timeout.", "AbortError")), timeoutLength);
      controller.signal.onabort = () => clearTimeout(timeoutId);
    }
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch) {
      const isLocalFetch = typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(opts.baseURL) || toValue(opts.baseURL)[0] === "/");
      if (isLocalFetch) {
        _$fetch = useRequestFetch();
      }
    }
    return _$fetch(_request.value, { signal: controller.signal, ..._fetchOptions }).finally(() => {
      clearTimeout(timeoutId);
    });
  }, _asyncDataOptions);
  return asyncData;
}
function generateOptionSegments(opts) {
  const segments = [
    toValue(opts.method)?.toUpperCase() || "GET",
    toValue(opts.baseURL)
  ];
  for (const _obj of [opts.params || opts.query]) {
    const obj = toValue(_obj);
    if (!obj) {
      continue;
    }
    const unwrapped = {};
    for (const [key, value] of Object.entries(obj)) {
      unwrapped[toValue(key)] = toValue(value);
    }
    segments.push(unwrapped);
  }
  if (opts.body) {
    const value = toValue(opts.body);
    if (!value) {
      segments.push(hash(value));
    } else if (value instanceof ArrayBuffer) {
      segments.push(hash(Object.fromEntries([...new Uint8Array(value).entries()].map(([k, v]) => [k, v.toString()]))));
    } else if (value instanceof FormData) {
      const obj = {};
      for (const entry of value.entries()) {
        const [key, val] = entry;
        obj[key] = val instanceof File ? val.name : val;
      }
      segments.push(hash(obj));
    } else if (isPlainObject(value)) {
      segments.push(hash(reactive(value)));
    } else {
      try {
        segments.push(hash(value));
      } catch {
        console.warn("[useFetch] Failed to hash body", value);
      }
    }
  }
  return segments;
}
const useInstagramData = () => {
  const { data, status, error } = useFetch("/api/instagram/insights", {
    key: "instagram-insights",
    // Lazy: jangan block SSR/TTFB homepage menunggu Meta API.
    // Komponen sudah punya fallback angka sehingga aman render duluan.
    lazy: true,
    getCachedData: (key, nuxt) => {
      return nuxt.payload.data[key] || nuxt.static.data[key];
    }
  }, "$-XM2j_XNWA");
  const account = computed(() => {
    const raw = data.value;
    return raw?.account || {
      name: "Daily Jeds",
      username: "daily.jeds",
      followers_count: 0,
      media_count: 0,
      profile_picture_url: null
    };
  });
  const insights = computed(() => {
    const raw = data.value;
    return raw?.insights?.data || [];
  });
  const media = computed(() => {
    const raw = data.value;
    return raw?.media?.data || [];
  });
  const getMetric = (name) => {
    const metric = insights.value.find((m) => m.name === name);
    return metric?.total_value?.value || metric?.values?.[0]?.value || 0;
  };
  const followersCount = computed(() => account.value?.followers_count || 11195);
  const viewsCount = computed(() => getMetric("views") || getMetric("impressions") || 37105);
  const reachCount = computed(() => getMetric("reach") || 21296);
  const interactionsCount = computed(() => getMetric("total_interactions") || 2492);
  const accountsEngagedCount = computed(() => getMetric("accounts_engaged") || 1746);
  const profileViewsCount = computed(() => getMetric("profile_views") || 331);
  const mediaCount = computed(() => account.value?.media_count || 352);
  const formatNumber = (num) => {
    if (!num) return "0";
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
    return num.toString();
  };
  const formattedFollowers = computed(() => {
    const count = followersCount.value;
    if (!count) return "11.2K";
    return formatNumber(count);
  });
  const formattedViews = computed(() => formatNumber(viewsCount.value));
  const formattedReach = computed(() => formatNumber(reachCount.value));
  const formattedInteractions = computed(() => formatNumber(interactionsCount.value));
  const formattedAccountsEngaged = computed(() => formatNumber(accountsEngagedCount.value));
  return {
    data,
    status,
    error,
    account,
    media,
    followersCount,
    formattedFollowers,
    viewsCount,
    formattedViews,
    reachCount,
    formattedReach,
    interactionsCount,
    formattedInteractions,
    accountsEngagedCount,
    formattedAccountsEngaged,
    profileViewsCount,
    mediaCount,
    formatNumber
  };
};
const WHATSAPP_NUMBER = "6285179857522";
const WA_MESSAGE = "Halo Kak! Saya tertarik untuk kolaborasi dengan @daily.jeds (Paid Reels Rp 350rb / Barter). Boleh diskusi ketersediaan slot?";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FloatingCollabBar",
  __ssrInlineRender: true,
  setup(__props) {
    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;
    const { formattedFollowers } = useInstagramData();
    const isVisible = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1;
      if (unref(isVisible)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-xl" }, _attrs))}><div class="bg-[#FFFEF9]/95 backdrop-blur-md border border-ghibli-wood-300/30 rounded-2xl p-2.5 sm:p-3 shadow-2xl flex items-center justify-between gap-3"><div class="flex items-center gap-2.5 pl-2 min-w-0"><span class="relative flex h-3 w-3 flex-shrink-0"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span></span><div class="min-w-0"><p class="text-xs font-semibold text-ghibli-brown-700 truncate"> Open Collaboration </p><p class="text-[11px] text-ghibli-green-700 font-medium truncate"> Paid Reels Rp 350rb • ${ssrInterpolate(unref(formattedFollowers))} Audience </p></div></div><div class="flex items-center gap-2 flex-shrink-0">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/mediakit",
          class: "hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-ghibli-brown-600 bg-ghibli-cream-warm/70 hover:bg-ghibli-cream-warm transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "mdi:chart-line",
                class: "w-3.5 h-3.5 text-ghibli-wood-500"
              }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>Media Kit</span>`);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "mdi:chart-line",
                  class: "w-3.5 h-3.5 text-ghibli-wood-500"
                }),
                createVNode("span", null, "Media Kit")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<a${ssrRenderAttr("href", waLink)} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-ghibli-green-500 to-ghibli-green-600 hover:from-ghibli-green-600 hover:to-ghibli-green-700 shadow-md hover:shadow-lg transition-all">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:whatsapp",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`<span>Chat WA</span></a></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FloatingCollabBar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main, { __name: "FloatingCollabBar" });

export { __nuxt_component_3 as _, useFetch as a, useInstagramData as u };
//# sourceMappingURL=FloatingCollabBar-DrlUVjJG.mjs.map

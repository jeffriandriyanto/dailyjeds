import { _ as __nuxt_component_0 } from './nuxt-link-uYFcBrBB.mjs';
import { _ as __nuxt_component_1 } from './index-D86bI_Ad.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, ref, withAsyncContext, computed, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line, Doughnut, Bar } from 'vue-chartjs';
import { u as useFetch } from './fetch-CEiOac5D.mjs';
import { u as useHead } from './server.mjs';
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
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '@vue/shared';
import 'vue-router';
import '@unhead/schema-org/vue';
import 'tailwindcss/colors';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MediaKitInsights",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    Chart.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      BarElement,
      ArcElement,
      Title,
      Tooltip,
      Legend,
      Filler
    );
    const tabs = [
      { id: "overview", label: "Account Overview", icon: "mdi:chart-line" },
      { id: "audience", label: "Audience Demographics", icon: "mdi:account-group" },
      { id: "performance", label: "Content Performance", icon: "mdi:video-outline" }
    ];
    const activeTab = ref("overview");
    const { data: insightsData, status } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/instagram/insights", {
      key: "instagram-insights",
      getCachedData: (key, nuxt) => {
        return nuxt.payload.data[key] || nuxt.static.data[key];
      }
    }, "$tzA6gjwdpV")), __temp = await __temp, __restore(), __temp);
    const account = computed(() => {
      const raw = insightsData.value;
      return raw?.account || { name: "", username: "", followers_count: 0, media_count: 0, profile_picture_url: null };
    });
    const isMock = computed(() => {
      const raw = insightsData.value;
      return raw?.isMock === true || !!raw?.error;
    });
    const insights = computed(() => {
      const raw = insightsData.value;
      return raw?.insights?.data || [];
    });
    const mediaPosts = computed(() => {
      const raw = insightsData.value;
      return raw?.media?.data || [];
    });
    const metrics = computed(() => {
      const getMetricValue = (name) => {
        const metric = insights.value.find((m) => m.name === name);
        return metric?.values?.[0]?.value || metric?.total_value?.value || 0;
      };
      const followers = account.value?.followers_count || 0;
      return {
        impressions: getMetricValue("impressions"),
        reach: getMetricValue("reach"),
        profileViews: getMetricValue("profile_views"),
        followers,
        mediaCount: account.value?.media_count || 0
      };
    });
    const contentStats = computed(() => {
      const posts = mediaPosts.value;
      if (!posts.length) {
        return {
          avgLikes: 0,
          avgComments: 0,
          totalLikes: 0,
          totalComments: 0,
          engagementRate: 0,
          videoCount: 0,
          imageCount: 0,
          carouselCount: 0,
          topPost: null,
          recentPosts: []
        };
      }
      const totalLikes = posts.reduce((sum, p) => sum + (p.like_count || 0), 0);
      const totalComments = posts.reduce((sum, p) => sum + (p.comments_count || 0), 0);
      const avgLikes = Math.round(totalLikes / posts.length);
      const avgComments = Math.round(totalComments / posts.length);
      const engagementRate = metrics.value.followers > 0 ? Number(((totalLikes + totalComments) / (metrics.value.followers * posts.length) * 100).toFixed(2)) : 0;
      const videoCount = posts.filter((p) => p.media_type === "VIDEO").length;
      const imageCount = posts.filter((p) => p.media_type === "IMAGE").length;
      const carouselCount = posts.filter((p) => p.media_type === "CAROUSEL_ALBUM").length;
      const topPost = [...posts].sort((a, b) => (b.like_count || 0) - (a.like_count || 0))[0];
      return {
        avgLikes,
        avgComments,
        totalLikes,
        totalComments,
        engagementRate,
        videoCount,
        imageCount,
        carouselCount,
        topPost,
        recentPosts: posts.slice(0, 6)
      };
    });
    const monthlyTrendData = computed(() => {
      const posts = mediaPosts.value;
      const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
      const monthlyData = {};
      posts.forEach((post) => {
        const date = new Date(post.timestamp);
        const monthKey = months[date.getMonth()];
        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = { likes: 0, comments: 0, count: 0 };
        }
        monthlyData[monthKey].likes += post.like_count || 0;
        monthlyData[monthKey].comments += post.comments_count || 0;
        monthlyData[monthKey].count++;
      });
      const currentMonth = (/* @__PURE__ */ new Date()).getMonth();
      const last6Months = [];
      for (let i = 2; i >= 0; i--) {
        const monthIndex = (currentMonth - i + 12) % 12;
        last6Months.push(months[monthIndex]);
      }
      return {
        labels: last6Months,
        datasets: [
          {
            label: "Total Likes",
            data: last6Months.map((m) => monthlyData[m]?.likes || 0),
            borderColor: "#80B165",
            backgroundColor: "rgba(128, 177, 101, 0.1)",
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "#80B165",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointRadius: 4
          },
          {
            label: "Total Comments",
            data: last6Months.map((m) => monthlyData[m]?.comments || 0),
            borderColor: "#FFCA28",
            backgroundColor: "rgba(255, 202, 40, 0.1)",
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "#FFCA28",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointRadius: 4
          }
        ]
      };
    });
    const contentTypeData = computed(() => ({
      labels: ["Reels/Video", "Foto", "Carousel"],
      datasets: [
        {
          data: [contentStats.value.videoCount, contentStats.value.imageCount, contentStats.value.carouselCount],
          backgroundColor: ["#80B165", "#FFCA28", "#B07D4F"],
          borderColor: ["#6B9F50", "#FFB300", "#8B6914"],
          borderWidth: 2,
          hoverOffset: 4
        }
      ]
    }));
    const topPostsData = computed(() => {
      const posts = [...mediaPosts.value].sort((a, b) => (b.like_count || 0) - (a.like_count || 0)).slice(0, 5);
      return {
        labels: posts.map((p) => {
          const caption = p.caption || "No caption";
          return caption.length > 25 ? caption.substring(0, 25) + "..." : caption;
        }),
        datasets: [
          {
            label: "Likes",
            data: posts.map((p) => p.like_count || 0),
            backgroundColor: "rgba(128, 177, 101, 0.8)",
            borderColor: "#80B165",
            borderWidth: 1,
            borderRadius: 4
          }
        ]
      };
    });
    const lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            padding: 20,
            usePointStyle: true,
            pointStyleWidth: 8,
            font: { size: 12 },
            color: "#6D5538"
          }
        },
        tooltip: {
          backgroundColor: "#4B3928",
          titleFont: { size: 13 },
          bodyFont: { size: 12 },
          padding: 12,
          cornerRadius: 8
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "#9C7C4C", font: { size: 11 } }
        },
        y: {
          grid: { color: "rgba(139, 105, 20, 0.08)" },
          ticks: {
            color: "#9C7C4C",
            font: { size: 11 },
            callback: (value) => {
              if (value >= 1e3) return (value / 1e3).toFixed(0) + "K";
              return value;
            }
          }
        }
      }
    };
    const doughnutChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "65%",
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            padding: 20,
            usePointStyle: true,
            pointStyleWidth: 8,
            font: { size: 12 },
            color: "#6D5538"
          }
        },
        tooltip: {
          backgroundColor: "#4B3928",
          titleFont: { size: 13 },
          bodyFont: { size: 12 },
          padding: 12,
          cornerRadius: 8
        }
      }
    };
    const barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#4B3928",
          titleFont: { size: 13 },
          bodyFont: { size: 12 },
          padding: 12,
          cornerRadius: 8
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: "#9C7C4C",
            font: { size: 11 },
            callback: (value) => {
              if (value >= 1e3) return (value / 1e3).toFixed(0) + "K";
              return value;
            }
          }
        },
        y: {
          grid: { color: "rgba(139, 105, 20, 0.08)" },
          ticks: { color: "#6D5538", font: { size: 10 } }
        }
      }
    };
    const formatNumber = (num) => {
      if (num === void 0 || num === null || isNaN(num)) return "0";
      if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
      if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
      return num.toString();
    };
    const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
    };
    const truncateCaption = (caption, maxLength = 40) => {
      if (!caption) return "No caption";
      if (caption.length <= maxLength) return caption;
      return caption.substring(0, maxLength).trim() + "...";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "mediakit",
        class: "relative py-24 lg:py-32 overflow-hidden ghibli-section"
      }, _attrs))}><div class="absolute inset-0 bg-gradient-to-b from-ghibli-cream via-ghibli-cream-light to-ghibli-cream-warm"></div><div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ghibli-green-200 to-transparent"></div><div class="absolute top-40 right-0 w-72 h-72 bg-ghibli-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-float"></div><div class="absolute bottom-40 left-0 w-64 h-64 bg-ghibli-amber-200 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-float" style="${ssrRenderStyle({ "animation-delay": "-3s" })}"></div><div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-12" data-aos="fade-up"><p class="text-ghibli-green-600 font-medium tracking-wider uppercase text-sm mb-4"> Media Kit </p><h2 class="text-4xl sm:text-5xl font-ghibli font-bold ghibli-text-gradient mb-4"> Instagram Insights </h2><p class="text-ghibli-brown-400 max-w-lg mx-auto"> Data analitik @daily.jeds sebagai referensi kolaborasi </p></div><div class="flex flex-wrap justify-center gap-2 mb-10" data-aos="fade-up" data-aos-delay="100"><!--[-->`);
      ssrRenderList(tabs, (tab) => {
        _push(`<button class="${ssrRenderClass([[
          unref(activeTab) === tab.id ? "bg-ghibli-green-500 text-white shadow-ghibli" : "bg-ghibli-cream-light text-ghibli-brown-500 hover:bg-ghibli-green-100 hover:text-ghibli-green-700"
        ], "flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300"])}">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: tab.icon,
          class: "w-5 h-5"
        }, null, _parent));
        _push(`<span class="hidden sm:inline">${ssrInterpolate(tab.label)}</span></button>`);
      });
      _push(`<!--]--></div>`);
      if (unref(status) === "pending") {
        _push(`<div class="flex items-center justify-center py-20"><div class="flex flex-col items-center gap-4"><div class="w-10 h-10 border-3 border-ghibli-green-300 border-t-ghibli-green-600 rounded-full animate-spin"></div><p class="text-ghibli-brown-400 text-sm">Memuat data insights...</p></div></div>`);
      } else {
        _push(`<div>`);
        if (unref(isMock)) {
          _push(`<div class="mb-6" data-aos="fade-up"><div class="ghibli-card p-4 border-l-4 border-ghibli-amber-400 bg-ghibli-amber-50"><div class="flex items-center gap-3">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:information-outline",
            class: "w-5 h-5 text-ghibli-amber-600 flex-shrink-0"
          }, null, _parent));
          _push(`<p class="text-ghibli-brown-600 text-sm"><span class="font-semibold">Preview Mode:</span> Menampilkan data contoh. Data real akan muncul setelah integrasi Instagram Graph API aktif. </p></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(activeTab) === "overview") {
          _push(`<div>`);
          if (unref(account)?.name) {
            _push(`<div class="ghibli-card p-6 shadow-ghibli mb-6" data-aos="fade-up" data-aos-delay="150"><div class="flex flex-col sm:flex-row items-center gap-6">`);
            if (unref(account).profile_picture_url) {
              _push(`<div class="w-20 h-20 rounded-full overflow-hidden shadow-ghibli flex-shrink-0"><img${ssrRenderAttr("src", unref(account).profile_picture_url)}${ssrRenderAttr("alt", unref(account).name)} class="w-full h-full object-cover"></div>`);
            } else {
              _push(`<div class="w-20 h-20 rounded-full bg-gradient-to-br from-ghibli-green-400 to-ghibli-amber-400 flex items-center justify-center shadow-ghibli flex-shrink-0">`);
              _push(ssrRenderComponent(_component_Icon, {
                name: "mdi:account",
                class: "w-10 h-10 text-white"
              }, null, _parent));
              _push(`</div>`);
            }
            _push(`<div class="text-center sm:text-left flex-1"><h3 class="text-2xl font-ghibli font-bold text-ghibli-brown-700">${ssrInterpolate(unref(account).name)}</h3><p class="text-ghibli-amber-600 font-lazy">@${ssrInterpolate(unref(account).username)}</p><p class="text-ghibli-brown-400 text-sm mt-1">${ssrInterpolate(formatNumber(unref(account).media_count))} posts</p></div></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"><!--[-->`);
          ssrRenderList([
            { label: "Followers", value: unref(metrics).followers, icon: "mdi:account-group", color: "text-ghibli-green-600", bg: "bg-ghibli-green-100" },
            { label: "Impressions", value: unref(metrics).impressions, icon: "mdi:eye", color: "text-ghibli-amber-600", bg: "bg-ghibli-amber-100" },
            { label: "Reach", value: unref(metrics).reach, icon: "mdi:chart-bar", color: "text-ghibli-wood-500", bg: "bg-ghibli-wood-100" },
            { label: "Profile Visits", value: unref(metrics).profileViews, icon: "mdi:account-arrow-right", color: "text-ghibli-brown-500", bg: "bg-ghibli-brown-100" }
          ], (metric, index) => {
            _push(`<div class="ghibli-card p-6 shadow-ghibli hover:shadow-ghibli-hover transition-all duration-300 hover:-translate-y-1" data-aos="fade-up"${ssrRenderAttr("data-aos-delay", 200 + index * 80)}><div class="flex items-center gap-3 mb-3"><div class="${ssrRenderClass([metric.bg, "w-10 h-10 rounded-lg flex items-center justify-center"])}">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: metric.icon,
              class: ["w-5 h-5", metric.color]
            }, null, _parent));
            _push(`</div><span class="text-ghibli-brown-400 text-sm">${ssrInterpolate(metric.label)}</span></div><p class="text-3xl font-bold text-ghibli-brown-700 font-ghibli">${ssrInterpolate(formatNumber(metric.value))}</p></div>`);
          });
          _push(`<!--]--></div><div class="ghibli-card p-6 shadow-ghibli" data-aos="fade-up" data-aos-delay="500"><h3 class="text-lg font-ghibli font-semibold text-ghibli-brown-700 mb-4"> Tren Engagement (3 Bulan Terakhir) </h3><div class="h-[300px] sm:h-[350px]">`);
          _push(ssrRenderComponent(unref(Line), {
            data: unref(monthlyTrendData),
            options: lineChartOptions
          }, null, _parent));
          _push(`</div></div></div>`);
        } else if (unref(activeTab) === "audience") {
          _push(`<div><div class="ghibli-card p-6 shadow-ghibli mb-6" data-aos="fade-up" data-aos-delay="200"><h3 class="text-lg font-ghibli font-semibold text-ghibli-brown-700 mb-6"> Statistik Engagement </h3><div class="grid sm:grid-cols-3 gap-6"><div class="text-center p-6 bg-ghibli-cream-light rounded-xl"><div class="w-14 h-14 mx-auto mb-3 rounded-full bg-ghibli-green-100 flex items-center justify-center">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:chart-areaspline",
            class: "w-7 h-7 text-ghibli-green-600"
          }, null, _parent));
          _push(`</div><p class="text-3xl font-bold text-ghibli-green-600 font-ghibli">${ssrInterpolate(unref(contentStats).engagementRate)}%</p><p class="text-ghibli-brown-400 text-sm mt-1">Engagement Rate</p></div><div class="text-center p-6 bg-ghibli-cream-light rounded-xl"><div class="w-14 h-14 mx-auto mb-3 rounded-full bg-ghibli-amber-100 flex items-center justify-center">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:heart",
            class: "w-7 h-7 text-ghibli-amber-600"
          }, null, _parent));
          _push(`</div><p class="text-3xl font-bold text-ghibli-amber-600 font-ghibli">${ssrInterpolate(formatNumber(unref(contentStats).avgLikes))}</p><p class="text-ghibli-brown-400 text-sm mt-1">Avg. Likes/Post</p></div><div class="text-center p-6 bg-ghibli-cream-light rounded-xl"><div class="w-14 h-14 mx-auto mb-3 rounded-full bg-ghibli-wood-100 flex items-center justify-center">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:comment",
            class: "w-7 h-7 text-ghibli-wood-500"
          }, null, _parent));
          _push(`</div><p class="text-3xl font-bold text-ghibli-wood-500 font-ghibli">${ssrInterpolate(formatNumber(unref(contentStats).avgComments))}</p><p class="text-ghibli-brown-400 text-sm mt-1">Avg. Comments/Post</p></div></div></div><div class="grid sm:grid-cols-2 gap-6"><div class="ghibli-card p-6 shadow-ghibli" data-aos="fade-up" data-aos-delay="300"><h3 class="text-lg font-ghibli font-semibold text-ghibli-brown-700 mb-4"> Total Engagement </h3><div class="space-y-4"><div class="flex items-center justify-between p-4 bg-ghibli-cream-light rounded-xl"><div class="flex items-center gap-3">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:heart",
            class: "w-6 h-6 text-red-500"
          }, null, _parent));
          _push(`<span class="text-ghibli-brown-600">Total Likes</span></div><span class="text-xl font-bold text-ghibli-brown-700 font-ghibli">${ssrInterpolate(formatNumber(unref(contentStats).totalLikes))}</span></div><div class="flex items-center justify-between p-4 bg-ghibli-cream-light rounded-xl"><div class="flex items-center gap-3">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:comment",
            class: "w-6 h-6 text-blue-500"
          }, null, _parent));
          _push(`<span class="text-ghibli-brown-600">Total Comments</span></div><span class="text-xl font-bold text-ghibli-brown-700 font-ghibli">${ssrInterpolate(formatNumber(unref(contentStats).totalComments))}</span></div></div></div><div class="ghibli-card p-6 shadow-ghibli" data-aos="fade-up" data-aos-delay="400"><h3 class="text-lg font-ghibli font-semibold text-ghibli-brown-700 mb-4"> Reach &amp; Impressions </h3><div class="space-y-4"><div class="flex items-center justify-between p-4 bg-ghibli-cream-light rounded-xl"><div class="flex items-center gap-3">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:eye",
            class: "w-6 h-6 text-ghibli-amber-600"
          }, null, _parent));
          _push(`<span class="text-ghibli-brown-600">Impressions</span></div><span class="text-xl font-bold text-ghibli-brown-700 font-ghibli">${ssrInterpolate(formatNumber(unref(metrics).impressions))}</span></div><div class="flex items-center justify-between p-4 bg-ghibli-cream-light rounded-xl"><div class="flex items-center gap-3">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:chart-bar",
            class: "w-6 h-6 text-ghibli-wood-500"
          }, null, _parent));
          _push(`<span class="text-ghibli-brown-600">Reach</span></div><span class="text-xl font-bold text-ghibli-brown-700 font-ghibli">${ssrInterpolate(formatNumber(unref(metrics).reach))}</span></div><div class="flex items-center justify-between p-4 bg-ghibli-cream-light rounded-xl"><div class="flex items-center gap-3">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:account-arrow-right",
            class: "w-6 h-6 text-ghibli-brown-500"
          }, null, _parent));
          _push(`<span class="text-ghibli-brown-600">Profile Visits</span></div><span class="text-xl font-bold text-ghibli-brown-700 font-ghibli">${ssrInterpolate(formatNumber(unref(metrics).profileViews))}</span></div></div></div></div></div>`);
        } else if (unref(activeTab) === "performance") {
          _push(`<div><div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"><!--[-->`);
          ssrRenderList([
            { label: "Avg. Likes", value: unref(contentStats).avgLikes, icon: "mdi:heart", color: "text-red-500", bg: "bg-red-50" },
            { label: "Avg. Comments", value: unref(contentStats).avgComments, icon: "mdi:comment", color: "text-blue-500", bg: "bg-blue-50" },
            { label: "Engagement Rate", value: unref(contentStats).engagementRate, suffix: "%", icon: "mdi:chart-areaspline", color: "text-ghibli-green-600", bg: "bg-ghibli-green-100" },
            { label: "Total Posts", value: unref(metrics).mediaCount, icon: "mdi:image-multiple", color: "text-ghibli-amber-600", bg: "bg-ghibli-amber-100" }
          ], (metric, index) => {
            _push(`<div class="ghibli-card p-6 shadow-ghibli hover:shadow-ghibli-hover transition-all duration-300 hover:-translate-y-1" data-aos="fade-up"${ssrRenderAttr("data-aos-delay", 200 + index * 80)}><div class="flex items-center gap-3 mb-3"><div class="${ssrRenderClass([metric.bg, "w-10 h-10 rounded-lg flex items-center justify-center"])}">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: metric.icon,
              class: ["w-5 h-5", metric.color]
            }, null, _parent));
            _push(`</div><span class="text-ghibli-brown-400 text-sm">${ssrInterpolate(metric.label)}</span></div><p class="text-3xl font-bold text-ghibli-brown-700 font-ghibli">${ssrInterpolate(metric.suffix ? metric.value + metric.suffix : formatNumber(metric.value))}</p></div>`);
          });
          _push(`<!--]--></div><div class="grid lg:grid-cols-2 gap-6 mb-6"><div class="ghibli-card p-6 shadow-ghibli" data-aos="fade-up" data-aos-delay="500"><h3 class="text-lg font-ghibli font-semibold text-ghibli-brown-700 mb-4"> Distribusi Tipe Konten </h3><div class="h-[250px] flex items-center justify-center">`);
          _push(ssrRenderComponent(unref(Doughnut), {
            data: unref(contentTypeData),
            options: doughnutChartOptions
          }, null, _parent));
          _push(`</div></div><div class="ghibli-card p-6 shadow-ghibli" data-aos="fade-up" data-aos-delay="600"><h3 class="text-lg font-ghibli font-semibold text-ghibli-brown-700 mb-4"> Top 5 Posts by Likes </h3><div class="h-[250px]">`);
          _push(ssrRenderComponent(unref(Bar), {
            data: unref(topPostsData),
            options: barChartOptions
          }, null, _parent));
          _push(`</div></div></div>`);
          if (unref(contentStats).topPost) {
            _push(`<div class="ghibli-card p-6 shadow-ghibli" data-aos="fade-up" data-aos-delay="700"><h3 class="text-lg font-ghibli font-semibold text-ghibli-brown-700 mb-4"> Top Performing Post </h3><div class="flex flex-col sm:flex-row gap-6"><div class="w-full sm:w-48 aspect-square rounded-xl overflow-hidden shadow-ghibli flex-shrink-0"><img${ssrRenderAttr("src", unref(contentStats).topPost.thumbnail_url || unref(contentStats).topPost.media_url)}${ssrRenderAttr("alt", truncateCaption(unref(contentStats).topPost.caption))} class="w-full h-full object-cover"></div><div class="flex-1"><p class="text-ghibli-brown-600 leading-relaxed mb-4">${ssrInterpolate(unref(contentStats).topPost.caption?.substring(0, 200))}${ssrInterpolate(unref(contentStats).topPost.caption && unref(contentStats).topPost.caption.length > 200 ? "..." : "")}</p><div class="flex flex-wrap gap-4"><div class="flex items-center gap-2">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:heart",
              class: "w-5 h-5 text-red-500"
            }, null, _parent));
            _push(`<span class="text-ghibli-brown-700 font-medium">${ssrInterpolate(formatNumber(unref(contentStats).topPost.like_count))}</span></div><div class="flex items-center gap-2">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:comment",
              class: "w-5 h-5 text-blue-500"
            }, null, _parent));
            _push(`<span class="text-ghibli-brown-700 font-medium">${ssrInterpolate(unref(contentStats).topPost.comments_count)}</span></div><div class="flex items-center gap-2">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:calendar",
              class: "w-5 h-5 text-ghibli-brown-400"
            }, null, _parent));
            _push(`<span class="text-ghibli-brown-500 text-sm">${ssrInterpolate(formatDate(unref(contentStats).topPost.timestamp))}</span></div></div><a${ssrRenderAttr("href", unref(contentStats).topPost.permalink)} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 mt-4 text-ghibli-green-600 hover:text-ghibli-green-700 transition-colors text-sm font-medium">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:instagram",
              class: "w-4 h-4"
            }, null, _parent));
            _push(`<span>Lihat di Instagram</span></a></div></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="ghibli-card p-6 shadow-ghibli mt-6" data-aos="fade-up" data-aos-delay="800"><h3 class="text-lg font-ghibli font-semibold text-ghibli-brown-700 mb-4"> Recent Posts </h3><div class="grid grid-cols-2 sm:grid-cols-3 gap-4"><!--[-->`);
          ssrRenderList(unref(contentStats).recentPosts, (post) => {
            _push(`<a${ssrRenderAttr("href", post.permalink)} target="_blank" rel="noopener noreferrer" class="group relative aspect-square rounded-xl overflow-hidden shadow-ghibli hover:shadow-ghibli-hover transition-all duration-300"><img${ssrRenderAttr("src", post.thumbnail_url || post.media_url)}${ssrRenderAttr("alt", truncateCaption(post.caption))} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy"><div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"><div class="absolute bottom-0 left-0 right-0 p-3"><div class="flex items-center gap-3 text-white text-sm"><span class="flex items-center gap-1">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:heart",
              class: "w-4 h-4"
            }, null, _parent));
            _push(` ${ssrInterpolate(formatNumber(post.like_count))}</span><span class="flex items-center gap-1">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:comment",
              class: "w-4 h-4"
            }, null, _parent));
            _push(` ${ssrInterpolate(post.comments_count)}</span></div></div></div></a>`);
          });
          _push(`<!--]--></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MediaKitInsights.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "MediaKitInsights" });
const WHATSAPP_NUMBER = "6285179857522";
const waMessage = "Halo Kak! Saya tertarik untuk berkolaborasi dengan @daily.jeds. Boleh info lebih lanjut?";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "mediakit",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Media Kit - Daily Jeds",
      meta: [
        {
          name: "description",
          content: "Media Kit @daily.jeds - Data analitik Instagram, demografi audiens, dan performa konten untuk referensi kolaborasi brand."
        },
        {
          property: "og:title",
          content: "Media Kit - Daily Jeds (@daily.jeds)"
        }
      ]
    });
    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1;
      const _component_MediaKitInsights = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-ghibli-cream" }, _attrs))}><section class="relative py-12 overflow-hidden"><div class="absolute inset-0 bg-gradient-to-b from-ghibli-cream via-ghibli-cream-light to-ghibli-cream-warm"></div><div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-8">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "inline-flex items-center gap-2 text-ghibli-brown-400 hover:text-ghibli-green-600 transition-colors mb-6"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "mdi:arrow-left",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Kembali ke Beranda</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "mdi:arrow-left",
                class: "w-5 h-5"
              }),
              createVNode("span", null, "Kembali ke Beranda")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="text-4xl sm:text-5xl font-ghibli font-bold ghibli-text-gradient mb-4"> Media Kit </h1><p class="text-ghibli-brown-500 max-w-2xl mx-auto"> Profil lengkap @daily.jeds untuk brand dan agensi yang ingin berkolaborasi </p></div><div class="ghibli-card p-6 sm:p-8 shadow-ghibli mb-8" data-aos="fade-up"><div class="flex flex-col sm:flex-row items-center gap-6"><div class="w-20 h-20 rounded-full bg-gradient-to-br from-ghibli-green-400 to-ghibli-amber-400 flex items-center justify-center shadow-ghibli">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:account",
        class: "w-10 h-10 text-white"
      }, null, _parent));
      _push(`</div><div class="text-center sm:text-left flex-1"><h2 class="text-2xl font-ghibli font-bold text-ghibli-brown-700"> Daily Jeds </h2><p class="text-ghibli-amber-600 font-lazy">@daily.jeds</p><p class="text-ghibli-brown-400 text-sm mt-1"> Home Growth &amp; Family Lifestyle • Salatiga, Indonesia </p></div><a${ssrRenderAttr("href", waLink)} target="_blank" rel="noopener noreferrer" class="ghibli-button flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:whatsapp",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`<span>Hubungi untuk Kolaborasi</span></a></div></div><div class="grid sm:grid-cols-3 gap-4 mb-8" data-aos="fade-up" data-aos-delay="100"><div class="ghibli-card p-5 text-center shadow-ghibli">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:home-heart",
        class: "w-8 h-8 text-ghibli-green-500 mx-auto mb-2"
      }, null, _parent));
      _push(`<h3 class="font-ghibli font-semibold text-ghibli-brown-700 mb-1"> Niche </h3><p class="text-ghibli-brown-400 text-sm"> Home Growth, DIY, Estetika </p></div><div class="ghibli-card p-5 text-center shadow-ghibli">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:account-group",
        class: "w-8 h-8 text-ghibli-amber-500 mx-auto mb-2"
      }, null, _parent));
      _push(`<h3 class="font-ghibli font-semibold text-ghibli-brown-700 mb-1"> Target Audiens </h3><p class="text-ghibli-brown-400 text-sm"> Perempuan 25-34, Ibu Rumah Tangga </p></div><div class="ghibli-card p-5 text-center shadow-ghibli">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:map-marker",
        class: "w-8 h-8 text-ghibli-wood-500 mx-auto mb-2"
      }, null, _parent));
      _push(`<h3 class="font-ghibli font-semibold text-ghibli-brown-700 mb-1"> Lokasi </h3><p class="text-ghibli-brown-400 text-sm">Salatiga, Jawa Tengah</p></div></div></div></section>`);
      _push(ssrRenderComponent(_component_MediaKitInsights, null, null, _parent));
      _push(`<section class="relative py-16 overflow-hidden ghibli-section"><div class="absolute inset-0 bg-gradient-to-b from-ghibli-cream-warm to-ghibli-cream"></div><div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"><div class="ghibli-card p-8 shadow-ghibli" data-aos="fade-up"><h3 class="text-2xl font-ghibli font-bold text-ghibli-brown-700 mb-4"> Tertarik Bekerja Sama? </h3><p class="text-ghibli-brown-500 mb-6 max-w-lg mx-auto"> Kami terbuka untuk kolaborasi brand yang sesuai dengan nilai dan niche kami. Hubungi kami untuk diskusi lebih lanjut! </p><a${ssrRenderAttr("href", waLink)} target="_blank" rel="noopener noreferrer" class="ghibli-button inline-flex items-center gap-2 text-lg px-8 py-4">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:whatsapp",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`<span>Mulai Kolaborasi</span></a></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mediakit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=mediakit-DnO9Jip7.mjs.map

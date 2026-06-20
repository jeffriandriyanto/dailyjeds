import { d as defineEventHandler, u as useRuntimeConfig } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue';
import '@iconify/utils';
import 'consola';
import 'node:url';
import 'ipx';

const insights = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const INSTAGRAM_ACCOUNT_ID = config.instagramAccountId;
  const ACCESS_TOKEN = config.instagramToken;
  if (!INSTAGRAM_ACCOUNT_ID || !ACCESS_TOKEN) {
    return {
      error: "Instagram API not configured",
      account: null,
      insights: { data: [] },
      media: { data: [] },
      isMock: true
    };
  }
  try {
    const accountData = await fetchAccountData(INSTAGRAM_ACCOUNT_ID, ACCESS_TOKEN);
    let insightsData = { data: [] };
    try {
      const result = await fetchInsights(INSTAGRAM_ACCOUNT_ID, ACCESS_TOKEN);
      insightsData = result || { data: [] };
    } catch (e) {
      console.warn("Insights fetch failed:", e == null ? void 0 : e.message);
    }
    let mediaData = { data: [] };
    try {
      const result = await fetchRecentMedia(INSTAGRAM_ACCOUNT_ID, ACCESS_TOKEN);
      mediaData = result || { data: [] };
    } catch (e) {
      console.warn("Media fetch failed:", e == null ? void 0 : e.message);
    }
    return {
      account: {
        name: accountData.name || "",
        username: accountData.username || "",
        followers_count: accountData.followers_count || 0,
        media_count: accountData.media_count || 0,
        profile_picture_url: accountData.profile_picture_url || null
      },
      insights: insightsData,
      media: mediaData,
      isMock: false
    };
  } catch (error) {
    console.error("Instagram API Error:", (error == null ? void 0 : error.message) || error);
    return {
      error: (error == null ? void 0 : error.message) || "Failed to fetch Instagram data",
      account: null,
      insights: { data: [] },
      media: { data: [] },
      isMock: true
    };
  }
});
async function fetchAccountData(accountId, token) {
  const fields = "name,username,followers_count,media_count,profile_picture_url";
  const url = `https://graph.facebook.com/v25.0/${accountId}?fields=${fields}&access_token=${token}`;
  return await $fetch(url);
}
async function fetchInsights(accountId, token) {
  const metrics = "impressions,reach,profile_views";
  const period = "day";
  const since = Math.floor(Date.now() / 1e3) - 30 * 24 * 60 * 60;
  const until = Math.floor(Date.now() / 1e3);
  const url = `https://graph.facebook.com/v25.0/${accountId}/insights?metric=${metrics}&period=${period}&since=${since}&until=${until}&access_token=${token}`;
  return await $fetch(url);
}
async function fetchRecentMedia(accountId, token) {
  const fields = "id,caption,media_type,like_count,comments_count,timestamp,permalink,media_url,thumbnail_url";
  const limit = 12;
  const url = `https://graph.facebook.com/v25.0/${accountId}/media?fields=${fields}&limit=${limit}&access_token=${token}`;
  return await $fetch(url);
}

export { insights as default };
//# sourceMappingURL=insights.mjs.map

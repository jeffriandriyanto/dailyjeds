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

const feed = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const INSTAGRAM_ACCOUNT_ID = config.instagramAccountId;
  const ACCESS_TOKEN = config.instagramToken;
  if (!INSTAGRAM_ACCOUNT_ID || !ACCESS_TOKEN) {
    return {
      error: "Instagram API not configured",
      posts: []
    };
  }
  const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
  const limit = 9;
  const url = `https://graph.facebook.com/v25.0/${INSTAGRAM_ACCOUNT_ID}/media?fields=${fields}&limit=${limit}&access_token=${ACCESS_TOKEN}`;
  try {
    const response = await $fetch(url);
    return {
      posts: response.data || []
    };
  } catch (error) {
    console.error("Instagram API Error:", (error == null ? void 0 : error.message) || error);
    return {
      error: "Failed to fetch Instagram posts",
      posts: []
    };
  }
});

export { feed as default };
//# sourceMappingURL=feed.mjs.map

// @ts-check
import { defineConfig, envField } from "astro/config";

import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      PB_URL: envField.string({
        context: "server",
        access: "public",
        optional: false,
      }),
      PUBLIC_PB_URL: envField.string({
        context: "client",
        access: "public",
        optional: false,
      }),
      PB_EMAIL: envField.string({
        context: "server",
        access: "public",
        optional: false,
      }),
      PB_PASSWORD: envField.string({
        context: "server",
        access: "secret",
        optional: false,
      }),
    },
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },

  i18n: {
    fallback: {
      ru: "en",
    },
    routing: {
      prefixDefaultLocale: false,
    },
    locales: ["en", "ru"],
    defaultLocale: "en",
  },

  integrations: [svelte(), tailwind({ applyBaseStyles: false })],

  adapter: node({
    mode: "standalone",
  }),
});

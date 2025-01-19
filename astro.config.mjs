// @ts-check
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
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
  integrations: [svelte(), tailwind()],
});

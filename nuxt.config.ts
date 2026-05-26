// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: ["~/assets/css/main.css"],

  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxtjs/seo",
    "nuxt-gtag",
  ],

  gtag: {
    id: process.env.NUXT_PUBLIC_GTAG_ID || "G-X0QDSLT77V",
  },

  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "",
  },
});

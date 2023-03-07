import eslintPlugin from "vite-plugin-eslint";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: [
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    "@truongdq54/vaislib-nuxt",
    [
      "@pinia/nuxt",
      {
        autoImports: [
          // automatically imports `defineStore`
          "defineStore", // import { defineStore } from 'pinia'
        ],
      },
    ],
  ],
  css: ["~/assets/css/main.css"],
  ignorePrefix: "-",
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
    },
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || "https://sohoa-ktnn-api-dev.vais.vn/",
      ENV: process.env.ENV,
    },
  },
  vite: {
    plugins: [eslintPlugin()],
    build: {
      target: "esnext",
    },
  },
});

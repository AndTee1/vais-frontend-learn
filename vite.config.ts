// https://previewjs.com/docs/guides/nuxtjs

import Unimport from "unimport/unplugin";

export default {
  plugins: [
    Unimport.vite({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      presets: ["vue"],
      addons: {
        vueTemplate: true,
      },
    }),
  ],
  build: {
    target: "esnext",
  },
};

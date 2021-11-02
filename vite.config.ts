import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

//===============ElementPlus自动导入的插件
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        //自动导入
        ElementPlusResolver(),
      ],
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 9421,
    open: true,
  },
  resolve: {
    //设置别名
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "src"),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/index.scss";', // 添加公共样式
      },
    },
  },
});

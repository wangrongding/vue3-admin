import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
console.log(path.resolve(__dirname, "src"));
//===============ElementPlus自动导入的插件
// import Components from "unplugin-vue-components/vite";
// import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// https://vitejs.dev/config/
export default defineConfig((config) => {
  return {
    plugins: [
      vue(),
      //     //自动导入
      // Components({
      //   resolvers: [
      //     ElementPlusResolver(),
      //   ],
      // }),
    ],
    server: {
      host: "0.0.0.0",
      port: 9421,
      proxy: {
        "/api": {
          // target: "http://192.168.1.71:60",
          target: loadEnv(config.mode, process.cwd()),
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        // "/api/*": {
        //   target: process.env.VUE_APP_TARGET_URL, // 目标 API 地址
        //   pathRewrite: {
        //     "^/api": "/",
        //   },
        // },
      },
      // open: true,
    },
    resolve: {
      //设置别名
      alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
      extensions: [".ts", ".js"],
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        scss: {
          // 在全局中使用 var.scss中预定义的变量
          additionalData: '@import "./src/styles/var.scss";',
        },
      },
    },
  };
});

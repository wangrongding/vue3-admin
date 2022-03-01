import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { name } from "./package.json";
import qiankun from "vite-plugin-qiankun";
//===============ElementPlus自动导入的插件
// import Components from "unplugin-vue-components/vite";
// import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// https://vitejs.dev/config/

console.log("🚗🚗 http://192.168.1.126:9421");
export default defineConfig((config) => {
  return {
    base:
      config.mode === "development"
        ? "/"
        : loadEnv(config.mode, process.cwd()).VITE_APP_SITE_ADDRESS,
    plugins: [
      vue(),
      // 这里的 'admin' 是子应用名，主应用注册时AppName需保持一致
      qiankun(name, {
        useDevMode: true,
      }),
      //     //自动导入
      // Components({
      //   resolvers: [
      //     ElementPlusResolver(),
      //   ],
      // }),
    ],
    server: {
      port: 9421,
      host: "0.0.0.0",
      cors: true,
      // open: true,
      proxy: {
        "/api": {
          // target: "http://192.168.1.71:60",
          target: loadEnv(config.mode, process.cwd()), // 目标 API 地址
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    // build: {
    //   target: "esnext",
    //   lib: {
    //     name: `${name}-[name]`, //微应用的包名，与主应用中注册的微应用名称必须一致
    //     entry: path.resolve(__dirname, "src/main.ts"), //定义入口文件
    //     formats: ["umd"], //把项目打包成 umd 格式的js 文件
    //   },
    // },
    // rollupOptions: {
    //   preserveEntrySignatures: "allow-extension",
    //   // input: {
    //   //   // 入口文件
    //   //   main: path.resolve(__dirname, "index.html"),
    //   // },
    //   output: {
    //     inlineDynamicImports: true,
    //   },
    // },
    resolve: {
      //设置别名
      alias: [
        { find: "@", replacement: path.resolve(__dirname, "src") },
        { find: "vue", replacement: "vue/dist/vue.esm-bundler.js" },
      ],
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

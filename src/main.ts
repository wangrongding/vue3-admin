import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
//=======================element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

console.log(import.meta.env);
createApp(App).use(store).use(router).use(ElementPlus).mount("#app");

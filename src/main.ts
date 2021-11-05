import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
//=======================element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as Icons from "@element-plus/icons";

const app = createApp(App);
//全局挂载所有图标
Object.keys(Icons).forEach((key) => {
    app.component(key, Icons[key as keyof typeof Icons]);
});
app.use(store).use(router).use(ElementPlus).mount("#app");

// console.log(import.meta.env);

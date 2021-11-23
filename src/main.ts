import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);
import router from "./router/index";
import store from "./store";
//=======================element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/styles/index.scss";
import * as Icons from "@element-plus/icons";

//=====================全局挂载element-plus二次封装的组件
import DingTable from "@/components/element/DingTable.vue";
import DingForm from "@/components/element/DingForm.vue";
app.component("DingTable", DingTable);
app.component("DingForm", DingForm);

//=====================iconFont
import "@/assets/icon/iconfont.css";

//全局挂载所有图标
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons]);
});
app.use(store).use(router).use(ElementPlus, { size: "small" /* "default" */, zIndex: 3000 }).mount("#app");

// console.log(import.meta.env);

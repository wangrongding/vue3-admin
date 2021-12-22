import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);
import router from "./router/index";
import store from "./store";
//=======================element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as Icons from "@element-plus/icons";

//=====================全局挂载element-plus二次封装的组件
import Table from "@/components/element/Table.vue";
import Form from "@/components/element/Form.vue";
import Pagination from "@/components/element/Pagination.vue";
import TopPanel from "@/components/TopPanel.vue";
app.component("Form", Form);
app.component("Table", Table);
app.component("Pagination", Pagination);
app.component("TopPanel", TopPanel);

//=====================iconFont
import "@/assets/icon/iconfont.css";
//=====================resetCss
import "@/styles/index.scss";
//=====================elementReset
import "@/styles/element/index.scss";
//=====================mock
// import "@/mock/index.ts";

//全局挂载所有图标
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons]);
});

app
  .use(store)
  .use(router)
  .use(ElementPlus, {
    size: "" /* ["", "large", "medium", "small", "mini"] */,
    zIndex: 3000,
  })
  .mount("#app");

// console.log(import.meta.env);

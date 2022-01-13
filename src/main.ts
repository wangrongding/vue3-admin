import { createApp, App as APPtype } from "vue";
import App from "./App.vue";
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
import Dialog from "@/components/element/Dialog.vue";
import TopPanel from "@/components/TopPanel.vue";

//=====================iconFont
import "@/assets/icon/iconfont.css";
//=====================resetCss
import "@/styles/index.scss";
//=====================elementReset
import "@/styles/element/index.scss";
//=====================mock
// import "@/mock/index.ts";
//=====================vite-plugin-qiankun 支持集成vite开发环境调试的微前端插件
import { renderWithQiankun, qiankunWindow } from "vite-plugin-qiankun/dist/helper";

declare global {
  interface Window {
    __POWERED_BY_QIANKUN__?: boolean;
  }
}
interface IRenderProps {
  container: Element | string;
}
let app: APPtype<Element>;

function render(props: IRenderProps) {
  app = createApp(App);
  app.component("Form", Form);
  app.component("Table", Table);
  app.component("Pagination", Pagination);
  app.component("Dialog", Dialog);
  app.component("TopPanel", TopPanel);
  //全局挂载所有图标
  Object.keys(Icons).forEach((key) => {
    app.component(key, Icons[key as keyof typeof Icons]);
  });
  const { container } = props;
  console.log("😀😀😀", container, typeof container === "string", app);
  app.use(store).use(router).use(ElementPlus, {
    size: "" /* ["", "large", "medium", "small", "mini"] */,
    zIndex: 3000,
  });
  app.mount(
    typeof container === "string" ? container : (container.querySelector("#app") as Element),
  );
}

renderWithQiankun({
  mount(props) {
    console.log("mount");
    render(props as any);
  },
  bootstrap() {
    console.log("bootstrap");
  },
  unmount(props: any) {
    console.log("unmount");
    app.unmount();
    (app._container as any).innerHTML = "";
  },
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({ container: "#app" });
}

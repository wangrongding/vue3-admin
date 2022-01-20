/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
// declare module "mockjs";
declare module "*.json";
declare module "*.png";
declare module "*.jpg";
declare module "*.ts";
declare module "*.js";
declare module "file-saver";
declare module 'vue-rate';
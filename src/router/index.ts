import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
type RouteConfig = RouteRecordRaw & { hidden?: boolean }; //hidden 是可选属性
import home from "@/views/home.vue";
const routes: Array<RouteRecordRaw> = [{ path: "/", name: "home", component: home }];

const router = createRouter({ history: createWebHistory(), routes });

export default router;

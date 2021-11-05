import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Layout,
    meta: { title: "首页", type: "single", icon: "HomeFilled" },
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: { title: "首页" },
      },
    ],
  },
  {
    path: "/dashboardAa",
    component: Layout,
    meta: { title: "test", hidden: true, type: "multiple" },
    children: [
      {
        path: "dashboard1",
        component: () => import("@/views/dashboard/index.vue"),
        meta: { title: "111" },
      },
      {
        path: "dashboard2",
        component: () => import("@/views/dashboard/index2.vue"),
        meta: { title: "222" },
      },
    ],
  },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;

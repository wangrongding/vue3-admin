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
    path: "/dashboardA",
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
  {
    path: "/B",
    component: Layout,
    meta: { title: "test", hidden: true, type: "multiple" },
    children: [
      {
        path: "b",
        component: () => import("@/views/dashboard/index33.vue"),
        meta: { title: "111", type: "multiple" },
        children: [
          {
            path: "33",
            component: () => import("@/views/dashboard/index3.vue"),
            meta: { title: "eee3333" },
          },
        ],
      },
    ],
  },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;

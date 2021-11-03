import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import home from "@/views/home.vue";
import Layout from "@/views/layout/index.vue";
import dashboard from "@/views/dashboard/index.vue";
export const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: () => home,
    // redirect: "/dashboard",
    // children: {
    //   path: "dashboard",
    //   component: () => import("@/views/dashboard/index.vue"),
    //   meta: { title: "首页" },
    // },
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: () => dashboard,
    },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;

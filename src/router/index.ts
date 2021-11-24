import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Layout,
    meta: { title: "首页", type: "single", icon: "House" },
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
    path: "/111221",
    component: Layout,
    meta: { title: "xx1管理", type: "multiple", icon: "Setting" },
    children: [
      {
        path: "userManagement",
        component: () => import("@/views/system/userManagement.vue"),
        meta: { title: "用户管理" },
      },
      {
        path: "logs",
        component: () => import("@/views/system/logs.vue"),
        meta: { title: "日志管理" },
      },
    ],
  },
  {
    path: "/1111",
    component: Layout,
    meta: { title: "xx1管理", type: "multiple", icon: "Setting" },
    children: [
      {
        path: "userManagement",
        component: () => import("@/views/system/userManagement.vue"),
        meta: { title: "用户管理" },
      },
      {
        path: "logs",
        component: () => import("@/views/system/logs.vue"),
        meta: { title: "日志管理" },
      },
    ],
  },
  {
    path: "/2222",
    component: Layout,
    meta: { title: "XX管理", type: "multiple", icon: "Setting" },
    children: [
      {
        path: "userManagement",
        component: () => import("@/views/system/userManagement.vue"),
        meta: { title: "用户管理" },
      },
      {
        path: "logs",
        component: () => import("@/views/system/logs.vue"),
        meta: { title: "日志管理" },
      },
    ],
  },
  {
    path: "/system",
    component: Layout,
    meta: { title: "系统管理", type: "multiple", icon: "Setting" },
    children: [
      {
        path: "userManagement",
        component: () => import("@/views/system/userManagement.vue"),
        meta: { title: "用户管理" },
      },
      {
        path: "logs",
        component: () => import("@/views/system/logs.vue"),
        meta: { title: "日志管理" },
      },
    ],
  },
  {
    path: "/userInfo",
    component: Layout,
    meta: { title: "用户信息", type: "single", icon: "Setting", hidden: true },
    redirect: "/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/userInfo/index.vue"),
        meta: { title: "编辑用户信息" },
      },
    ],
  },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;

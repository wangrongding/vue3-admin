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
    path: "/material",
    component: Layout,
    meta: { title: "教辅资料", type: "multiple", icon: "Setting" },
    children: [
      {
        path: "course",
        component: () => import("@/views/material/index.vue"),
        meta: { title: "课程资料" },
        children: [
          {
            path: "detail",
            component: () => import("@/views/material/detail.vue"),
            meta: { title: "课程资料" },
          },
        ],
      },
      {
        path: "teachingPlan",
        component: () => import("@/views/material/index.vue"),
        meta: { title: "教案资料" },
      },
      {
        path: "teamCoaching",
        component: () => import("@/views/material/index.vue"),
        meta: { title: "团辅资料" },
      },
    ],
  },
  {
    path: "/111221",
    component: Layout,
    meta: { title: "测试管理", type: "multiple", icon: "Setting" },
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
    meta: { title: "班级管理", type: "single", icon: "Setting" },
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
    meta: { title: "学生管理", type: "single", icon: "Setting" },
    redirect: "/2222/userManagement",
    children: [
      {
        path: "userManagement",
        component: () => import("@/views/system/userManagement.vue"),
        meta: { title: "用户管理" },
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
    children: [
      {
        path: "index",
        component: () => import("@/views/userInfo/index.vue"),
        meta: { title: "编辑用户信息" },
      },
    ],
  },
  /*   {
    path: "/AAA",
    component: Layout,
    meta: { title: "菜单名A", type: "single", icon: "菜单图表名", hidden: true },
    children: [
      {
        path: "index",
        component: () => import("@/views/userInfo/index.vue"),
        meta: { title: "编辑用户信息" },
      },
      {
        path: "index",
        component: () => import("@/views/userInfo/index.vue"),
        meta: { title: "编辑用户信息" },
      },
    ],
  },
  {
    path: "/BBB",
    component: Layout,
    meta: { title: "菜单名B", type: "multiple", icon: "菜单图表名" },
    children: [
      {
        path: "index",
        component: () => import("@/views/userInfo/index.vue"),
        meta: { title: "编辑用户信息" },
      },
      {
        path: "index",
        component: () => import("@/views/userInfo/index.vue"),
        meta: { title: "编辑用户信息" },
      },
    ],
  }, */
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;

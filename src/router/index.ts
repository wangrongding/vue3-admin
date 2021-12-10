import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";
//无权限路由
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    meta: { hidden: true },
    component: Layout,
    redirect: "/dashboard/index"
  },
  {
    path: "/dashboard",
    component: Layout,
    meta: { title: "首页", type: "single", icon: "House" },
    children: [
      {
        path: "index",
        component: () => import("@/views/dashboard/index.vue")
      }
    ]
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
            meta: { title: "课程资料" }
          }
        ]
      },
      {
        path: "teachingPlan",
        component: () => import("@/views/material/index.vue"),
        meta: { title: "教案资料" }
      },
      {
        path: "teamCoaching",
        component: () => import("@/views/material/index.vue"),
        meta: { title: "团辅资料" }
      }
    ]
  },
  {
    path: "/testManagement",
    component: Layout,
    meta: { title: "测试管理", type: "multiple", icon: "Setting" },
    children: [
      {
        path: "userManagement",
        component: () => import("@/views/system/userManagement.vue"),
        meta: { title: "用户管理" }
      },
      {
        path: "logs",
        component: () => import("@/views/system/logs.vue"),
        meta: { title: "日志管理" }
      }
    ]
  },
  {
    path: "/classManagement",
    component: Layout,
    meta: { title: "班级管理", type: "single", icon: "Setting" },
    children: [
      {
        path: "list",
        component: () => import("@/views/system/userManagement.vue"),
        meta: { title: "用户管理" }
      }
    ]
  },
  {
    path: "/studentManagement",
    component: Layout,
    meta: { title: "学生管理", type: "single", icon: "Setting" },
    children: [
      {
        path: "list",
        component: () => import("@/views/system/userManagement.vue"),
        meta: { title: "用户管理" }
      }
    ]
  },
  {
    path: "/system",
    component: Layout,
    meta: { title: "系统管理", type: "multiple", icon: "Setting" },
    children: [
      {
        path: "userManagement",
        component: () => import("@/views/system/userManagement.vue"),
        meta: { title: "用户管理" }
      },
      {
        path: "logs",
        component: () => import("@/views/system/logs.vue"),
        meta: { title: "日志管理" }
      }
    ]
  },
  {
    path: "/userInfo",
    component: Layout,
    meta: { title: "用户信息", type: "single", icon: "Setting", hidden: true },
    children: [
      {
        path: "/userInfo",
        component: () => import("@/views/userInfo/index.vue"),
        meta: { title: "编辑用户信息" }
      }
    ]
  }
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;

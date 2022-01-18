import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";
import Dashboard from "@/views/dashboard/dashboard.vue";
import routeReplaceSelf from "./routeReplaceSelf.ts";
import { qiankunWindow } from "vite-plugin-qiankun/dist/helper";
//无权限路由
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    meta: { hidden: true },
    component: Layout,
    redirect: "/dashboard/index",
  },
  {
    path: "/dashboard",
    component: Layout,
    meta: { title: "数据看板", type: "single", icon: "icon-shujukanban" },
    redirect: "/dashboard/index",
    children: [
      {
        path: "index",
        // component: routeReplaceSelf(Dashboard),
        component: () => import("@/views/dashboard/dashboard.vue"),
        meta: { title: "看板详情" },
        children: [
          {
            path: "recordList",
            meta: { title: "心理筛查记录" },
            component: () => import("@/views/dashboard/recordList.vue"),
          },
        ],
      },
      {
        path: "recordList",
        component: () => import("@/views/dashboard/recordList.vue"),
        meta: {
          title: "心理筛查记录",
          buttonPermissions: {
            search: true,
            add: true,
            delete: true,
          },
        },
      },
      {
        path: "report",
        component: () => import("@/views/dashboard/report/index.vue"),
        meta: { title: "报告详情" },
      },
    ],
  },
  {
    path: "/testManagement",
    component: Layout,
    meta: { title: "测试管理", type: "single", icon: "icon-ceshiguanli" },
    redirect: "/testManagement/list",
    children: [
      {
        path: "list",
        component: () => import("@/views/testing/testList.vue"),
        meta: { title: "测试列表" },
      },
      {
        path: "testDetailList",
        component: () => import("@/views/testing/testDetailList.vue"),
        meta: { title: "测试记录" },
      },
    ],
  },

  {
    path: "/material",
    component: Layout,
    meta: { title: "教辅资料", type: "multiple", icon: "icon-ziliao" },
    redirect: "/material/course",
    children: [
      {
        path: "course",
        component: () => import("@/views/material/index.vue"),
        meta: { title: "课程资料", id: 7 },
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
        meta: { title: "教案资料", id: 8 },
      },
      {
        path: "teamCoaching",
        component: () => import("@/views/material/index.vue"),
        meta: { title: "团辅资料", id: 9 },
      },
    ],
  },
  {
    path: "/classManagement",
    component: Layout,
    meta: { title: "班级管理", type: "single", icon: "icon-banji" },
    redirect: "/classManagement/list",
    children: [
      {
        path: "list",
        component: () => import("@/views/class/classList.vue"),
        meta: { title: "班级列表" },
      },
      {
        path: "classDetail",
        component: () => import("@/views/class/classDetail.vue"),
        meta: { title: "班级详情" },
      },
      {
        path: "operationClass",
        component: () => import("@/views/class/operationClass.vue"),
        meta: { title: "操作班级信息" },
      },
    ],
  },
  {
    path: "/studentManagement",
    component: Layout,
    meta: { title: "学生管理", type: "single", icon: "icon-xuesheng" },
    redirect: "/studentManagement/list",
    children: [
      {
        path: "list",
        component: () => import("@/views/student/studentList.vue"),
        meta: { title: "学生列表" },
      },
      {
        path: "studentDetail",
        component: () => import("@/views/student/studentDetail.vue"),
        meta: { title: "学生详情" },
      },
      {
        path: "operationInfo",
        component: () => import("@/views/student/operationInfo.vue"),
        meta: { title: "操作学生信息" },
      },
    ],
  },
  {
    path: "/system",
    component: Layout,
    meta: { title: "系统管理", type: "multiple", icon: "icon-xitongguanli" },
    redirect: "/system/userManagement",
    children: [
      {
        path: "userManagement",
        component: () => import("@/views/system/userManagement.vue"),
        meta: { title: "用户管理" },
        children: [
          {
            path: "userInfo",
            component: () => import("@/views/userInfo/index.vue"),
            meta: { title: "编辑/添加管理员" },
          },
        ],
      },
      {
        path: "userInfo",
        component: () => import("@/views/system/operationInfo.vue"),
        meta: { title: "编辑/添加管理员", hidden: true },
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
    redirect: "/userInfo/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/userInfo/index.vue"),
        meta: { title: "编辑用户信息" },
      },
    ],
  },
];

// const router = createRouter({ history: createWebHistory(), routes });
const router = createRouter({
  history: createWebHistory(qiankunWindow.__POWERED_BY_QIANKUN__ ? "/admin" : "/"),
  routes,
});

export default router;

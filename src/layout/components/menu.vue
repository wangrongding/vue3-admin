<script setup lang="ts">
import { ref, reactive } from "vue";
function handleOpen() {}
function handleClose() {}
import MenuItem from "./menuItem.vue";
import { useRoute } from "vue-router";
// console.log(MenuItem);

let menuList = reactive([
  {
    path: "/",
    name: "home",
    component: "Layout",
    meta: { title: "首页" },
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
    component: "Layout",
    meta: { title: "test", hidden: true },
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
]);
let activeRouter = useRoute().path;
</script>
<template>
  <div class="page-container">
    <el-menu
      :default-active="activeRouter"
      class="el-menu-vertical"
      @open="handleOpen"
      @close="handleClose"
      router
    >
      <MenuItem v-for="route in menuList" :key="route.path" :item="route" :base-path="route.path" />
      <!-- <el-sub-menu index="6">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-sub-menu index="1-4">
          <template #title>
            <el-icon><setting /></el-icon> <span>item four</span>
          </template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>

      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <span>Navigator Four</span>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>
<style lang="scss" scoped>
.page-container {
  background-color: white;
  height: calc(100vh - 60px);
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>

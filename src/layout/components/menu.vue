<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { routes } from "@/router/index";
let menuList = reactive(routes);
const router = useRouter();
const route = useRoute();
function handleOpen() {}
function handleClose() {}
import MenuItem from "./menuItem.vue";
//当前路由
const activeRouter = computed(() => {
  const { path } = route;
  return path;
});
</script>
<template>
  <div class="page-container">
    <el-menu :default-active="activeRouter" class="el-menu-vertical" unique-opened @open="handleOpen" @close="handleClose" router>
      <MenuItem v-for="route in menuList" :key="route.path" :item="route" :basePath="route.path" />
    </el-menu>
  </div>
</template>
<style lang="scss" scoped>
.page-container {
  background-color: $base-menu-bg-color;
  height: calc(100vh - 60px);
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu {
    background-color: $base-menu-bg-color;
    //菜单激活后的样式
    ::v-deep(.el-menu-item.is-active) {
      font-weight: bold;
      background-color: rgba(227, 255, 251, 1);
      position: relative;
      &::after {
        position: absolute;
        right: 0;
        content: "";
        width: 2px;
        height: 100%;
        background-color: $base-color-default;
      }
    }
  }
}
</style>

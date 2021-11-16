<script setup lang="ts">
import { onMounted, getCurrentInstance } from "vue";
import { routes } from "@/router/index.ts";
import Dropdown from "./components/dropdown.vue";
import Logo from "./components/logo.vue";
import Menu from "./components/menu.vue";
</script>
<template>
  <el-container class="app-container">
    <el-header><Logo /> <Dropdown style="margin-left: auto" /></el-header>
    <el-container>
      <el-aside width="auto"><Menu /></el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.app-container {
  height: 100vh;
}
.el-header {
  /* background-color: #b3c0d1; */
  background-color: $nav-bg-color;
  color: var(--el-text-color-primary);
  text-align: right;
  line-height: 60px;
  display: flex;
  align-items: center;
  user-select: none;
}

.el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  user-select: none;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  padding: 20px;
}
</style>

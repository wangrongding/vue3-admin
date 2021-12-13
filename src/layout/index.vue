<script setup lang="ts">
import Dropdown from "./components/dropdown.vue";
import Logo from "./components/logo.vue";
import Menu from "./components/menu.vue";
import Breadcrumb from "./components/breadcrumb.vue";
</script>
<template>
  <el-container class="app-container">
    <el-header><Logo /> <Dropdown style="margin-left: auto" /></el-header>
    <el-container>
      <el-aside width="auto">
        <Menu />
      </el-aside>
      <el-main>
        <!-- 面包屑 -->
        <Breadcrumb class="bread-crumbs" />
        <router-view class="content" />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.app-container {
  height: 100vh;
  background-color: $base-nav-bg-color;
  .el-header {
    background-color: $base-nav-bg-color;
    border-bottom: 1px solid #0000001a;
    color: var(--el-text-color-primary);
    text-align: right;
    line-height: 60px;
    display: flex;
    align-items: center;
    user-select: none;
  }

  .el-aside {
    background-color: $base-menu-bg-color;
    color: var(--el-text-color-primary);
    user-select: none;
  }

  .el-main {
    width: 100%;
    background-color: #f4f5fa;
    color: var(--el-text-color-primary);
    padding: 0px 20px 20px;
    height: calc(100vh - 60px);
    overflow-y: auto;
    // overflow-y: scroll;
    // 整个滚动条
    &::-webkit-scrollbar {
      width: 8px;
      &:horizontal {
        height: 6px;
      }
    }
    // 滚动条上的滚动滑块
    &::-webkit-scrollbar-thumb {
      background-color: $base-scroll-color;
      border-radius: 6px;
      &:hover {
        background-color: $base-scroll-active-color;
      }
    }
    // 滚动条上的按钮
    &::-webkit-scrollbar-button {
      display: none;
      &:horizontal {
        display: none;
      }
    }
    // 滚动条轨道
    &::-webkit-scrollbar-track {
    }
    // 滚动条没有滑块的轨道部分
    &::-webkit-scrollbar-track-piece {
    }
    // 当同时有垂直滚动条和水平滚动条时交汇的部分
    &::-webkit-scrollbar-corner {
    }
    //  某些元素的corner部分的部分样式(例:textarea的可拖动按钮)
    &::-webkit-resizer {
    }
    .bread-crumbs {
      height: 30px;
      line-height: 30px;
    }
    .content {
      height: auto;
    }
  }
}
</style>

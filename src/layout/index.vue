<script setup lang="ts">
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
  background-color: #e9eef3;
  .el-header {
    background-color: #b3c0d1;
    // background-color: $nav-bg-color;
    color: var(--el-text-color-primary);
    text-align: right;
    line-height: 60px;
    display: flex;
    align-items: center;
    user-select: none;
  }

  .el-aside {
    color: var(--el-text-color-primary);
    text-align: center;
    user-select: none;
  }

  .el-main {
    width: 100%;
    background-color: #e9eef3;
    color: var(--el-text-color-primary);
    padding: 20px;
    height: calc(100vh - 60px);
    // overflow-y: auto;
    overflow-y: scroll;

    // 整个滚动条
    &::-webkit-scrollbar {
      width: 8px;
      &:horizontal {
        height: 6px;
      }
    }
    // 滚动条上的滚动滑块
    &::-webkit-scrollbar-thumb {
      background-color: #35495e;
      border-radius: 6px;
      &:hover {
        background-color: #42b883;
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
  }
}
</style>

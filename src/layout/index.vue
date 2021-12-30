<script setup lang="ts">
import Dropdown from "./components/dropdown.vue";
import Logo from "./components/logo.vue";
import Menu from "./components/menu.vue";
import Breadcrumb from "./components/breadcrumb.vue";
import { nextTick, reactive, ref, provide, watch } from "vue";
import { useRouter } from "vue-router";
const { currentRoute } = useRouter();
const isRouterAlive = ref(true);
const state = reactive({
  // 内容区刷新
  async reload() {
    isRouterAlive.value = false;
    await nextTick();
    isRouterAlive.value = true;
  },
});
// 注入刷新方法
provide("reload", state.reload);
watch(
  () => currentRoute.value,
  () => {
    state.reload();
  },
  { immediate: true },
);
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
        <Suspense>
          <router-view class="content" v-if="isRouterAlive" />
        </Suspense>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.app-container {
  height: 100vh;
  background-color: $base-nav-bg-color;
  user-select: none;
  .el-header {
    background-color: $base-nav-bg-color;
    border-bottom: 1px solid #0000001a;
    color: var(--el-text-color-primary);
    text-align: right;
    line-height: 60px;
    display: flex;
    align-items: center;
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
    padding: 0px 10px 10px 10px;
    height: calc(100vh - 60px);
    .bread-crumbs {
      height: 30px;
      line-height: 30px;
    }
    .content {
      // height: auto;
      height: calc(100vh - 100px);
      overflow-y: auto;
      // overflow-y: scroll;
    }
  }
}
</style>

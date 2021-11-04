<script setup lang="ts">
import { ref } from "vue";
import { resolve } from "path";
const props = defineProps(["menuList", "baseUrl"]);
const resolvePath = (routePath: string) => {
  return resolve(props.baseUrl, routePath);
};
</script>
<template>
  <template v-for="item in menuList">
    <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">
      <template #title>
        <el-icon v-if="item.meta.icon">
          <!-- 动态组件 -->
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <MenuItem
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :is-first-level="false"
        :base-path="resolvePath(child.path)"
      />
    </el-sub-menu>

    <el-menu-item :index="item.path" v-else>
      <el-icon v-if="item.meta.icon">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-menu-item>
  </template>
</template>
<style lang="scss" scoped>
.page-container {
}
</style>

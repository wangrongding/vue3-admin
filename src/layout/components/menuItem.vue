<script setup lang="ts">
import { ref, reactive } from "vue";
import path from "path";
const props = defineProps(["item", "basePath"]);
const resolvePath = (routePath: string) => {
  if (props.basePath == "/") {
    return "/dashboard";
  }
  console.log(props.basePath + (props.basePath == "/" ? "" : "/") + routePath);
  return props.basePath + (props.basePath == "/" ? "" : "/") + routePath;
};
</script>
<template>
  <el-sub-menu :index="item.path" v-if="item.meta.type == 'multiple' && !item.meta.hidden">
    <template #title>
      <el-icon v-if="item.meta.icon">
        <!-- 动态组件 -->
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </template>
    <MenuItem v-for="child in item.children" :key="child.path" :item="child" :basePath="item.path" />
  </el-sub-menu>

  <el-menu-item :index="resolvePath(item.path)" v-if="item.meta.type != 'multiple' && !item.meta.hidden">
    <el-icon v-if="item.meta.icon">
      <component :is="item.meta.icon"></component>
    </el-icon>
    <span>{{ item.meta.title }}</span>
  </el-menu-item>
</template>
<style lang="scss" scoped>
.page-container {
}
</style>

<script setup lang="ts">
import { ref, reactive } from "vue";
import path from "path";
const props = defineProps(["item", "basePath"]);
// console.log("🚀 / file: menuItem.vue / line 5 / item", props.item.path);
const resolvePath = (item: any) => {
  if (props.basePath == "/") {
    return "/dashboard";
  }
  if (item.meta.type === "single") {
    // console.log(props.basePath + "/" + item.children[0].path, "🚗🚗🚗🚗");
    return props.basePath + "/" + item.children[0].path;
  } else {
    // console.log(props.basePath + "/" + item.path, "🚄🚄🚄🚄");
    return props.basePath + "/" + item.path;
  }
};
function handleClick(item: any) {
  // console.log(item.indexPath);
}
</script>
<template>
  <el-sub-menu v-if="item.meta.type == 'multiple' && !item.meta.hidden" :index="item.path">
    <template #title>
      <el-icon v-if="item.meta.icon">
        <!-- 动态组件 -->
        <!-- <component :is="item.meta.icon" /> -->
        <i :class="`iconfont ${item.meta.icon}`" />
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </template>
    <MenuItem
      v-for="child in item.children"
      :key="child.path"
      :item="child"
      :base-path="item.path"
    />
  </el-sub-menu>

  <el-menu-item
    v-if="item.meta.type != 'multiple' && !item.meta.hidden"
    :index="resolvePath(item)"
    @click="handleClick"
  >
    <el-icon v-if="item.meta.icon">
      <i :class="`iconfont ${item.meta.icon}`" />
      <!-- <component :is="item.meta.icon" /> -->
    </el-icon>
    <span>{{ item.meta.title }}</span>
  </el-menu-item>
</template>
<style lang="scss" scoped>
.page-container {
}
</style>

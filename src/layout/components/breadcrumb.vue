<script lang="ts" setup>
import * as pathToRegexp from "path-to-regexp";
import { ArrowRight } from "@element-plus/icons-vue";
import { cloneDeep } from "lodash";
import { ref, watch, Ref } from "vue";
import { useRoute, useRouter, RouteLocationMatched } from "vue-router";

//定义面包屑导航数据
const tabs: Ref<RouteLocationMatched[]> = ref([]);
const route = useRoute();
const router = useRouter();
const getBredcurm = () => {
  //获取所有有meta和title
  let mached = route.matched.filter((item) => item.meta && item.meta.title);
  //判断第一个是否是首页,如果不是，构造一个
  const first = mached[0];
  if (!mached[0].path.includes("/dashboard")) {
    //构造一个
    mached = [{ path: "/dashboard/index", meta: { title: "首页" } } as any].concat(mached);
  }
  const breadcrumbList = cloneDeep(mached);
  //设置面包屑导航数据
  tabs.value = breadcrumbList;
};

function jumpTo(item: any, index: number) {
  let toRoute = pathToRegexp.compile(item.path);
  console.log("🚗🚗🚗", toRoute(route.query));
  if (index == tabs.value.length - 1) {
    return;
  }
  router.push(item.path);
}
getBredcurm();
//路由发生变化，重新获取面包屑导航数据
watch(
  () => route.path,
  () => getBredcurm(),
);
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <!-- <el-breadcrumb-item v-for="item in tabs" :to="{ path: item.path }">
      {{ item.meta.title }}
    </el-breadcrumb-item> -->
    <el-breadcrumb-item v-for="(item, index) in tabs">
      <a @click="jumpTo(item, index)">{{ item.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

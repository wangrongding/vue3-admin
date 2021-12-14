<script lang="ts" setup>
import { ArrowRight } from "@element-plus/icons-vue";
import { cloneDeep } from "lodash";
import { ref, watch, Ref } from "vue";
import { useRoute, RouteLocationMatched } from "vue-router";
//定义面包屑导航数据
const tabs: Ref<RouteLocationMatched[]> = ref([]);
const route = useRoute();
const getBredcurm = () => {
  //获取所有有meta和title
  let mached = route.matched.filter((item) => item.meta && item.meta.title);
  //判断第一个是否是首页,如果不是，构造一个
  const first = mached[0];
  if (first.path.includes("/dashboard")) {
    mached[0].path = "/dashboard/index";
  } else {
    //构造一个
    mached = [{ path: "/dashboard/index", meta: { title: "首页" } } as any].concat(mached);
  }
  // console.log("🚀 / file: breadcrumb.vue / line 17 / getBredcurm / mached", mached);
  const breadcrumbList = cloneDeep(mached);
  //第二个面包屑重定向到它的子路由中
  breadcrumbList.length > 2 && (breadcrumbList[1].path = breadcrumbList[2].path);
  //设置面包屑导航数据
  tabs.value = breadcrumbList;
};
getBredcurm();
//路由发生变化，重新获取面包屑导航数据
watch(
  () => route.path,
  () => getBredcurm()
);
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="item in tabs" :to="{ path: item.path }">{{
      item.meta.title
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

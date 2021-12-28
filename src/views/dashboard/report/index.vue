<script setup lang="ts">
import { shallowRef, reactive } from "vue";
import { findByPaperId } from "@/api/dashboard/index";
import UserInfo from "./components/userInfo.vue";
import TextTemplate from "./components/charts/TextTemplate.vue";
import Score from "./components/score.vue";
import ResultsAnalysis from "./components/ResultsAnalysis.vue";
import advice from "./components/advice.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const componentList = shallowRef([UserInfo, TextTemplate, Score, ResultsAnalysis, advice]);
const state = reactive({
  reportItemList: [],
  adviceInfo: {} as any,
  showAdvice: false,
});
// const response = (await findByPaperId({ paperId: route.query.reportId })) as any;
const response = (await findByPaperId({ paperId: "1464051298770030594" })) as any;
state.reportItemList = response.detail.teacher.reportList;

state.showAdvice = state.reportItemList.some((item: any) => {
  if (item.type == 9 && item.suggest) {
    state.adviceInfo = item;
  }
  return item.type == 9 && item.suggest;
});
</script>
<template>
  <div class="report">
    <div class="content">
      <div class="btn-group">
        <el-button type="primary" size="small" @click="">添加意见</el-button>
        <el-button type="primary" size="small" @click="">历史记录</el-button>
        <el-button type="primary" size="small" @click="">报告下载</el-button>
      </div>
      <div class="reportMain">
        <component
          :is="componentList[item['type'] - 1]"
          v-for="item in state.reportItemList"
          :reportData="item"
        ></component>
        <component
          v-show="state.showAdvice"
          :is="componentList[4]"
          :reportData="state.adviceInfo"
        ></component>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.report {
  // height: 100%;
  .content {
    box-sizing: border-box;
    border-radius: 8px;
    margin: 0px auto;
    background: #f4f5fa;
    background-color: #ffffff;
    background-image: url("./components/assets/repoetBack.png");
    background-repeat: no-repeat;
    background-size: 100%;
    padding-top: 400px;
    padding-bottom: 50px;
    position: relative;
    .btn-group {
      z-index: 99999;
      position: fixed;
      top: 60px;
      right: 20px;
    }
  }
  .reportMain {
    margin: 0 auto;
    width: 1200px;
  }
}
</style>

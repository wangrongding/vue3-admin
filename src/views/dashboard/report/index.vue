<script setup lang="ts">
import { shallowRef, reactive } from "vue";
import { findByPaperId } from "@/api/dashboard/index";
import UserInfo from "./components/userInfo.vue";
import TextTemplate from "./components/charts/TextTemplate.vue";
import Score from "./components/score.vue";
import ResultsAnalysis from "./components/ResultsAnalysis.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const componentList = shallowRef([UserInfo, TextTemplate, Score, ResultsAnalysis]);
const state = reactive({
  reportItemList: [],
});
// const response = (await findByPaperId({ paperId: route.query.reportId })) as any;
const response = (await findByPaperId({ paperId: "1473482861987434497" })) as any;
state.reportItemList = response.detail.teacher.reportList;
console.log("🚀🚀🚀🚀🚀🚀", state.reportItemList);
</script>
<template>
  <div class="report">
    <div class="content">
      <div class="reportMain">
        <component
          :is="componentList[item.type - 1]"
          v-for="item in state.reportItemList"
          :reportData="item"
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
  }
  .reportMain {
    margin: 0 auto;
    width: 1200px;
  }
}
</style>

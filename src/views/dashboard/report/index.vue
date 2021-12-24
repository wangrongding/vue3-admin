<script setup lang="ts">
import { ref, shallowRef } from "vue";
import UserInfo from "./components/userInfo.vue";
import TextTemplate from "./components/charts/TextTemplate.vue";
import Score from "./components/score.vue";
import ResultsAnalysis from "./components/ResultsAnalysis.vue";
const componentList = shallowRef([UserInfo, TextTemplate, Score, ResultsAnalysis]);
</script>
<template>
  <div class="report">
    <div class="content">
      <div class="reportMain">
        <component :is="item" v-for="item in componentList"></component>
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

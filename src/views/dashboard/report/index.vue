<script setup lang="ts">
import { ref, shallowRef } from "vue";
import Scatter from "./components/charts/Quadrant.vue";
import Dashboard from "./components/charts/Dashboard.vue";
import UserInfo from "./components/userInfo.vue";
import Score from "./components/score.vue";
const componentList = shallowRef([Scatter, Dashboard]);
</script>
<template>
  <div class="report">
    <div class="reportMain">
      <component :is="UserInfo"></component>
      <component :is="Score"></component>
      <component
        :is="item"
        v-for="item in componentList"
        style="height: 700px; width: 800px; margin: auto"
      ></component>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.report {
  box-sizing: border-box;
  border-radius: 8px;
  margin: 0px auto;
  background: #f4f5fa;
  background-color: #ffffff;
  background-image: url("./components/assets/repoetBack.png");
  background-repeat: no-repeat;
  background-size: 100%;
  padding-top: 400px;
  .reportMain {
    margin: 0 auto;
    width: 1200px;
  }
}
</style>

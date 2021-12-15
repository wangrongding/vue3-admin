<script setup lang="ts">
import { ref } from "vue";
import Pie from "@/components/charts/Pie.vue";
import UserInfo from "./components/userInfo.vue";
import TextTemplate from "./components/textTemplate.vue";
</script>
<template>
  <div class="report">
    <div class="reportMain">
      <component :is="UserInfo"></component>
      <component :is="TextTemplate"></component>
      <component :is="Pie"></component>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.report {
  height: calc(100vh - 100px) !important;
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

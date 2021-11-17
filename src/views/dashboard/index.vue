<script setup lang="ts">
import { ref } from "vue";
import Line from "@/components/charts/Line.vue";
import Pie from "@/components/charts/Pie.vue";
import Battery from "@/components/charts/Battery.vue";
import Progress from "@/components/charts/Progress.vue";
// import Menu from "../../components/charts components/menu.vue";
</script>

<template>
  <div class="page-container">
    <div class="panel-list">
      <div class="item"><span>50</span><span>XXXXXXX</span></div>
      <div class="item"><span>50</span><span>XXXXXXX</span></div>
      <div class="item"><span>50</span><span>XXXXXXX</span></div>
      <div class="item"><span>50</span><span>XXXXXXX</span></div>
    </div>
    <div class="chart-box">
      <div class="chart-item"><Progress /></div>
      <div class="chart-item"><Pie /></div>
      <div class="chart-item Battery"> <Battery /><Battery /><Battery /><Battery /></div>
    </div>
    <Line class="line" />
  </div>
</template>
<style lang="scss" scoped>
.page-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .panel-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 20px;
    .item {
      height: 150px;
      text-align: center;
      padding-top: 50px;
      background-color: #35495e;
      border-radius: 10px;
      color: white;
      font-size: 20px;
      & > span:first-child {
        display: block;
        font-size: 40px;
        margin-bottom: 20px;
      }
    }
  }
  .chart-box {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 20px;
    margin-top: 20px;
    .chart-item {
      background-color: white;
      border-radius: 10px;
      height: 300px;
    }
    .Battery {
      display: grid;
      grid-template-columns: 50% 50%;
      grid-template-rows: 50% 50%;
    }
  }
  .line {
    margin-top: 20px;
    flex: 1;
    background-color: white;
    border-radius: 10px;
  }
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import * as echarts from "echarts";
const myChart = ref<HTMLElement>(); //也可以用const myChart = ref<any>();
console.log(myChart);
const myCharts = ref<any>();

setTimeout(() => {
  // 绘制图表
  myCharts.value = echarts.init(myChart.value!);
  myCharts.value.setOption({
    title: { text: "总用户量" },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      data: ["12-3", "12-4", "12-5", "12-6", "12-7", "12-8"],
    },
    yAxis: { type: "value" },
    /* legend: {
      data: ["用户量", "用户量aaa"],
    }, */
    series: [
      {
        name: "用户量aaa",
        type: "line",
        smooth: true,
        data: [5, 250, 356, 150, 10, 20],
        // lineStyle: { color: "rgb(0,228,185)" },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(0,228,185)",
            },
            {
              offset: 1,
              color: "rgba(255, 255, 255,0)",
            },
          ]),
        },
      },
      {
        name: "用户量",
        type: "line",
        smooth: true,
        data: [50, 200, 396, 190, 100, 200],
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(255,143,114)",
            },
            {
              offset: 1,
              color: "rgba(255, 255, 255,0)",
            },
          ]),
        },
      },
    ],
  });
}, 10);
</script>

<template>
  <div class="page-container">
    <div ref="myChart" :style="{ width: '100%', height: '100%', minHeight: '100px' }"></div>
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100px;
  height: 100%;
}
</style>

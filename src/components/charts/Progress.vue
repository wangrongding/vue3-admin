<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
const myChart = ref<HTMLElement>(); //也可以用const myChart = ref<any>();
const myCharts = ref<any>();
const getvalue = [88];
onMounted(() => {
  // 绘制图表
  myCharts.value = echarts.init(myChart.value!);
  myCharts.value.setOption({
    title: {
      text: getvalue + "分",
      textStyle: {
        // color: "#28BCFE",
        fontSize: 30,
      },
      subtext: "综合得分",
      subtextStyle: {
        color: "#666666",
        fontSize: 20,
      },
      itemGap: 20,
      left: "center",
      top: "43%",
    },
    angleAxis: {
      max: 100,
      clockwise: true, // 逆时针
      // 隐藏刻度线
      show: false,
    },
    radiusAxis: {
      type: "category",
      show: true,
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    polar: {
      center: ["50%", "50%"],
      radius: "130%", //图形大小
    },
    series: [
      {
        type: "bar",
        data: getvalue,
        showBackground: true,
        backgroundStyle: {
          color: "#35495e",
        },
        coordinateSystem: "polar",
        roundCap: true,
        barWidth: 20,
        itemStyle: {
          opacity: 1,
          color: "#42b883",
          /* color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#25BFFF",
            },
            {
              offset: 1,
              color: "#5284DE",
            },
          ]),
          shadowBlur: 5,
          shadowColor: "#2A95F9", */
        },
      },
    ],
  });
});
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

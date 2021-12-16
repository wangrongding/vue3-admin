<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
type EChartsOption = echarts.EChartsOption;
const options: EChartsOption = {
  title: { text: "" },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985"
      }
    }
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    top: "100px",
    containLabel: true
  },
  xAxis: {
    data: ["12-3", "12-4", "12-5", "12-6", "12-7", "12-8"]
  },
  yAxis: { type: "value" },
  /* legend: {
      data: ["用户量", "用户量aaa"],
    }, */
  legend: {
    orient: "horizontal",
    selectedMode: false,
    right: 60,
    top: 20,
    icon: "circle" // 这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
  },
  series: [
    {
      name: "用户量aaa",
      type: "line",
      smooth: true,
      data: [5, 250, 356, 150, 100, 300],
      // stack: "总量",
      lineStyle: { color: "rgb(0,228,185)" },
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgb(0,228,185)"
          },
          {
            offset: 1,
            color: "rgba(255, 255, 255,0.2)"
          }
        ])
      }
    },
    {
      name: "用户量",
      type: "line",
      smooth: true,
      data: [50, 200, 316, 100, 100, 200],
      // stack: "总量",
      lineStyle: { color: "rgb(255,143,114)" },
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgb(255,143,114)"
          },
          {
            offset: 1,
            color: "rgba(255, 255, 255,0.2)"
          }
        ])
      }
    }
  ]
};
const chartDom = ref<HTMLElement>();
// 绘制图表
function render() {
  const chart = echarts.init(chartDom.value as HTMLElement);
  chart.setOption(options);
}
onMounted(() => {
  render();
});
</script>

<template>
  <div class="page-container">
    <div
      ref="chartDom"
      id="chartDom"
      :style="{ width: '100%', height: '100%', minHeight: '100px' }"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100px;
  height: 100%;
}
</style>

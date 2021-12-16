<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
type EChartsOption = echarts.EChartsOption;
const options: EChartsOption = {
  grid: {
    show: true,
    borderColor: "#8DEDC0",
    backgroundColor: "#f4fef8",
    left: 50,
    top: 50,
    right: 50,
    bottom: 50,
  },
  xAxis: [
    {
      min: -50,
      max: 50,
      axisLine: {
        lineStyle: {
          color: "#8DEDC0",
        },
      },
      minorSplitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      minorTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
  ],
  yAxis: {
    min: -50,
    max: 50,
    minorSplitLine: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: "#8DEDC0",
      },
    },
    axisTick: {
      show: false,
    },
    minorTick: {
      show: false,
    },
    splitLine: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
  },
  graphic: [
    {
      type: "text",
      left: "80",
      top: "80",
      style: {
        fill: "#333",
        font: "1.5em 'Microsoft YaHei', sans-serif",
        text: "抑郁质",
      },
    },
    {
      type: "text",
      right: "100",
      top: "80",
      style: {
        fill: "#333",
        font: "1.5em 'Microsoft YaHei', sans-serif",
        text: "胆汁质",
      },
    },
    {
      type: "text",
      left: "80",
      bottom: "80",
      style: {
        fill: "#333",
        font: "1.5em 'Microsoft YaHei', sans-serif",
        text: "多血质",
      },
    },
    {
      type: "text",
      right: "100",
      bottom: "80",
      style: {
        fill: "#333",
        font: "1.5em 'Microsoft YaHei', sans-serif",
        text: "粘液质",
      },
    },
    {
      type: "text",
      right: "center",
      top: "20",
      style: {
        fill: "#333",
        font: "1.5em 'Microsoft YaHei', sans-serif",
        text: "不稳定",
      },
    },
    {
      type: "text",
      right: "center",
      bottom: "20",
      style: {
        fill: "#333",
        font: "1.5em 'Microsoft YaHei', sans-serif",
        text: "稳定",
      },
    },
    {
      type: "text",
      right: "20",
      top: "center",
      style: {
        fill: "#333",
        overflow: "break",
        font: "1.5em 'Microsoft YaHei', sans-serif 40px",
        text: "外\n\n\n向",
      },
    },
    {
      type: "text",
      left: "20",
      top: "center",
      style: {
        fill: "#333",
        overflow: "break",
        font: "1.5em 'Microsoft YaHei', sans-serif 40px",
        text: "内\n\n\n向",
      },
    },
  ],
  series: [
    {
      symbolSize: 20,
      data: [
        {
          value: [25.0, 25.04],
          itemStyle: {
            color: "#FECB39",
          },
        },
      ],
      type: "scatter",
      markLine: {
        symbol: ["none", "none"], //去掉箭头
        silent: true,
        lineStyle: {
          color: "#8DEDC0",
          type: "solid",
          width: 1,
        },
        //标线
        data: [
          [
            {
              coord: [-11.5, 11.5],
            },
            {
              coord: [11.5, 11.5],
            },
          ],
          [
            {
              coord: [11.5, 11.5],
            },
            {
              coord: [11.5, -11.5],
            },
          ],
          [
            {
              coord: [11.5, -11.5],
            },
            {
              coord: [-11.5, -11.5],
            },
          ],
          [
            {
              coord: [-11.5, -11.5],
            },
            {
              coord: [-11.5, 11.5],
            },
          ],
        ],
      },
    },
  ],
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

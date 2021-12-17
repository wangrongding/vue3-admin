<!-- 纵向柱状图 -->
<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
type EChartsOption = echarts.EChartsOption;
const chartDom = ref<HTMLElement>();
const props = defineProps({
  reportData: {
    type: Object,
    default: () => {
      return {
        type: 7,
        content: [
          {
            dimensionTitle: "",
            dimensionName: ["C常规", "E企业", "R实际", "A艺术", "I调研", "S社会"],
            dimensionScore: [10, 60, 0, 200, 0, 0],
          },
        ],
        title: "",
      };
    },
  },
});
const options: EChartsOption = {
  backgroundColor: "#fff",
  grid: {
    top: "5%",
    left: "5%",
    right: "5%",
    bottom: "8%",
  },
  xAxis: [
    {
      type: "category",
      data: props.reportData.content[0].dimensionName,
      axisTick: {
        show: false, // 是否显示坐标轴轴线
      },
      axisLabel: {
        color: "#333",
        fontSize: 18,
      },
      splitLine: {
        show: false,
      },
      boundaryGap: true,
      axisLine: {
        //坐标轴轴线相关设置。
        show: true,
        lineStyle: {
          color: "#979797",
        },
      },
    },
  ],

  yAxis: [
    {
      type: "value",
      min: 0,
      splitNumber: 5,
      splitLine: {
        show: false,
      },
      axisLabel: {
        //坐标轴刻度标签的相关设置。
        show: true,
        color: "#333",
        fontSize: 18,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#979797",
        },
      },
      axisTick: {
        show: false,
      },
    },
  ],
  series: [
    {
      type: "bar",
      barMaxWidth: 40,
      barGap: "5%", // 柱图间距
      zlevel: 10,
      data: props.reportData.content[0].dimensionScore,
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#00E3B9",
            },
            {
              offset: 1,
              color: "#00E3B9",
            },
          ],
        },
        borderRadius: [8, 8, 0, 0],
      },
      label: {
        show: true, //开启显示
        position: "top", //在上方显示
        color: "#333",
        fontSize: 18,
        fontWeight: 400,
      },
    },
  ],
};
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
  width: 1000px;
  height: 500px;
  margin: 0 auto;
}
</style>

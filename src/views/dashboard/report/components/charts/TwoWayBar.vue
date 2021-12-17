<!-- 左右横线柱状图 -->
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
        type: 3,
        content: [
          {
            title: "",
            dataOne: ["活跃型", "感悟型", "视觉型", "序列型"],
            dataTwo: ["10", "10", "10", "10"],
            dataThree: ["沉思型", "直觉型", "言语型", "综合型"],
            dataFour: ["20", "30", "0", "10"],
          },
        ],
        title: "",
      };
    },
  },
});
console.log("🚀 / file: TwoWayBar.vue / line 27 / props", props);

var option = {
  backgroundColor: "",
  timeline: {
    show: false,
    top: 0,
    data: [1],
  },
  grid: [
    {
      show: false,
      top: "10%",
      bottom: "8%",
      containLabel: true,
      width: "37%",
    },
    {
      show: false,
      left: "51%",
      top: "10%",
      bottom: "8%",
      width: "0%",
    },
    {
      show: false,
      right: "16%",
      top: "10%",
      bottom: "8%",
      containLabel: true,
      width: "37%",
    },
  ],
  xAxis: [
    {
      type: "value",
      max: 99,
      inverse: true,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      position: "top",
      axisLabel: {
        show: false,
        color: "#fff",
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: "lineColor",
        },
      },
    },
    {
      gridIndex: 1,
      show: false,
    },
    {
      gridIndex: 2,
      max: 99,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      position: "top",
      axisLabel: {
        show: false,
        color: "#fff",
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: "#D1D1D1",
        },
      },
    },
  ],
  yAxis: [
    {
      type: "category",
      inverse: true,
      position: "left",
      offset: 100,
      axisLine: {
        show: true,
        lineStyle: {
          color: "#D1D1D1",
        },
      },
      axisTick: {
        show: false,
      },
      data: props.reportData.content[0].dataOne,
      axisLabel: {
        show: true,
        padding: [0, 0, 0, 0],
        color: "#333",
        fontSize: 18,
        margin: 16,
        align: "center",
      },
    },
    {
      gridIndex: 1,
      type: "category",
      inverse: true,
      position: "right",
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    {
      gridIndex: 2,
      type: "category",
      inverse: true,
      position: "right",
      offset: 100,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: true,
        padding: [0, 0, 0, 0],
        color: "#333",
        fontSize: 18,
        align: "center",
      },
      data: props.reportData.content[0].dataThree,
    },
  ],
  series: [
    {
      name: "2017",
      type: "bar",
      barWidth: 40,
      stack: "1",
      itemStyle: {
        borderRadius: [8, 0, 0, 8],
        color: "#00E3B9",
      },
      label: {
        show: true,
        position: "left", // 在上方显示
        right: 100,
        // 数值样式
        color: "#333333",
        fontSize: 22,
      },
      data: props.reportData.content[0].dataTwo,
      animationEasing: "elasticOut",
    },
    {
      name: "2018",
      type: "bar",
      stack: "2",
      barWidth: 40,
      xAxisIndex: 2,
      yAxisIndex: 2,
      itemStyle: {
        borderRadius: [0, 8, 8, 0],
        color: "#00E3B9",
      },
      label: {
        show: true,
        position: "right", // 在上方显示
        right: 100,
        color: "#333333",
        fontSize: 22,
      },
      data: props.reportData.content[0].dataFour,
    },
  ],
};

const options: EChartsOption = option as any;
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

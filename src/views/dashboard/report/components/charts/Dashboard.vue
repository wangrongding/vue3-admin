<!-- 仪表盘 -->
<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
type EChartsOption = echarts.EChartsOption;
const chartDom = ref<HTMLElement>();
const props = defineProps({
  reportData: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

if (props.reportData.content[0].interval.slice(-1)[0][0] < 1) {
  props.reportData.content[0].interval.push([
    "1",
    props.reportData.content[0].interval.slice(-1)[0][1],
  ]);
}
const options: EChartsOption = {
  series: [
    {
      type: "gauge",
      startAngle: 180,
      endAngle: 0,
      min: 0,
      max: 1,
      splitNumber: 8,
      radius: "120%",
      axisLine: {
        lineStyle: {
          width: 20,
          color: props.reportData.content[0].interval,
        },
        show: true,
      },
      center: ["50%", "75%"],
      pointer: {
        icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
        length: "10%",
        width: 20,
        offsetCenter: [1, "-60%"],
        itemStyle: {
          color: "auto",
        },
      },
      axisTick: {
        length: 12,
        lineStyle: {
          color: "auto",
          width: 2,
        },
      },
      splitLine: {
        length: 20,
        lineStyle: {
          color: "auto",
          width: 5,
        },
      },
      axisLabel: {
        color: "#464646",
        fontSize: 20,
        distance: -60,
        formatter: function (value) {
          return "";
        },
      },
      title: {
        offsetCenter: [0, "-20%"],
        fontSize: 18,
        color: "inherit",
      },
      detail: {
        fontSize: 28,
        offsetCenter: [0, "0%"],
        valueAnimation: true,
        formatter: function (value) {
          return Math.round(value * 100) + "分";
        },
        color: "inherit",
      },
      data: [
        {
          value: props.reportData.content[0].score / 100,
          name: props.reportData.content[0].riskLevel,
        },
      ],
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
      :style="{ width: '100%', height: '100%', minHeight: '300px' }"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100px;
  height: 100%;
}
</style>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import * as echarts from "echarts";
type EChartsOption = echarts.EChartsOption;
const chartDom = ref<HTMLElement>();
let chart = {} as any;
//传入的配置
const props = defineProps({
  configuration: {
    type: Object,
    default: {},
    required: true,
  },
});
// 绘制图表
function render() {
  const options: EChartsOption = {
    title: { text: props.configuration.title.text, show: props.configuration.title.show },
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
      top: "100px",
      containLabel: true,
    },
    xAxis: {
      data: props.configuration.xAxisData,
    },
    yAxis: { type: "value" },
    /* legend: {
      data: ["用户量", "用户量aaa"],
    }, */
    color: ["rgb(0,228,185)", "rgb(255,143,114)", "#80FF80", "#FF8096", "#800080"],
    legend: {
      data: [props.configuration.data1.name, props.configuration.data2.name],
      orient: "horizontal",
      selectedMode: false,
      right: 60,
      top: 20,
      icon: "circle", // 这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
    },
    series: [
      {
        name: props.configuration.data1.name,
        type: "line",
        smooth: true,
        data: props.configuration.data1.data,
        // stack: "总量",
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
              color: "rgba(255, 255, 255,0.2)",
            },
          ]),
        },
      },
      {
        name: props.configuration.data2.name,
        type: "line",
        smooth: true,
        data: props.configuration.data2.data,
        // stack: "总量",
        // lineStyle: { color: "rgb(255,143,114)" },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(255,143,114)",
            },
            {
              offset: 1,
              color: "rgba(255, 255, 255,0.2)",
            },
          ]),
        },
      },
    ],
  };
  chart.setOption(options);
}
watch(props.configuration, () => {
  render();
});
onMounted(() => {
  chart = echarts.init(chartDom.value as HTMLElement);
  render();
  window.onresize = function () {
    chart.resize();
  };
});
</script>

<template>
  <div class="page-container">
    <div ref="chartDom" id="chartDom" :style="{ height: '100%', minHeight: '100px' }"></div>
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100px;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>

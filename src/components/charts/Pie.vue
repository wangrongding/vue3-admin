<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
const myChart = ref<HTMLElement>(); //也可以用const myChart = ref<any>();
const myCharts = ref<any>();
//传入的配置
const props = defineProps({
  configuration: {
    type: Object,
    default: {},
    required: true,
  },
});
import { cloneDeep } from "lodash";
let tempData = cloneDeep(props.configuration);
//默认配置
const configuration = ref({
  title: "", //title
  data: [{ value: 0, name: "-" }], //最大值为1
  color: ["rgba(255, 143, 114, 1)", "rgba(0, 224, 180, 1)", "rgba(153, 153, 153, 1)"],
  icon: "circle",
});
// if (tempData.data) {
//   tempData.data = [];
// } else {
//   tempData.data = [];
// }
//合并默认配置与自定义配置
configuration.value = Object.assign(configuration.value, tempData);
onMounted(() => {
  // 绘制图表
  myCharts.value = echarts.init(myChart.value!);
  myCharts.value.setOption({
    title: {
      text: "",
      subtext: "",
      left: "left",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      selectedMode: false,
      left: 20,
      top: 80,
      icon: configuration.value.icon, // 这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
    },
    color: configuration.value.color,
    series: [
      {
        // top: "51%",
        left: "20%",
        name: "Access From",
        type: "pie",
        radius: "70%",
        data: configuration.value.data, //[{ value: 77, name: "example" }]
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        label: {
          formatter: "{d}%",
          position: "inside",
          fontSize: 24,
          color: "#fff",
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

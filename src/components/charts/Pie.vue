<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
const myChart = ref<HTMLElement>(); //也可以用const myChart = ref<any>();
const myCharts = ref<any>();
onMounted(() => {
  // 绘制图表
  myCharts.value = echarts.init(myChart.value!);
  myCharts.value.setOption({
    title: {
      text: "Referer of a Website",
      subtext: "Fake Data",
      left: "left",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: 20,
      top: 80,
    },
    series: [
      {
        // top: "51%",
        left: "20%",
        name: "Access From",
        type: "pie",
        radius: "70%",
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        label: {
          formatter: "{c}%",
          position: "inside",
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

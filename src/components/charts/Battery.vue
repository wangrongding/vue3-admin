<script setup lang="ts">
import { ref, onMounted } from "vue";
import "echarts-liquidfill";
import * as echarts from "echarts";
const chartDom = ref<HTMLElement>(); //也可以用const chartDom = ref<any>();
const chart = ref<any>();
onMounted(() => {
  // 绘制图表
  chart.value = echarts.init(chartDom.value!);
  chart.value.setOption({
    title: {
      text: "35%",
      textStyle: {
        fontSize: 20,
        fontWeight: "normal",
        // color: "rgb(124,190,255)",
      },
      x: "center",
      y: "center",
    },
    graphic: [
      {
        type: "group",
        left: "center",
        top: "85%",
        children: [
          {
            type: "text",
            style: {
              // fill: "#fff",
              text: "流量统计",
              fontSize: 20,
            },
          },
        ],
      },
    ],
    series: [
      {
        type: "liquidFill",
        waveAnimation: 10,
        data: [0.35, 0.3],
        color: ["#42b883", "#35495e"],
        amplitude: 9,
        radius: "60%",
        backgroundStyle: {
          color: "#fff",
        },
        /* backgroundStyle: {
          color: {
            type: "radial",
            x: 0.5,
            y: 0.5,
            r: 0.55,
            colorStops: [
              {
                offset: 0.5,
                color: "rgb(255,27,52)", // 0% 处的颜色
              },
              {
                offset: 0.75,
                color: "rgb(255,41,83)", // 100% 处的颜色
              },
              {
                offset: 0.95,
                color: "rgb(255,63,135)", // 100% 处的颜色
              },
            ],
            globalCoord: false, // 缺省为 false
          },
        }, */
        outline: {
          show: false,
        },
        label: {
          formatter: "",
        },
      },
    ],
  });
});
</script>

<template>
  <div class="page-container">
    <div ref="chartDom" :style="{ width: '100%', height: '100%', minHeight: '30px' }"></div>
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 30px;
  height: 100%;
}
</style>

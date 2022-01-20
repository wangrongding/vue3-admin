<script setup lang="ts">
import { fontSize } from "@/utils/index";
import { ref, onMounted, watch, reactive } from "vue";
import * as echarts from "echarts";
type EChartsOption = echarts.EChartsOption;
const chartDom = ref<HTMLElement>();
const props = defineProps({
  level: {
    type: String,
  },
});

// 绘制图表
function render() {
  const options = {
    // 隐藏legend
    legend: {
      data: ["1", "2", "3", "4", "5"],
      orient: "vertical",
      right: "0",
      y: "center",
      itemGap: 15,
      show: false,
      textStyle: {
        // 隐藏文字
        color: "transparent",
      },
      itemWidth: fontSize(0.41),
      itemHeight: fontSize(0.25),
      icon: "rect",
    },
    xAxis: [
      {
        type: "category",
        data: [],
        show: false,
        axisLine: { show: false },
        splitLine: { show: false },
        splitArea: {
          interval: "auto",
          show: false,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        show: false,
        axisLine: { show: false },
        splitLine: { show: false },
      },
    ],
    graphic: {
      $action: "replace", // 5 === 5 ? 'remove' : 'replace',
      type: "image",
      id: "logo",
      left: "center",
      top: fontSize(0.04),
      bounding: "raw",
      style: {
        image: new URL("../image/1.png", import.meta.url).href,
        width: 245,
        height: 245,
        opacity: 0.8,
      },
    },
    series: [
      {
        name: "内层数据刻度",
        type: "gauge",
        radius: "82%",
        center: ["50%", "50%"],
        axisLine: {
          lineStyle: {
            width: fontSize(0.18),
            color: [
              [0.59, "#FF4646"],
              [0.69, "#FE8C39"],
              [0.79, "#FEE739"],
              [0.89, "#9FE221"],
              [1, "#00BD72"],
            ],
          },
        },
        //   //第二层
        splitLine: {
          length: fontSize(0.2),
          lineStyle: {
            width: 0,
            color: "#ffffff",
          },
        },
        //第二层
        axisTick: {
          lineStyle: {
            width: 0,
            color: "#ffffff",
          },
        },
        //刻度数字
        axisLabel: {
          color: "#333",
          distance: 1,
          fontSize: fontSize(0.12),
        },
        // 中间数字
        detail: {
          show: true,
          offsetCenter: ["0", "70%"],
          fontSize: fontSize(0.24),
        },

        markPoint: {
          data: [
            {
              x: "50%",
              y: "50%",
              symbol: "circle",
              symbolSize: fontSize(0.4),
            },
            {
              x: "50%",
              y: "50%",
              symbol: "circle",
              symbolSize: fontSize(0.1),
              itemStyle: {
                color: "#fff",
              },
            },
          ],
        },
        //指针
        pointer: {
          width: fontSize(0.04),
          length: "65%",
        },
        data: [
          {
            value: props.level,
          },
        ],
        silent: false,
      },

      // 最里层
      {
        name: "最内层线",
        type: "gauge",
        radius: "0%",
        center: ["50%", "50%"],
        startAngle: 360,
        endAngle: 0,
        axisLine: {
          show: false,
          lineStyle: {
            opacity: 0,
          },
        },
        splitLine: {
          show: false,
          lineStyle: {
            opacity: 0,
          },
        },
        axisLabel: {
          show: false,
        },
        // 最里面圆心
        axisTick: {
          length: fontSize(0.02),
          lineStyle: {
            color: "#F26055",
            width: fontSize(0.4),
            type: "normal",
          },
        },
        detail: {
          show: false,
        },
        pointer: {
          show: false,
        },
      },
    ],
  };

  const chart = echarts.init(chartDom.value as HTMLElement);
  chart.setOption(options, true);
}

onMounted(() => {
  render();
});
</script>

<template>
  <div class="page-container">
    <div ref="chartDom" id="chartDom" :style="{ width: '100%', height: '250px' }"></div>
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100px;
  height: 100%;
}
</style>

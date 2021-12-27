<!-- 折线图 -->
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
props.reportData.content[1].forEach(function (item: any) {
  item.coord = item.data;
  item.name = Math.round(item.coord[1]);
});
const options: EChartsOption = {
  title: {
    text: "T分数",
    left: "left",
    textStyle: {
      fontSize: 18,
      color: "#333", //标题颜色
    },
  },
  xAxis: {
    type: "category",
    splitLine: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        width: 1,
        color: "#ccc",
      },
    },
    axisTick: {
      show: true,
    },
    axisLabel: {
      color: "#333",
      fontSize: 18,
    },
    data: props.reportData.content[0].dimensionName,
  },
  grid: {
    left: "2%",
    right: "4%",
    bottom: "4%",
    containLabel: true,
  },
  yAxis: {
    type: "value",
    interval: 10,
    max: 110,
    splitLine: {
      show: true,
      lineStyle: {
        type: "dashed",
      },
    },
    axisLine: {
      lineStyle: {
        width: 1,
        color: "#ccc",
      },
    },
    axisTick: {
      lineStyle: {
        width: 0,
        color: "#333",
      },
    },
    axisLabel: {
      color: "#333",
      fontSize: 18,
    },
  },
  series: [
    {
      type: "line",
      symbol: "circle",
      symbolSize: 9,
      smooth: false,
      itemStyle: {
        color: "#fff",
        borderColor: "#00E3B9",
        borderWidth: 1,
      },
      lineStyle: {
        color: "#00E3B9",
        width: 3,
        shadowColor: "#",
        shadowBlur: 10,
        shadowOffsetX: 4,
        shadowOffsetY: 10,
      },
      data: props.reportData.content[0].dimensionScore,
      markLine: {
        silent: true,
        symbol: "none",
        data: [
          {
            yAxis: 50,
            lineStyle: {
              color: "#00E3B9",
            },
          },
        ],
        label: {
          show: false,
        },
      },
      markArea: {
        //标记区域
        data: [
          [
            {
              yAxis: "30",
              itemStyle: {
                color: "#FFD3D2",
              },
            },
            {
              yAxis: "70",
            },
          ],
          [
            {
              yAxis: "40",
              itemStyle: {
                color: "#FFF6DD",
              },
            },
            {
              yAxis: "60",
            },
          ],
        ],
      },
      markPoint: {
        label: {
          show: true,
          align: "center",
          color: "#333",
          fontWeight: 100,
          formatter: "{b}",
        },
        itemStyle: {
          color: {
            type: "radial",
            x: 0.4,
            y: 0.4,
            r: 0.9,
            colorStops: [
              {
                offset: 0,
                color: "#FECB39",
              },
              {
                offset: 1,
                color: "#FECB39",
              },
            ],
          },
          shadowColor: "rgba(0, 0, 0, 0.1)",
          shadowBlur: 10,
        },
        data: props.reportData.content[1],
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

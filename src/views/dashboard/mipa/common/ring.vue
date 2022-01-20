<script setup lang="ts">
import { fontSize } from "@/utils/index";
import { ref, onMounted, reactive } from "vue";
import * as echarts from "echarts";
type EChartsOption = echarts.EChartsOption;
const chartDom = ref<HTMLElement>();
const props = defineProps({
  ring: {
    type: Array,
    default: () => [],
  },
});

const state = reactive({ option: {} });
// 绘制图表
function render() {
  var scaleData = props.ring as any;
  let ringRadius = [
    [fontSize(1.38), fontSize(1.5)],
    [fontSize(1.21), fontSize(1.33)],
    [fontSize(1.04), fontSize(1.16)],
    [fontSize(0.87), fontSize(0.99)],
  ];
  scaleData.forEach((item: any, index: any) => {
    item.radius = ringRadius[index];
  });
  var placeHolderStyle = {
    normal: {
      label: {
        show: false,
      },
      labelLine: {
        show: false,
      },
      color: "rgba(0, 0, 0, 0)",
      borderColor: "rgba(0, 0, 0, 0)",
      borderWidth: 0,
    },
  };
  var nameList = [];
  var seriesObj = [];
  var color = ["#4BC29E", "#FDBF55", "#2DA3DB", "#F26055"];
  for (var i = 0; i < scaleData.length; i++) {
    nameList.push(scaleData[i].name);
    seriesObj.push({
      name: "",
      type: "pie",
      radius: scaleData[i].radius,
      hoverAnimation: false,
      itemStyle: {
        normal: {
          label: {
            show: false,
            color: "#ddd",
          },
        },
      },
      data: [
        {
          value: scaleData[i].riskIndex,
          name: scaleData[i].name,
          itemStyle: {
            normal: {
              borderWidth: 0,
              borderColor: color[i],
            },
          },
        },
        {
          value: 5 - scaleData[i].riskIndex,
          name: "",
          itemStyle: placeHolderStyle,
        },
      ],
    });
  }
  state.option = {
    color: color,
    tooltip: {
      show: false,
    },
    legend: {
      orient: "vertical",
      right: "0",
      y: "center",
      itemGap: 35,
      data: nameList,
      show: true,
      textStyle: {
        color: "#666",
        fontSize: fontSize(0.2),
      },
      icon: "react",
      itemWidth: fontSize(0.38),
      itemHeight: fontSize(0.22),
    },
    toolbox: {
      show: false,
    },
    series: seriesObj,
  };

  const chart = echarts.init(chartDom.value as HTMLElement);
  chart.setOption(state.option);
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

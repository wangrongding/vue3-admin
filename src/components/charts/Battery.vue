<script setup lang="ts">
import { ref, onMounted } from "vue";
import "echarts-liquidfill";
import * as echarts from "echarts";
const chartDom = ref<HTMLElement>(); //也可以用const chartDom = ref<any>();
const chart = ref<any>();
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
  data: [0, 0], //最大值为1
  color: ["#42b883", "#35495e"], //波浪的颜色
  background: "#fff", //背景
  labelColor: "black", //label颜色
  labelTop: "85%", //label距离顶部的距离
  labelSize: 20, //label文字大小
  labelText: "xxxxx", //label
  center: ["50%", "40%"], //图表的占位
  radius: "60%", //图形大小
  amplitude: 9, //波浪的波幅
});
if (tempData.data) {
  tempData.data = [tempData.data, tempData.data - 0.05];
} else {
  tempData.data = [0, 0];
}
//合并默认配置与自定义配置
configuration.value = Object.assign(configuration.value, tempData);
onMounted(() => {
  // 绘制图表
  chart.value = echarts.init(chartDom.value!);
  chart.value.setOption({
    title: {
      text: configuration.value.title,
      textStyle: {
        fontSize: 20,
        fontWeight: "normal",
      },
    },
    graphic: [
      {
        type: "group",
        left: "center",
        top: configuration.value.labelTop,
        children: [
          {
            type: "text",
            style: {
              fill: configuration.value.labelColor,
              text: configuration.value.labelText,
              fontSize: configuration.value.labelSize,
              fontWeight: "500",
            },
          },
        ],
      },
    ],
    series: [
      {
        center: ["50%", "40%"],
        type: "liquidFill",
        waveAnimation: 10,
        amplitude: 9,
        data: configuration.value.data,
        color: configuration.value.color,
        radius: configuration.value.radius,
        backgroundStyle: {
          color: configuration.value.background,
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
          formatter: "{c}",
          fontSize: 28,
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

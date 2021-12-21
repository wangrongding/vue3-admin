<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import "echarts-liquidfill";
import * as echarts from "echarts";
const chartDom = ref<HTMLElement>(); //也可以用const chartDom = ref<any>();
import { cloneDeep } from "lodash";
let chart = <any>{};
//传入的配置
const props = defineProps({
  configuration: {
    type: Object,
    default: {},
    required: true,
  },
});

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

function render() {
  console.log("========aa=======");

  let tempData = cloneDeep(props.configuration);
  if (tempData.data) {
    tempData.data = [tempData.data, tempData.data - 0.05];
  } else {
    tempData.data = [0, 0];
  }
  //合并默认配置与自定义配置
  configuration.value = Object.assign(configuration.value, tempData);

  chart.setOption({
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
        outline: {
          show: false,
        },
        itemStyle: {
          //opacity: 0.7, // 波浪的透明度
          shadowBlur: 0, // 波浪的阴影范围
        },
        label: {
          formatter: "{c}",
          fontSize: 28,
        },
      },
    ],
  });
}

watch(props.configuration, () => {
  render();
});
onMounted(() => {
  // 绘制图表
  chart = echarts.init(chartDom.value!);
  render();
});
</script>

<template>
  <div class="page-container">
    <div ref="chartDom" :style="{ width: '100%', height: '100%', minHeight: '30px' }" />
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 30px;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>

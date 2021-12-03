<script setup lang="ts">
import { ref, onMounted } from "vue";
import { cloneDeep } from /* * as __ */ "lodash";
import * as echarts from "echarts";
const myChart = ref<HTMLElement>(); //也可以用const myChart = ref<any>();
const myCharts = ref<any>();
const props = defineProps({
  configuration: {
    type: Object,
    default: {},
    required: true,
  },
});
let tempData = cloneDeep(props.configuration);
const configuration = ref({
  radius: "130%", //图形大小
  center: ["50%", "50%"],
  unfinishedColor: "#eaeaea",
  finishedColor: "#28BCFE",
  barWidth: 20,
  opacity: 1,
  text: 0,
  subtext: "描述文本",
  data: [0],
});
if (tempData.data) {
  tempData.text = tempData.data;
  tempData.data = [tempData.data];
} else {
  tempData.text = 0;
  tempData.data = [0.1];
}
//合并默认配置与自定义配置
configuration.value = Object.assign(configuration.value, tempData);

onMounted(() => {
  // 绘制图表
  myCharts.value = echarts.init(myChart.value!);
  myCharts.value.setOption({
    title: {
      text: configuration.value.text,
      textStyle: {
        fontSize: 30,
      },
      subtext: configuration.value.subtext,
      subtextStyle: {
        color: "#666666",
        fontSize: 20,
      },
      itemGap: 20,
      left: "center",
      top: "43%",
    },
    angleAxis: {
      max: 100,
      clockwise: true, // 逆时针
      // 隐藏刻度线
      show: false,
    },
    radiusAxis: {
      type: "category",
      show: true,
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    polar: {
      center: configuration.value.center,
      radius: configuration.value.radius, //图形大小
    },
    //================
    xAxis: [
      //这里有很多的show，必须都设置成不显示
      {
        type: "category",
        data: [],
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        splitArea: {
          interval: "auto",
          show: false,
        },
      },
    ],
    yAxis: [
      //这里有很多的show，必须都设置成不显示
      {
        type: "value",
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        minorTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
    ],
    //================
    series: [
      {
        type: "bar",
        data: configuration.value.data,
        showBackground: true,
        backgroundStyle: {
          color: configuration.value.unfinishedColor,
        },
        coordinateSystem: "polar",
        roundCap: true,
        barWidth: configuration.value.barWidth,
        itemStyle: {
          opacity: configuration.value.opacity,
          color: configuration.value.finishedColor,
        },
      },
      {
        name: "aaa",
        type: "bar",
        barWidth: "60%", //不显示，可以随便设置
        data: [0],
        itemStyle: {
          color: "#00A1E9", //这里的图例要注意，颜色设置和仪表盘的颜色对应起来
        },
      },
      {
        name: "bbb",
        type: "bar",
        barWidth: "60%",
        data: [0],
        itemStyle: {
          color: "#70C1B3",
        },
      },
    ],
    legend: {
      //配置legend，这里的data，要对应type为‘bar’的series数据项的‘name’名称，作为图例的说明
      data: ["aaa", "bbb"],
      selectedMode: false, //图例禁止点击
      left: 20,
      top: 80,
      orient: "vertical",
      icon: "circle",
    },
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

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { cloneDeep } from /* * as __ */ "lodash";
import * as echarts from "echarts";
const chartDom = ref<HTMLElement>(); //也可以用const chartDom = ref<any>();
let chart = <any>{};
const props = defineProps({
  configuration: {
    type: Object,
    default: {},
    required: true,
  },
});

function getPercentage(data1: number, data2: number) {
  if (data1 == 0 && data2 == 0) {
    return "0%";
  } else {
    return ((data1 / (data1 + data2)) * 100).toFixed(2) + "%";
  }
}

function render() {
  chart.setOption({
    title: {
      text: getPercentage(props.configuration.data[0].value, props.configuration.data[1].value),
      // show: props.configuration.title.show,
      textStyle: {
        fontSize: 30,
      },
      subtext: props.configuration.title.text,
      subtextStyle: {
        color: "#666666",
        fontSize: 20,
      },
      itemGap: 20,
      left: "center",
      top: "43%",
    },
    angleAxis: {
      max: props.configuration.data[0].value + props.configuration.data[1].value,
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
      center: props.configuration.center || ["50%", "50%"],
      radius: props.configuration.radius || "130%", //图形大小
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
        data: [props.configuration.data[0].value],
        showBackground: true,
        backgroundStyle: {
          color: props.configuration.unfinishedColor,
        },
        coordinateSystem: "polar",
        roundCap: true,
        barWidth: props.configuration.barWidth || 20,
        itemStyle: {
          opacity: props.configuration.opacity || 1,
          color: props.configuration.finishedColor,
        },
      },
      {
        name: props.configuration.data[0].name,
        type: "bar",
        barWidth: "60%", //不显示，可以随便设置
        data: [0],
        itemStyle: {
          color: props.configuration.finishedColor, //这里的图例要注意，颜色设置和仪表盘的颜色对应起来
        },
      },
      {
        name: props.configuration.data[1].name,
        type: "bar",
        barWidth: "60%",
        data: [0],
        itemStyle: {
          color: props.configuration.unfinishedColor,
        },
      },
    ],
    legend: {
      //配置legend，这里的data，要对应type为‘bar’的series数据项的‘name’名称，作为图例的说明
      data: [props.configuration.data[0].name, props.configuration.data[1].name],
      selectedMode: false, //图例禁止点击
      left: 20,
      top: 80,
      orient: "vertical",
      icon: "circle",
    },
  });
}

watch(props.configuration, () => {
  render();
});
onMounted(() => {
  // 绘制图表
  chart = echarts.init(chartDom.value!);
  render();
  window.onresize = function () {
    chart.resize();
  };
});
</script>

<template>
  <div class="page-container">
    <div ref="chartDom" :style="{ width: '100%', height: '100%', minHeight: '100px' }" />
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

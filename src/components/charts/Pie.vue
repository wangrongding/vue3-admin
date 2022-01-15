<script setup lang="ts">
import { ref, onMounted, watch, reactive } from "vue";
import { cloneDeep } from "lodash";
import * as echarts from "echarts";
const pieDom = ref<HTMLElement>(); //也可以用const pieDom = ref<any>();
// let chart = <any>{};
let chart = {} as any;
//传入的配置
const props = defineProps({
  configuration: {
    type: Object,
    default: {},
    required: true,
  },
});

// //默认配置
// const configuration = ref({
//   title: "", //title
//   data: [{ value: 0, name: "-" }], //最大值为1
//   color: ["#5a91e7", "rgba(0, 224, 180, 1)", "rgba(255, 143, 114, 1)"],
//   icon: "circle",
// });
// watch(props.configuration, () => {
//   let tempData = cloneDeep(props.configuration);
//   //合并默认配置与自定义配置
//   configuration.value = Object.assign(configuration.value, tempData);
//   console.log(configuration.value);
//   console.log(options.series);
//   chart.setOption(options);
// });

watch(props.configuration, () => {
  draw();
});

function draw() {
  //echarts配置
  const options = {
    title: {
      text: props.configuration.title.text,
      show: props.configuration.title.show,
      subtext: "",
      left: "left",
    },
    tooltip: {
      trigger: "item",
      // formatter: "{a}{b}{c}",
    },
    legend: {
      orient: "vertical",
      selectedMode: false,
      left: 20,
      top: 80,
      icon: "circle", // 这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
    },
    color: props.configuration.color,
    series: [
      {
        // top: "51%",
        left: "20%",
        name: props.configuration.title.test,
        type: "pie",
        radius: "70%",
        data: props.configuration.data, //[{ value: 77, name: "example" }]
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        label: {
          // formatter: (item: any) => {
          //   if (item.value > 0) {
          //     console.log(item);
          //     return item.name + "\n\n" + item.percent + "%";
          //   } else {
          //     return "";
          //   }
          // },
          formatter: "{d}%",
          position: "inside",
          fontSize: 24,
          color: "#fff",
        },
      },
    ],
  };

  chart.setOption(options);
}

onMounted(() => {
  // 绘制图表
  chart = echarts.init(pieDom.value!);
  draw();
  setTimeout(() => {
    window.onresize = () => {
      console.log(11);
      chart.resize();
    };
  }, 1000);
});
</script>

<template>
  <div class="page-container">
    <div ref="pieDom" :style="{ width: '100%', height: '100%', minHeight: '100px' }" />
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

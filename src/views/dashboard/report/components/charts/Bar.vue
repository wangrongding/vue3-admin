<!-- 横向柱状图  -->
<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
type EChartsOption = echarts.EChartsOption;
const chartDom = ref<HTMLElement>();
const props = defineProps({
  reportData: {
    type: Object,
    default: () => {
      return {
        /* type: 1,
        content: [
          {
            dimensionTitle: "父亲的教养方式",
            dimensionName: [
              "父亲-严厉型",
              "父亲-宠爱型",
              "父亲-溺爱型",
              "父亲-包容理解型",
              "父亲-否定型",
              "父亲-控制型",
            ],
            dimensionScore: [46, 40, 43, 43, 46, 52],
          },
          {
            dimensionTitle: "母亲的教养方式",
            dimensionName: [
              "父亲-严厉型",
              "父亲-宠爱型",
              "父亲-溺爱型",
              "父亲-包容理解型",
              "父亲-否定型",
              "父亲-控制型",
            ],
            dimensionScore: ["", "", "", "", "", ""],
          },
        ],
        title: "", */
      };
    },
  },
});
var data = props.reportData.content[0].dimensionScore;
const options: EChartsOption = {
  backgroundColor: "",
  color: ["#22b8ed"],
  title: {
    text: props.reportData.content[0].dimensionTitle,
    left: "center",
    textStyle: {
      color: "#333333",
      fontSize: 24,
      lineHeight: 50,
      fontWeight: 500,
      fontFamily: "SourceHanSansCN-Medium, SourceHanSansCN",
    },
  },
  grid: {
    left: "1%",
    right: "8%",
    bottom: "8%",
    backgroundColor: "#333",
    containLabel: true,
  },
  yAxis: [
    {
      name: "",
      type: "category",
      data: props.reportData.content[0].dimensionName,
      triggerEvent: true,
      axisTick: {
        show: false, // 坐标值是否在刻度中间
      },
      axisLabel: {
        fontSize: 18,
        color: "#333",
        margin: 16,
      },
    },
  ],
  xAxis: [
    {
      type: "value",
      triggerEvent: false,
      splitNumber: 1,
      show: true,
      axisLabel: {
        showMinLabel: true,
        showMaxLabel: true,
        fontSize: 18,
        color: "#333",
      },
      splitLine: {
        show: false,
      },
    },
  ],
  series: [
    {
      type: "bar",
      data: data,
      barGap: "5%", // 柱图间距
      barWidth: 40, // 柱图宽度
      itemStyle: {
        borderRadius: [0, 8, 8, 0],
        color: "#00E3B9",
      },
      label: {
        show: true, // 开启显示
        position: "right", // 在上方显示
        color: "#333333",
        fontSize: 22,
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

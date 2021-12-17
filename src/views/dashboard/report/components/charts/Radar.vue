<!-- 雷达图 -->
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
        type: 6,
        content: [
          {
            dimensionTitle: "",
            dimensionName: ["C常规", "E企业", "R实际", "A艺术", "I调研", "S社会"],
            dimensionScore: [10, 30, 50, 60, 10, 50],
          },
        ],
        title: "",
      };
    },
  },
});
var data = props.reportData.content[0].dimensionScore;
var indicatorname = props.reportData.content[0].dimensionName;
var maxdata = [100, 100, 100, 100, 100, 100, 100, 100];

function contains(arrays: any, obj: any) {
  var i = arrays.length;
  while (i--) {
    if (arrays[i] === obj) {
      return i;
    }
  }
  return false;
}

var indicator = [];
for (var i = 0; i < indicatorname.length; i++) {
  indicator.push({
    name: indicatorname[i],
    max: maxdata[i],
  });
}

function innerdata(i: any) {
  var innerdata = [];
  for (let j = 0; j < data.length; j++) {
    innerdata.push(100 - 20 * i);
  }
  return innerdata;
}

var optionData = getData(data);

function getData(data: any) {
  var res = {
    series: [
      {
        type: "radar",
        symbolSize: 20,
        symbol: "circle",
        areaStyle: {
          color: "#00E3B9",
          opacity: 0.3,
        },

        lineStyle: {
          color: "#00E3B9",
          width: 3,
        },
        itemStyle: {
          color: "#fff ",
          borderColor: "#00E3B9",
          borderWidth: 4,
          opacity: 1,
        },
        label: {
          show: true,
          color: "#333",
          fontSize: 22,
        },
        data: [
          {
            value: data,
          },
        ],
        z: 100,
      },
    ],
  };
  for (let i = 0; i < data.length; i++) {
    res.series.push({
      type: "radar",
      data: [
        {
          value: innerdata(i),
        },
      ],
      symbol: "none",
      lineStyle: {
        width: 0,
      },
      itemStyle: {
        color: "#fff",
      },
      areaStyle: {
        color: "#fff",
        shadowColor: "rgba(0,224,180,0.2)",
        shadowBlur: 20,
        shadowOffsetY: 0,
      },
    } as any);
  }
  return res;
}

const options: EChartsOption = {
  backgroundColor: "#fff",
  radar: {
    indicator: indicator,
    splitArea: {
      show: true,
      areaStyle: {
        color: "#fff",
        shadowColor: "rgba(14,122,191,0.19)",
        shadowBlur: 20,
        shadowOffsetY: 0,
      },
    },
    splitLine: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
    axisName: {
      rich: {
        b: {
          fontSize: "18",
          color: "#333",
          align: "left",
        },
      },

      formatter: function (params: any, index: any) {
        var i = contains(indicatorname, params);
        var percent = (data[i] / 100) * 100;
        return "{b|" + params + "}";
      },
    },
  } as any,
  series: optionData.series as any,
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
  width: 100%;
  height: 600px;
}
</style>

<script setup lang="ts">
import { dashboardInfo } from "@/api/dashboard/index.ts";
import { ref, onMounted } from "vue";
import Line from "@/components/charts/Line.vue";
import Pie from "@/components/charts/Pie.vue";
import Battery from "@/components/charts/Battery.vue";
import Progress from "@/components/charts/Progress.vue";
//生成选择年份列表
function newYears() {
  const tempArr: any = [];
  for (let i = new Date().getFullYear(); i > new Date().getFullYear() - 50; i--) {
    tempArr.push({ value: i, label: i });
  }
  return tempArr;
}
const cascaderOptions = ref([
  {
    value: 1,
    label: "高中",
    children: [...newYears()],
  },
  { value: 2, label: "初中", children: [...newYears()] },
]);
const formParams = ref({
  data: { birthday: "" }, // 表单数据对象
  formList: {
    nickName: {
      type: "cascader",
      cascaderOptions,
      placeholder: "请选择年级",
    },
    sex: {
      type: "select",
      label: "",
      placeholder: "请选择班级",
      selectOptions: [
        { label: "男", value: 0 },
        { label: "男", value: 0 },
        { label: "男", value: 0 },
        { label: "男", value: 0 },
        { label: "男", value: 0 },
        { label: "男", value: 0 },
        { label: "男", value: 0 },
        { label: "女", value: 1 },
      ],
    },
    sex2: {
      type: "select",
      label: "",
      placeholder: "请选择班级",
      selectOptions: [
        { label: "男", value: 0 },
        { label: "男", value: 0 },
        { label: "男", value: 0 },
        { label: "男", value: 0 },
        { label: "男", value: 0 },
        { label: "男", value: 0 },
        { label: "男", value: 0 },
        { label: "女", value: 1 },
      ],
    },
  },
  rules: {
    nickName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  },
  // labelWidth: "0px",
  inline: true,
  submit: {
    submitText: "查询",
    submitFunction: () => {},
    reset: true,
  },
});
const panelItemBgList = [
  new URL("../../assets/image/itemBg1.png", import.meta.url).href,
  new URL("../../assets/image/itemBg2.png", import.meta.url).href,
  new URL("../../assets/image/itemBg3.png", import.meta.url).href,
  new URL("../../assets/image/itemBg4.png", import.meta.url).href,
];
const ProgressConfig = ref({
  finishedColor: "#00e0b4",
  data: 77,
});
const pieColor = ["#5a91e7", "rgba(255, 143, 114, 1)", "rgba(0, 224, 180, 1)"];
const PieConfig = ref({
  data: [
    { value: 277, name: "扇形区间名称a", itemStyle: { color: pieColor[0] } },
    { value: 87, name: "扇形区间名称b", itemStyle: { color: pieColor[1] } },
    { value: 55, name: "扇形区间名称cc", itemStyle: { color: pieColor[2] } },
  ],
});
const BatteryConfig = ref([
  {
    data: 0.3,
    labelText: "已转介",
    color: ["#76b7ff", "#0179ff"],
    background: "#ebf5ff",
  },
  {
    data: 0.3,
    color: ["#74edd5", "#00dfb3"],
    background: "rgba(0, 224, 180, 0.08)",
    labelText: "已干预",
  },
  {
    data: 0.3,
    color: ["#ffc894", "#ff9939"],
    background: "rgba(255, 154, 57, 0.08)",
    labelText: "待干预",
  },
  {
    data: 0.3,
    color: ["#c8c8c8", "#999999"],
    background: "rgba(153, 153, 153, 0.08)",
    labelText: "无需干预",
  },
]);
const lineConfig = ref({
  data1: [5, 250, 356, 150, 10, 20],
  data2: [50, 200, 396, 190, 100, 200],
  xAxisData: ["12-3", "12-4", "12-5", "12-6", "12-7", "12-8"],
});
import axios from "axios";
onMounted(() => {
  dashboardInfo();
});
</script>

<template>
  <div class="page-container">
    <DingForm :formParams="formParams" />
    <div class="panel-list">
      <div class="item" v-for="(item, index) in 4" :key="index" :style="`background:url(${panelItemBgList[index]});background-size:cover;`">
        <span>50</span>
        <span>XXXXXXX</span>
      </div>
    </div>
    <div class="chart-box">
      <div class="chart-item">
        <p class="chart-item-title">
          <i class="iconfont icon-ziliao-xuanze"></i>
          <span>xxxxxx</span>
        </p>
        <Progress :configuration="ProgressConfig" />
      </div>
      <div class="chart-item">
        <p class="chart-item-title">
          <i class="iconfont icon-ziliao-xuanze"></i>
          <span>xxxxxx</span>
        </p>
        <Pie :configuration="PieConfig" />
      </div>
      <div class="chart-item Battery">
        <p class="chart-item-title">
          <i class="iconfont icon-ziliao-xuanze"></i>
          <span>xxxxxx</span>
        </p>
        <Battery v-for="item in BatteryConfig" :configuration="item" />
      </div>
    </div>
    <div class="line">
      <p class="chart-item-title">
        <i class="iconfont icon-ziliao-xuanze"></i>
        <span>xxxxxx</span>
      </p>
      <Line />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page-container {
  .panel-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 20px;

    .item {
      height: 150px;
      text-align: center;
      padding-top: 50px;
      background-color: #35495e;
      border-radius: 20px;
      color: white;
      font-size: 20px;
      & > span:first-child {
        display: block;
        font-size: 40px;
        margin-bottom: 20px;
      }
    }
  }
  .chart-box {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 20px;
    margin-top: 20px;
    .chart-item {
      background-color: white;
      border-radius: 10px;
      height: 450px;
      position: relative;
    }
    .Battery {
      padding: 50px;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: 50% 50%;
      grid-template-rows: 50% 50%;
    }
  }
  .chart-item-title {
    position: absolute;
    font-size: 24px;
    height: 24px;
    line-height: 24px;
    top: 20px;
    left: 20px;
    i {
      color: $base-color-default;
      margin-right: 10px;
    }
  }
  .line {
    position: relative;
    height: 500px;
    margin-top: 20px;
    background-color: white;
    border-radius: 10px;
  }
}
</style>

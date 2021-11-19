<script setup lang="ts">
import { ref } from "vue";
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
    value: "1",
    label: "高中",
    children: [...newYears()],
  },
  { value: "2", label: "初中", children: [...newYears()] },
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
  data: 0,
});
console.log(import.meta.url, "================");
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
        <Pie />
      </div>
      <div class="chart-item Battery">
        <p class="chart-item-title">
          <i class="iconfont icon-ziliao-xuanze"></i>
          <span>xxxxxx</span>
        </p>
        <Battery />
        <Battery />
        <Battery />
        <Battery />
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
  height: 100%;
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
      color: $icon-color;
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

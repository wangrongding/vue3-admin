<script setup lang="ts">
import { ref } from "vue";
import Line from "@/components/charts/Line.vue";
import Pie from "@/components/charts/Pie.vue";
import Battery from "@/components/charts/Battery.vue";
import Progress from "@/components/charts/Progress.vue";
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
      cascaderOptions: cascaderOptions,
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
</script>

<template>
  <div class="page-container">
    <DingForm :formParams="formParams" />
    <div class="panel-list">
      <div class="item">
        <span>50</span>
        <span>XXXXXXX</span>
      </div>
      <div class="item">
        <span>50</span>
        <span>XXXXXXX</span>
      </div>
      <div class="item">
        <span>50</span>
        <span>XXXXXXX</span>
      </div>
      <div class="item">
        <span>50</span>
        <span>XXXXXXX</span>
      </div>
    </div>
    <div class="chart-box">
      <div class="chart-item">
        <Progress />
      </div>
      <div class="chart-item">
        <Pie />
      </div>
      <div class="chart-item Battery">
        <Battery />
        <Battery />
        <Battery />
        <Battery />
      </div>
    </div>
    <Line class="line" />
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
      border-radius: 10px;
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
    }
    .Battery {
      display: grid;
      grid-template-columns: 50% 50%;
      grid-template-rows: 50% 50%;
    }
  }
  .line {
    height: 500px;
    margin-top: 20px;
    background-color: white;
    border-radius: 10px;
  }
}
</style>

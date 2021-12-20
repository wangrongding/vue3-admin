<script async setup lang="ts">
import {
  cardDataCount,
  getClassList,
  classIdList,
  courseDataCount,
  ringPieBatteryDataCount,
} from "@/api/dashboard/index.ts";
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import Line from "@/components/charts/Line.vue";
import Pie from "@/components/charts/Pie.vue";
import Battery from "@/components/charts/Battery.vue";
import Progress from "@/components/charts/Progress.vue";
const router = useRouter();

const pieColor = ["#5a91e7", "rgba(255, 143, 114, 1)", "rgba(0, 224, 180, 1)"];
const data = reactive({
  panelItemBgList: [
    new URL("../../assets/image/itemBg1.png", import.meta.url).href,
    new URL("../../assets/image/itemBg2.png", import.meta.url).href,
    new URL("../../assets/image/itemBg3.png", import.meta.url).href,
    new URL("../../assets/image/itemBg4.png", import.meta.url).href,
  ],
  panelItemList: [] as any,
  ProgressConfig: {
    finishedColor: "#00e0b4",
    data: 77,
  },
  PieConfig: {
    data: [
      { value: 277, name: "扇形区间名称a", itemStyle: { color: pieColor[0] } },
      { value: 87, name: "扇形区间名称b", itemStyle: { color: pieColor[1] } },
      { value: 55, name: "扇形区间名称cc", itemStyle: { color: pieColor[2] } },
    ],
  },
  BatteryConfig: [
    {
      data: 0.3,
      color: ["#74edd5", "#00dfb3"],
      background: "rgba(0, 224, 180, 0.08)",
      labelText: "已干预",
    },
    {
      data: 0.3,
      labelText: "已转介",
      color: ["#76b7ff", "#0179ff"],
      background: "#ebf5ff",
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
  ],
  lineConfig: {
    data1: [],
    data2: [],
    xAxisData: [],
  },
});

const formParams = reactive({
  data: { grade: "", classId: "", academicYears: "" }, // 表单数据对象
  formList: {
    grade: {
      type: "cascader",
      cascaderOptions: [],
      placeholder: "请选择年级",
      onChange: getClassIdList,
    },
    classId: {
      type: "select",
      label: "",
      placeholder: "请选择班级",
      selectOptions: [],
    },
    academicYears: {
      type: "select",
      label: "",
      placeholder: "请选择学年",
      selectOptions: newAcademicYears(),
    },
  },
  rules: {},
  inline: true,
  submit: {
    submitText: "查询",
    submitFunction: () => {},
    reset: true,
  },
});
//获取年级信息
formParams.formList.grade.cascaderOptions = await getClassList();
//获取班级列表
async function getClassIdList(yearClass: number[]) {
  formParams.formList.classId.selectOptions = await classIdList({ yearClass: yearClass + "" });
  formParams.formList.classId.selectOptions.forEach((item: any) => {
    item.label = item.className;
    item.value = item.id;
  });
}
//生成选择学年列表
function newAcademicYears() {
  const tempArr = [];
  for (let i = new Date().getFullYear(); i > new Date().getFullYear() - 50; i--) {
    tempArr.push(
      { value: [i + "-01-01 00:00:00", i + "-06-30 59:59:59"], label: i + "上半年" },
      { value: [i + "-07-01 00:00:00", i + "-12-31  59:59:59"], label: i + "下半年" },
    );
  }
  return tempArr;
}
//获取数据面板信息
async function getDashboardInfo() {
  data.panelItemList = await cardDataCount();
  /* data.panelItemList =  */ await courseDataCount();
  const { battery, pie, ring } = await ringPieBatteryDataCount();
  battery.data;
}
getDashboardInfo();

onMounted(async () => {});
function toList() {
  // router.push("/dashboard/index/recordList");
  router.push("/dashboard/recordList");
}
</script>

<template>
  <div class="page-container">
    <DingForm class="ding-form" :form-params="formParams" />
    <div class="panel-list">
      <div
        v-for="(item, index) in data.panelItemList"
        :key="index"
        class="item"
        :style="`background:url(${data.panelItemBgList[index]});background-size:cover;`"
      >
        <span>{{ item.num }}</span>
        <span>{{ item.name || "---" }}</span>
      </div>
    </div>
    <div class="chart-box">
      <div class="chart-item">
        <p class="chart-item-title chart-item-link" @click="toList">
          <i class="iconfont icon-ziliao-xuanze" />
          <span>xxxxxx</span>
          <i class="iconfont icon-gengduo"></i>
        </p>
        <Progress :configuration="data.ProgressConfig" />
      </div>
      <div class="chart-item">
        <p class="chart-item-title chart-item-link" @click="toList">
          <i class="iconfont icon-ziliao-xuanze" />
          <span>xxxxxx</span>
          <i class="iconfont icon-gengduo"></i>
        </p>
        <Pie :configuration="data.PieConfig" />
      </div>
      <div class="chart-item Battery">
        <p class="chart-item-title chart-item-link" @click="toList">
          <i class="iconfont icon-ziliao-xuanze" />
          <span>xxxxxx</span>
          <i class="iconfont icon-gengduo"></i>
        </p>
        <Battery v-for="item in data.BatteryConfig" :configuration="item" />
      </div>
    </div>
    <div class="line">
      <p class="chart-item-title">
        <i class="iconfont icon-ziliao-xuanze" />
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
    height: 40px;
    line-height: 40px;
    top: 10px;
    // left: 20px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    cursor: pointer;
    z-index: 99999;
    & > .iconfont:first-child {
      color: $base-color-default;
      margin-right: 10px;
    }
    .icon-gengduo {
      float: right;
      color: rgba(170, 170, 170, 1);
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

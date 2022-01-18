<script async setup lang="ts">
import {
  cardDataCount,
  getGradeList,
  classIdList,
  courseDataCount,
  ringPieBatteryDataCount,
} from "@/api/dashboard/index.ts";
import { getPdf } from "@/utils/Export2PDF";
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import Line from "@/components/charts/Line.vue";
import Pie from "@/components/charts/Pie.vue";
import Battery from "@/components/charts/Battery.vue";
import Progress from "@/components/charts/Progress.vue";
import { cloneDeep } from "lodash";
const router = useRouter();

const data = reactive({
  panelItemBgList: [
    new URL("../../assets/image/itemBg1.png", import.meta.url).href,
    new URL("../../assets/image/itemBg2.png", import.meta.url).href,
    new URL("../../assets/image/itemBg3.png", import.meta.url).href,
    new URL("../../assets/image/itemBg4.png", import.meta.url).href,
  ],
  panelItemList: [
    { num: 0, name: "-" },
    { num: 0, name: "-" },
    { num: 0, name: "-" },
    { num: 0, name: "-" },
  ] as any,
  ProgressConfig: {
    title: { text: "心理筛查统计", show: false },
    finishedColor: "#00e0b4",
    unfinishedColor: "#eaeaea",
    description: "测试完成率",
    data: [
      { name: "1", value: 0 },
      { name: "2", value: 0 },
    ],
  },
  PieConfig: {
    title: { text: "筛查结果统计", show: false },
    data: [],
    color: ["#5a91e7", "rgba(0, 224, 180, 1)", "rgba(255, 143, 114, 1)"],
  },
  BatteryConfig: [
    {
      data: 0,
      color: ["#74edd5", "#00dfb3"],
      background: "rgba(0, 224, 180, 0.08)",
      labelText: "-",
    },
    {
      data: 0,
      labelText: "-",
      color: ["#76b7ff", "#0179ff"],
      background: "#ebf5ff",
    },
    {
      data: 0,
      color: ["#ffc894", "#ff9939"],
      background: "rgba(255, 154, 57, 0.08)",
      labelText: "-",
    },
    {
      data: 0,
      color: ["#c8c8c8", "#999999"],
      background: "rgba(153, 153, 153, 0.08)",
      labelText: "-",
    },
  ],
  lineConfig: {
    data1: { data: [], name: "情绪调节-抑郁" },
    data2: { data: [], name: "认知训练-注意力" },
    xAxisData: [],
    title: { text: "自主干预统计", show: false },
  },
});

const formParams = reactive({
  data: { grade: "", classId: "", academicYears: "", beginTime: "", endTime: "" }, // 表单数据对象
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
      onChange: splitTime,
    },
  },
  rules: {},
  inline: true,
  submit: {
    submitText: "查询",
    submitFunction: getDashboardInfo,
    // reset: true,
  },
});
//拆分时间
function splitTime() {
  if (formParams.data.academicYears == null) return;
  formParams.data.beginTime = formParams.data.academicYears[0];
  formParams.data.endTime = formParams.data.academicYears[1];
}
//获取年级信息
formParams.formList.grade.cascaderOptions = await getGradeList();
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
      { value: [i + "-01-01 00:00:00", i + "-06-30 23:59:59"], label: i + "上半年" },
      { value: [i + "-07-01 00:00:00", i + "-12-31 23:59:59"], label: i + "下半年" },
    );
  }
  return tempArr;
}
//获取数据面板信息
async function getDashboardInfo() {
  const params = cloneDeep(formParams.data);
  // params.beginTime = params.academicYears[0] + "";
  // params.endTime = params.academicYears[1] + "";
  params.grade = params.grade + "";
  const tempItem = await cardDataCount(params);
  tempItem && (data.panelItemList = tempItem);
  const line = await courseDataCount(params);
  //折线图
  data.lineConfig.data1.data = line.course;
  data.lineConfig.data2.data = line.train;
  data.lineConfig.xAxisData = line.time;
  const { battery, pie, ring } = await ringPieBatteryDataCount(params);
  //环图
  data.ProgressConfig.data = ring.data;
  //饼图
  data.PieConfig.data = pie.data;
  data.PieConfig.title.text = pie.name;
  //电池图
  let num = 0;
  for (let i = 0; i < battery.data.length; i++) {
    num += battery.data[i];
  }
  battery.data.forEach((item: any, index: number) => {
    data.BatteryConfig[index].data = item.data;
    data.BatteryConfig[index].labelText = item.labelText;
  });
}
//跳转
function toList() {
  // router.push("/dashboard/index/recordList");
  router.push("/dashboard/recordList");
}

//下载报告
function downloadReport() {
  getPdf("报告详情", document.getElementById("report") as HTMLElement);
}
getDashboardInfo();
onMounted(async () => {});
</script>

<template>
  <div class="page-container">
    <!-- <Form class="form-panel" :form-params="formParams" /> -->
    <TopPanel :form-params="formParams">
      <el-button type="primary" @click="downloadReport">报告下载</el-button>
    </TopPanel>
    <div id="report"
      ><div class="panel-list">
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
            <span>{{ data.ProgressConfig.title.text }}</span>
            <i class="iconfont icon-gengduo"></i>
          </p>
          <Progress :configuration="data.ProgressConfig" />
        </div>
        <div class="chart-item">
          <p class="chart-item-title chart-item-link" @click="toList">
            <i class="iconfont icon-ziliao-xuanze" />
            <span>{{ data.PieConfig.title.text }}</span>
            <i class="iconfont icon-gengduo"></i>
          </p>
          <Pie :configuration="data.PieConfig" />
        </div>
        <div class="chart-item Battery">
          <p class="chart-item-title chart-item-link" @click="toList">
            <i class="iconfont icon-ziliao-xuanze" />
            <span>危机干预统计</span>
            <i class="iconfont icon-gengduo"></i>
          </p>
          <Battery v-for="item in data.BatteryConfig" :configuration="item" />
        </div>
      </div>
      <div class="line">
        <p class="chart-item-title">
          <i class="iconfont icon-ziliao-xuanze" />
          <span>{{ data.lineConfig.title.text }}</span>
        </p>
        <Line :configuration="data.lineConfig" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page-container {
  .panel-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 20px;
    height: 200px;
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

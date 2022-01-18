<template>
  <div class="report">
    <div class="report_down">
      <el-button type="primary" style="width: 90px" @click="downReport">报告下载</el-button>
    </div>
    <div class="report_inner" v-if="showViews">
      <div id="report_ele">
        <!-- 基本信息 -->
        <div class="headBg"> 多维智能心理测评报告 </div>
        <CustomTabel :columns="columns2" :dataSource="[userInfo]" :options="options" />
        <CustomTabel :columns="columns" :dataSource="tableData" :options="options" />
        <baseInfo :userInfo="userInfo"></baseInfo>
        <!-- 人格风险 -->
        <personality-risk :personRisk="personRisk" :userInfo="userInfo" />
        <!-- 人格类型 -->
        <personality-type :personTypeObj="personTypeObj" :userInfo="userInfo" />
        <!-- 情绪风险 -->
        <emotional-risk :emotionalRiskObj="emotionalRiskObj" :userInfo="userInfo" />
        <!-- 情绪状态 -->
        <emotional-state :entiretyObj="entiretyObj" :userInfo="userInfo" />
        <!-- 心智化水平 -->
        <mentalizing :mentaObj="mentaObj" :userInfo="userInfo"></mentalizing>
        <!-- 价值观念 -->
        <worth :worthList="worthList" :userInfo="userInfo"></worth>
        <!-- 评估意见 -->
        <div class="report_add_suggest" @click="suggestView = true" v-show="!suggestView">
          <span>添加评估者意见</span>
        </div>
        <div class="report_suggest" v-show="suggestView">
          <div class="report_suggest_title">
            <span class="report_suggest_icon"> — </span>
            <span>评估者建议</span>
            <span class="report_suggest_icon"> — </span>
          </div>
          <div v-show="downSatte">
            <el-input
              v-model="suggest"
              class="report_suggest_content"
              type="textarea"
              placeholder="请输入评估者意见"
              maxlength="1000"
              :autosize="{ minRows: 4 }"
              show-word-limit
            ></el-input>
            <div class="report_editor">
              <el-button type="info" @click="cancel">取消修改</el-button>
              <el-button type="primary" @click="submitReport">保存修改</el-button>
            </div>
          </div>
          <div v-if="!downSatte">
            <div class="report_suggest_content" v-html="suggest">
              {{ suggest }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-backtop target=".layout_center_view"></el-backtop>
  </div>
</template>

<script setup lang="ts">
// import {
//   personalityRisk,
//   personalityType,
//   emotionalRisk,
//   emotionalState,
//   baseInfo,
//   worth,
//   mentalizing,
// } from "./components";
import {
  personalityRisk,
  personalityType,
  emotionalRisk,
  emotionalState,
  baseInfo,
  worth,
  mentalizing,
} from "./components";
// pdf下载函数
import { getPdf } from "@/utils/Export2PDF";
// import { getReport, changeReportSuggest, getSimpleReport } from "@/api/module/test";
import { onMounted, reactive } from "vue";
const props = defineProps({
  id: {
    type: String,
    default: "",
  },
});
const state = reactive({
  columns: [
    {
      prop: "name",
      label: "维度名称",
    },
    {
      prop: "score",
      label: "分数",
    },
    {
      prop: "explain",
      label: "解释",
      render: (row, index) => {
        return <span style={this.setColor(row.explain)}>{row.explain}</span>;
      },
    },
  ],
  columns2: [
    {
      prop: "userName",
      label: "编号",
    },
    {
      prop: "sex",
      label: "性别",
      formatter: (a) => {
        console.log(a);
        return a == 0 ? "女" : a == 1 ? "男" : "其他";
      },
    },
    {
      prop: "marriage",
      label: "婚否",
      formatter: (a) => {
        console.log(a);
        return a == 0 ? "未婚" : a == 1 ? "已婚" : "其他";
      },
    },
    {
      prop: "job",
      label: "办公单位",
    },
  ],
  tableData: [], // 分页
  tableData2: [], // 分页
  options: {
    stripe: false, // 显示斑马线
    mutiSelect: false, // 显示多选框
    index: false, // 显示序号， 多选则 mutiSelect
    loading: false, // 表格动画
    initTable: false, // 是否一挂载就加载数据
  },
  selectList: [],
  suggestView: false,
  downSatte: true,
  suggest: "",
  showViews: false,
  userInfo: {},
  personRisk: {},
  emotionalRiskObj: {},
  personTypeObj: {},
  entiretyObj: {
    list: [],
    arr: [],
    data: [],
  },
  mentaObj: {},
  worthList: [],
  setColor(val) {
      let list = new Map([
        [
          "中度",
          {
            color: "#F59A23",
          },
        ],
        [
          "中风险",
          {
            color: "#F59A23",
          },
        ],
        [
          "正常",
          {
            color: "#70B603",
          },
        ],
        [
          "低风险",
          {
            color: "#70B603",
          },
        ],
        [
          "阴性",
          {
            color: "#70B603",
          },
        ],
        [
          "中等水平",
          {
            color: "#70B603",
          },
        ],
        [
          "高度",
          {
            color: "#D80013",
          },
        ],
        [
          "高风险",
          {
            color: "#D80013",
          },
        ],
        [
          "阳性",
          {
            color: "#D80013",
          },
        ],
      ]);
      return list.get(val);
    },
    getTableDate() {
      getSimpleReport({
        id: this.id,
      }).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.list;
          console.log(this.tableData, " this.tableData ");
        }
      });
    },
    async getdata() {
      getReport({
        id: this.id,
      }).then((res) => {
        if (res.data.code === 200) {
          //用户信息
          this.userInfo = JSON.parse(res.data.data.userInfo);
          // this.userInfo.name = "谈话对象";
          // 人格风险 + 情绪风险 psychologicalResultRESQ
          this.personRisk = res.data.data.psychologicalResultRESQ.pdObj;
          this.emotionalRiskObj = res.data.data.psychologicalResultRESQ.qxObj;
          // 人格类型 eachDimensionResultParsingDTO
          this.personTypeObj = res.data.data.eachDimensionResultParsingDTO;
          // 情绪状态
          this.$set(this.entiretyObj, "arr", []);
          this.$set(this.entiretyObj, "data", []);
          // 雷达图部分
          this.entiretyObj = res.data.data.eachDimensionEvaluationRESQ;
          this.entiretyObj.data = this.entiretyObj.list.map(({ value }) => value);

          // 解析+建议部分
          this.entiretyObj.arr = res.data.data.eachDimensionResultParsingRESQ.resultList;

          // 心智化 eachDimensionResultParsingDTO
          this.mentaObj = res.data.data.parsingDTO;
          // 价值观
          this.worthList = res.data.data.valuesList = res.data.data.valuesEvaluationRESQ.valuesList;
          this.suggest = res.data.data.suggest;
          if (this.suggest) this.suggestView = true;
          this.showViews = true;
        } else {
          this.$message({
            message: res.data.msg,
            type: "error",
            duration: 2000,
          });
        }
      });
    },
    async downReport() {
      this.downSatte = false;
      let htmlTitle = "智能心理测评报告";
      await getPdf(htmlTitle, report_ele);
      setTimeout(() => {
        this.downSatte = true;
      }, 1000);
    },
    submitReport() {
      changeReportSuggest({
        id: this.id,
        suggest: this.suggest,
      }).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            message: "评论成功",
            type: "success",
            duration: 2000,
          });
        } else {
          this.$message({
            message: res.data.msg,
            type: "error",
            duration: 2000,
          });
        }
      });
    },
    cancel() {
      this.suggestView = false;
    },
});

onMounted(() => {
  //  this.$nextTick(() => {
  //     this.getdata();
  //     this.getTableDate();
  //   });
}),
</script>

<style scoped lang="scss">
.report {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  color: #333;
  position: relative;
  overflow: hidden;
  .report_inner {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    background-color: #fff;
    overflow: auto;
    .headBg {
      background: url("../../assets/bg1.png");
      height: 200px;
      width: 100%;
      line-height: 200px;
      text-align: center;
      color: white;
      font-size: 40px;
    }
  }

  .report_down {
    text-align: right;
    padding-right: 20px;
    .el-button {
      height: 35px;
      width: 105px;
      font-size: 18px;
    }
  }
}
.report_add_suggest {
  font-size: 16px;
  color: #2462eb;
  text-align: center;
  padding-bottom: 60px;
  cursor: pointer;
  > span {
    border-bottom: 1px solid #2462eb;
  }
}
.report_suggest {
  font-size: 18px;
  padding: 20px;
  .report_suggest_title {
    text-align: center;
    height: 50px;
    line-height: 50px;
    color: #666;
  }
  .report_suggest_icon {
    width: 20px;
    color: #2462eb;
    font-weight: 700;
  }
  .report_suggest_content {
    font-size: 16px;
    color: #999;
    line-height: 1.5;
    box-sizing: border-box;
    padding: 20px;
    background-color: rgba(243, 243, 243, 1);
  }
  .report_editor {
    width: 100%;
    text-align: center;
    padding: 40px 0;
    .el-button {
      height: 44px;
      width: 135px;
      font-size: 18px;
      &:first-child {
        margin-right: 70px;
      }
    }
  }
  /deep/ {
    .el-input__count {
      bottom: 23px;
      right: 37px;
    }
  }
}
</style>

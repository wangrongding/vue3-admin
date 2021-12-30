<script setup lang="ts">
import { shallowRef, reactive, ref, onMounted } from "vue";
import { findByPaperId, getHistoryRecord, updateSuggest } from "@/api/dashboard/index";
import UserInfo from "./components/userInfo.vue";
import TextTemplate from "./components/charts/TextTemplate.vue";
import Score from "./components/score.vue";
import ResultsAnalysis from "./components/ResultsAnalysis.vue";
import advice from "./components/advice.vue";
import { useRoute } from "vue-router";
import { getPdf } from "@/utils/Export2PDF";
const route = useRoute();
const componentList = shallowRef([UserInfo, TextTemplate, Score, ResultsAnalysis, advice]);
const state = reactive({
  id: "",
  userId: "",
  reportItemList: [],
  adviceInfo: {} as any,
  showAdvice: false,
  dialogForm: {
    dialogShow: false,
    title: "历史测试记录",
    destroyOnClose: false,
    center: true,
    width: "900px",
    confirmFunction: () => {},
    closed: () => {},
  },
  //表格参数
  tableParams: {
    data: [],
    loading: false,
    columnProps: [
      { label: "测试时间", prop: "testTime" },
      { label: "测试结果", prop: "testResult" },
      {
        label: "操作",
        prop: "operation",
        slots: {
          default: "operation",
        },
        width: "180px",
      },
    ],
    selectList: [],
  },
});

const adviceData = ref<any>(null);
//获取报告内容
async function fetchReport(paperId: string) {
  const response = (await findByPaperId({ paperId })) as any;
  state.userId = response.userId;
  state.id = response.id;
  state.reportItemList = response.detail.teacher.reportList;
  state.showAdvice = state.reportItemList.some((item: any) => {
    if (item.type == 9 && item.suggest) {
      state.adviceInfo = item;
    }
    return item.type == 9 && item.suggest;
  });
  state.dialogForm.dialogShow = false;
}
//操作建议
function operationText() {
  state.showAdvice = true;
  setTimeout(() => {
    const adviceDom = document.getElementById("adviceDom") as any;
    state.adviceInfo.focus = true;
    console.log(adviceData.value);
    // 跳转到指定位置并且平滑滚动;
    adviceDom.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }, 100);
}
//下载报告
function downloadReport() {
  getPdf("报告详情", document.getElementById("reportDetail") as HTMLElement);
}
//显示历史报告列表
function showHistory(userId: string, questionnaireId: string) {
  state.dialogForm.dialogShow = true;
  state.tableParams.loading = true;
  getHistoryRecord({ userId, questionnaireId }).then((res) => {
    state.tableParams.data = res as any;
    state.tableParams.loading = false;
  });
}
//提交建议
function submit(val: any) {
  updateSuggest({ id: state.id, suggest: val.content });
}
fetchReport(route.query.reportId as any);
onMounted(() => {});
</script>
<template>
  <div class="report">
    <div class="content" id="reportDetail">
      <div class="btn-group">
        <el-button type="primary" size="mini" @click="operationText">添加意见</el-button>
        <el-button type="primary" size="mini" @click="showHistory(/* state.userId */ '587', '22')">
          历史记录
        </el-button>
        <el-button type="primary" size="mini" @click="downloadReport">报告下载</el-button>
      </div>
      <div class="reportMain">
        <component
          :is="componentList[item['type'] - 1]"
          v-for="item in state.reportItemList"
          :reportData="item"
        ></component>
        <component
          v-show="state.showAdvice"
          :is="componentList[4]"
          :reportData="state.adviceInfo"
          @closePanel="state.showAdvice = false"
          @confirmEdit="submit"
          ref="adviceData"
        ></component>
      </div>
    </div>
    <Dialog :dialogForm="state.dialogForm" class="dialog">
      <template #dialogContent>
        <Table :table-params="state.tableParams" style="max-height: 400px; overflow-y: auto">
          <template #operation="{ row }">
            <el-button type="primary" size="mini" plain @click="fetchReport(row.reportId)">
              查看详情
            </el-button>
          </template>
        </Table>
      </template>
    </Dialog>
  </div>
</template>
<style lang="scss" scoped>
.report {
  .content {
    box-sizing: border-box;
    border-radius: 8px;
    margin: 0px auto;
    background: #f4f5fa;
    background-color: #ffffff;
    background-image: url("./components/assets/repoetBack.png");
    background-repeat: no-repeat;
    background-size: 100%;
    padding-top: 400px;
    padding-bottom: 50px;
    position: relative;
    .btn-group {
      z-index: 99999;
      position: fixed;
      top: 60px;
      right: 20px;
    }
  }
  .reportMain {
    margin: 0 auto;
    width: 1200px;
  }
}
</style>

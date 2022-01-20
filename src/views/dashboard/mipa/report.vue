<script setup lang="ts">
import { getPdf } from "@/utils/Export2PDF";
import { getReport } from "@/api/mipa/index";
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import userInfo from "./components/report-user-info.vue";
import entirety from "./components/report-entirety.vue";
import analysis from "./components/report-analysis.vue";
import suggest from "./components/report-suggest.vue";
const route = useRoute();
const state = reactive({
  questionnaireName: "多维智能心理测评报告",
  // questionnaireName: "MIPA-C 青少年心理测评报告",
  reportData: {} as any,
  userInfo: {},
  psychological: {} as any,
  psychologicalLevel: "",
  downState: false,
  loading: true,
  getData() {
    let params = {
      key: "teacher",
      id: route.query.reportId,
    };
    state.loading = true;
    getReport(params).then((res) => {
      state.reportData = res;
      state.userInfo = JSON.parse(state.reportData.userInfo);
      state.psychological = JSON.parse(state.reportData.psychological);

      let num = state.psychological.riskIndex || "0";
      num = String((100 / 5) * num);
      state.psychological.level = num;

      let arr = state.reportData.stateList.map(
        ({ name, riskIndex }: { name: any; riskIndex: any }) => ({
          name,
          riskIndex,
        }),
      );
      state.reportData.scaleData = arr;
      state.loading = false;
    });
  },
});
//下载报告
function downloadReport() {
  getPdf("报告详情", document.getElementById("reportDetail") as HTMLElement);
}

onMounted(() => {
  setTimeout(() => {
    state.getData();
  }, 1000);
});
</script>
<template>
  <div class="report">
    <div class="btn-group">
      <el-button type="primary" size="mini" @click="downloadReport">报告下载</el-button>
    </div>
    <div class="content" id="reportDetail" v-loading="state.loading">
      <p class="title">{{ state.questionnaireName }}</p>
      <div class="reportMain">
        <user-info :info="state.userInfo" class="report_user_info" />
        <entirety
          v-if="state.psychological.level"
          :psychological="state.psychological"
          :type="'teacher'"
        />
        <analysis
          v-if="state.reportData.scaleData"
          :stateList="state.reportData.stateList"
          :scaleData="state.reportData.scaleData"
          :worthList="state.reportData.worthList"
        />
        <suggest v-if="state.reportData.suggest" :reportData="state.reportData" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.report {
  position: relative;
  .btn-group {
    z-index: 299;
    position: fixed;
    top: 60px;
    right: 20px;
  }
  .content {
    box-sizing: border-box;
    border-radius: 8px;
    margin: 0px auto;
    background: #f4f5fa;
    background-color: #ffffff;
    background-image: url("../report/components/assets/repoetBack.png");
    background-repeat: no-repeat;
    background-position: center top;
    // background-size: 100%;
    background-size: 1400px;
    padding-top: 400px;
    padding-bottom: 50px;
    position: relative;
    .title {
      text-align: center;
      position: absolute;
      top: 120px;
      left: 50%;
      font-size: 36px;
      font-weight: bolder;
      transform: translateX(-50%);
    }
  }
  .reportMain {
    margin: 0 auto;
    width: 1200px;
  }
}
</style>

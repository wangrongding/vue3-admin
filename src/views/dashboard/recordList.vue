<script setup lang="ts">
import { recordList, dictionary, questionnaireList, getGradeList } from "@/api/dashboard/index.ts";
import Pagination from "@/components/element/Pagination.vue";
import { reactive, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { export_json_to_excel } from "@/utils/Export2Excel";
const router = useRouter();
const state = reactive({
  //表格参数
  tableParams: {
    data: [],
    loading: false,
    columnProps: [
      { type: "selection" },
      { label: "测试时间", prop: "startTime" },
      { label: "学生姓名", prop: "userName" },
      { label: "学号", prop: "userNo" },
      { label: "问卷名称", prop: "questionnaireName" },
      { label: "风险等级", prop: "riskResult", slots: { default: "riskResult" } },
      { label: "干预状态", prop: "interveneStatusName", slots: { default: "interveneStatusName" } },
      { label: "操作", prop: "operation", slots: { default: "operation" }, width: "220px" },
    ],
    selectList: [],
  },
  //分页参数
  paging: {
    total: 0,
    size: 10,
    current: 1,
  },
  //表单参数
  formParams: {
    data: { key: "" } as any, // 表单数据对象
    formList: {
      questionnaireId: {
        label: "",
        placeholder: "请选择筛查问卷",
        type: "select",
        selectOptions: await questionnaireList(),
        customLabelValue: { label: "name", value: "id" },
      },
      riskLevel: {
        label: "",
        placeholder: "请选择风险等级",
        type: "select",
        selectOptions: await dictionary({ code: "risklevel" }),
        customLabelValue: { label: "dictValue", value: "dictKey" },
      },
      interveneStatus: {
        label: "",
        placeholder: "请选择干预状态",
        type: "select",
        selectOptions: await dictionary({ code: "intervene" }),
        customLabelValue: { label: "dictValue", value: "dictKey" },
      },
      academicYears: {
        type: "select",
        label: "",
        placeholder: "请选择学年",
        selectOptions: newAcademicYears(),
        onChange: splitTime,
      },
      key: {
        type: "text",
        placeholder: "请输入学生姓名或学号",
      },
    },
    rules: {},
    // labelWidth: "0px",
    inline: true,
    submit: {
      submitText: "查询",
      submitFunction: search,
      // reset: true,
    },
  },
});
//拆分时间
function splitTime() {
  if (state.formParams.data.academicYears == null) return;
  state.formParams.data.beginTime = state.formParams.data.academicYears[0];
  state.formParams.data.endTime = state.formParams.data.academicYears[1];
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
//跳转
function jumpTo(row: any, type: string) {
  if (type == "report") {
    let type = row.questionnaireId == 27 ? "mipa" : "";
    if (type) {
      router.push({
        path: "/dashboard/mipaReport",
        query: {
          reportId: row.reportId,
        },
      });
      return;
    }
    router.push({
      path: "/dashboard/report",
      query: {
        reportId: row.reportId,
        type,
      },
    });
  } else {
    router.push({
      path: "/studentManagement/studentDetail",
      query: { id: row.userId },
    });
  }
}
//搜索
function search() {
  state.tableParams.loading = true;
  const searchForm = Object.assign(state.paging, state.formParams.data);
  recordList(searchForm).then((res: any) => {
    state.tableParams.data = res.records;
    state.tableParams.loading = false;
    state.paging.total = res.current;
    state.paging.total = res.total;
  });
}
const tableDom = ref<any>(null);
//导出
function exportExcel() {
  if (state.tableParams.selectList.length <= 0) {
    ElMessage({
      message: "请选择需要导出的内容",
      type: "warning",
      duration: 2000,
    });
    return;
  }
  ElMessageBox.confirm("确定导出吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    let header = <any>[];
    let filterVal = <any>[];
    for (let i = 1; i < state.tableParams.columnProps.length; i++) {
      if (state.tableParams.columnProps[i].prop == "operation") continue;
      header.push(state.tableParams.columnProps[i].label);
      filterVal.push(state.tableParams.columnProps[i].prop);
    }
    export_json_to_excel({
      list: state.tableParams.selectList,
      header: header,
      filterVal: filterVal,
      filename: "心理筛查记录列表",
      autoWidth: true,
      bookType: "xlsx",
    });
    tableDom.value.tableDom.clearSelection();
  });
}
//分页改变回调
function paginationChange(val: any) {
  state.paging.current = val.page;
  state.paging.size = val.pageSize;
  search();
}
//=========================exec执行块
search();
onMounted(() => {});
//=========================exec执行块
</script>
<template>
  <div class="page-container">
    <TopPanel :formParams="state.formParams">
      <el-button type="primary" @click="exportExcel">导出</el-button>
    </TopPanel>
    <div class="table-panel">
      <Table :tableParams.sync="state.tableParams" ref="tableDom">
        <template #riskResult="{ row }">
          <span
            :style="{
              color:
                row.riskLevel == '1'
                  ? '#4293EEFF'
                  : row.riskLevel == '2'
                  ? '#FAAD14FF'
                  : row.riskLevel == '3'
                  ? '#FF5752FF'
                  : '',
            }"
            >{{ row.riskResult }}</span
          >
        </template>
        <template #interveneStatusName="{ row }">
          <span
            :style="{
              color:
                row.interveneStatus == '1'
                  ? ''
                  : row.interveneStatus == '2'
                  ? '#FF5752FF'
                  : row.interveneStatus == '3'
                  ? '#4293EEFF'
                  : row.interveneStatus == '4'
                  ? '#00E3B9FF'
                  : '',
            }"
            >{{ row.interveneStatusName }}</span
          >
        </template>
        <template #operation="{ row }">
          <el-button type="primary" size="mini" plain @click="jumpTo(row, 'report')"
            >报告详情</el-button
          >
          <el-button type="primary" size="mini" plain @click="jumpTo(row, 'student')">
            学生档案
          </el-button>
        </template>
      </Table>
      <Pagination
        :total="state.paging.total"
        :page.sync="state.paging.current"
        :limit.sync="state.paging.size"
        @pagination="paginationChange"
        :execFunction="search"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page-container {
}
</style>

<script setup lang="ts">
import { recordList } from "@/api/dashboard/index.ts";
import Pagination from "@/components/element/Pagination.vue";
import { reactive, onMounted } from "vue";
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
      { label: "风险等级", prop: "riskLevelName" },
      {
        label: "干预状态",
        prop: "interveneStatusName",
        // formatter: (a: any, b: any, c: any) => {
        //   return c == "0" ? "其它" : c == "1" ? "1" : "2";
        // },
      },
      {
        label: "操作",
        prop: "operation",
        slots: {
          default: "operation",
        },
        width: "220px",
      },
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
    data: { birthday: "" }, // 表单数据对象
    formList: {
      nickName: {
        type: "text",
        label: "",
        placeholder: "请输入管理员姓名",
      },
      phone: {
        type: "number",
        maxlength: 11,
        label: "",
        placeholder: "请输入手机号码",
      },
      sex: {
        type: "select",
        label: "",
        placeholder: "请选择性别",
        selectOptions: [
          { label: "男", value: 0 },
          { label: "女", value: 1 },
        ],
      },
      birthday: {
        type: "date-picker",
        label: "",
        placeholder: "请选择出生日期",
        /* disabledDate: (date: any) => {
        return date.getTime() > Date.now()
      }, */
      },
    },
    rules: {},
    // labelWidth: "0px",
    inline: true,
    submit: {
      submitText: "查询",
      submitFunction: search,
      reset: true,
    },
  },
});

//跳转
function jumpTo(row: any) {
  console.log(row);
  router.push({
    path: "/dashboard/report",
    query: {
      reportId: row.reportId,
    },
  });
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
      filename: "管理员信息列表",
      autoWidth: true,
      bookType: "xlsx",
    });
  });
}
//分页改变回调
function paginationChange(val: any) {
  state.paging.current = val.page;
  state.paging.size = val.pageSize;
  search();
}
//=========================exec执行块
// state.formParams.formList.typeId.selectOptions = (await getQuestionTypeList()) as any;
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
      <Table :tableParams.sync="state.tableParams">
        <template #operation="{ row }">
          <el-button type="primary" size="mini" plain @click="jumpTo(row)">报告详情</el-button>
          <el-button type="primary" size="mini" plain @click="jumpTo(row)"> 学生档案 </el-button>
        </template>
      </Table>
      <Pagination
        :total="state.paging.total"
        :page.sync="state.paging.current"
        :limit.sync="state.paging.size"
        :execFunction="search"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page-container {
}
</style>

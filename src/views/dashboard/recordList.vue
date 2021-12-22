<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { recordList } from "@/api/dashboard/index.ts";
import Pagination from "@/components/element/Pagination.vue";
import { export_json_to_excel } from "@/utils/Export2Excel";
import { ElMessage } from "element-plus";
const router = useRouter();
const state = reactive({
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
        formatter: (a: any, b: any, c: any) => {
          return c == "0" ? "其它" : c == "1" ? "1" : "2";
        },
      },
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
  //分页参数
  paging: {
    total: 0,
    size: 10,
    current: 1,
  },
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

function search() {
  state.tableParams.loading = true;
  const searchForm = Object.assign(state.paging, state.formParams.data);
  recordList(searchForm).then((res: any) => {
    console.log("🚀 / file: recordList.vue / line 82 / recordList / res", res);
    state.tableParams.data = res.records;
    state.tableParams.loading = false;
    state.paging.total = res.current;
    state.paging.total = res.total;
  });
}
function exportExcel() {
  if (state.tableParams.selectList.length <= 0) {
    ElMessage({
      message: "请选择需要导出的内容",
      type: "warning",
      duration: 2000,
    });
    return;
  }
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
}
search();
onMounted(() => {});
function jumpTo(row: any) {
  console.log(row);
  router.push("/dashboard/report");
}
</script>
<template>
  <div class="page-container">
    <TopPanel :formParams="state.formParams">
      <el-button type="primary" @click="exportExcel">导出</el-button>
    </TopPanel>
    <div class="table-panel">
      <Table :tableParams.sync="state.tableParams">
        <template #operation="{ row }">
          <el-button type="text" @click="jumpTo(row)">移出班级</el-button>
          <el-button type="text" @click="jumpTo(row)"> 学员详情 </el-button>
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

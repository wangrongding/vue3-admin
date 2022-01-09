<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { export_json_to_excel } from "@/utils/Export2Excel";
import { getQuestionTypeList, getTestRecordList } from "@/api/testing/index.ts";
const route = useRoute();
const router = useRouter();
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
const state = reactive({
  //表格参数
  tableParams: {
    data: [],
    loading: false,
    columnProps: [
      { type: "selection" },
      { label: "问卷类型", prop: "typeName" },
      { label: "问卷名称", prop: "questionnaireName" },
      { label: "适用范围", prop: "scope" },
      { label: "班级总数", prop: "classTotal" },
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
  //表单参数
  formParams: {
    data: {
      questionnaireId: route.query.questionnaireId,
      academicYears: [],
      beginTime: "",
      endTime: "",
    },
    // 表单数据对象
    formList: {
      academicYears: {
        type: "select",
        label: "",
        placeholder: "请选择学年",
        selectOptions: newAcademicYears(),
        onChange: splitTime,
      },
      name: {
        type: "text",
        label: "",
        placeholder: "请输入班级名称、班主任姓名",
      },
    },
    rules: {},
    inline: true,
    submit: {
      submitText: "查询",
      submitFunction: search,
      reset: true,
    },
  },
});
//拆分时间
function splitTime() {
  console.log(123);

  if (state.formParams.data.academicYears == null) return;
  state.formParams.data.beginTime = state.formParams.data.academicYears[0];
  state.formParams.data.endTime = state.formParams.data.academicYears[1];
}

//搜索
function search() {
  state.tableParams.loading = true;
  const searchForm = Object.assign(state.paging, state.formParams.data);
  getTestRecordList(searchForm).then((res: any) => {
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
//跳转
function jumpTo(row: any) {
  router.push("/system/userInfo");
}
//=========================exec执行块
search();
onMounted(() => {});
//=========================exec执行块
</script>
<template>
  <div class="page-container">
    <div class="panel" style="padding-bottom: 20px">
      <p>{{ route.query.questionnaireName }}</p>
      <p>
        <span class="small-text">问卷分类: {{ route.query.typeName }}</span>
        <span class="small-text">适用范围: {{ route.query.scope }}</span>
      </p>
    </div>
    <div class="table-inline-panel">
      <TopPanel :formParams="state.formParams" style="margin-bottom: 0; padding: 0">
        <el-button type="primary" @click="exportExcel">导出</el-button>
      </TopPanel>
      <Table :tableParams.sync="state.tableParams">
        <template #operation="{ row }">
          <el-button type="primary" size="mini" plain @click="jumpTo(row)"> 测试记录 </el-button>
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
  .panel {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    .small-text {
      font-size: 14px;
      color: gray;
      margin-right: 30px;
    }
  }
  .table-inline-panel {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
}
</style>

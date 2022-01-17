<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { export_json_to_excel } from "@/utils/Export2Excel";
import { getQuestionTypeList, getTestManageList } from "@/api/testing/index.ts";
const router = useRouter();
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
    data: { name: "", roleId: "" }, // 表单数据对象
    formList: {
      typeId: {
        type: "select",
        label: "",
        placeholder: "请选择问卷分类",
        selectOptions: [],
        customLabelValue: { label: "typeName", value: "id" },
      },
      name: {
        type: "text",
        label: "",
        placeholder: "请输入问卷名称",
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
//搜索
function search() {
  state.tableParams.loading = true;
  const searchForm = Object.assign(state.paging, state.formParams.data);
  getTestManageList(searchForm).then((res: any) => {
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
      filename: "测试管理列表",
      autoWidth: true,
      bookType: "xlsx",
    });
    tableDom.value.tableDom.clearSelection();
    state.tableParams.selectList = [];
  });
}
//分页改变回调
function paginationChange(val: any) {
  state.paging.current = val.page;
  state.paging.size = val.pageSize;
  search();
}
//=========================exec执行块
state.formParams.formList.typeId.selectOptions = await getQuestionTypeList();
search();
onMounted(() => {});
function jumpTo(row: any) {
  router.push({
    path: "/testManagement/testDetailList",
    query: {
      questionnaireId: row.questionnaireId,
      questionnaireName: row.questionnaireName,
      typeName: row.typeName,
      scope: row.scope,
    },
  });
}
//=========================exec执行块
</script>
<template>
  <div class="page-container">
    <TopPanel :formParams="state.formParams">
      <el-button type="primary" @click="exportExcel">导出</el-button>
    </TopPanel>
    <div class="table-panel">
      <Table :tableParams.sync="state.tableParams" ref="tableDom">
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
}
</style>

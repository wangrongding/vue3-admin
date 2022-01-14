<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { logListPage } from "@/api/system/index.ts";
import Pagination from "@/components/element/Pagination.vue";
import { export_json_to_excel } from "@/utils/Export2Excel";
import { ElMessage, ElMessageBox } from "element-plus";
const router = useRouter();
const state = reactive({
  //表格参数
  tableParams: {
    data: [],
    loading: false,
    columnProps: [
      { type: "selection" },
      { label: "操作时间", prop: "createTime" },
      { label: "操作人姓名", prop: "name" },
      { label: "操作人手机号", prop: "phone" },
      { label: "操作类型", prop: "actionType" },
      { label: "操作IP", prop: "actionIp" },
      { label: "操作内容", prop: "actionDetails" },
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
    data: { time: [] }, // 表单数据对象
    formList: {
      time: {
        type: "date-picker",
        mode: "daterange",
        label: "操作时间",
        placeholder: "请选择操作时间",
        disabledDate: (date: any) => {
          return date.getTime() > Date.now();
        },
      },
      key: {
        type: "text",
        label: "",
        placeholder: "请输入操作人姓名/手机号",
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
  const searchForm = Object.assign(state.paging, state.formParams.data) as any;
  if (searchForm.time) {
    searchForm.startTime = searchForm.time[0];
    searchForm.endTime = searchForm.time[1];
  } else {
    searchForm.startTime = null;
    searchForm.endTime = null;
  }
  logListPage(searchForm).then((res: any) => {
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
search();
onMounted(() => {});
function jumpTo(row: any) {
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

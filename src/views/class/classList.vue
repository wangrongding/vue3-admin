<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getClassList } from "@/api/class/index";
import Pagination from "@/components/element/Pagination.vue";
import { export_json_to_excel } from "@/utils/Export2Excel";
import { ElMessage, ElMessageBox } from "element-plus";
import { getGradeList } from "@/api/dashboard/index.ts";
const router = useRouter();
const state = reactive({
  //表格参数
  tableParams: {
    data: [],
    loading: false,
    columnProps: [
      { type: "selection" },
      { label: "班级名称", prop: "className" },
      { label: "班主任", prop: "userName" },
      { label: "班主任手机号", prop: "phone" },
      { label: "学生人数", prop: "studentNum" },
      { label: "当前状态", prop: "statusName" },
      {
        label: "操作",
        prop: "operation",
        slots: {
          default: "operation",
        },
        width: "200px",
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
    data: { time: [], roleId: "", grade: [], key: "" }, // 表单数据对象
    formList: {
      grade: {
        type: "cascader",
        cascaderOptions: [],
        placeholder: "请选择年级",
      },
      key: {
        type: "text",
        label: "",
        width: "250px",
        placeholder: "请输入班级名称、班主任姓名",
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
  loading: "",
});

//获取年级信息
state.formParams.formList.grade.cascaderOptions = await getGradeList();

//搜索
function search() {
  state.tableParams.loading = true;
  let searchForm = <any>Object.assign(state.paging, state.formParams.data);
  // searchForm.grade = searchForm.grade + "";
  getClassList(searchForm).then((res: any) => {
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
function jumpTo(row: any, type: string) {
  if (type == "edit") {
    router.push({
      path: "/classManagement/operationClass",
      query: {
        id: row.classId,
        type: "edit",
      },
    });
  } else if (type == "add") {
    router.push({
      path: "/classManagement/operationClass",
      query: {
        id: row.classId,
        type: "add",
      },
    });
  } else {
    router.push({
      path: "/classManagement/classDetail",
      query: {
        id: row.classId,
      },
    });
  }
}
</script>
<template>
  <div class="page-container">
    <TopPanel :formParams="state.formParams">
      <el-button type="primary" @click="jumpTo('', 'add')">添加</el-button>
      <el-button type="primary" @click="exportExcel">导出</el-button>
    </TopPanel>
    <div class="table-panel">
      <Table :tableParams.sync="state.tableParams">
        <template #operation="{ row }">
          <el-button type="primary" size="mini" plain @click="jumpTo(row, 'edit')">编辑</el-button>
          <el-button type="primary" size="mini" plain @click="jumpTo(row, 'detail')">
            班级详情
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

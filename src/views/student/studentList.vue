<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { userListPage } from "@/api/student/index.ts";
import { fileDownload, importUser } from "@/api/class/index.ts";
import { export_json_to_excel } from "@/utils/Export2Excel";
import { ElMessage, ElMessageBox } from "element-plus";
import { saveFile } from "@/utils/index";
const router = useRouter();
const state = reactive({
  //表格参数
  tableParams: {
    data: [],
    loading: false,
    columnProps: [
      { type: "selection" },
      { label: "学生姓名", prop: "realName" },
      { label: "学号", prop: "account" },
      { label: "所在班级", prop: "className" },
      { label: "班主任", prop: "teachRealName" },
      { label: "当前状态", prop: "statusName" },
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
    data: { time: [], startTime: "", endTime: "", roleId: "", key: "" }, // 表单数据对象
    formList: {
      key: {
        type: "text",
        label: "",
        placeholder: "请输入姓名或手机号",
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
  dialogForm: {
    dialogShow: false,
    title: "请先下载模板，填写完后，可上传到系统中。",
    destroyOnClose: false,
    center: true,
    hiddenFooter: true,
    width: "900px",
    cancelFunction: () => {
      state.dialogForm.dialogShow = false;
    },
    confirmFunction: () => {},
    closed: () => {
      state.dialogForm.dialogShow = false;
    },
    open: async () => {},
  },
  // 导入学生
  importUser(file: any) {
    let formData = new FormData();
    formData.append("file", file.file);
    importUser(formData).then(() => {
      ElMessage({
        type: "success",
        message: "操作成功!",
      });
      search();
    });
  },
  // 导入学生
  downLoadFile() {
    fileDownload().then((res: string) => {
      saveFile(res, "模板.xlsx");
    });
  },
});
const loading = ref("");
//拆分时间
function splitTime() {
  if (state.formParams.data.time == null) return;
  state.formParams.data.startTime = state.formParams.data.time[0];
  state.formParams.data.endTime = state.formParams.data.time[1];
}
//搜索
function search() {
  state.tableParams.loading = true;
  const searchForm = Object.assign(state.paging, state.formParams.data);
  userListPage(searchForm).then((res: any) => {
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
  if (type == "add" || type == "edit") {
    router.push({
      path: "/studentManagement/operationInfo",
      query: { id: row.id },
    });
  } else {
    router.push({
      path: "/studentManagement/studentDetail",
      query: { id: row.id },
    });
  }
}
</script>
<template>
  <div class="page-container">
    <TopPanel :formParams="state.formParams">
      <el-button type="primary" @click="jumpTo('', 'add')">添加</el-button>
      <el-button type="primary" @click="exportExcel">导入</el-button>
      <el-button type="primary" @click="exportExcel">导出</el-button>
    </TopPanel>
    <div class="table-panel">
      <Table :tableParams.sync="state.tableParams">
        <template #operation="{ row }">
          <el-button type="primary" size="mini" plain @click="jumpTo(row, 'edit')">编辑</el-button>
          <el-button type="primary" size="mini" plain @click="jumpTo(row, 'detail')">
            查看
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
    <Dialog :dialogForm="state.dialogForm" class="dialog">
      <template #dialogContent>
        <div style="text-align: center">
          <el-button type="primary" @click="state.downLoadFile">下载模板</el-button>
          <el-upload
            action="#"
            :limit="1"
            ref="upload"
            style="display: inline-block; margin: 0 20px"
            :auto-upload="true"
            :show-file-list="false"
            accept=".pdf, .doc, .docx, .xls, .xlsx"
            :http-request="state.importUser"
          >
            <el-button :loading="loading == 'upload'" slot="trigger" type="primary">
              上传文件
            </el-button>
          </el-upload>
        </div>
      </template>
    </Dialog>
  </div>
</template>
<style lang="scss" scoped>
.page-container {
}
</style>

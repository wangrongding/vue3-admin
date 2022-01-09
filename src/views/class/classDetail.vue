<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { export_json_to_excel } from "@/utils/Export2Excel";
import { getGradeList, classIdList } from "@/api/dashboard/index.ts";
import {
  findClassById,
  getStudentList,
  deleteStudent,
  rollOutStudentList,
  transferStudent,
  dictionary,
  fileDownload,
  importUser,
} from "@/api/class/index.ts";
import { saveFile } from "@/utils/index";
const route = useRoute();
const router = useRouter();

const state = reactive({
  //表格参数
  tableParams: {
    data: [],
    loading: false,
    columnProps: [
      { type: "selection" },
      { label: "学生姓名", prop: "name" },
      { label: "学号", prop: "account" },
      { label: "风险等级", prop: "riskLevel" },
      { label: "干预状态", prop: "interveneStatus" },
      { label: "已做测试", prop: "testCount" },
      { label: "已完成课时", prop: "courseCount" },
      { label: "金豆数", prop: "goldCount" },
      {
        label: "操作",
        prop: "operation",
        slots: {
          default: "operation",
        },
        width: "250px",
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
      classId: route.query.id,
      academicYears: [],
      beginTime: "",
      endTime: "",
    },
    // 表单数据对象
    formList: {
      riskLevel: {
        type: "select",
        label: "",
        placeholder: "请选择风险等级",
        selectOptions: [],
        customLabelValue: { label: "dictValue", value: "dictKey" },
      },
      interveneStatus: {
        type: "select",
        label: "",
        placeholder: "请选择干预状态",
        selectOptions: [],
        customLabelValue: { label: "dictValue", value: "dictKey" },
      },
      nameOrAccount: {
        type: "text",
        label: "",
        width: "250px",
        placeholder: "请输入学生名称或学号",
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
  removeForm: {
    data: <any>{},
    // 表单数据对象
    formList: {
      grade: {
        type: "cascader",
        cascaderOptions: [],
        label: "adsf",
        placeholder: "请选择年级",
        onChange: getClassIdList,
      },
      classId: {
        type: "select",
        label: "",
        placeholder: "请选择班级",
        selectOptions: [],
      },
    },
    rules: {
      grade: [{ required: true, message: "请选择风险等级", trigger: "blur" }],
      classId: [{ required: true, message: "请选择干预状态", trigger: "blur" }],
    },
    inline: true,
  },
  classInfo: <any>{},
  moveStudentTable: {
    data: [] as any,
    loading: false,
    columnProps: [
      { type: "selection" },
      { label: "姓名", prop: "name" },
      { label: "学号", prop: "studentNum" },
      { label: "性别", prop: "sex" },
    ],
    selectList: [] as any,
  },
  dialogForm: {
    dialogType: "",
    dialogShow: false,
    title: "学生列表",
    destroyOnClose: false,
    center: true,
    hiddenFooter: true,
    width: "900px",
    cancelFunction: () => {
      state.dialogForm.dialogShow = false;
    },
    confirmFunction: () => {
      rollOut();
    },
    closed: () => {
      state.dialogForm.dialogShow = false;
    },
    open: async () => {
      getMoveStudentList();
      //获取年级信息
      state.removeForm.formList.grade.cascaderOptions = await getGradeList();
    },
  },
  moveStudentList: <any>[],
  nameOrCode: "",
  interveneList: <any>[],
  risklevelList: <any>[],
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

//获取班级列表
async function getClassIdList(yearClass: number[]) {
  state.removeForm.formList.classId.selectOptions = await classIdList({
    yearClass: yearClass + "",
  });
  state.removeForm.formList.classId.selectOptions.forEach((item: any) => {
    item.label = item.className;
    item.value = item.id;
  });
}
//获取干预状态下拉
dictionary({ code: "intervene" }).then((res: any) => {
  state.formParams.formList.interveneStatus.selectOptions = res;
});
//获取风险等级下拉
dictionary({ code: "risklevel" }).then((res: any) => {
  state.formParams.formList.riskLevel.selectOptions = res;
});

//获取移出学生列表
async function getMoveStudentList() {
  state.moveStudentTable.data = await rollOutStudentList({
    nameOrCode: state.nameOrCode,
    classId: route.query.id,
  });
}
// 获取班级信息
state.classInfo = (await findClassById({ classId: route.query.id })) as any;

//搜索
function search() {
  state.tableParams.loading = true;
  const searchForm = Object.assign(state.paging, state.formParams.data);
  getStudentList(searchForm).then((res: any) => {
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
//移出学生
function removeSdudent(item: any) {
  deleteStudent({ classId: route.query.id, userId: item.userId }).then(() => {
    ElMessage({
      type: "success",
      message: "操作成功！",
    });
  });
  getMoveStudentList();
  search();
}
// 批量转出学生
function rollOut() {
  if (!state.moveStudentTable.selectList.length || !state.removeForm.data.classId) {
    ElMessage({
      type: "warning",
      message: "请选择学员与转出的目标班级！",
    });
    return;
  }
  let userList = state.moveStudentTable.selectList.map((item: any) => {
    return item.userId;
  });
  transferStudent({ userId: userList, classId: state.removeForm.data.classId }).then(() => {
    ElMessage({
      type: "success",
      message: "操作成功！",
    });
    getMoveStudentList();
    search();
  });
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
      <div>
        <div class="class-name">
          <span
            :style="{
              fontWeight: 'bold',
              marginRight: '20px',
            }"
          >
            {{ state.classInfo.className || "暂无班级名称" }}
          </span>
          <span
            :style="{
              background: state.classInfo.classStatus == 0 ? '#00e0b4' : '#999',
              width: '60px',
              textAlign: 'center',
              lineHeight: '30px',
              display: 'inline-block',
              borderRadius: '5px',
              color: 'white',
            }"
          >
            {{ state.classInfo.classStatus == 0 ? "已开班" : "已结班" }}</span
          >
        </div>
        <component :is="'Edit'" class="icon-btn" @click="jumpTo"></component>
      </div>

      <p class="desc">
        <span class="small-text">班主任: {{ state.classInfo.teacherName }}</span>
        <span class="small-text">班主任手机号: {{ state.classInfo.teacherPhono }}</span>
        <span class="small-text">学生人数: {{ state.classInfo.studentCount }}</span>
        <span class="small-text">开班时间: {{ state.classInfo.beginTime }}</span>
        <span class="small-text">结班时间: {{ state.classInfo.endTime }}</span>
      </p>
    </div>
    <div class="table-inline-panel">
      <TopPanel :formParams="state.formParams" style="margin-bottom: 0; padding: 0">
        <el-button
          type="primary"
          @click="
            (state.dialogForm.dialogShow = true),
              (state.dialogForm.dialogType = 'rollOut'),
              (state.dialogForm.hiddenFooter = false),
              (state.dialogForm.title = '学生列表')
          "
          >转出</el-button
        >

        <el-button
          type="primary"
          @click="
            (state.dialogForm.dialogShow = true),
              (state.dialogForm.dialogType = 'import'),
              (state.dialogForm.hiddenFooter = true),
              (state.dialogForm.title = '请先下载模板，填写完后，可上传到系统中。')
          "
        >
          导入
        </el-button>
        <el-button type="primary" @click="exportExcel">导出</el-button>
      </TopPanel>
      <Table :tableParams.sync="state.tableParams">
        <template #operation="{ row }">
          <el-button type="primary" size="mini" plain @click="removeSdudent(row)">
            移出班级
          </el-button>
          <el-button type="primary" size="mini" plain @click="jumpTo(row)"> 学生档案 </el-button>
        </template>
      </Table>
      <Pagination
        :total="state.paging.total"
        :page.sync="state.paging.current"
        :limit.sync="state.paging.size"
        @pagination="paginationChange"
        :execFunction="search"
      />
      <Dialog :dialogForm="state.dialogForm" class="dialog">
        <template #dialogContent v-if="state.dialogForm.dialogType == 'import'">
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
        <template #dialogContent v-if="state.dialogForm.dialogType == 'rollOut'">
          <div style="position: relative">
            <el-input
              placeholder="请输入内容"
              v-model="state.nameOrCode"
              clearable
              style="width: 300px; margin-bottom: 20px"
              class="input-with-select"
            >
              <template #append>
                <el-button slot="append" type="primary" size="mini" @click="getMoveStudentList">
                  搜索
                </el-button>
              </template>
            </el-input>
            <Form
              :formParams="state.removeForm"
              style="position: absolute; right: 0; top: 0"
            ></Form>
          </div>
          <Table
            :table-params="state.moveStudentTable"
            ref="tableDom"
            style="max-height: 400px; overflow-y: auto"
          ></Table>
        </template>
      </Dialog>
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
    position: relative;
    .class-name {
    }
    .icon-btn {
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
      width: 34px;
      height: 34px;
      padding: 10px;
      color: #00e3b9;
      &:hover {
        color: #000;
      }
    }
    .desc {
      margin-top: 10px;
      width: 800px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      .small-text {
        display: inline-block;
        width: 250px;
        font-size: 14px;
        color: gray;
        margin-right: 30px;
        line-height: 24px;
      }
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

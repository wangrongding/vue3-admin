<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { fileDownload, importUser } from "@/api/class/index.ts";
import { userArchiveInfo, userTestRecord, archiveList, deleteById } from "@/api/student/index.ts";
import { saveFile } from "@/utils/index";
import { getPdf } from "@/utils/Export2PDF";
const route = useRoute();
const router = useRouter();

const state = reactive({
  userStatus: {
    intervene: 0,
    interveneStatusName: "",
    risklevel: 0,
    risklevelStatusName: "",
  },
  //表格参数
  tableParams: {
    data: [],
    loading: false,
    columnProps: [
      { label: "问卷分类", prop: "questionnaireTypeName" },
      { label: "问卷名称", prop: "questionnaireName" },
      { label: "测试结果", prop: "testResult" },
      { label: "测试时间", prop: "testTime" },
      {
        label: "操作",
        prop: "operation",
        slots: {
          default: "operation",
        },
        width: "150px",
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
      id: route.query.id,
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
    },
    rules: {},
    inline: true,
    submit: {
      submitText: "查询",
      submitFunction: search,
      // reset: true,
    },
  },

  studentInfo: <any>{},
  archivesTable: {
    data: [] as any,
    loading: false,
    columnProps: [
      { label: "文档名称", prop: "archiveName" },
      { label: "学生姓名", prop: "realName" },
      { label: "上传人", prop: "uploadUserName" },
      { label: "文档大小", prop: "fileSize" },
      {
        label: "操作",
        prop: "operation",
        slots: {
          default: "operation",
        },
        width: "200px",
      },
    ],
    selectList: [] as any,
  },
  dialogForm: {
    dialogType: "",
    dialogShow: false,
    title: "",
    destroyOnClose: false,
    center: true,
    hiddenFooter: true,
    width: "900px",
    confirmText: "上传文件",
    confirmFunction: () => {},
    closed: () => {
      state.dialogForm.dialogShow = false;
    },
    open: async () => {
      getArchiveList();
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
  //下载报告
  downloadReport() {
    getPdf("报告详情", document.getElementById("reportDetail") as HTMLElement);
  },
});
const loading = ref("");

function getBackground(type: string, item: any) {
  const itemList = {
    intervene: {
      1: "#BCBCBCFF",
      2: "#FF5752FF",
      3: "#027AFFFF",
      4: "#00E3B9FF",
    },
    risklevel: {
      1: "#BCBCBCFF",
      2: "#FAAD14FF",
      3: "#FF5752FF",
    },
  } as any;
  return itemList[type][item];
}

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

//获取移出学生列表
async function getArchiveList() {
  state.archivesTable.data = await archiveList({
    userId: route.query.id,
  });
}
// 获取班级信息
state.studentInfo = (await userArchiveInfo({ id: route.query.id })) as any;

//搜索
function search() {
  state.tableParams.loading = true;
  const searchForm = Object.assign(state.paging, state.formParams.data);
  userTestRecord(searchForm).then((res: any) => {
    state.userStatus.intervene = res.intervene;
    state.userStatus.risklevel = res.risklevel;
    state.userStatus.interveneStatusName = res.interveneStatusName;
    state.userStatus.risklevelStatusName = res.risklevelStatusName;
    state.tableParams.loading = false;
    state.tableParams.data = res.list;
    state.paging.total = res.current;
    state.paging.total = res.total;
  });
}

//分页改变回调
function paginationChange(val: any) {
  state.paging.current = val.page;
  state.paging.size = val.pageSize;
  search();
}
//下载档案
function downloadFile(row: any) {
  saveFile(row.fileUrl, row.realName + "-" + row.archiveName + ".xlsx");
}
//删除档案
function deleteUserFile(row: any) {
  deleteById({ id: row.id }).then(() => {
    ElMessage({
      type: "success",
      message: "操作成功！",
    });
    getArchiveList();
  });
}

//跳转
function jumpTo(row: any) {
  router.push(`/studentManagement/operationInfo?id=${state.studentInfo.id}&type=edit`);
}
//=========================exec执行块
search();
onMounted(() => {});
//=========================exec执行块
</script>
<template>
  <div class="page-container">
    <div id="reportDetail">
      <TopPanel
        :formParams="state.formParams"
        style="margin-bottom: 0; padding: 0; background-color: transparent"
      >
        <el-button
          type="primary"
          @click="
            (state.dialogForm.dialogShow = true),
              (state.dialogForm.hiddenFooter = false),
              (state.dialogForm.title = '学生文档')
          "
        >
          学生文档
        </el-button>
        <el-button type="primary" @click="state.downloadReport"> 下载档案 </el-button>
      </TopPanel>
      <div class="panel" style="padding-bottom: 20px">
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 0 20px;
          "
        >
          <img :src="state.studentInfo.headUrl" alt="" />
          <span
            :style="{
              fontWeight: 'bold',
            }"
            >{{ state.studentInfo.realName }}</span
          >
        </div>
        <div>
          <div>
            <div class="class-name">
              <span
                :style="{
                  background: state.studentInfo.status == 0 ? '#F5F7FAFF' : '#999',
                  width: '60px',
                  textAlign: 'center',
                  lineHeight: '30px',
                  display: 'inline-block',
                  borderRadius: '5px',
                  color: '#999999FF',
                  fontSize: '14px',
                }"
              >
                {{ state.studentInfo.status == 0 ? "已启用" : "未启用" }}</span
              >
            </div>
            <component :is="'Edit'" class="icon-btn" @click="jumpTo"></component>
          </div>

          <p class="desc">
            <span class="small-text">昵称：{{ state.studentInfo.name || "-" }}</span>
            <span class="small-text">性别：{{ state.studentInfo.sex == 1 ? "女" : "男" }}</span>
            <span class="small-text">所在班级：{{ state.studentInfo.className || "-" }}</span>
            <span class="small-text"
              >紧急联系人手机号：{{ state.studentInfo.contactPersonPhone || "-" }}</span
            >
            <span class="small-text">学号：{{ state.studentInfo.account || "-" }}</span>
            <span class="small-text">出生日期：{{ state.studentInfo.birthdayDays || "-" }}</span>
            <span class="small-text">班主任：{{ state.studentInfo.teacherName || "-" }}</span>
            <span class="small-text">紧急联系人：{{ state.studentInfo.contactPerson || "-" }}</span>
            <span class="small-text">手机号：{{ state.studentInfo.phone || "-" }}</span>
            <span class="small-text">已学课时：{{ state.studentInfo.courseCount || "-" }}</span>
            <span class="small-text"
              >班主任手机号：{{ state.studentInfo.teacherPhone || "-" }}</span
            >
            <span class="small-text">金豆数：{{ state.studentInfo.goldenCount || "-" }}</span>
          </p>
        </div>
      </div>

      <div class="table-inline-panel">
        <div class="table-desc">
          <span class="sign"></span>
          <span class="table-title">测试记录</span>
          <span
            class="status-item"
            v-if="state.userStatus.intervene != -1"
            :style="{ background: getBackground('intervene', state.userStatus.intervene) }"
            >{{ state.userStatus.interveneStatusName || "-" }}</span
          >
          <span
            class="status-item"
            v-if="state.userStatus.risklevel != -1"
            :style="{ background: getBackground('risklevel', state.userStatus.risklevel) }"
            >{{ state.userStatus.risklevelStatusName || "-" }}</span
          >
        </div>
        <Table :tableParams.sync="state.tableParams">
          <template #operation="{ row }">
            <el-button type="primary" size="mini" plain @click="jumpTo(row)"> 查看详情 </el-button>
          </template>
        </Table>
        <!-- <Pagination
        :total="state.paging.total"
        :page.sync="state.paging.current"
        :limit.sync="state.paging.size"
        @pagination="paginationChange"
        :execFunction="search"
      /> -->
        <Dialog :dialogForm="state.dialogForm" class="dialog">
          <template #dialogContent>
            <Table
              :table-params="state.archivesTable"
              ref="tableDom"
              style="max-height: 400px; overflow-y: auto"
            >
              <template #operation="{ row }">
                <el-button type="primary" size="mini" plain @click="downloadFile(row)">
                  下载
                </el-button>
                <el-button type="danger" size="mini" plain @click="deleteUserFile(row)">
                  删除
                </el-button>
              </template>
            </Table>
          </template>
        </Dialog>
      </div>
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
    display: flex;
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
      width: 1000px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
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
  .table-desc {
    line-height: 20px;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .sign {
      display: inline-block;
      width: 5px;
      height: 20px;
      background-color: #00e3b9;
      margin-right: 10px;
    }
    .table-title {
      font-weight: bolder;
      font-size: 16px;
    }
    .status-item {
      background-color: #00e3b9;
      color: white;
      font-weight: bold;
      border-radius: 5px;
      padding: 0 10px;
      margin: 0 5px;
      line-height: 30px;
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

<script setup lang="ts">
import { ref, reactive } from "vue";
import {
  findClassById,
  getTeacherList,
  update,
  fileDownload,
  importUser,
  add,
} from "@/api/class/index";
import { getGradeList } from "@/api/dashboard/index.ts";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { saveFile } from "@/utils/index.ts";
const route = useRoute();
const props = defineProps({
  userInfo: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const state = reactive({
  // 表单数据对象
  formParams: {
    data: {} as any,
    formList: {
      grade: {
        type: "cascader",
        cascaderOptions: [],
        placeholder: "请选择年级",
        label: "所在年级",
        width: "100%",
      },
      className: {
        type: "text",
        label: "班级名称",
        placeholder: "请输入班级名称",
      },
      beginTime: {
        type: "date-picker",
        label: "开班时间",
        placeholder: "请选择开班时间",
        // disabledDate: (date: any) => {
        //   return date.getTime() > Date.now();
        // },
      },
      endTime: {
        type: "date-picker",
        label: "结班时间",
        placeholder: "请选择结班时间",
      },
      userId: {
        type: "customItem",
        label: "班主任",
      },
    },
    rules: {
      grade: [{ required: true, message: "请选择年级", trigger: "blur" }],
      className: [{ required: true, message: "请输入班级名称", trigger: "blur" }],
      beginTime: [{ required: true, message: "请选择开班时间", trigger: "blur" }],
      endTime: [{ required: true, message: "请选择结班时间", trigger: "blur" }],
      userId: [{ required: true, message: "请选择班主任", trigger: "blur" }],
    },
    labelWidth: "200px",
    submit: {
      submitText: "确定",
      submitFunction: submit,
      // reset: false,
    },
  },
  teacherTable: {
    data: [] as any,
    loading: false,
    columnProps: [
      { type: "selection" },
      { label: "姓名", prop: "realName" },
      { label: "手机号", prop: "phone" },
      {
        label: "性别",
        prop: "sex",
        formatter: ({ sex }: any, b) => {
          // console.log(b);
          sex == 1 ? "女" : sex == 0 ? "男" : "未知";
        },
      },
      {
        label: "角色",
        prop: "roleName",
      },
    ],
    selectList: [] as any,
  },
  dialogForm: {
    dialogShow: false,
    title: "添加班主任",
    destroyOnClose: false,
    center: true,
    width: "900px",
    cancelFunction: () => {
      state.dialogForm.dialogShow = false;
    },
    confirmFunction: () => {
      if (state.teacherTable.selectList.length == 1) {
        state.formParams.data.teacherName = state.teacherTable.selectList[0]["realName"];
        state.formParams.data.userId = state.teacherTable.selectList[0]["id"];
        state.dialogForm.dialogShow = false;
      } else {
        ElMessage({
          type: "warning",
          message: "只能选择一位班主任！",
        });
      }
    },
    closed: () => {
      state.dialogForm.dialogShow = false;
    },
    opened: () => {
      console.log("🚀🚀🚀🚀", state.teacherTable.selectList);
      //选中后端返回的老师
      state.selectItem && tableDom.value.tableDom.toggleRowSelection(state.selectItem, true);
    },
  },
  imageList: [] as any,
  tempUrl: "",
  nameOrPhone: "",
  selectItem: "",
});
const loading = ref("");
const tableDom = ref<any>(null);

// 获取班主任列表
async function TeacherList() {
  await getTeacherList({
    nameOrPhone: state.nameOrPhone,
    userId: state.formParams.data.userId,
  }).then((res) => {
    state.teacherTable.data = res as any;
    //找到已经选中的项目
    state.selectItem = state.teacherTable.data.find((item: any) => {
      return item.id == state.formParams.data.userId;
    });
    state.teacherTable.selectList = state.selectItem ? [state.selectItem] : [];
  });
}

function removeTeacher(index: number, item: any) {
  console.log(index, item);
}
// 下载模板
function templateDownload() {
  fileDownload().then((res) => {
    saveFile(res);
  });
}
// 上传模板
function uploadStudentList(file: any) {
  let tempFile = new FormData();
  tempFile.append("file", file.file);
  importUser(tempFile).then((res) => {
    if (!res) return;
    ElMessage({
      type: "success",
      message: "操作成功!",
    });
  });
}
// 提交
async function submit() {
  if (route.query.type == "add") {
    add(state.formParams.data).then((res) => {
      console.log(res, "👩👩👩");

      ElMessage({
        type: "success",
        message: "操作成功!",
      });
    });
    state.formParams.data = {};
  } else {
    update(state.formParams.data).then(() => {
      ElMessage({
        type: "success",
        message: "操作成功!",
      });
    });
  }
}
if (route.query.type != "add") {
  // 获取班级信息
  state.formParams.data = (await findClassById({ classId: route.query.id })) as any;
}
// 获取年级信息
state.formParams.formList.grade.cascaderOptions = await getGradeList();
TeacherList();
</script>
<template>
  <div class="page-container">
    <Form :form-params="state.formParams" style="width: 800px; margin: 0 auto">
      <template #customItem="{}">
        <el-button type="primary" plain icon="Plus" @click="state.dialogForm.dialogShow = true">
          {{ state.teacherTable.selectList.length == 0 ? "添加班主任" : "修改班主任" }}
        </el-button>

        <!--  @close="removeTeacher(index, item)"
          closable -->
        <!-- {{ item["realName"] }} -->
        <el-tag style="margin-left: 10px; padding: 0 20px" v-if="state.teacherTable.selectList[0]">
          {{ state.teacherTable.selectList[0].realName }}
        </el-tag>
        <Dialog :dialogForm="state.dialogForm" class="dialog">
          <template #dialogContent>
            <el-input
              placeholder="请输入班主任名称"
              v-model="state.nameOrPhone"
              clearable
              style="width: 300px"
              class="input-with-select"
            >
              <template #append>
                <el-button slot="append" type="primary" size="mini" @click="TeacherList">
                  搜索
                </el-button>
              </template>
            </el-input>
            <div style="float: right; margin-bottom: 20px">
              <el-button slot="append" type="primary" plain @click="templateDownload">
                下载模板
              </el-button>
              <el-upload
                action="#"
                :limit="1"
                ref="upload"
                style="display: inline-block; margin-left: 20px"
                :auto-upload="true"
                :show-file-list="false"
                accept=".pdf, .doc, .docx, .xls, .xlsx"
                :http-request="uploadStudentList"
              >
                <el-button :loading="loading == 'upload'" slot="trigger" type="primary">
                  批量上传
                </el-button>
              </el-upload>
            </div>
            <Table :table-params="state.teacherTable" ref="tableDom"></Table>
          </template>
        </Dialog>
      </template>
    </Form>
  </div>
</template>
<style lang="scss" scoped>
.page-container {
  background-color: white;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 100px;
}
</style>

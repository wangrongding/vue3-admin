<script setup lang="ts">
import { ref, reactive } from "vue";
import { getImgUrl } from "@/api/user/index";
import { addUser, updateUserInfo, userDetail } from "@/api/student/index";
import { dictionary } from "@/api/class/index";
import { getGradeList, classIdList } from "@/api/dashboard/index.ts";
import Dialog from "@/components/element/Dialog.vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
const route = useRoute();
const router = useRouter();

const state = reactive({
  formParams: {
    data: {
      birthday: "",
      headUrl: "http://mipac.file.mentpeak.com/headImage/4d8ff260-ea7f-4db8-bb36-a674a4af51ad.png",
      realName: "",
      account: "",
      password: "",
      grade: "",
      sex: "",
      birthdayDays: "",
      classId: "",
    } as any, // 表单数据对象
    formList: {
      headUrl: {
        type: "customItem",
        name: "avatar",
        label: "",
        style: "width:100%;text-align:center;",
      },
      realName: {
        type: "text",
        label: "姓名",
        placeholder: "请输入姓名",
        style: "width:45%",
      },
      account: {
        type: "text",
        label: "学号",
        placeholder: "请输入学号",
        style: "width:45%",
      },
      password: {
        type: "text",
        mode: "password",
        label: "密码",
        placeholder: "请输入密码",
        style: "width:45%",
      },
      sex: {
        type: "select",
        label: "性别",
        placeholder: "请选择性别",
        selectOptions: [
          { label: "男", value: 0 },
          { label: "女", value: 1 },
          { label: "未知", value: -1 },
        ],
        style: "width:45%",
      },
      birthdayDays: {
        type: "date-picker",
        label: "出生日期",
        placeholder: "请选择出生日期",
        style: "width:45%",
        disabledDate: (date: any) => {
          return date.getTime() > Date.now();
        },
      },

      grade: {
        type: "cascader",
        label: "年级",
        cascaderOptions: await getGradeList(),
        placeholder: "请选择年级",
        onChange: (yearClass: any) => {
          state.formParams.data.classId = null;
          getClassIdList(yearClass);
        },
        style: "width:45%",
        width: "100%",
      },
      classId: {
        type: "select",
        label: "班级",
        placeholder: "请选择年级后再选择班级",
        selectOptions: [],
        style: "width:45%",
      },
      contactPerson: {
        type: "text",
        label: "紧急联系人姓名",
        placeholder: "请输入紧急联系人姓名",
        style: "width:45%",
      },
      contactPersonPhone: {
        type: "text",
        label: "紧急联系人手机号",
        placeholder: "请输入紧急联系人手机号",
        style: "width:45%",
      },
      phone: {
        type: "text",
        label: "手机号",
        placeholder: "请输入手机号",
        style: "width:45%",
      },
      name: {
        type: "text",
        label: "昵称",
        placeholder: "请输入昵称",
        style: "width:45%",
      },
      interveneStatus: {
        type: "select",
        label: "干预状态",
        placeholder: "请选择干预状态",
        selectOptions: [],
        style: "width:45%",
        customLabelValue: { label: "dictValue", value: "dictKey" },
      },
      status: {
        type: "select",
        label: "当前状态",
        placeholder: "请选择当前状态",
        selectOptions: [
          { label: "启用", value: 0 },
          { label: "禁用", value: 1 },
        ],
        style: "width:45%",
      },
      remark: {
        type: "textarea",
        mode: "textarea",
        label: "备注",
        placeholder: "请输入备注",
        // style: "width:91%",
        style: "width:45%",
        width: "100%",
        rows: 2,
      },
      // classId: {
      //   type: "customItem",
      //   name: "classId",
      //   label: "班级",
      //   style: "width:45%;text-align: justify;",
      // },
    },
    rules: {
      realName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
      account: [{ required: true, message: "请输入学号", trigger: "blur" }],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
      birthdayDays: [{ required: true, message: "请选择出生日期", trigger: "blur" }],
      grade: [{ required: true, message: "请选择年级", trigger: "blur" }],
      classId: [{ required: true, message: "请选择班级", trigger: "blur" }],
      contactPerson: [{ required: true, message: "请输入紧急联系人姓名", trigger: "blur" }],
      contactPersonPhone: [{ required: true, message: "请输入紧急联系人手机号", trigger: "blur" }],
    },
    inline: true,
    align: "center",
    labelWidth: "200px",
    submit: {
      submitText: "确定",
      cancelFunction: () => {
        router.go(-1);
      },
      cancel: "确定",
      submitFunction: submit,
      // reset: true,
    },
  },
  dialogForm: {
    dialogShow: false,
    title: "修改头像",
    destroyOnClose: false,
    center: true,
    width: "900px",
    cancelFunction: () => {
      state.dialogForm.dialogShow = false;
    },
    confirmFunction: async () => {
      state.formParams.data.headUrl = state.tempUrl;
      state.dialogForm.dialogShow = false;
    },
    closed: () => {
      state.dialogForm.dialogShow = false;
    },
  },
  imageList: [] as any,
  tempUrl: "",
});
const loading = ref("");

//获取干预状态下拉
dictionary({ code: "intervene" }).then((res: any) => {
  state.formParams.formList.interveneStatus.selectOptions = res;
});

//获取班级列表
async function getClassIdList(yearClass: number[]) {
  state.formParams.formList.classId.selectOptions = await classIdList({
    yearClass: yearClass + "",
  });
  state.formParams.formList.classId.selectOptions.forEach((item: any) => {
    item.label = item.className;
    item.value = item.id;
  });
}

// 获取头像列表
state.imageList = (await getImgUrl()) as any;
if (route.query.id) {
  state.formParams.data = (await userDetail({ id: route.query.id })) as any;
  // state.classForm.data.grade = state.formParams.data.grade;
  getClassIdList(state.formParams.data.grade);
  // state.classForm.data.classId = state.formParams.data.classId;
  if (state.formParams.data.classId == -1) {
    state.formParams.data.classId = "";
  }
  if (state.formParams.data.interveneStatus == -1) {
    state.formParams.data.interveneStatus = "";
  }
}
async function submit() {
  if (route.query.id) {
    await updateUserInfo(state.formParams.data);
  } else {
    await addUser(state.formParams.data);
  }
  ElMessage({
    type: "success",
    message: "操作成功！",
  });
}
</script>
<template>
  <div class="page-container">
    <Form :form-params="state.formParams" style="width: 1300px; margin: 0 auto">
      <template #avatar>
        <div>
          <img :src="state.formParams.data.headUrl" style="width: 100px; height: 100px" alt="" />
          <el-button
            slot="trigger"
            style="display: block; margin: 0 auto"
            size="small"
            type="text"
            :loading="loading == 'upload'"
            @click="state.dialogForm.dialogShow = true"
          >
            修改头像
          </el-button>
        </div>
      </template>
      <!-- <template #classId>
        <Form :form-params="state.classForm" />
      </template> -->
    </Form>
    <Dialog :dialogForm="state.dialogForm" class="dialog">
      <template #dialogContent>
        <div class="avatar-list">
          <img
            v-for="item in state.imageList"
            :src="item.headUrl"
            @click="state.tempUrl = item.headUrl"
            :style="{
              cursor: 'pointer',
              boxSizing: 'border-box',
              border: state.tempUrl == item.headUrl ? '2px solid #00e0b4' : '',
            }"
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>
<style lang="scss" scoped>
.page-container {
  background-color: white;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 0 50px;
  display: flex;
  align-items: center;

  .avatar-list {
    width: 500px;
    margin: 0 auto;
    height: 320px;
    display: grid;
    justify-items: center;
    align-items: center; //垂直居中
    justify-content: space-around;
    grid-template-columns: repeat(4, 80px);
    grid-gap: 10px;
  }
}
</style>

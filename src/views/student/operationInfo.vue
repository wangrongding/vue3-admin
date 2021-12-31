<script setup lang="ts">
import { ref, reactive } from "vue";
import { getImgUrl, updateUserInfo, userDetail } from "@/api/user/index";
import Dialog from "@/components/element/Dialog.vue";
import { useRoute } from "vue-router";
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
  formParams: {
    data: {
      birthday: "",
      headUrl: "",
      realName: "",
      account: "",
      password: "",
      sex: "",
      birthdayDays: "",
      classId: "",
    }, // 表单数据对象
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
      classId: {
        type: "text",
        label: "班级",
        placeholder: "请输入班级",
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
        selectOptions: [
          { label: "男", value: 0 },
          { label: "女", value: 1 },
        ],
        style: "width:45%",
      },
      status: {
        type: "select",
        label: "当前状态",
        placeholder: "请选择当前状态",
        selectOptions: [
          { label: "男", value: 0 },
          { label: "女", value: 1 },
        ],
        style: "width:45%",
      },
      remark: {
        type: "textarea",
        label: "备注",
        placeholder: "请输入备注",
        style: "width:91%",
        rows: 2,
      },
    },
    rules: {
      sex: [{ required: true, message: "请输入姓名", trigger: "blur" }],
    },
    inline: true,
    align: "center",
    labelWidth: "200px",
    submit: {
      submitText: "确定",
      submitFunction: () => {},
      reset: true,
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
const tempAvatar = new URL("../../assets/image/logo.png", import.meta.url).href;

// 获取头像列表
state.imageList = (await getImgUrl()) as any;
state.formParams.data = (await userDetail({ id: route.query.id })) as any;
async function submit() {
  (await updateUserInfo()) as any;
}
</script>
<template>
  <div class="page-container">
    <Form :form-params="state.formParams" style="width: 1300px; margin: 0 auto">
      <template #avatar>
        <div slot="trigger">
          <img
            :src="state.formParams.data.headUrl || tempAvatar"
            style="width: 100px; height: 100px"
            alt=""
          />
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

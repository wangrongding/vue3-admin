<script setup lang="ts">
import { ref, reactive } from "vue";
import { getImgUrl } from "@/api/user/index";
import Dialog from "@/components/element/Dialog.vue";
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
    data: { birthday: "", avatar: "" }, // 表单数据对象
    formList: {
      avatar: {
        type: "customItem",
        name: "avatar",
        label: "",
        style: "width:100%;text-align:center;",
      },
      role: {
        type: "text",
        label: "角色",
        style: "width:45%",
      },
      nickName: {
        type: "text",
        label: "昵称",
        placeholder: "请输入管理员姓名",
        style: "width:45%",
      },
      name: {
        type: "text",
        label: "姓名",
        placeholder: "请输入管理员姓名",
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
      birthday: {
        type: "date-picker",
        label: "出生日期",
        placeholder: "请选择出生日期",
        style: "width:45%",
        disabledDate: (date: any) => {
          return date.getTime() > Date.now();
        },
      },
    },
    rules: {
      sex: [{ required: true, message: "请输入姓名", trigger: "blur" }],
    },
    inline: true,
    align: "center",
    labelWidth: "200px",
    submit: {
      submitText: "查询",
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
    confirmFunction: () => {},
    closed: () => {},
  },
  imageList: [] as any,
});
const loading = ref("");
const tempAvatar = new URL("../../assets/image/logo.png", import.meta.url).href;

//更换头像
const uploadFile = (file: any, fileList: any) => {};

state.imageList = (await getImgUrl()) as any;
</script>
<template>
  <div class="page-container">
    <Form :form-params="state.formParams" style="width: 1300px; margin: 0 auto">
      <template #avatar>
        <div slot="trigger">
          <img
            :src="state.formParams.data.avatar || tempAvatar"
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
          <img v-for="item in state.imageList" :src="item.headUrl" />
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
  .avatar-list {
    width: 500px;
    margin: 0 auto;
    height: 300px;
    display: grid;
    justify-items: center;
    justify-content: space-between;
    grid-template-columns: repeat(4, 80px);
    grid-gap: 10px;
  }
}
</style>

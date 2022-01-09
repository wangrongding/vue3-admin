<script setup lang="ts">
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import Dialog from "@/components/element/Dialog.vue";
import { detail, update, updatePassWord, updateOldPhone } from "@/api/user/index.ts";
import { getImgUrl } from "@/api/user/index";
const state = reactive({
  formParams: {
    data: {
      birthday: "",
      avatar: "",
      headUrl: "",
    }, // 表单数据对象
    formList: {
      avatar: {
        type: "customItem",
        name: "avatar",
        label: "",
        style: "width:100%;text-align:center;",
      },
      roleName: {
        type: "text",
        label: "角色:",
        style: "width:45%",
        disabled: true,
      },
      realName: {
        type: "text",
        label: "姓名:",
        placeholder: "请输入姓名",
        style: "width:45%",
        disabled: true,
      },
      name: {
        type: "text",
        label: "昵称:",
        placeholder: "请输入昵称",
        style: "width:45%",
      },
      sex: {
        type: "select",
        label: "性别:",
        placeholder: "请选择性别",
        selectOptions: [
          {
            label: "男",
            value: 0,
          },
          {
            label: "女",
            value: 1,
          },
        ],
        style: "width:45%",
      },
      birthday: {
        type: "date-picker",
        label: "出生日期:",
        placeholder: "请选择出生日期",
        style: "width:45%",
        disabledDate: (date: any) => {
          return date.getTime() > Date.now();
        },
      },
    },
    rules: {},
    inline: true,
    align: "center",
    labelWidth: "120px",
    submit: {
      submitText: "保存修改",
      submitFunction: personalInformation,
      reset: false,
    },
  },
  passwordForm: {
    data: {
      phone: "",
    }, // 表单数据对象
    formList: {
      phone: {
        type: "number",
        maxlength: 11,
        label: "当前手机号：",
        placeholder: "请输入手机号码",
        style: "width:100%",
        disabled: true,
      },
      oldPassWord: {
        type: "text",
        mode: "password",
        label: "当前密码：",
        style: "width:100%",
      },
      newPassWord: {
        type: "text",
        mode: "password",
        label: "新密码：",
        style: "width:100%",
      },
    },
    rules: {
      oldPassWord: [
        {
          required: true,
          message: "请输入当前密码",
          trigger: "blur",
        },
        {
          validator: (rule: any, value: any, callback: any) => {
            var patt = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
            if (!patt.test(value)) {
              return callback(new Error(""));
            }
          },
          message: "请输入正确密码",
          trigger: "change",
        },
      ],
      newPassWord: [
        {
          required: true,
          message: "请输入新密码",
          trigger: "blur",
        },
        {
          validator: (rule: any, value: any, callback: any) => {
            var patt = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
            if (!patt.test(value)) {
              return callback(new Error(""));
            }
          },
          message: "请输入正确密码",
          trigger: "change",
        },
      ],
    },
    labelWidth: "200px",
    submit: {
      submitText: "保存修改",
      submitFunction: savePassword,
      reset: false,
    },
  },
  phoneForm: {
    data: <any>{}, // 表单数据对象
    formList: {
      oldPhone: {
        type: "number",
        maxlength: 11,
        label: "当前手机号：",
        style: "width:100%",
        disabled: true,
      },
      phone: {
        type: "number",
        maxlength: 11,
        label: "新手机号：",
        placeholder: "请输入当前手机号码",
        style: "width:100%",
      },
      codeMsg: {
        type: "text",
        label: "验证码：",
        placeholder: "请输入验证码",
        style: "width:100%",
      },
    },
    rules: {
      phone: [
        {
          required: true,
          message: "请输入当前手机号码",
          trigger: "blur",
        },
      ],
      codeMsg: [
        {
          required: true,
          message: "请输入验证码",
          trigger: "blur",
        },
      ],
    },
    labelWidth: "150px",
    submit: {
      submitText: "保存修改",
      submitFunction: saveUpdateOldPhone,
      reset: false,
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
console.log("🚀 / file: index.vue / line 70 / tempAvatar", tempAvatar);
//更换头像
const uploadFile = (file: any, fileList: any) => {
  console.log(file, fileList);
  let tempFile = new FormData();
  tempFile.append("file", file.raw);
  // uploadFile(tempFile).then((res) => {
  //   this.$set(this.formParams.data, "courseCover", res);
  // });
};
const showType = ref("userInfo");
//切换tab
const changeType = (a: any, b: any, c: any) => {
  showType.value = a;
  console.log(a, b, c);
};

// 查询个人信息
function detailData() {
  const param = {
    id: 587,
  };
  detail(param).then((res: any) => {
    state.formParams.data = res;
    state.passwordForm.data.phone = res.phone;
    state.phoneForm.data.oldPhone = res.phone;
  });
}
//个人信息保存修改
function personalInformation() {
  update(state.formParams.data).then((res: any) => {
    ElMessage({
      message: "保存成功",
      type: "success",
      duration: 2000,
    });
    detailData();
  });
}
//密码保存修改
function savePassword() {
  updatePassWord(state.passwordForm.data).then((res: any) => {
    ElMessage({
      message: "保存成功",
      type: "success",
      duration: 2000,
    });
  });
}
//绑定手机号修改
function saveUpdateOldPhone() {
  updateOldPhone(state.phoneForm.data).then((res: any) => {
    ElMessage({
      message: "保存成功",
      type: "success",
      duration: 2000,
    });
  });
}
//=========================exec执行块
detailData();
// 获取头像列表
state.imageList = (await getImgUrl()) as any;
</script>
<template>
  <div class="page-container">
    <div class="item-nav-bar">
      <el-menu
        :default-active="'userInfo'"
        class="el-menu-demo"
        mode="horizontal"
        @select="changeType"
      >
        <el-menu-item
          v-for="item in [
            { name: '个人信息', value: 'userInfo' },
            { name: '登录密码', value: 'password' },
            { name: '绑定手机', value: 'phone' },
          ]"
          style="height: 46px"
          :index="item.value"
        >
          {{ item.name }}
        </el-menu-item>
      </el-menu>
    </div>

    <Form
      v-show="showType == 'userInfo'"
      :form-params="state.formParams"
      style="width: 1000px; margin: 0 auto"
      class="info-form"
    >
      <template #avatar="{ itemForm }">
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
    <Form
      v-show="showType == 'password'"
      :form-params="state.passwordForm"
      style="width: 600px; margin: 0 auto"
      class="info-form"
    />
    <Form
      v-show="showType == 'phone'"
      :form-params="state.phoneForm"
      style="width: 600px; margin: 0 auto"
      class="info-form"
    />
  </div>
</template>
<style lang="scss" scoped>
.page-container {
  background-color: white;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 0 50px;

  .item-nav-bar {
    height: 50px;
    padding: 10px 0px 0;
    border-bottom: #c3c3c3;
  }

  .info-form {
    padding-top: 100px;
  }

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

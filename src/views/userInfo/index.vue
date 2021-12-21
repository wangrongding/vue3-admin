<script setup lang="ts">
import { ref } from "vue";
const formParams = ref({
  data: { birthday: "", avatar: "" }, // 表单数据对象
  formList: {
    avatar: {
      type: "customItem",
      name: "avatar",
      label: "",
      style: "width:100%;text-align:center;"
    },
    role: {
      type: "text",
      label: "角色",
      style: "width:45%"
    },
    nickName: {
      type: "text",
      label: "昵称",
      placeholder: "请输入管理员姓名",
      style: "width:45%"
    },
    name: {
      type: "text",
      label: "姓名",
      placeholder: "请输入管理员姓名",
      style: "width:45%"
    },
    /* phone: {
      type: "number",
      maxlength: 11,
      label: "姓名",
      placeholder: "请输入手机号码",
      style: "width:45%",
    }, */
    sex: {
      type: "select",
      label: "性别",
      placeholder: "请选择性别",
      selectOptions: [
        { label: "男", value: 0 },
        { label: "女", value: 1 }
      ],
      style: "width:45%"
    },
    birthday: {
      type: "date-picker",
      label: "出生日期",
      placeholder: "请选择出生日期",
      style: "width:45%",
      disabledDate: (date: any) => {
        return date.getTime() > Date.now();
      }
    }
  },
  rules: {
    sex: [{ required: true, message: "请输入姓名", trigger: "blur" }]
  },
  inline: true,
  align: "center",
  labelWidth: "200px",
  submit: {
    submitText: "查询",
    submitFunction: () => {},
    reset: true
  }
});
const passwordForm = ref({
  data: { birthday: "" }, // 表单数据对象
  formList: {
    phone: {
      type: "number",
      maxlength: 11,
      label: "当前手机号码：",
      placeholder: "请输入手机号码",
      style: "width:100%"
    },
    oldPassword: {
      type: "text",
      label: "当前密码：",
      style: "width:100%"
    },
    newPassword: {
      type: "text",
      label: "新密码：",
      style: "width:100%"
    }
  },
  rules: {
    phone: [{ required: true, message: "请输入姓名", trigger: "blur" }],
    oldPassword: [{ required: true, message: "请输入姓名", trigger: "blur" }],
    newPassword: [{ required: true, message: "请输入姓名", trigger: "blur" }]
  },
  labelWidth: "200px",
  submit: {
    submitText: "查询",
    submitFunction: () => {},
    reset: false
  }
});
const phoneForm = ref({
  data: { birthday: "" }, // 表单数据对象
  formList: {
    oldPhone: {
      type: "number",
      maxlength: 11,
      label: "当前手机号码：",
      placeholder: "请输入手机号码",
      style: "width:100%"
    },
    newPhone: {
      type: "number",
      maxlength: 11,
      label: "当前手机号码：",
      placeholder: "请输入手机号码",
      style: "width:100%"
    },
    code: {
      type: "number",
      maxlength: 11,
      label: "当前手机号码：",
      placeholder: "请输入手机号码",
      style: "width:100%"
    }
  },
  rules: {
    phone: [{ required: true, message: "请输入姓名", trigger: "blur" }],
    oldPassword: [{ required: true, message: "请输入姓名", trigger: "blur" }],
    newPassword: [{ required: true, message: "请输入姓名", trigger: "blur" }]
  },
  labelWidth: "200px",
  submit: {
    submitText: "查询",
    submitFunction: () => {},
    reset: false
  }
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
</script>
<template>
  <div class="page-container">
    <div class="item-nav-bar">
      <el-menu :default-active="'1'" class="el-menu-demo" mode="horizontal" @select="changeType">
        <el-menu-item
          v-for="item in [
            { name: '信息', value: 'userInfo' },
            { name: '密码', value: 'password' },
            { name: '手机号', value: 'phone' }
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
      :form-params="formParams"
      style="width: 1300px; margin: 0 auto"
    >
      <template #avatar="{ itemForm }">
        <div class="custom-form-item">
          <el-upload
            style="display: inline-block; margin-left: 30px"
            action=""
            :list-type="itemForm.listType"
            :limit="1"
            :auto-upload="false"
            :file-list="itemForm.fileList"
            :on-change="uploadFile"
            :show-file-list="false"
            accept=".jpg,.jpeg,.png"
          >
            <div slot="trigger">
              <img
                :src="formParams.data.avatar || tempAvatar"
                style="width: 100px; height: 100px"
                alt=""
              />
              <!-- <p>修改头像</p> -->
              <el-button
                slot="trigger"
                style="display: block; margin: 0 auto"
                size="small"
                type="text"
                :loading="loading == 'upload'"
              >
                修改头像
              </el-button>
            </div>
          </el-upload>
        </div>
      </template>
    </Form>
    <Form
      v-show="showType == 'password'"
      :form-params="passwordForm"
      style="width: 500px; margin: 0 auto"
    />
    <Form
      v-show="showType == 'phone'"
      :form-params="phoneForm"
      style="width: 500px; margin: 0 auto"
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
}
</style>

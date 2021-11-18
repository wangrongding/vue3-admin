<script setup lang="ts">
import { ref, reactive } from "vue";
const tableParams = {
  data: [],
  loading: false,
  columnProps: [
    { label: "名称", prop: "title" },
    { label: "账号", prop: "businessName" },
    { label: "角色", prop: "cbusinessType" },
    {
      label: "状态",
      prop: "operatorType",
      formatter: (a: any, b: any, c: any) => {
        return c == "0" ? "其它" : c == "1" ? "后台用户" : "手机端用户";
      },
    },
  ],
};
const formParams = ref({
  data: { birthday: "" }, // 表单数据对象
  formList: {
    nickName: {
      type: "text",
      label: "",
      placeholder: "请输入管理员姓名",
    },
    phone: {
      type: "number",
      maxlength: 11,
      label: "",
      placeholder: "请输入手机号码",
    },
    sex: {
      type: "select",
      label: "",
      placeholder: "请选择性别",
      selectOptions: [
        { label: "男", value: 0 },
        { label: "女", value: 1 },
      ],
    },
    birthday: {
      type: "date-picker",
      label: "",
      placeholder: "请选择出生日期",
      /* disabledDate: (date: any) => {
        return date.getTime() > Date.now()
      }, */
    },
  },
  rules: {
    nickName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  },
  // labelWidth: "0px",
  inline: true,
  submit: {
    submitText: "查询",
    submitFunction: () => {},
    reset: true,
  },
});
</script>
<template>
  <div class="page-container">
    <DingForm :formParams="formParams" />
    <DingTable :tableParams="tableParams" />
  </div>
</template>
<style lang="scss" scoped>
.page-container {
}
</style>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
const tableParams = ref({
  data: <any>[],
  loading: false,
  columnProps: [
    { label: "模块", prop: "name" },
    { label: "接口", prop: "name" },
    { label: "账号", prop: "name1" },
    { label: "角色", prop: "name2" },
    {
      label: "状态",
      prop: "name3",
      formatter: (a: any, b: any, c: any) => {
        return c == "0" ? "其它" : c == "1" ? "后台用户" : "手机端用户";
      },
    },
  ],
});
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
tableParams.value.data = [1, 2, 3, 4, 5, 6];
// onMounted(() => {});
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

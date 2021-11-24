<script setup lang="ts">
import { ref } from "vue";
const formParams = ref({
  data: { birthday: "" }, // 表单数据对象
  formList: {
    sex: {
      type: "select",
      label: "aaaa",
      placeholder: "请选择班级",
      selectOptions: [{ label: "男", value: 0 }],
    },
    sex111: {
      type: "text",
      label: "aaaa",
      placeholder: "请选择班级",
      selectOptions: [{ label: "男", value: 0 }],
    },
    sexaa111: {
      type: "date-picker",
      label: "aaaa",
      placeholder: "请选择班级",
    },
  },
  rules: {
    sex: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  },
  labelWidth: "200px",
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
  </div>
</template>
<style lang="scss" scoped>
.page-container {
}
</style>

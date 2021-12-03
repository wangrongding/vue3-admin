<script setup lang="ts">
// import Pro from "@/components/charts/progress1.vue";
import { ref } from "vue";
const formParams = ref({
  data: { birthday: "" }, // 表单数据对象
  formList: {
    sex: {
      type: "select",
      label: "aaaa",
      placeholder: "请选择班级",
      selectOptions: [
        { label: "男", value: 0 },
        { label: "男", value: 0 },
        { label: "男", value: 0 },
        { label: "男", value: 0 },
        { label: "男", value: 0 },
        { label: "男", value: 0 },
        { label: "男", value: 0 },
        { label: "女", value: 1 },
      ],
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
    <!-- <Pro /> -->
    <!-- <DingForm :formParams="formParams" /> -->
  </div>
</template>
<style lang="scss" scoped>
.page-container {
}
</style>

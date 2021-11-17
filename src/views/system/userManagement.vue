<script setup lang="ts">
import { ref } from "vue";
import Table from "@/components/element/Table.vue";
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
</script>
<template>
  <div class="page-container">
    <Table :tableParams="tableParams" />
  </div>
</template>
<style lang="scss" scoped>
.page-container {
}
</style>

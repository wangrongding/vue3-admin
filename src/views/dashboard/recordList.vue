<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { recordList } from "@/api/dashboard/index.ts";
const router = useRouter();
const state = reactive({
  tableParams: {
    data: [],
    loading: false,
    columnProps: [
      { type: "selection" },
      { label: "测试时间", prop: "startTime" },
      { label: "学生姓名", prop: "userName" },
      { label: "学号", prop: "userNo" },
      { label: "问卷名称", prop: "questionnaireName" },
      { label: "风险等级", prop: "riskLevelName" },
      { label: "干预状态", prop: "interveneStatusName" },
      {
        label: "状态",
        prop: "name3",
        formatter: (a: any, b: any, c: any) => {
          return c == "0" ? "其它" : c == "1" ? "1" : "2";
        },
      },
      {
        label: "操作",
        prop: "operation",
        slots: {
          default: "operation",
        },
        width: "180px",
      },
    ],
  },
  formParams: {
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
  },
});

function search() {
  state.tableParams.loading = true;
  recordList().then((res: any) => {
    console.log("🚀 / file: recordList.vue / line 82 / recordList / res", res);
    state.tableParams.data = res.records;
    state.tableParams.data.push(res.records as never);
    state.tableParams.data.push(res.records as never);
    state.tableParams.data.push(res.records as never);
    state.tableParams.data.push(res.records as never);
    state.tableParams.data.push(res.records as never);
    state.tableParams.data.push(res.records as never);
    state.tableParams.data.push(res.records as never);
    state.tableParams.data.push(res.records as never);
    state.tableParams.data.push(res.records as never);
    state.tableParams.data.push(res.records as never);
    state.tableParams.loading = false;
  });
}
search();
onMounted(() => {});
function jumpTo(row: any) {
  console.log(row);
  router.push("/dashboard/report");
}
</script>
<template>
  <div class="page-container">
    <Form class="ding-form" :formParams="state.formParams" />
    <Table class="ding-table" :tableParams="state.tableParams">
      <template #operation="{ row }">
        <el-button type="text" @click="jumpTo(row)">移出班级</el-button>
        <el-button type="text" @click="jumpTo(row)"> 学员详情 </el-button>
      </template>
    </Table>
  </div>
</template>
<style lang="scss" scoped>
.page-container {
}
</style>

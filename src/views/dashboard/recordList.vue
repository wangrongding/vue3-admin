<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
const tableParams = ref({
  data: [],
  loading: false,
  columnProps: [
    { label: "测试时间", prop: "name" },
    { label: "学生姓名", prop: "name1" },
    { label: "学号", prop: "name2" },
    { label: "问卷名称", prop: "name2" },
    { label: "风险等级", prop: "name2" },
    { label: "干预状态", prop: "name2" },
    {
      label: "状态",
      prop: "name3",
      formatter: (a: any, b: any, c: any) => {
        return c == "0" ? "其它" : c == "1" ? "1" : "2";
      }
    },
    {
      label: "操作",
      prop: "operation",
      slots: {
        default: "operation"
      },
      width: "180px"
    }
  ]
});
const formParams = ref({
  data: { birthday: "" }, // 表单数据对象
  formList: {
    nickName: {
      type: "text",
      label: "",
      placeholder: "请输入管理员姓名"
    },
    phone: {
      type: "number",
      maxlength: 11,
      label: "",
      placeholder: "请输入手机号码"
    },
    sex: {
      type: "select",
      label: "",
      placeholder: "请选择性别",
      selectOptions: [
        { label: "男", value: 0 },
        { label: "女", value: 1 }
      ]
    },
    birthday: {
      type: "date-picker",
      label: "",
      placeholder: "请选择出生日期"
      /* disabledDate: (date: any) => {
        return date.getTime() > Date.now()
      }, */
    }
  },
  rules: {
    nickName: [{ required: true, message: "请输入姓名", trigger: "blur" }]
  },
  // labelWidth: "0px",
  inline: true,
  submit: {
    submitText: "查询",
    submitFunction: () => {},
    reset: true
  }
});
tableParams.value.data = [1, 2, 3, 4, 5, 6] as any;
// onMounted(() => {});
function jumpTo(row: any) {
  console.log(row);
  useRouter().push("");
}
</script>
<template>
  <div class="page-container">
    <DingForm class="ding-form" :formParams="formParams" />
    <DingTable class="ding-table" :tableParams="tableParams">
      <template #operation="{ row }">
        <el-button type="text" @click="jumpTo(row)">移出班级</el-button>
        <el-button type="text" @click="jumpTo(row)"> 学员详情 </el-button>
      </template>
    </DingTable>
  </div>
</template>
<style lang="scss" scoped>
.page-container {
}
</style>

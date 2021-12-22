<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { sysUserListPage } from "@/api/system/index";
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
  //分页参数
  paging: {
    total: 0,
    size: 10,
    current: 1,
  },
  formParams: {
    data: { birthday: "" }, // 表单数据对象
    formList: {
      sex: {
        type: "select",
        label: "",
        placeholder: "所在角色",
        selectOptions: [
          { label: "男", value: 0 },
          { label: "女", value: 1 },
        ],
      },
      key: {
        type: "text",
        label: "",
        placeholder: "请输入姓名、手机号",
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
  const searchForm = Object.assign(state.paging, state.formParams.data);
  sysUserListPage(searchForm).then((res: any) => {
    console.log("🚀 / file: recordList.vue / line 82 / recordList / res", res);
    state.tableParams.data = res.records;
    state.tableParams.loading = false;
    state.paging.total = res.current;
    state.paging.total = res.total;
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
    <TopPanel :formParams="state.formParams">
      <el-button type="primary" @click="">导入</el-button>
    </TopPanel>

    <div class="table-panel">
      <Table :tableParams="state.tableParams">
        <template #operation="{ row }">
          <el-button type="text" @click="jumpTo(row)">移出班级</el-button>
          <el-button type="text" @click="jumpTo(row)"> 学员详情 </el-button>
        </template>
      </Table>
      <Pagination
        :total="state.paging.total"
        :page.sync="state.paging.current"
        :limit.sync="state.paging.size"
        :execFunction="search"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page-container {
}
</style>

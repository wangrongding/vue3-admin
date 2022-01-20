<script setup lang="ts">
// import { ref, getCurrentInstance } from "vue";
import { courseDetail } from "@/api/material/index";
import { useRoute } from "vue-router";
import { getPdf } from "@/utils/Export2PDF";
import { saveFile } from "@/utils/index";
import { ElMessage } from "element-plus";
console.log(getCurrentInstance(), "context");
const detailContent = ref("");
const route = useRoute();
const { courseDetailInfo, filepath } = (await courseDetail({
  courseId: route.query.courseId,
})) as any;
detailContent.value = courseDetailInfo;

//下载报告
function downloadReport() {
  // getPdf("报告详情", document.getElementById("reportDetail") as HTMLElement);
  if (filepath.length == 0) {
    ElMessage({
      type: "warning",
      message: "该资料暂无附件!",
    });
    return;
  }
  filepath.forEach((item: any) => {
    saveFile(item.url, item.name);
  });
}
</script>
<script lang="ts">
import { defineComponent, watch, getCurrentInstance, ref } from "vue";
export default defineComponent({
  setup() {
    console.log(getCurrentInstance(), "context");
  },
});
</script>
<template>
  <div class="page-container">
    <div class="btn-group" v-if="route.path == '/material/teamCoaching/detail'">
      <el-button type="primary" size="mini" @click="downloadReport">下载资料</el-button>
    </div>
    <div v-html="detailContent" id="reportDetail" />
  </div>
</template>
<style lang="scss" scoped>
.page-container {
  background-color: white;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 50px;
  position: relative;
  .btn-group {
    z-index: 299;
    position: fixed;
    top: 60px;
    right: 20px;
  }
}
</style>

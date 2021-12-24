<script setup lang="ts">
// import { ref, getCurrentInstance } from "vue";
import { courseDetail } from "@/api/material/index";
import { useRoute } from "vue-router";
console.log(getCurrentInstance(), "context");
const detailContent = ref("");
const route = useRoute();
const { courseDetailInfo } = (await courseDetail({ courseId: route.query.courseId })) as any;
detailContent.value = courseDetailInfo;
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
    <div v-html="detailContent" />
  </div>
</template>
<style lang="scss" scoped>
.page-container {
  background-color: white;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 50px;
}
</style>

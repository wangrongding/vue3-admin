<script setup lang="ts">
import { ref } from "vue";
const percentage = ref(80);
</script>
<template>
  <div class="page-container">
    <el-progress type="dashboard" :percentage="80">
      <template #default="{ percentage }">
        <div class="percentage-value">{{ percentage }}%</div>
        <div class="percentage-label">Progressing</div>
      </template>
    </el-progress>
  </div>
</template>
<style lang="scss" scoped>
.page-container {
  width: 100%;
  height: 100%;
  /* .percentage-value {
    display: block;
    margin-top: 10px;
    font-size: 28px;
  }
  .percentage-label {
    display: block;
    margin-top: 10px;
    font-size: 12px;
  } */
}
</style>

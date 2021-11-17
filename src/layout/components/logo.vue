<script setup lang="ts">
import { ref } from "vue";
</script>
<template>
  <div class="page-container">
    <img src="@/assets/image/logo.png" alt="" />
    <span class="title">vue3-admin</span>
  </div>
</template>
<style lang="scss" scoped>
.page-container {
  height: 60px;
  line-height: 60px;
  display: flex;
  align-items: center;
  .title {
    line-height: 60px;
    height: 60px;
    display: inline-block;
    font-size: 23px;
    font-weight: bolder;
  }
  img {
    height: 50px;
  }
}
</style>

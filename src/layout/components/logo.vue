<script setup lang="ts">
import { ref } from "vue";
</script>
<template>
  <div class="page-container">
    <img src="@/assets/image/navLogo.png" alt="" />
    <!-- <span class="title">xxAdmin</span> -->
    <!-- <span class="title">Mint-Admin</span> -->
  </div>
</template>
<style lang="scss" scoped>
.page-container {
  height: 60px;
  line-height: 60px;
  display: flex;
  align-items: center;
  .title {
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
    color: $base-color-default;
    line-height: 60px;
    height: 60px;
    display: inline-block;
    font-size: 23px;
    font-weight: bolder;
  }
  img {
    margin-right: 10px;
    height: 28px;
  }
}
</style>

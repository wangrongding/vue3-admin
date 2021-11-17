<script setup lang="ts">
import { useStore } from "vuex";
const userName = useStore().state.user.userInfo.userName;
</script>

<template>
  {{ userName }}
  <h1>首页</h1>
  <img src="https://gitee.com/wangrongding/image-house/raw/master/images/202111031757724.png" alt="" />
</template>
<style></style>

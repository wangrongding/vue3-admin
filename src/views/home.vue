<script setup lang="ts">
import { useStore } from "vuex";
const userName = useStore().state.user.userInfo.userName;
console.log(useStore().state.user.userInfo.userName);
</script>

<template>
  <h1>首页</h1>
  {{ userName }}
</template>
<style></style>

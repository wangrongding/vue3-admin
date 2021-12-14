<script setup lang="ts">
import { ref } from "vue";
import Pie from "@/components/charts/Pie.vue";
import UserInfo from "./components/userInfo.vue";
</script>
<template>
  <div class="page-container">
    <component :is="UserInfo"></component>
    <component :is="Pie"></component>
  </div>
</template>
<style lang="scss" scoped>
.page-container {
}
</style>

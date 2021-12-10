<script setup lang="ts">
import { ref } from "vue";
</script>
<template>
  <el-dropdown trigger="click">
    <div class="avatar-wrapper">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <span>用户名</span>
      <el-icon color="#000" :size="15">
        <arrow-down />
      </el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <router-link to="/userInfo"> 个人信息 </router-link>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<style lang="scss" scoped>
.avatar-wrapper {
  min-width: 120px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>

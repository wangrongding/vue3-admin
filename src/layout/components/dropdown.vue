<script setup lang="ts">
import { ElMessage } from "element-plus";
import { useStore } from "@/store";
const store = useStore();

function logout() {
  sessionStorage.clear();
  window.history.pushState({}, "/student", "/student");
  ElMessage({
    type: "success",
    message: "退出成功！",
  });
}
function toMain() {
  window.history.pushState({}, "/student", "/student");
}
</script>
<template>
  <el-dropdown trigger="click">
    <div class="avatar-wrapper">
      <el-avatar
        :src="
          store.userInfo.headUrl ||
          'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
        "
      />
      <span>{{ store.userInfo.realName || "-" }}</span>
      <el-icon color="#000" :size="15">
        <arrow-down />
      </el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <router-link to="/userInfo"> 个人信息 </router-link>
        </el-dropdown-item>
        <el-dropdown-item divided @click.native="toMain"> 返回主页 </el-dropdown-item>
        <el-dropdown-item divided @click.native="logout"> 退出登录 </el-dropdown-item>
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

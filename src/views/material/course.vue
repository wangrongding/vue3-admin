<script setup lang="ts">
import { ref, onMounted } from "vue";
</script>
<template>
  <div class="page-container">
    <div>
      <span>aaa</span>
    </div>
    <div class="course-list">
      <div class="course-item" v-for="item in 23">
        <!-- <img src="../../assets/image/courseItem.png" alt="" /> -->
        <p>asdfasdf</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page-container {
  .course-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    text-align: center;
    justify-items: center;
    .course-item {
      width: 380px;
      height: 200px;
      background-color: aquamarine;
      text-align: center;
      margin: 20px;
      background-image: url("../../assets/image/courseItem.png");
    }
  }
}
</style>

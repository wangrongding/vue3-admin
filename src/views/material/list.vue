<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { reactive, toRefs } from "vue";
export default defineComponent({
  setup() {
    const router = useRouter();
    const state = reactive({
      handleSelect: (val: string) => {
        console.log(val);
      },
      toDetail: (val: number) => {
        console.log(router);
        router.push({
          path: "/material/course/detail",
        });
      },
      menuList: [
        { name: "抑郁", value: "1" },
        { name: "快乐", value: "2" },
      ],
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>
<template>
  <div class="page-container">
    <div class="item-nav-bar">
      <el-menu :default-active="'1'" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item style="height: 46px" :index="item.value" v-for="item in menuList">{{ item.name }}</el-menu-item>
      </el-menu>
    </div>
    <div class="course-list">
      <div class="course-item" v-for="item in 23" @click="toDetail(item)">
        <img src="../../assets/image/courseItem.png" alt="" />
        <p>asdfasdf</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page-container {
  background-color: white;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 0 50px;
  .item-nav-bar {
    height: 50px;
    padding: 10px 0px 0;
    border-bottom: #c3c3c3;
  }
  .course-list {
    text-align: center;
    display: grid;
    justify-items: center;
    justify-content: space-between;
    grid-template-columns: repeat(auto-fill, 380px);
    grid-gap: 10px;
    text-align: center;
    .course-item {
      width: 380px;
      border-radius: 10px;
      text-align: center;
      margin: 20px;
      background-color: white;
      cursor: pointer;
      box-shadow: -1px 1px 5px rgba(216, 216, 216, 1);
      img {
        width: 380px;
        height: 194px;
      }
      p {
        background-color: white;
        font-size: 20px;
        height: 50px;
        line-height: 50px;
        text-indent: 1rem;
        text-align: left;
      }
    }
  }
}
</style>

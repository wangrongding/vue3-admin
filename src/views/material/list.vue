<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { reactive, toRefs } from "vue";
import { appList, categoryList } from "@/api/material/index";
export default defineComponent({
  props: ["type"],
  setup(props) {
    const router = useRouter();
    const state = reactive({
      handleSelect(val: string) {
        state.getCategoryList(val);
      },
      toDetail(val: any) {
        router.push({
          path: "/material/course/detail",
          query: { courseId: val.id },
        });
      },
      async getList(id: number) {
        state.menuList = (await appList({ id })) as any;
        state.getCategoryList(state.menuList[0].id);
      },
      async getCategoryList(id: string) {
        state.itemList = (await categoryList({ categoryId: id })) as any;
      },
      menuList: [] as any,
      itemList: [] as any,
    });
    state.getList(router.currentRoute.value.meta.id as number);
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
        <el-menu-item v-for="(item, index) in menuList" style="height: 46px" :index="item.id">
          {{ item.categoryName }}
        </el-menu-item>
      </el-menu>
    </div>
    <div class="course-list" v-if="itemList.length">
      <div v-for="item in itemList" :key="item" class="course-item" @click="toDetail(item)">
        <img :src="item.icon" alt="" />
        <p>{{ item.name }}</p>
      </div>
    </div>
    <div v-else> 暂无数据 </div>
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

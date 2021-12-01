<script lang="ts">
import { defineComponent, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted, reactive, toRefs } from "vue";
import List from "./list.vue";
export default defineComponent({
  components: { List },
  setup(props, context) {
    console.log(context, "context");
    const { currentRoute } = useRouter();
    const state = reactive({
      currentPage: 1,
    });
    watch(
      () => currentRoute.value,
      () => {
        currentRoute.value.path.includes("detail") ? (state.currentPage = 2) : (state.currentPage = 1);
        // console.log(state.currentPage, "============");
      }
    );
    onMounted(() => {});
    return {
      onMounted,
      ...toRefs(state),
    };
  },
});
</script>
<template>
  <!-- 动态组件 -->
  <!-- <component :is="componentPage"></component> -->
  <List v-if="currentPage == 1" :type="1" />
  <router-view v-else></router-view>
</template>
<style lang="scss" scoped>
.page-container {
  // background-color: white;
  // border-radius: 20px;
  // box-sizing: border-box;
  // padding: 0 50px;
}
</style>

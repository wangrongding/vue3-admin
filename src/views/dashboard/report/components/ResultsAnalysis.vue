<script setup lang="ts">
import { shallowRef } from "vue";
import Bar from "./charts/Bar.vue";
import Text from "./charts/Text.vue";
import TwoWayBar from "./charts/TwoWayBar.vue";
import Quadrant from "./charts/Quadrant.vue";
import Line from "./charts/Line.vue";
import Radar from "./charts/Radar.vue";
import VerticalBar from "./charts/VerticalBar.vue";
const componentList = shallowRef([Bar, Text, TwoWayBar, Quadrant, Line, Radar, VerticalBar]);
defineProps({
  reportData: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
</script>
<template>
  <!-- 分析结果 -->
  <div class="analysisResults">
    <div class="textContentTitle">
      <img src="./assets/titleBg.png" alt="" />
      <span class="textContentName">{{ reportData.title || "-" }}</span>
    </div>
    <component
      :is="componentList[item.type - 1]"
      v-for="(item, index) in reportData.content"
      :key="index"
      :reportData="item"
    ></component>
  </div>
</template>

<style lang="scss" scoped>
.analysisResults {
  width: 1200px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 0px 8px 1px rgba(28, 193, 162, 0.15);
  border-radius: 8px;
  margin-bottom: 30px;

  .textContentTitle {
    width: 100%;
    position: relative;
    text-align: center;

    img {
      width: 346px;
    }

    .textContentName {
      font-size: 28px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>

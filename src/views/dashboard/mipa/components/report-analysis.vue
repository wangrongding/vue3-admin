<template>
  <div class="report-analysis">
    <div class="report-analysis_inner">
      <report-title title="评估分析" />
      <ring class="report_ring" :ring="scaleData" />
      <cardList :stateList="stateList"></cardList>
      <!-- <worth :worthList="worthList" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import reportTitle from "../common/title.vue";
import ring from "../common/ring.vue";
import cardList from "../common/state-list.vue";
// import worth from "./report-worth.vue";
import { computed, watch, reactive } from "vue";
const props = defineProps({
  stateList: {
    type: Array,
    default: () => [],
  },
  worthList: {
    type: Array,
    default: () => [],
  },
  scaleData: {
    type: Array,
    default: () => [],
  },
});

console.log(props.scaleData, "🚗🚗🚗🚗");
</script>

<style lang="scss" scoped>
.report-analysis {
  margin: 30px 0;
  background: #fbfefd;
  box-shadow: 0px 0px 8px 1px rgba(0, 189, 114, 0.15);
  border-radius: 12px;
  box-sizing: border-box;
  padding-bottom: 40px;

  .report-analysis_inner {
    width: 90%;
    height: 100%;
    margin: 0 auto;
  }
  .report_ring {
    width: 720px;
    height: 400px;
    margin: 0 auto;
    position: relative;
  }
}
</style>

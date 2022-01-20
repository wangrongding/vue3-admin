<template>
  <div class="report_suggest">
    <div class="report_suggest_inner">
      <report-title title="专家建议" />
      <div class="report_suggest_content">
        <span style="text-indent: 40px" v-html="suggest"></span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, computed } from "vue";
import reportTitle from "../common/title.vue";
const props = defineProps({
  reportData: {
    type: Object,
    default: () => {},
  },
  downState: Boolean,
});

const suggest = computed(() => {
  if (!props.reportData.suggest) return;
  let suggest = props.reportData.suggest.replace(/\n/, "<br/>");
  return suggest;
});
</script>

<style lang="scss" scoped>
.report_suggest {
  margin: 30px 0;
  background: #fbfefd;
  box-shadow: 0px 0px 8px 1px rgba(0, 189, 114, 0.15);
  border-radius: 12px;
  padding-bottom: 40px;
  .report_suggest_inner {
    width: 90%;
    margin: 0 auto;
    height: 100%;
  }
  .report_suggest_content {
    border-radius: 12px;
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid #8dedc0;
    font-size: 18px;
    color: #606266;
    font-family: PingFangSC-Light, PingFang SC;
    line-height: 1.5;
  }
}
</style>

<template>
  <div class="report_entirety">
    <report-title title="心理健康综合评估" />
    <dashboard class="report_dashboard" :level="props.psychological.level" />
    <div class="star">
      <el-icon class="yellow" v-for="item in props.psychological.riskIndex"
        ><star-filled
      /></el-icon>
      <el-icon class="gray" v-for="item in 5 - props.psychological.riskIndex"
        ><star-filled
      /></el-icon>
    </div>
    <!-- <el-rate class="report_rate" v-model="" disabled> </el-rate> -->
    <div class="report_suggest">
      <span class="report_suggest_lable">{{ "老师，您好：" }}</span>
      <span>{{ props.psychological.suggest }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import reportTitle from "../common/title.vue";
import dashboard from "../common/dashboard.vue";
import { computed, watch, reactive } from "vue";
const props = defineProps({
  psychological: {
    type: Object,
    default: () => {},
  },
});
const state = reactive({
  level: "0",
});
watch(
  () => props.psychological,
  () => {
    let num = props.psychological.riskIndex || "0";
    num = String((100 / 5) * num);
    state.level = num;
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped>
.star {
  height: 50px;
  text-align: center;
  margin: 15px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .yellow {
    font-size: 40px;
    color: rgb(247, 186, 42);
  }
  .gray {
    color: rgb(239, 242, 247);
    font-size: 40px;
  }
}
.el-rate {
  height: 50px;
  text-align: center;
  margin: 15px 0;
}
::v-deep(.el-rate__icon) {
  font-size: 40px;
}
.report_entirety {
  margin: 30px 0;
  background: #fbfefd;
  box-shadow: 0px 0px 8px 1px rgba(0, 189, 114, 0.15);
  border-radius: 12px;
  padding-bottom: 40px;
  .report_dashboard {
    width: 600px;
    height: 320px;
    margin: 0 auto;
    position: relative;
  }

  .report_suggest {
    width: 90%;
    border-radius: 12px;
    border: 1px solid #8dedc0;
    padding: 20px;
    box-sizing: border-box;
    margin: 0 auto;
    > span {
      font-size: 18px;
      font-family: PingFangSC-Light, PingFang SC;
      font-weight: 300;
      color: #29363d;
      line-height: 1.5;
      &:last-child {
        text-indent: 2rem;
      }
    }
    .report_suggest_lable {
      font-size: 20px;
      font-weight: 600;
      color: #29363d;
      display: block;
      padding-bottom: 10px;
    }
  }
}
</style>

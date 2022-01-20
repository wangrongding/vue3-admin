<template>
  <div class="report_state">
    <div v-for="(item, index) in props.stateList" :key="index">
      <div class="state_title">
        <span class="state_title_x"></span>
        <span class="state_title_lable">{{ item.name }}</span>
        <span class="state_title_x"></span>
      </div>
      <!-- <el-rate class="report_state_rate" v-model="item.riskIndex" disabled v-if="item.riskIndex">
      </el-rate> -->
      <div class="star">
        <el-icon class="yellow" v-for="aaa in item.riskIndex"><star-filled /></el-icon>
        <el-icon class="gray" v-for="aaa in 5 - item.riskIndex"><star-filled /></el-icon>
      </div>

      <div class="report_state_suggest">
        <span class="report_state_suggest_lable" v-if="item.userName">{{ item.userName }}</span>
        <span v-html="item.suggest"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
const props = defineProps({
  stateList: {
    type: Array,
    default: () => [],
  } as any,
});
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
.report_state {
  .state_title {
    font-size: 24px;
    font-weight: 600;
    color: #00bd72;
    margin-top: 43px;
    padding-bottom: 15px;
    text-shadow: 0px 0px 4px rgba(4, 189, 113, 0.5);
    -webkit-background-clip: text;

    span {
      display: inline-block;
    }
    .state_title_x {
      width: 36%;
      height: 2px;
      background-color: #00bd72;
      position: relative;
      &::before {
        content: "·";
        display: inline-block;
        position: absolute;
        top: -16px;
        left: -5px;
      }
      &::after {
        content: "·";
        display: inline-block;
        position: absolute;
        top: -16px;
        right: -5px;
      }
    }
    .state_title_lable {
      width: 28%;
      text-align: center;
    }
  }
  ::v-deep(.report_state_rate) {
    height: 50px;
    text-align: center;
  }
  // .el-rate__icon {
  //   font-size: 40px;
  // }
  .report_state_suggest {
    border-radius: 12px;
    border: 1px solid #8dedc0;
    padding: 20px;
    box-sizing: border-box;
    margin: 15px auto 0;
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
    .report_state_suggest_lable {
      font-size: 20px;
      font-weight: 600;
      color: #29363d;
      display: block;
    }
  }
}
</style>

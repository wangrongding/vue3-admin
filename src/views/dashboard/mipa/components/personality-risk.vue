<template>
  <div class="risk">
    <titlePage :img="backImg" id="menuPage0"></titlePage>
    <div class="risk_top">
      <!-- 仪表盘图 -->
      <dashboard
        class="echarts"
        :level="personRisk.pdRiskLevelIndex"
      ></dashboard>
      <!-- 显示框 -->
      <div class="risk_title">
        <span>人格风险指数：</span>
        <span :style="{ color: chooseColor }">{{
          personRisk.pdRiskLevelIndex
        }}</span>
        <div class="risk_border"></div>
        <div class="risk_title_gread">
          风险等级
          <span :style="{ color: chooseColor }">{{ personRisk.level }}</span>
        </div>
      </div>
    </div>
    <div class="risk_content">
      <span>{{ obj.text }}</span>
      <span :style="{ color: chooseColor }"> {{ obj.name }} </span>
      <span>{{ obj.content }}</span>
    </div>
    <cardPage class="risk_content" v-bind="$attrs" :obj="personRisk"></cardPage>
  </div>
</template>

<script>
import dashboard from "../common/echarts";
import cardPage from "../common/card";
import titlePage from "../common/title";
export default {
  components: {
    dashboard,
    cardPage,
    titlePage,
  },
  props: {
    personRisk: {
      type: Object,
      default: () => {},
    },
    userInfo: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    chooseColor() {
      let list = new Map([
        ["低风险", "#02ca77"],
        ["中风险", "#1e91f9"],
        ["高风险", "#ff5a56"],
      ]);
      return list.get(this.personRisk.level);
    },
  },
  data() {
    return {
      obj: {
        text: "第一部分为人格风险评估结果，主要报告",
        content:
          "的人格风险指数，该指数的数据区间 0-100，数据越大表明风险程度越高，由此呈现出高、中、低程度的风险以及详情，最后给出对应风险指数的专家意见和建议。",
        name: this.userInfo.name,
      },
      backImg: "url(" + require("@i/risk.png") + ")",
    };
  },
};
</script>

<style lang="scss" scoped>
.risk {
  width: 100%;
  color: #333;
  font-size: 22px;
  .risk_top {
    display: flex;
    justify-content: center;
    .echarts {
      width: 204px;
      height: 204px;
    }
    .risk_title {
      width: 348px;
      height: 165px;
      background: url("../../../assets/image/risk_title.png") 100% 100%
        no-repeat;
      box-sizing: border-box;
      padding: 38px 0;
      margin-top: 20px;
      text-align: center;
      margin-left: 69px;
      background-size: 100% 100%;
      .risk_border {
        width: 210px;
        margin: 0 auto;
        height: 20px;
        opacity: 0.7;
        border-bottom: 2px solid #88c9ff;
        margin-bottom: 20px;
      }
      .risk_title_gread {
        font-size: 18px;
      }
    }
  }
  .risk_content {
    font-size: 18px;
    line-height: 2;
    padding: 20px;
  }
}
</style>

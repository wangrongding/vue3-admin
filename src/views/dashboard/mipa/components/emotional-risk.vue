<template>
  <div class='emotional_risk'>
    <titlePage
      :img="backImg"
      id="menuPage2"
    ></titlePage>
    <div class="emotional_risk_content">
      <div class="emotional_risk_title">
        <div class="emotional_risk_title_text">
          情绪风险指数： <span :style="{ color: chooseColor }">{{ emotionalRiskObj.pdRiskLevelIndex }}</span>
        </div>
        <div class="emotional_risk_border"></div>
        <div class="emotional_risk_title_gread">
          风险等级 <span :style="{ color: chooseColor }">{{ emotionalRiskObj.level }}</span>
        </div>
      </div>
      <cardPage
        :obj="emotionalRiskObj"
        v-bind="$attrs"
      />
    </div>
  </div>
</template>

<script>
import titlePage from "../common/title";
import cardPage from '../common/card'

export default {
  name: 'emotionalRisk',
  components: {
    titlePage,
    cardPage
  },
  props: {
    emotionalRiskObj: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      backImg: "url(" + require("@i/emotional-risk.png") + ")",
    }
  },
  computed: {
    chooseColor() {
      let list = new Map([
        ['低风险', "#02ca77"],
        ['中风险', "#1e91f9"],
        ['高风险', "#ff5a56"],
      ])
      return list.get(this.emotionalRiskObj.level)
    }
  },
}
</script>

<style lang="scss" scoped>
.emotional_risk {
  .emotional_risk_content {
    padding: 20px;
  }
  .emotional_risk_title {
    margin: 0 auto;
    width: 348px;
    height: 165px;
    background: url("../../../assets/image/risk_title.png") 100% 100% no-repeat;
    box-sizing: border-box;
    padding: 38px 0;
    margin-bottom: 30px;
    text-align: center;
    background-size: 100% 100%;
    .emotional_risk_title_text {
      font-size: 22px;
      font-weight: 400;
    }
    .emotional_risk_border {
      width: 210px;
      margin: 0 auto;
      height: 20px;
      opacity: 0.7;
      border-bottom: 2px solid #88c9ff;
      margin-bottom: 20px;
    }
    .emotional_risk_title_gread {
      font-size: 18px;
      font-weight: 400;
      span {
        color: #ff6000;
      }
    }
  }
}
</style>

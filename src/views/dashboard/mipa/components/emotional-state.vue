
<template >
  <div class="emotional_state">
    <titlePage
      :img="backImg"
      id="menuPage3"
    ></titlePage>
    <div class="emotional_state_text">
      <div class="emotional_state_header">
        <div></div>
        <div>即时情绪检测状态</div>
        <div
          class="emotional_state_art"
          :style="{color: entiretyObj.tendencyResult === '阴性'?'#2462EB':'#FE0000'}"
        >
          <span></span>{{ tendency }}
        </div>
      </div>
      <radar
        class="emotional_state_echarts"
        :indicatorData="entiretyObj.list"
        :dataBJ="entiretyObj.data"
      ></radar>
      <div
        v-for="(item, index) in entiretyObj.arr"
        :key="index"
      >
        <cardPage
          :obj="item"
          v-bind="$attrs"
        />
      </div>
    </div>
  </div>
</template>

<script>
import radar from "../common/radar";
import titlePage from "../common/title";
import cardPage from '../common/card';

export default {
  components: {
    radar,
    titlePage,
    cardPage
  },
  props: {
    entiretyObj: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      backImg: "url(" + require("@i/emotional-state.png") + ")",
    };
  },
  computed: {

    pdTypeName() {
      return this.entiretyObj.pdTypeName + "人格";
    },
    tendency() {
      return "自杀倾向：" + this.entiretyObj.tendencyResult;
    }
  }
};
</script>

<style lang="scss" scoped>
.emotional_state {
  width: 100%;
  color: #333;

  .emotional_state_text {
    padding: 20px;
  }

  .emotional_state_header {
    padding-bottom: 20px;
    display: flex;
    justify-content: space-around;
    font-size: 18px;
    font-weight: bold;
    line-height: 42px;
    > div {
      &:first-child {
        width: 15%;
      }
    }
  }
  .emotional_state_echarts {
    width: 580px;
    height: 500px;
    margin: 25px auto;
  }
  .emotional_state_art {
    border-bottom: 1px dashed #008afe;
    position: relative;
    padding: 0 15px;
    span {
      width: 14px;
      height: 14px;
      position: absolute;
      bottom: -7px;
      left: -13px;
      display: inline-block;
      border-radius: 50%;
      background-color: #2462eb;
    }
  }
}
</style>

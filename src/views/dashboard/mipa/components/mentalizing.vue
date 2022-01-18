<template>
  <div class="mentalizing">
    <titlePage :img="backImg" id="menuPage4"></titlePage>
    <div class="mentalizing_content">
      <statusBar :status="mentaObj.level"></statusBar>
      <cardPage v-bind="$attrs" :obj="mentaObj"></cardPage>
    </div>
  </div>
</template>

<script>
import titlePage from "../common/title";
import cardPage from "../common/card";
import statusBar from "../common/statusBar";
export default {
  components: {
    titlePage,
    cardPage,
    statusBar,
  },
  props: {
    mentaObj: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    console.log(
      "🚀 / file: mentalizing.vue / line 36 / created / mentaObj",
      this.mentaObj
    );
  },
  data() {
    return {
      backImg: "url(" + require("@i/mentalizing.png") + ")",
    };
  },
};
</script>

<style lang="scss" scoped>
.mentalizing {
  width: 100%;
  .mentalizing_content {
    padding: 20px;
  }
  .mentalizing_text {
    font-size: 18px;
    line-height: 2;
  }
}
</style>

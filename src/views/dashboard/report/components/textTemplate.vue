<!-- 文本 -->
<template>
  <div class="textContent">
    <div class="textContentTitle">
      <img src="./assets/titleBg.png" alt="" />
      <span class="textContentName">{{ reportData.title || "" }}</span>
    </div>
    <div class="text" v-html="reportData.content"> </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  reportData: {
    type: Object,
    default: () => {
      return {};
    }
  }
});
</script>

<style lang="scss" scoped>
.textContent {
  width: 1200px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 0px 8px 1px rgba(28, 193, 162, 0.15);
  border-radius: 8px;
  margin-bottom: 30px;
  padding-bottom: 30px;

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

  .text {
    width: 1100px;
    border-radius: 8px;
    border: 1px solid #8dffea;
    margin: 24px auto;
    text-indent: 40px;
    font-size: 18px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #29363d;
    padding: 11px 20px 7px 20px;
    line-height: 27px;
  }
}
</style>

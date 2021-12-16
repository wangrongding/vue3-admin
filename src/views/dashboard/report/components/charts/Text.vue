<template>
  <!-- 横线文本 -->
  <div class="horizontalText">
    <div v-for="(item, index) in reportData.content" :key="index">
      <div class="analysisTitle">
        <span><img src="../assets/heng.png" alt="" /></span>
        <span class="title">{{ item.title }}</span>
        <span><img src="../assets/heng.png" alt="" /></span>
      </div>
      <div class="emotionalContent">
        <span v-html="item.content"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  reportData: {
    type: Object,
    default: () => {},
  },
});
</script>

<style lang="less" scoped>
.horizontalText {
  width: 1200px;

  .analysisTitle {
    width: 100%;
    display: flex;

    .title {
      font-size: 24px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #00e3b9;
      line-height: 33px;
      text-shadow: 0px 0px 4px rgba(0, 227, 185, 0.5);
      text-align: center;
      margin: -7px auto;
    }

    span {
      margin: 0 46px;

      img {
        vertical-align: -webkit-baseline-middle;
      }
    }
  }

  .emotionalContent {
    width: 1100px;
    margin: 30px auto;
    border-radius: 8px;
    border: 1px solid #8dffea;
    padding: 11px 20px 20px 20px;
    font-size: 18px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #29363d;
    line-height: 27px;
    text-indent: 40px;
  }
}
</style>

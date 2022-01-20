<template>
  <div class="report_title">
    <div class="report_info_title">{{ props.title }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: "-",
  },
});
</script>

<style lang="scss" scoped>
.report_title {
  width: 364px;
  height: 65px;
  line-height: 65px;
  background-image: url("../../report/components/assets/titleBg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin: 0 auto;
  text-align: center;
  font-size: 28px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 21px;
}
</style>

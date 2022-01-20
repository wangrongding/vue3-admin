<template functional>
  <div class="report_worth">
    <div
      v-for="(item,index) in props.worthList"
      :key="index"
      class="report_worth_item"
    >
      <img
        :src="item.img"
        alt=""
      >
      <div class="report_worth_content">
        <span class="report_worth_name">{{item.name}}</span>
        <span class="report_worth_dec">{{item.dec}}</span>
        <span class="report_worth_suggest">{{item.suggest}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.report_worth {
  margin: 35px auto 0;
  .report_worth_item {
    border-radius: 12px;
    border: 1px solid #8dedc0;
    padding: 25px 40px 25px 25px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    margin-bottom: 45px;
    &:last-child {
      margin-bottom: 0;
    }
    img {
      width: 206px;
      height: 225px;
    }
    .report_worth_content {
      font-size: 18px;
      color: #29363d;
      font-weight: 300;
      display: flex;
      flex-direction: column;
      padding-left: 30px;
      width: calc(100% - 206px);
      .report_worth_name {
        font-size: 20px;
        font-weight: 600;
        padding: 10px 0;
      }
      .report_worth_dec {
        font-weight: 600;
        color: #00bd72;
        padding-bottom: 39px;
      }
      .report_worth_suggest {
      }
    }
  }
}
</style>
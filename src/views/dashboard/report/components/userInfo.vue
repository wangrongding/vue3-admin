<template>
  <!-- 基本信息 -->
  <div class="userInfo">
    <div class="textContentTitle">
      <!-- <img src="../../../../assets/questionnaire/titleBg.png" alt="" /> -->
      <span class="textContentName">{{ reportData.title }}</span>
    </div>
    <div class="userList">
      <div class="userListItem is_active">
        <span class="userListItemLable">姓名</span>
        <span class="userListItemInfo">{{ reportData.userName }}</span>
      </div>
      <div class="userListItem">
        <span class="userListItemLable">学号</span>
        <span class="userListItemInfo">{{ reportData.userNumber }}</span>
      </div>
      <div class="userListItem">
        <span class="userListItemLable">生日</span>
        <span class="userListItemInfo">{{ reportData.birthday }}</span>
      </div>
      <div class="userListItem is_active">
        <span class="userListItemLable">测试时间</span>
        <span class="userListItemInfo">{{ reportData.testTime }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  reportData: {
    type: Object,
    default: () => {}
  }
});
</script>

<style lang="scss" scoped>
.userInfo {
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

  .userList {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 15px 0 30px 0;
    padding-left: 50px;

    .userListItem {
      width: 545px;
      height: 66px;
      border-radius: 12px;
      border: 1px solid #e8f2ee;
      padding: 20px 30px;
      box-sizing: border-box;
      margin-top: 10px;

      .userListItemLable {
        display: inline-block;
        width: 80px;
        text-align: right;
        font-size: 18px;
        font-family: PingFangSC-Light, PingFang SC;
        font-weight: 300;
        color: #29363d;
      }

      .userListItemInfo {
        margin-left: 20px;
        font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #29363d;
      }
    }

    .userListItem:nth-child(even) {
      margin-left: 10px;
    }
  }
}
</style>

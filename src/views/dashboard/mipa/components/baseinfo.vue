<template>
  <div class="baseInfo">
    <div class="baseInfo_content">
      <div class="baseInfo_content_title">— 报告目录 —</div>
      <div class="baseInfo_content_art">
        <span>本报告通过以下几个部分呈现 </span>
        <span style="color:#2461EB">{{ userInfo.name }} </span>
        <span> 的心理测评结果</span>
      </div>
      <div class="baseInfo_content_catalog">
        <div
          v-for="(item, index) in catalogList"
          :key="index"
          class="baseInfo_content_list"
          @click="changePage(index)"
        >
          <div
            :style="{ backgroundImage: 'url(' + item.url + ')' }"
            class="baseInfo_content_list_top"
          >
            <span>{{ "0" + (index + 1) }}</span>
            <span v-html="item.title">{{ item.title }}</span>
          </div>
          <div class="baseInfo_content_list_bottom" v-html="item.text">
            {{ item.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      catalogList: [
        {
          url: require("@i/catalogRed.png"),
          title: "人格风险测评结果",
          text: "报告人格风险指数和对应</br>风险状态的整体组织建议",
        },
        {
          url: require("@i/catalogBlue.png"),
          title: "人格类型测评结果",
          text: "报告情绪风险指数和对应</br>风险状态的整体组织建议",
        },
        {
          url: require("@i/catalogYellow.png"),
          title: "情绪风险测评结果",
          text: "报告情绪风险指数和对应</br>风险状态的整体组织建议",
        },
        {
          url: require("@i/catalogGreen.png"),
          title: "情绪状态测评结果",
          text:
            "报告抑郁、焦虑、身心症状、自杀</br>风险四个维度的得分情况与建议",
        },
        {
          url: require("@i/catalogYellow.png"),
          title: "心智化水平测评</br>结果",
          text:
            "报告个体觉察自己或他人心理状况</br>的能力水平和对应风险状态的整体组织建议",
        },
        {
          url: require("@i/catalogRed.png"),
          title: "价值观测评结果",
          text: "报告个体人生追求及其工作</br>相关的整体组织建议",
        },
      ],
      name: "刘邦",
    };
  },
  computed: {
    sex() {
      return this.userInfo.sex == 1 ? "男" : "女";
    },
    matrimony() {
      return this.userInfo.matrimony == 1 ? "已婚" : "未婚";
    },
  },
  methods: {
    changePage(index) {
      var id = "#menuPage" + index;
      document.querySelector(id).scrollIntoView(true);
    },
  },
};
</script>

<style scoped lang="scss">
.baseInfo {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  font-family: "Microsoft YaHei";

  .baseInfo_header {
    width: 100%;
    height: 426px;
    background: url("../../../assets/image/reportBack.png") no-repeat center
      center;
    background-size: 100% 100%;
    position: relative;
    .baseInfo_header_title {
      font-size: 28px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      width: 180px;
      text-align: center;
      line-height: 2;
      position: absolute;
      left: 18%;
      top: 50%;
      transform: translateY(-50%);
    }
    .baseInfo_header_content {
      position: absolute;
      left: 46%;
      top: 10%;
      width: 300px;
      height: 325px;
      text-align: center;

      .baseInfo_header_info {
        width: 200px;
        min-height: 220px;
        margin: 0 auto;
        margin-top: 20px;
        background: rgba(195, 218, 254, 0.4);
        border-radius: 10px;
        padding: 20px;
        text-align: left;
        font-size: 18px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        display: flex;
        flex-direction: column;
        > span {
          margin-bottom: 15px;
        }
      }
    }
  }

  .baseInfo_content {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-bottom: 35px;
    .baseInfo_content_title {
      font-size: 24px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      padding: 35px 0;
    }
    .baseInfo_content_art {
      font-size: 18px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
  }

  .baseInfo_content_catalog {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 60px 0;
    .baseInfo_content_list {
      width: 30%;
      height: 270px;
      margin-bottom: 20px;
    }
    .baseInfo_content_list_top {
      width: 100%;
      height: calc(100% - 70px);
      display: flex;
      flex-direction: column;
      // justify-content: center;
      align-items: center;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      font-size: 20px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      transition: all 0.6s;
      cursor: pointer;
      &:hover {
        transform: scale(1.1);
      }
      span {
        font-size: 20px;
        display: block;

        &:first-child {
          height: 65px;
          line-height: 60px;
          padding-top: 30px;
        }
        &:last-child {
          font-size: 18px;
          max-width: 180px;
        }
      }
    }

    .baseInfo_content_list_bottom {
      height: 40px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      margin-top: 15px;
      padding: 0 10px;
    }
  }
}
</style>

<template>
  <div class="worth">
    <titlePage :img="backImg" id="menuPage5"></titlePage>
    <section class="worth_banner">
      <div class="worth_title">{{ content }}</div>
      <div class="worth_title">{{ text }}</div>
      <div
        v-for="(item, index) in worthList"
        :key="index"
        class="worth_content"
      >
        <div class="worth_content_top">
          <img :src="item.imageUrl" alt="加载失败" class="image" />
          <div class="worth_content_left">
            <div class="worth_content_title">{{ item.tags }}</div>
            <div class="worth_content_dec">{{ item.explanation }}</div>
            <div class="worth_content_text">{{ item.detailedAnalysis }}</div>
          </div>
        </div>
        <div class="worth_content_ide" v-if="item.suggest">
          <div class="worth_content_ide_title">
            <span class="worth_content_ide_icon"> — </span>
            <span>专家建议</span>
            <span class="worth_content_ide_icon"> — </span>
          </div>
          <div class="worth_content_ide_content" v-html="item.suggest">
            {{ item.suggest }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import titlePage from "../common/title";

export default {
  components: {
    titlePage,
  },
  props: {
    worthList: {
      type: Array,
      default: () => [],
    },
    userInfo: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    text() {
      let name = this.userInfo.name;
      return (
        "本次测评主要测试" +
        name +
        "的几种终极价值观，是其希望通过一生努力实现的目标。"
      );
    },
  },
  created() {
    // console.log(this.worthList, "worthList");
  },
  data() {
    return {
      downState: false,
      backImg: "url(" + require("@i/worth.png") + ")",
      content:
        "价值观是个体核心的信念体系，是我们认定事物、辨别是非的标准，反映人们的认知和需求情况，受到教育程度、社会阶层和成长背景多方面的影响。",
    };
  },
};
</script>

<style lang="scss" scoped>
.worth {
  width: 100%;
  color: #333;
  padding-bottom: 20px;
  .worth_banner {
    padding: 20px;
  }
  .worth_title {
    font-size: 16px;
    padding: 5px 0;
  }
  // 价值观
  .worth_content {
    padding: 30px 0;
    .worth_content_top {
      display: flex;
      flex-direction: row;
      background-color: rgba(243, 243, 243, 1);
      padding: 20px;
      border-radius: 6px;
      .image {
        width: 72px;
        height: 72px;
      }
      .worth_content_left {
        width: calc(100% - 72px);
        margin-left: 20px;
        .worth_content_title {
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 10px;
          color: #333333;
        }
        .worth_content_dec {
          font-size: 14px;
          font-weight: 300;
          color: #666666;
        }
        .worth_content_text {
          font-size: 16px;
          font-weight: 300;
          padding: 20px 0;
          line-height: 1.5;
          color: #999;
        }
      }
    }
  }
  .worth_content_ide {
    font-size: 18px;

    .worth_content_ide_title {
      text-align: center;
      height: 50px;
      line-height: 50px;
      color: #666;
    }
    .worth_content_ide_icon {
      width: 20px;
      color: #2462eb;
      font-weight: 700;
    }
    .worth_content_ide_content {
      font-size: 16px;
      color: #999;
      line-height: 1.5;
      box-sizing: border-box;
      padding: 20px 20px 20px 112px;
      background-color: rgba(243, 243, 243, 1);
    }
  }
}
</style>

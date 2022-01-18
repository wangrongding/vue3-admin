<template>
  <div class='personality_type'>
    <titlePage
      :img="backImg"
      id="menuPage1"
    ></titlePage>
    <div class="personality_type_content">
      <div class="personality_type_content_text">
        <span>第二部分为人格类型测评结果，人格类型共涉及</span>
        <span class="personality_title"> 反社会/边缘/偏执/精神质/非重点关注 </span>
        <span>人格序列等五种，前四种代表不同程度的 人格障碍属于需要重点关注的对象。</span>
      </div>
      <div class="personality_type_content_text">
        <span>{{personTypeObj.testResult}}</span>
      </div>
      <cardPage
        :obj="personTypeObj"
        v-bind="$attrs"
      />
    </div>
  </div>
</template>

<script>
import titlePage from "../common/title";
import cardPage from '../common/card'

export default {
  name: 'personalityType',
  components: {
    titlePage,
    cardPage
  },
  props: {
    personTypeObj: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      backImg: "url(" + require("@i/personality-type.png") + ")"
    }
  },
}
</script>

<style lang="scss" scoped>
.personality_type_content {
  font-size: 18px;
  line-height: 2;
  color: #666;
  padding: 20px;
  .personality_title {
    color: #076ef7;
  }
  .personality_type_content_text {
    font-size: 18px;
  }
}
</style>

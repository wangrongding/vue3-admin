<template>
  <!-- 总分 -->
  <div class="textContent">
    <div class="textContentTitle">
      <img src="./assets/titleBg.png" alt="" />
      <span class="textContentName">{{ reportData.title }}</span>
    </div>
    <component
      :is="componentList[item.type - 1]"
      v-for="(item, index) in reportData.content"
      :key="index"
      :reportData="item"
    ></component>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from "vue";
import Scatter from "./charts/Quadrant.vue";
const componentList = shallowRef([Scatter, Scatter]);
defineProps({
  reportData: {
    type: Object,
    default: () => {
      return {
        title: "总分",
        type: 3,
        content: [
          {
            type: 1,
            content: [
              {
                riskLevel: "非常高",
                score: "20.0",
                interval: [
                  ["0.12", "#00E3B9"],
                  ["0.2", "#FAAD14"],
                  ["0.37", "#FF5752"],
                ],
              },
            ],
          },
          {
            type: 2,
            content: [
              {
                title: "测试结果",
                content:
                  "本次心理测评的结果显示，xxx同学的考试焦虑程度非常高, 每逢考试来临，TA会出现强烈地紧张和不安的情绪，严重时TA对考试的畏惧会让TA无法集中注意力复习，甚至发挥失常。",
              },
              {
                title: "专家建议",
                content:
                  "1.建议和该学生进行私下面谈，了解影响TA考试焦虑的因素，适当给予指导 2.建议在班级普及适当焦虑对考试表现的积极促进作用，同时教授缓解焦虑引起的生理反应的方法，如呼吸法，帮助该同学了解如何应对自己焦虑，同时提升整个班级对考试焦虑的认识。3.建议组织和TA有相似困扰的同学进行团体辅导，鼓励他们倾诉自己的考试困扰，同时练习不同的减压方式 ，如冥想等4.建议向家长了解情况，评估该学生父母的教育方式对TA的考试焦虑的影响。如有影响，可以寻求家长的配合，一起帮助降低孩子的考试焦虑 。",
              },
            ],
          },
        ],
      };
    },
  },
});
</script>

<style lang="scss" scoped>
.textContent {
  width: 1200px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 0px 8px 1px rgba(28, 193, 162, 0.15);
  border-radius: 8px;
  margin-bottom: 30px;
  padding-bottom: 40px;

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
}
</style>

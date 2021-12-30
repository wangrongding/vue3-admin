<script setup lang="ts">
import { nextTick, reactive, ref, watch } from "vue";
const inputDom = ref<any>();
const props = defineProps({
  reportData: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const msg = ref("HelloWorld"); // 响应式数据：msg
const emit = defineEmits(["confirmEdit", "closePanel"]);
const content = reactive({
  content: "",
  tempContent: "",
  id: "",
  edit: false,
});
watch(
  props.reportData,
  () => {
    console.log("🚀 / file: advice.vue / line 24 / props.reportData.suggest", props.reportData);
    setTimeout(() => {
      content.content = props.reportData.suggest;
    }, 200);
    if (props.reportData.focus) {
      nextTick(() => {
        content.edit = true;
        inputDom.value.focus();
      });
    }
  },
  { immediate: true },
);

//编辑
function edit() {
  content.edit = !content.edit;
  content.tempContent = content.content;
  inputDom.value.focus();
}

//确认更改
function confirm() {
  content.content = content.tempContent;
  emit("confirmEdit", content);
}
//取消更改
function cancel() {
  content.edit = !content.edit;
  content.tempContent = content.content;
}
//关闭面板
function close() {
  emit("closePanel");
}
//控制编辑
function confirmEdit() {}
</script>
<!-- 专家建议 -->
<template>
  <div class="page-container" id="adviceDom" ref="adviceData">
    <div class="textContentTitle">
      <img src="./assets/titleBg.png" alt="" />
      <span class="textContentName">{{ reportData.title || "专家建议" }}</span>
      <div style="position: absolute; right: 10px; top: 10px">
        <component :is="'Edit'" class="icon-btn" @click="edit"></component>
        <component :is="'Close'" class="icon-btn" @click="close"></component>
      </div>
    </div>
    <div class="content">
      <p v-show="!content.edit">{{ content.content }}</p>
      <el-input
        v-show="content.edit"
        ref="inputDom"
        v-model="content.tempContent"
        placeholder="请输入内容"
        type="textarea"
        clearable
        :autosize="{ minRows: 3 }"
      ></el-input>
    </div>
    <div style="text-align: center" v-show="content.edit">
      <el-button type="info" size="medium" @click="cancel">取消</el-button>
      <el-button type="primary" size="medium" @click="confirm">确认</el-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page-container {
  width: 1200px;
  background: #1cc1a206;
  box-shadow: 0px 0px 8px 1px rgba(28, 193, 162, 0.15);
  border-radius: 8px;
  margin-bottom: 30px;
  padding-bottom: 40px;
  .content {
    padding: 15px;
    p {
      padding: 0 15px;
    }
  }
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
    .icon-btn {
      cursor: pointer;
      width: 26px;
      height: 26px;
      padding: 10px;
      color: #00e3b9;
      &:hover {
        color: #000;
      }
    }
  }
}
</style>

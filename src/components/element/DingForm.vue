<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
  formParams: {
    type: Object,
    default: {
      data: {}, // 表单数据对象
      formList: [],
      rules: {}, // 表单验证规则
      inline: false, // 行内表单模式
      labelPosition: "right", // 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width 可选值：right/left/top
      labelWidth: "80px", // 表单域标签的宽度 支持 auto
      labelSuffix: "", // 表单域标签的后缀
      hideRequiredAsterisk: false, // 是否显示必填字段的标签旁边的红色星号
      showMessage: true, // 是否显示校验错误信息
      inlineMessage: false, // 是否以行内形式展示校验信息
      statusIcon: false, // 是否在输入框中显示校验结果反馈图标
      validateOnRuleChange: true, // 是否在 rules 属性改变后立即触发一次验证
      size: "", // 用于控制该表单内组件的尺寸 可选值：medium / small / mini
      disabled: false, // 是否禁用该表单内的所有组件
    },
    required: true,
  },
});
const dingFormDom = ref<any>();

function getOption(value: any, defaultValue: any) {
  return value === void 0 ? defaultValue : value;
}
//提交表单
function submitForm(submit: any) {
  console.log(props.formParams.data);
  dingFormDom.value.validate((valid: any) => {
    if (valid) {
      submit && submit();
    } else {
      console.log("error submit!!");
      return false;
    }
  });
}
//重置表单
function resetForm() {
  dingFormDom.value.resetFields();
}
//取消
function cancelSubmit(cancel: any) {
  cancel && cancel();
}

//文件改变钩子函数
/* function onFileChange() {
      console.log(this.$refs);
      this.$refs["upload"][0].clearFiles();
    } */

//删除文件列表中文件的钩子
/* beforeRemoveFile(file, fileList, beforeRemoveFile) {
      console.log(file, fileList, beforeRemoveFile);
      let fileIndex = JSON.parse(JSON.stringify(fileList)).findIndex((item) => {
        return item.uid == file.uid;
      });
      beforeRemoveFile && beforeRemoveFile(fileIndex);
    },
    onFileRemove(file, fileList, formFileList) {
      console.log(file, fileList, formFileList);
    },
    validate(callback) {
      this.$refs["dingFormDom"].validate(callback);
    },
    resetFields() {
      this.$refs["dingFormDom"].resetFields();
    }, */
</script>
<template>
  <el-form
    v-loading="formParams.loading"
    ref="dingFormDom"
    :model="formParams.data"
    :rules="formParams.rules"
    :inline="formParams.inline"
    :label-position="formParams.labelPosition"
    :label-width="formParams.labelWidth"
    :label-suffix="formParams.labelSuffix"
    :hide-required-asterisk="formParams.hideRequiredAsterisk"
    :show-message="formParams.showMessage"
    :inline-message="formParams.inlineMessage"
    :status-icon="formParams.statusIcon"
    :validate-on-rule-change="formParams.validateOnRuleChange"
    :size="formParams.size"
    :disabled="formParams.disabled"
  >
    <!-- <el-col :span="24"> -->
    <el-form-item
      v-for="(itemForm, key) in formParams.formList"
      :key="key"
      :prop="key.toString()"
      :label="itemForm.label"
      :label-width="itemForm.labelWidth"
      :style="itemForm.style"
      v-show="getOption(itemForm.isShow, true)"
    >
      <el-radio-group v-if="itemForm.type === 'radio'" v-model="formParams.data[key]">
        <el-radio v-for="(radioOption, index) in itemForm.radioOptions" :key="index" :label="radioOption.value">{{ radioOption.text }}</el-radio>
      </el-radio-group>
      <el-checkbox
        v-if="itemForm.type === 'checkbox'"
        v-model="formParams.data[key]"
        :true-label="itemForm.checkboxOption.trueLabel != undefined ? itemForm.checkboxOption.trueLabel : true"
        :false-label="itemForm.checkboxOption.falseLabel != undefined ? itemForm.checkboxOption.falseLabel : false"
        >{{ itemForm.checkboxOption.label ? itemForm.checkboxOption.label : itemForm.checkboxOption }}</el-checkbox
      >
      <el-checkbox-group v-if="itemForm.type === 'checkboxGroup'" v-model="formParams.data[key]">
        <el-checkbox
          v-for="(checkboxOption, index) in itemForm.checkboxOptions"
          :key="index"
          :true-label="checkboxOption.trueLabel || true"
          :false-label="checkboxOption.falseLabel || false"
          :label="checkboxOption.label ? checkboxOption.label : checkboxOption"
        ></el-checkbox>
      </el-checkbox-group>
      <el-input
        v-if="['text', 'textarea'].includes(itemForm.type)"
        :type="itemForm.type"
        v-model="formParams.data[key]"
        :maxlength="itemForm.maxlength"
        :show-word-limit="!!itemForm.maxlength"
        :placeholder="itemForm.placeholder"
        :disabled="itemForm.disabled"
        :style="`${itemForm.width ? 'width:' + itemForm.width : ''}`"
        :rows="itemForm.rows"
        clearable
        :show-password="itemForm.isPassword"
      ></el-input>
      <el-input
        v-if="itemForm.type === 'number'"
        :type="'text'"
        v-model.number="formParams.data[key]"
        :maxlength="itemForm.maxlength"
        :show-word-limit="!!itemForm.maxlength"
        :placeholder="itemForm.placeholder"
        :disabled="itemForm.disabled"
        clearable
        :show-password="itemForm.isPassword"
      ></el-input>
      <el-input-number v-if="itemForm.type === 'input-number'" v-model="formParams.data[key]"></el-input-number>
      <el-select
        v-if="itemForm.type === 'select'"
        v-model="formParams.data[key]"
        :multiple="itemForm.multiple"
        :multiple-limit="itemForm.multipleLimit"
        :style="`${itemForm.width ? 'width:' + itemForm.width : ''}`"
        clearable
        :placeholder="itemForm.placeholder"
        filterable
        @change="
          () => {
            itemForm.change && itemForm.change();
          }
        "
      >
        <template v-if="itemForm.selectOptions[0] && itemForm.selectOptions[0].options">
          <el-option-group v-for="selectOption in itemForm.selectOptions" :key="selectOption.label" :label="selectOption.label">
            <el-option v-for="item in selectOption.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-option-group>
        </template>
        <template v-else>
          <el-option
            v-for="(selectOption, index) in itemForm.selectOptions"
            :key="index"
            :label="itemForm.customLabelValue ? selectOption[itemForm.customLabelValue.label] : selectOption.label"
            :value="itemForm.customLabelValue ? selectOption[itemForm.customLabelValue.value] : selectOption.value"
          ></el-option>
        </template>
      </el-select>
      <el-cascader v-if="itemForm.type === 'cascader'" v-model="formParams.data[key]" :options="itemForm.cascaderOptions" :placeholder="itemForm.placeholder" clearable filterable></el-cascader>
      <el-switch v-if="itemForm.type === 'switch'" v-model="formParams.data[key]" :active-text="itemForm.activeText" :inactive-text="itemForm.inactiveText"></el-switch>
      <el-slider v-if="itemForm.type === 'slider'" v-model="formParams.data[key]"></el-slider>
      <el-time-select v-if="itemForm.type === 'time-select'" v-model="formParams.data[key]" :placeholder="itemForm.placeholder"></el-time-select>
      <el-time-picker
        v-if="itemForm.type === 'time-picker'"
        v-model="formParams.data[key]"
        :placeholder="itemForm.placeholder"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        :is-range="itemForm.isRange"
        :value-format="formParams.valueFormat || 'HH:mm:ss'"
      ></el-time-picker>
      <el-date-picker
        v-if="itemForm.type === 'date-picker'"
        v-model="formParams.data[key]"
        :placeholder="itemForm.placeholder"
        :disabled-date="itemForm.disabledDate"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :style="itemForm.style"
        :type="itemForm.mode"
        :value-format="itemForm.valueFormat || 'YYYY-MM-DD'"
        :default-time="itemForm.defaultTime"
        @change="
          () => {
            itemForm.onChange && itemForm.onChange();
          }
        "
      ></el-date-picker>
      <!-- <el-upload
                v-if="itemForm.type === 'upload'"
                ref="upload"
                :accept="itemForm.accept"
                :action="itemForm.action"
                :list-type="itemForm.listType"
                :auto-upload="itemForm.autoUpload ? itemForm.autoUpload : false"
                :file-list="itemForm.fileList"
                :before-remove="
                    (file, fileList) => {
                        beforeRemoveFile(
                            file,
                            fileList,
                            itemForm.beforeRemoveFile
                        );
                    }
                "
                :on-remove="
                    (file, fileList) => {
                        onFileRemove(file, fileList, itemForm.onFileRemove);
                    }
                "
                :http-request="itemForm.httpRequest"
                :limit="itemForm.limit || 1"
            >
                <i v-if="itemForm.listType === 'picture-card'" class="el-icon-plus"></i>
                <el-button
                    v-if="itemForm.listType === 'file-list'"
                    @click="
                        () => {
                            if (itemForm.limit == 1 || !itemForm.limit) {
                                onFileChange();
                            }
                        }
                    "
                    size="small"
                    type="primary"
                    :loading="itemForm.uploadLoading"
                >选择文件</el-button>
                <span v-show="itemForm.uploadLoading">上传中...</span>
                <div v-if="itemForm.listType === 'file-list'" slot="tip" class="el-upload__tip">
                    {{
                        itemForm.tip
                            ? itemForm.tip
                            : "只能上传jpg/png文件，且不超过500kb"
                    }}
                </div>
      </el-upload>-->
      <el-rate v-if="itemForm.type === 'rate'" v-model="formParams.data[key]"></el-rate>
      <el-color-picker v-if="itemForm.type === 'color-picker'" v-model="formParams.data[key]"></el-color-picker>
      <el-transfer v-if="itemForm.type === 'transfer'" v-model="formParams.data[key]" :data="itemForm.transferData"></el-transfer>
      <!-- id="richText" -->
      <div v-if="itemForm.type === 'richText'" :id="key.toString()" ref="richText"></div>
      <slot v-if="itemForm.type === 'customItem'" :name="itemForm.name ? itemForm.name : 'customItem'" :itemForm="itemForm" :formDate="formParams.data" :itemKey="key"></slot>
    </el-form-item>
    <el-form-item v-if="formParams.submit">
      <el-button type="primary" @click="submitForm(formParams.submit.submitFunction)">{{ formParams.submit.submitText || "提交" }}</el-button>
      <el-button type="info" v-if="formParams.submit.reset" @click="resetForm()">重置</el-button>
      <el-button type="info" v-if="formParams.submit.cancel" @click="cancelSubmit(formParams.submit.cancelFunction)">{{ formParams.submit.cancelText || "取消" }}</el-button>
    </el-form-item>
    <slot name="buttonGroup"></slot>
    <!-- </el-col> -->
  </el-form>
</template>

<style scoped lang="scss">
.el-select,
.el-cascader,
.el-time-select,
.el-time-picker,
.el-date-picker {
  width: 100%;
}
.el-form {
  width: 100%;
  // margin-top: 20px;
}
//行内表单
// .el-form--inline {
//   display: inline-block;
//   // :deep .el-form-item__label-wrap {
//   //   margin-left: 0 !important;
//   // }
// }
#richText {
  z-index: 2000;
}
</style>

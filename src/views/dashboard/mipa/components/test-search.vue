<template>
  <div class="test_search">
    <el-col :span="10">
      <span class="test_search_label">生成时间 </span>
      <el-date-picker
        v-model="form.time"
        type="daterange"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
      <el-checkbox
        class="test_error_check"
        true-label="0"
        false-label="1"
        v-model="form.sign"
      >异常数据</el-checkbox>
      <el-button
        type="primary"
        @click="searchCharts('time')"
      >筛选</el-button>
    </el-col>
    <el-col :span="11">
      <el-col
        :span="6"
        style="marginRight:20px"
      >
        <el-input
          class="input"
          v-model="form.userName"
          placeholder="请输入编号"
        ></el-input>
      </el-col>
      <el-button
        type="primary"
        @click="searchCharts('name')"
      >搜索</el-button>
    </el-col>
    <el-col
      :span="2"
      class="test_search_export"
    >
      <el-button
        type="primary"
        @click="exportData"
      >导出</el-button>
    </el-col>

  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default: () => { }
    },
    searchData: Function
  },
  data() {
    return {
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
        }
      },
    }
  },
  methods: {
    searchCharts(type) {
      if (type === 'time') {
        this.$set(this.form, 'name', '')
      } else {
        this.$set(this.form, 'time', [])
      }
      this.searchData(type)
    },
    exportData() {
      this.searchData('export')
    }
  }
}
</script>

<style lang="scss" scoped>
.test_search {
  padding: 0 20px;
  height: 90px;
  line-height: 90px;
  background-color: #fff;
  font-size: 18px;
  color: #333333;

  border-radius: 8px;
  .test_search_label {
    margin-right: 25px;
  }
  .test_error_check {
    padding: 0 40px 0 25px;
    /deep/.el-checkbox__inner {
      width: 28px;
      height: 28px;
      &::after {
        height: 14px;
        left: 10px;
        top: 4px;
        width: 7px;
      }
    }
  }
  .test_search_export {
    text-align: right;
  }
  /deep/.input {
    min-width: 240px;
  }
}
</style>
<template>
  <el-pagination
    class="pagination"
    :background="background"
    :current-page.sync="currentPage"
    :page-size.sync="pageSize"
    :layout="layout"
    :page-sizes="pageSizes"
    :total="total"
    v-bind="$attrs"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts" setup>
import { scrollTo } from "@/utils/scroll-to.js";
import { number } from "echarts";
import { computed } from "vue";
const props = defineProps({
  total: {
    type: Number,
    default: 0,
  },
  page: {
    type: Number,
    default: 1,
  },
  limit: {
    type: Number,
    default: 10,
  },
  pageSizes: {
    type: Array,
    default() {
      return [5, 10, 15, 20, 25];
    },
  } as any,
  layout: {
    type: String,
    default: "total, sizes, prev, pager, next, jumper",
  },
  background: {
    type: Boolean,
    default: true,
  },
  autoScroll: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["update:page", "update:limit", "pagination"]);
const currentPage = computed({
  get() {
    return props.page;
  },
  set(val) {
    emit("update:page", val);
  },
}) as any;
const pageSize = computed({
  get() {
    return props.limit;
  },
  set(val) {
    emit("update:limit", val);
  },
}) as any;

function handleSizeChange(val: any) {
  emit("pagination", { currentPage: currentPage, pageSize: val });
  if (props.autoScroll) {
    scrollTo(0, 800);
  }
}
function handleCurrentChange(val: any) {
  emit("pagination", { currentPage: val, pageSize: pageSize });
  if (props.autoScroll) {
    scrollTo(0, 800);
  }
}
</script>

<style scss scoped>
.pagination {
  margin: 10px 0 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  overflow: auto;
}
@media (max-width: 992px) {
  ::v-deep .el-pager,
  ::v-deep .btn-prev,
  ::v-deep .btn-next {
    display: none !important;
  }
  .pagination {
    justify-content: center;
  }
}
</style>

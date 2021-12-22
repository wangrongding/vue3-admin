<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
  formParams: { type: Object, default: {} },
});
</script>
<template>
  <div class="form-panel">
    <Form class="" :formParams="props.formParams" />
    <div class="rigth-buttons">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page-container {
  .form-panel {
    display: flex;
    justify-content: space-between;
  }
}
</style>

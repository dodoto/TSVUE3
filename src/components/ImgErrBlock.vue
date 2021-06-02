<template>
  <div class="error-block" :style="sizeStyle">图片获取失败</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    width: {
      type: Number,
      require: true
    },
    height: {
      type: Number,
      require: true
    }
  },
  setup(props) {

    const sizeStyle = computed(() => ({
      width: `${props.width}px`,
      height: `${props.height}px`
    }))

    return {
      sizeStyle
    }
  },
})
</script>

<style scoped>
.error-block {
  line-height: 150px;
  margin: auto;
  background-color: #E9EEF3;
  color: #333;
  font-size: 12px;
  text-align: center;
  box-shadow: 0 0 2px rgba(10, 16, 20, .12);
}
</style>

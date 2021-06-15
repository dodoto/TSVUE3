<template>
  <a href="javascript:;" @click.stop.prevent="handleClick">
    <slot></slot>
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["click"],
  setup(props, ctx) {
    const handleClick = () => ctx.emit("click");

    return {
      handleClick,
    };
  },
});
</script>

<style scoped>
a {
  color: #42b983;
}
</style>

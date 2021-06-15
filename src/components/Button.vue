<template>
  <button @click.stop.prevent="handleClick">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {},
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
button {
  outline-width: 0;
  padding: 8px 20px;
  background-color: #42b983;
  border-color: transparent;
  border-radius: 2px;
  color: #fefefe;
  cursor: pointer;
  width: 100%;
  margin-bottom: 20px;
}
button:active {
  opacity: 0.8;
}
</style>

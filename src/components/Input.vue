<template>
  <label
    v-if="label !== ''"
    class="custom-input-label"
    :for="id"
    :style="labelStyle"
    >{{ label }}</label
  >
  <div class="custom-input" :style="inputBoxStyle">
    <input
      type="text"
      :id="id"
      :style="inputStyle"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, ref } from "vue";

export default defineComponent({
  props: {
    borderColor: {
      type: String,
      default: "#42b983",
    },
    height: {
      type: Number,
      default: 30,
    },
    fontSize: {
      type: Number,
      default: 16,
    },
    label: {
      type: String,
      default: "",
    },
    labelWidth: {
      type: Number,
      default: 50,
    },
    labelAlign: {
      type: String,
      default: "left",
    },
  },
  setup(props) {
    const id = +new Date() + "";

    const isFocused = ref(false);

    const labelStyle = computed(() => {
      const { labelWidth, height, labelAlign, fontSize, borderColor } = props;
      return {
        width: `${labelWidth}px`,
        height: `${height + 2}px`,
        lineHeight: `${height + 2}px`,
        textAlign: `${labelAlign}`,
        fontSize: `${fontSize}px`,
        color: isFocused.value ? borderColor : "#2c3e50",
      };
    });

    const inputStyle = computed(() => {
      const { borderColor, fontSize, height } = props;
      return {
        outlineColor: borderColor,
        borderColor: borderColor,
        caretColor: borderColor,
        height: `${height}px`,
        fontSize: `${fontSize}px`,
      };
    });

    const inputBoxStyle = computed(() => {
      const { label, labelWidth } = props;
      if (!label) return null;
      return {
        marginLeft: `${labelWidth}px`,
      };
    });

    return {
      id,
      isFocused,
      labelStyle,
      inputStyle,
      inputBoxStyle,
      ...toRefs(props),
    };
  },
});
</script>

<style scoped>
.custom-input-label {
  float: left;
  color: #2c3e50;
}
.custom-input > input {
  outline-width: 0;
  border-width: 1px;
  border-style: solid;
  border-radius: 2px;
  padding: 0 4px;
  color: #2c3e50;
  width: 100%;
}
input:focus {
  outline-width: 1px;
}
</style>

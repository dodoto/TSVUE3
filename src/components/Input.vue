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
      :placeholder="placeholder"
      :type="type"
      :id="id"
      :style="inputStyle"
      @focus="isFocused = true"
      @blur="isFocused = false"
      :value="value"
      @input="handleUpdateValue"
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
    type: {
      type: String,
      default: "text",
    },
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  emits: ["update:value"],
  setup(props, ctx) {
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
        color: isFocused.value ? borderColor : "#537496",
      };
    });

    const inputStyle = computed(() => {
      const { borderColor, fontSize, height } = props;
      return {
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

    const handleUpdateValue = (e: Event) => {
      ctx.emit("update:value", (e.target as HTMLInputElement).value);
    };

    return {
      id,
      isFocused,
      labelStyle,
      inputStyle,
      inputBoxStyle,
      ...toRefs(props),
      handleUpdateValue,
    };
  },
});
</script>

<style scoped>
.custom-input-label {
  float: left;
}
.custom-input {
  margin: 20px 0;
}
.custom-input > input {
  outline-width: 0;
  box-sizing: border-box;
  border-width: 2px;
  border-style: solid;
  border-color: #2c3e50;
  border-radius: 2px;
  padding: 0 4px;
  width: 100%;
}
input:focus {
  border-color: v-bind(borderColor);
}
</style>

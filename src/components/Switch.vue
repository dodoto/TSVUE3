<template>
  <input 
    type="checkbox" 
    @change="valueChange"
    :checked="value" 
    :style="{backgroundColor:color}"
  >
</template>

<script lang="ts">
import { defineComponent, SetupContext, toRefs } from 'vue'

export default defineComponent({
  props: {
    value: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#42b983'
    }
  },
  emits: ['change'],
  setup(
    props, 
    ctx:SetupContext
  ) 
  {
    const valueChange = ():void => {
      const value = !props.value
      ctx.emit('change',value)
    }

    return {
      ...toRefs(props),
      valueChange
    }
  },
})
</script>

<style scoped>
input {
  appearance: none;
  border-width: 0;
  outline-width: 0;
  display: inline-block;
  width: 56px;
  height: 30px;
  border-radius: 50px;
  background-color: #fefefe;
  position: relative;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(10, 16, 20, .24), 0 0 2px rgba(10, 16, 20, .12);
}
input::before {
  content: '';
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0; 
  background-color: white;
  opacity: 1;
  border-radius: 50px;
  transition: opacity 0.2s linear;
}
input::after {
  content: '';
  display: block;
  position: absolute;
  top: 2px; left: 2px;
  width: 26px; height: 26px;
  border-radius: 100px;
  background-color: white;
  transition: transform 0.2s linear;
  box-shadow: 0 0 4px rgba(10, 16, 20, .24);
}
input:checked::after {
  transform: translateX(100%);
}
input:checked::before {
  opacity: 0;
}
</style>

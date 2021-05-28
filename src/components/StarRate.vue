<template>
  <form @change="change">
    <div class="star">
      <template v-for="rate of rateArray" :key="rate">
        <input 
          type="radio" 
          name="rating"
          :id="`rate${rate.value}`" 
          :value="rate.value" 
          :checked="value === rate.value" 
          :disabled="disable"
          :class="!disable && 'rating'"
        >
        <label :for="`rate${rate.value}`" :title="rate.title"></label>
      </template>
    </div>
  </form>
</template>

<script>
import { computed, defineComponent, toRefs } from 'vue'

export default defineComponent({
  emits: ['change'],
  props: {
    value: {
      type: String
    }
  },
  setup(props,ctx) {

    const rateArray = [
      {value:'5', title:'Amazing'},
      {value:'4', title:'Good'}, 
      {value:'3', title:'Average'},
      {value:'2', title:'Not Good'},
      {value:'1', title:'Terrible'} 
    ]
    
    const disable = computed(() => {
      if(props.value) return true
      return false
    })

    const change = e => {
      const value = e.target.value
      ctx.emit('change',value)
    }

    return {
      rateArray,
      ...toRefs(props),
      disable,
      change
    }
  },
})
</script>

<style scoped>
.star{
  display: inline-block;
  position: relative;
  width: 100px;
  height: 20px;
  padding: 0;
  border: none;
}
.star > input{
  position: absolute;
  margin-right: -100%;
  opacity: 0;
}

.star > label{
  position: relative;
  cursor: pointer;
  /* display: inline-block; */
  float: right;
  width: 20px;
  height: 20px;
  color: transparent;
  clip-path:polygon(50% 0,65% 40%, 100% 40%,72% 60%,85% 100%,50% 75%,15% 100%,28% 60%,0 40%,35% 40%);
  background-color: gray;
}

.star > input:focus + label{
  outline: none;
}

.star > input:checked~label,
.star > input:focus~label,
.star > .rating:hover~label{
  background-color: orange; 
}
</style>

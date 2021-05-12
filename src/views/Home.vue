<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Switch :value="isChecked" @change="toggle"/>
    {{len}}
    <StarRate @change="rateChange"/>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Switch from '@/components/Switch.vue'
import StarRate from '@/components/StarRate.vue'
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent( {
  name: 'Home',
  components: {
    HelloWorld,
    Switch,
    StarRate
  },
  setup() {
    const isChecked = ref(false)

    const store = useStore()

    const len = computed(() => {
      return store.state.todos.length
    })

    const toggle = (value:boolean):void => {
      isChecked.value = value
      if(value) {
        store.commit('ADDTODO')
        console.log(store.state)
      }else{
        store.commit('DELETETODO')
        console.log(store.state)
      }
    }

    const rateChange = (value:string):void => {
      alert(`当前评分${value}`)
    }

    return {
      isChecked,
      toggle,
      len,
      rateChange
    }
  }
})
</script>

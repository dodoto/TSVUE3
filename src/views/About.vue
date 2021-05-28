<template>
  <div class="about">
    <Sentence />
    <div style="height:200px;"></div>
    <Switch />
  </div>
</template>

<script>
import { computed, defineComponent, watchEffect } from 'vue'
import Sentence from '@/components/Sentence'
import Switch from 'components/Switch'

export default defineComponent({
  components: {
    Sentence,
    Switch
  },
  props: {
    id: {
      type: [String,Array]
    }
  },
  setup(props) {
    const id = computed(() => props.id)
    watchEffect(() => {
      console.log(id.value)
    })
  }
})
</script>





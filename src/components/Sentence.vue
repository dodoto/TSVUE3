<template>
  <div class="background" :style="{height:`${height}px`}">
    <p class="sentence">{{sentence}}</p>
    <div class="down" :style="{top:`${height}px`}" @click="scrollDown" v-if="showArrow">
      <i class="fa fa-angle-double-down"></i>
    </div>
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance, ref, toRefs } from 'vue'
import { useWindowHeight } from '@/hooks/index'


export default defineComponent({
  props: {
    showArrow: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {

    const height = useWindowHeight()

    const sentence = ref('')

    const wallpaperUrl = ref('')

    const instance = getCurrentInstance()

    // const axios = instance.ctx.$axios  // ctx 仅存在于开发环境

    const axios = instance.proxy.$axios

    const scrollDown = () => {
      window.scrollTo({
        top: height,
        behavior: 'smooth'
      })
    }

    axios.get('/mryj')
    .then((res) => sentence.value = res.data)
    .catch((err) => console.log(err))

    return {
      sentence,
      wallpaperUrl,
      height,
      ...toRefs(props),
      scrollDown
    }
  },
})
</script>

<style scoped>
.background {
  position: relative;
  overflow: hidden;
}
.background::before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0; left: 0;
  z-index: -1;
  background-image: url('https://api.ixiaowai.cn/gqapi/gqapi.php');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  transform: scale(1.1); 
  filter: blur(10px);
  /* background-color: rgba(141, 141, 141, 0.35);
  background-blend-mode: darken; */
  animation: fade 0.3s linear forwards;
}
.background::after {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0; left: 0;
  z-index: -1;
  background-color: rgba(160, 160, 160, 0.35);
}
p {
  display: inline-block;
  text-align:left;
  margin: 0 10px;
  font-size: 20px;
  font-weight: bold;
  color: #F2F6FC;
  position: relative;
  left: 0; top: 50%;
  transform: translateY(-50%);
}

.down {
  /**absolute后 text-align 对 inline-block 不生效 */
  position: absolute;
  width: 40px;
  left:0; right:0;
  margin: auto;
  cursor: pointer;
  user-select: none;
  font-size: 28px;
  color: #fff;
  animation: updown 1s ease-in-out infinite alternate;
}
@keyframes updown {
  from {transform: translateY(-110%);}
  to {transform: translateY(-90%);}
}
@keyframes fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>

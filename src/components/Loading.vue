<template>
  <teleport to="body">
    <transition name="fade">
      <div class="modal" v-if="show">
        <div class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    return {
      ...toRefs(props)
    }
  },
})
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0; left: 0; bottom: 0; right: 0;
  /* background-color: rgba(255, 255, 255, .4); */
}
.spinner {
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  margin: auto;
  width: 70px;
  height: 70px;
  line-height: 70px;
  text-align: center;
}

.spinner > div {
  width: 18px;
  height: 18px;
  background-color: #409EFF;
  border-radius: 100%;
  display: inline-block;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  animation-delay: -0.16s;
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% { 
    transform: scale(0);
  } 40% { 
    transform: scale(1.0);
  }
}

.fade-leave-active,
.fade-enter-active {
  transition: all .5s;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}
</style>

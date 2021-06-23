<template>
  <transition name="fade" @after-leave="close">
    <div class="custom-tip" @click.stop="visible = false" v-show="visible">
      {{ msg }}
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";

export default defineComponent({
  props: {
    message: {
      type: String,
      default: "这是一个信息提示组件",
    },
    duration: {
      type: Number,
      default: 2,
    },
    close: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const visible = ref(false);

    const autoClose = () => {
      const { duration } = props;
      if (duration > 0) {
        setTimeout(() => {
          visible.value = false;
        }, duration * 1000);
      }
    };

    const msg = computed(() => props.message);

    onMounted(() => {
      visible.value = true;
      autoClose();
    });

    return {
      visible,
      msg,
    };
  },
});
</script>

<style scoped>
.custom-tip {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 20px;
  border-radius: 4px;
  background-color: #e85b51;
  color: #fff;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.fade-leave-active,
.fade-enter-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

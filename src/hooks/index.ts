import { ref, Ref, onMounted, onBeforeUnmount, reactive } from "vue";

export function useWindowHeight(): Ref<number> {
  const initHeight = window.innerHeight;

  const height = ref(initHeight);

  const handleSizeChange = (): void => {
    height.value = window.innerHeight;
  };

  const addListener = () => {
    window.addEventListener("resize", handleSizeChange);
  };

  const removeListener = () => {
    window.removeEventListener("resize", handleSizeChange);
  };

  onMounted(addListener);

  onBeforeUnmount(removeListener);

  return height;
}

type CallBack = () => void;

export const useRequestAnimationFrameThrottle = (
  callback: CallBack
): CallBack => {
  let lock = false;
  return function () {
    if (lock === false) {
      console.log(124);
      lock = true;
      requestAnimationFrame(() => {
        callback();
        lock = false;
      });
    }
  };
};

export const useRefArray = <T>() => {
  const data = ref<T[]>([]);
  return data;
};

export const useReactiveArray = <T>() => {
  const data = reactive([]);
  return data;
};

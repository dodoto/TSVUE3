import { ref, Ref, onMounted, onBeforeUnmount, reactive, computed } from "vue";
import { useRoute } from "vue-router";
import { CANCEL_TOEKN, MyRequest } from "@/plugins/axios";

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
  const data = reactive<T[]>([]);
  return data;
};

export const useRouteName = () => {
  const route = useRoute();
  const routeName = computed(() => route.name);
  return routeName;
};

export const useCancelRequest = <T>(
  request: MyRequest,
  url: string,
  params?: object
) => {
  const data = ref<T[]>([]);
  const source = CANCEL_TOEKN.source();
  const cancel_token = source.token;
  const cancel = source.cancel;
  const handleRequest = async () => {
    data.value = await request(url, params, cancel_token);
  };
  onMounted(handleRequest);
  return {
    data,
    cancel_token,
    cancel,
  };
};
export const useCancelToken = () => {
  const source = CANCEL_TOEKN.source();
  const cancel_token = source.token;
  const cancel = source.cancel;
  return {
    cancel_token,
    cancel,
  };
};

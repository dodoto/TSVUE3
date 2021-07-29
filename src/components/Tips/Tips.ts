import { createVNode, render } from "vue";
import Tips from "./Tips.vue";
import { GlobalPropertiesInstall } from "@/utils/type";

export const tip = (message?: string, duration?: number): void => {
  const vm = createVNode(Tips, {
    message,
    duration,
    onDismiss: () => render(null, document.body),
  });
  render(vm, document.body);
};

const TipsPlugin: GlobalPropertiesInstall = {
  install: (app) => {
    app.config.globalProperties.$tip = tip;
  },
};

export default TipsPlugin;

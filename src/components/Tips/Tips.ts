import { createVNode, render } from "vue";
import Tips from "./Tips.vue";
import { GlobalPropertiesInstall } from "@/utils/type";

export const tip = (message?: string, duration?: number): void => {
  const container = document.createElement("div");
  const vm = createVNode(Tips, {
    message,
    duration,
    onDismiss: () => render(null, container),
  });
  render(vm, container);
  document.body.appendChild(container.firstChild as Element);
};

const TipsPlugin: GlobalPropertiesInstall = {
  install: (app) => {
    app.config.globalProperties.$tip = tip;
  },
};

export default TipsPlugin;

import { createVNode, render, App } from "vue";
import Tips from "./Tips.vue";

export const _tip = (message?: string, duration?: number) => {
  const container = document.createElement("div");
  const vm = createVNode(Tips, {
    message,
    duration,
    close: () => render(null, container),
  });
  render(vm, container);
  document.body.appendChild(container.firstChild as Element);
};

const TipsPlugin = {
  install: (app: App) => {
    app.config.globalProperties.$tip = _tip;
  },
};

export type TipsType = (message: string, duration: number) => void;

export default TipsPlugin;

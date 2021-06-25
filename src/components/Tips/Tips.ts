import { createVNode, render } from "vue";
import Tips from "./Tips.vue";
import { SFCWithInstall } from "@/utils/type";

export const _tip = (message?: string, duration?: number) => {
  const container = document.createElement("div");
  const vm = createVNode(Tips, {
    message,
    duration,
    onDismiss: () => render(null, container),
  });
  render(vm, container);
  document.body.appendChild(container.firstChild as Element);
};

const TipsPlugin: SFCWithInstall<typeof Tips> = Tips as SFCWithInstall<
  typeof Tips
>;

TipsPlugin.install = (app) => {
  app.config.globalProperties.$tip = _tip;
};

export type TipsType = (message: string, duration: number) => void;

export default TipsPlugin;

import { App } from "vue";

export type GlobalPropertiesInstall = {
  install(app: App): void;
};

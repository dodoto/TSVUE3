import "./plugins/axios";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axiosPlugin from "./plugins/axios";
import Ripple from "./directives/v-ripple/index";
import Drag from "./directives/v-drag/index";
import axios from "axios";
import TipsPlugin, { tip } from "./components/Tips/Tips";

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $axios: typeof axios;
    $tip: typeof tip;
  }
}

createApp(App)
  .use(axiosPlugin)
  .use(TipsPlugin)
  .use(store)
  .use(router)
  .use(Drag)
  .use(Ripple)
  .mount("#app");

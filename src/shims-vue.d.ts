/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// declare module '@vue/runtime-core' {
//   import { AxiosInstance } from 'axios'
//   // const ComponentPublicInstance extends
//   export interface ComponentCustomPropertites {
//     $axios: AxiosInstance;
//   }
// }

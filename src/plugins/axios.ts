"use strict";

import { App } from "vue";
import axios from "axios";
import { tip } from "../components/Tips/Tips";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const env = process.env.NODE_ENV;

// let baseURL: string = 'xxxxxxxx'
// if(env === 'production') {
//   baseURL = 'xxxx'
// }

const CANCEL_TOEKN = axios.CancelToken;
//自定义headers会导致 preflight , jikan-api 对 options 返回400错误导致实际 get 请求跨域报错
const config = {
  baseURL: process.env.BASE_URL,
  headers: {
    appKey: "Ct9d2WkCAIytagLB",
  },
  timeout: 10 * 1000, // Timeout
  //cancelToken: new CANCEL_TOEKN(c => console.log(c))   //里面的c是该请求的cancel函数,执行后进入请求的error
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    // console.log(config)
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data

    return response;
  },
  function (error) {
    // Do something with response error
    tip("服务器没开");
    return Promise.reject(error);
  }
);

/**GET */
export function GET(url: string, params?: object) {
  return new Promise<any>((resolve, reject) => {
    _axios
      .get(url, params)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

/**POST */
export function POST(url: string, data?: object) {
  return new Promise<any>((resolve, reject): any => {
    _axios
      .post(url, data)
      .then((res: any) => resolve(res))
      .catch((err: any) => reject(err));
  });
}

const axiosPlugin = {
  install: (app: App): void => {
    app.config.globalProperties.$axios = _axios;
  },
};

export default axiosPlugin;

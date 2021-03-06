import {TIMEOUT, STATUS_OK, baseURL, statusCodeMsg} from './config';
import axios from 'axios';
// import router from '../router';
import {dialog} from "../assets/js/dialog";
import {redirectToLogin} from "../assets/js/common";

// axios 配置
export const baseUrl = baseURL.dev;
const xhr = axios.create({
  baseURL: baseUrl,
  // baseURL: baseURL.dev,
  timeout: TIMEOUT,
  headers: {
    // 'Content-Type': 'Content-Type: application/json'
  }
});

//添加请求拦截器
xhr.interceptors.request.use(
    function (config) {
      // 添加tokens
      let token = sessionStorage.getItem('token');
      if (token) {
        config.headers.common['token'] = token;
      }
      // 如果请求是 post 的请求 用qs 配置下 请求参数
      if (config.method === 'post') {
        return config;
      }
      //在get请求的参数中加上一个随机参数
      if (config.method === 'get') {
        const random = Math.random();
        if (config.params) {
          config.params.r = random;
        } else {
          config.params = {
            r: random
          };
        }
      }
      return config;
    },
    function (error) {
      //请求错误时做些事
      return Promise.reject(error);
    }
);

// 添加响应拦截器
xhr.interceptors.response.use(
    function (response) {
      const statusCode = response.status;
      if (response.status === STATUS_OK) {
        console.log(response.data)
        if (response.data.code === '300005' || response.data.code === '300006') {
          alert(response.data.code)
          // sessionStorage.removeItem('token')
          // sessionStorage.removeItem('userInfo')
          // sessionStorage.removeItem('username')
          dialog.info('登录失效，2秒后将会跳转到登录页面');
          redirectToLogin();
        } else {
          return response.data;
        }
      } else {
        // 接口异常返回
        statusCodeMsg.forEach(function (item, index) {
          if (statusCode === item.code) {
            return Promise.reject(response.data);
          }
        });
      }
    },
    function (error) {
      return Promise.reject(error);
    }
);

export default xhr;

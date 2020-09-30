import Vue from 'vue';

export const STATUS_OK = 200;

export const TIMEOUT = 30000;

export const STATUS = 'status'; // 后台返回的状态码，如 code status 这些

export const baseURL = {
  dev: 'financial/',
  prod: 'financial/'
};

Vue.prototype.$baseURL = baseURL;

export const statusCodeMsg = [{
  code: 401,
  msg: '未授权'
},
  {
    code: 403,
    msg: 'forbidden'
  }
];

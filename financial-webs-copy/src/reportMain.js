import Vue from "vue";
import "babel-polyfill";
import VueRouter from "vue-router";
import ReportApp from "./ReportApp.vue";
import store from "./store";
import "./registerServiceWorker";
import md5 from 'js-md5'
import ElementUI from 'element-ui';
import './assets/css/index.scss';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
import {dialog} from "./assets/js/dialog";
import ycCommon, {redirectToLogin} from './assets/js/common';
import $ from 'jquery'

Vue.prototype.$echarts = echarts;
Vue.prototype.gutter = 20;

const Demo = () => import('./views/Demo/demo.vue')

Vue.config.productionTip = false;
Vue.prototype.$md5 = md5;

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(ycCommon);
const router = new VueRouter({
  base:'report/',
  routes: [
    {
      path: '/demo',
      name: 'demo',
      component: Demo
    }
  ]
});


// router.beforeEach((to, from, next) => {
//   let token = sessionStorage.getItem('token');
//   if (token) {
//     next();
//   } else {
//     dialog.info('登录失效，2秒后将会跳转到登录页面');
//     redirectToLogin();
//   }
// });

new Vue({
  router,
  store,
  render: h => h(ReportApp)
}).$mount("#reportApp");

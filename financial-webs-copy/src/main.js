import Vue from "vue";
import App from "./App.vue";
import 'babel-polyfill';
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import md5 from 'js-md5'
import echarts from 'echarts'
import ElementUI from 'element-ui';
import './assets/css/index.scss';
import 'element-ui/lib/theme-chalk/index.css';
import {formatDate} from './assets/js/date';
import $ from 'jquery'
import {dialog} from "./assets/js/dialog";
import ycCommon, {redirectToLogin} from './assets/js/common';
// 引入axios
import axios from 'axios'
import VueAxios from 'vue-axios'


const Pagination = () => import('./components/pagination');
const Navbar = () => import('./components/navbar');
const Header = () => import('./components/Header')
Vue.config.productionTip = false;
Vue.prototype.$md5 = md5;
Vue.prototype.$echarts = echarts;
Vue.prototype.gutter = 20;

Vue.component('pagination', Pagination);
Vue.component('MyHeader', Header);
Vue.component('Navbar', Navbar);
// 引入 axios
Vue.use(VueAxios, axios)

Vue.filter('formatDate', (date, format) => {
  return formatDate(date, format);
});
Vue.use(ElementUI);
Vue.use(ycCommon);

router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem('token');
  if (token) {
    next();
  } else {
    dialog.info('登录失效，2秒后将会跳转到登录页面');
    redirectToLogin();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

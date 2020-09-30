import Vue from "vue";
import "babel-polyfill";
import VueRouter from "vue-router";
import LoginApp from "./LoginApp.vue";
import store from "./store";
import "./registerServiceWorker";
import md5 from 'js-md5'
import ElementUI from 'element-ui';
import './assets/css/index.scss';
import 'element-ui/lib/theme-chalk/index.css';
import $ from 'jquery'


const Demo = () => import('./views/Demo/demo.vue')
const Login = () => import('./views/Login/Login.vue')

Vue.config.productionTip = false;
Vue.prototype.$md5 = md5;


Vue.use(ElementUI);
Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      path: '/demo',
      name: 'demo',
      component: Demo
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      component: Login
    }
  ]
});

new Vue({
  router,
  store,
  render: h => h(LoginApp)
}).$mount("#loginApp");

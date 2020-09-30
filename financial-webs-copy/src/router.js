import Vue from "vue";
import Router from "vue-router";

const Pagination = () => import(/* webpackChunkName: "app" */ "./components/pagination.vue")
const RoleManagement = () => import(/* webpackChunkName: "app" */ "./views/Management/RoleManagement")
const UserManagement = () => import(/* webpackChunkName: "app" */ "./views/Management/UserManagement")
const LogList = () => import(/* webpackChunkName: "app" */ "./views/Management/LogList")
const pdHome = () => import(/* webpackChunkName: "app" */ "./views/pd/pdHome")
const cameras = () => import(/* webpackChunkName: "app" */ "./views/pd/cameraList")
// 重点人员控制
const emphasis = () => import(/* webpackChunkName: "app" */ "./views/pd/emphasisList")
// 布控任务
const deploy = () => import(/* webpackChunkName: "app" */ "./views/pd/deploy")
// 布控库
const monitor = () => import(/* webpackChunkName: "app" */ "./views/pd/monitor")

Vue.use(Router);
Vue.component('pagination', Pagination)
export default new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: pdHome
    },
    {
      path: "/home",
      name: "home",
      component: pdHome,
    },
    {
      path: '/setting/role',
      name: 'RoleManagement',
      component: RoleManagement,
    },
    {
      path: '/setting/user',
      name: 'UserManagement',
      component: UserManagement
    },
    {
      path: '/setting/log',
      name: 'LogList',
      component: LogList
    },
    {
      path:'/pd/cameraList',
      name: 'cameras',
      component: cameras
    },
    // 重点人员控制
    {
      path:'/pd/emphasisList',
      name: 'emphasis',
      component: emphasis
    },
     // 布控任务
     {
      path:'/pd/deploy',
      name: 'deploy',
      component: deploy
    },
    // 布控库
    {
      path:'/pd/monitor',
      name: 'monitor',
      component: monitor
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (!savedPosition) {
      let el = document.getElementsByClassName('content')[0].getElementsByTagName('div')[0];
      if (el) {
        el.scrollIntoView({behavior: 'smooth',block: 'start'});
      }
    }
  }
});
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Global from '../src/global'
import router from './router'
import Home from './pages/index'
import Cs from './pages/cs'
import Friends from './pages/friends'
import LuckyDraw from './pages/luckyDraw'
import Data from './pages/data'
import {
  ToastPlugin
} from 'vux'
import  { LoadingPlugin } from 'vux'

Vue.use(VueRouter);
Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);
// Vue.prototype.axios = axios;
Vue.prototype.Global = Global.globalData;
Vue.prototype.request = Global.request;
Vue.prototype.requestGet = Global.requestGet;
Vue.prototype.local = JSON.parse(localStorage.getItem(Global.globalData.appid));
// Vue.prototype.getUrlKey = Global.getUrlKey;



// const routes = [
//   {

//     path: '/',
//     redirect: "/index",
//   },
//   {

//     path: '/index',
//     component: Home,
//     // children: [{
//     //   path: '/cs',
//     //   name: 'cs',
//     //   component: Cs
//     // }]
//   },
//   {

//     path: '/cs',
//     name: 'cs',
//     component: Cs
//   },
//   {

//     path: '/friends',
//     name: 'friends',
//     component: Friends
//   },
//   {

//     path: '/luckyDraw',
//     name: 'luckyDraw',
//     component: LuckyDraw
//   },
//   {

//     path: '/data',
//     name: 'data',
//     component: Data
//   },
//   // {
//   //   path: '/',
//   //   name: "home",
//   //   component: Home,
//   //   children: [{
//   //     path: '/cs',
//   //     name: 'cs',
//   //     component: Cs
//   //   }]
//   // }
// ]

// const router = new VueRouter({
//   mode: 'history',
//   routes,

// });

// router.beforeEach((to, from, next) => {
//   var url=window.location.href;
//   if(url.indexOf('g_state') == -1 && to.path=='/index'){
//    console.log(1)
//     next("/friends");
//   }else{
//     next();
//     console.log(2)
//   }
// });
// FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')

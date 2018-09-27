import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/index'
import Cs from '../pages/cs'
import Friends from '../pages/friends'
import LuckyDraw from '../pages/luckyDraw'
import Data from '../pages/data'


Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base:"/testtelecom/",
  routes: [
    {

      path: '/',
      redirect: "/index",
    },
    {

      path: '/index',
      name: 'index',
      component: Home,
      // children: [{
      //   path: '/cs',
      //   name: 'cs',
      //   component: Cs
      // }]
    },
    {

      path: '/cs',
      name: 'cs',
      component: Cs
    },
    {

      path: '/friends',
      name: 'friends',
      component: Friends
    },
    {

      path: '/luckyDraw',
      name: 'luckyDraw',
      component: LuckyDraw
    },
    {

      path: '/data',
      name: 'data',
      component: Data
    },
  ]
})

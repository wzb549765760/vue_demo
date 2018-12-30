import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import register from '@/components/register'
import myImf from '@/components/myImf'
import forgetPwd from '@/components/forgetPwd'
import customerService from '@/components/customerService'
import personCenter from '@/components/personCenter'
import updatePwd from '@/components/updatePwd'
import cardDetail from '@/components/cardDetail'
import listenVoice from '@/components/listenVoice'
import problemList from '@/components/problemList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/myImf',
      name: 'myImf',
      component: myImf
    },
    {
      path: '/forgetPwd',
      name: 'forgetPwd',
      component: forgetPwd
    },
    {
      path: '/personCenter',
      name: 'personCenter',
      component: personCenter
    },
    {
      path: '/customerService',
      name: 'customerService',
      component: customerService
    },
    {
      path: '/updatePwd',
      name: 'updatePwd',
      component: updatePwd
    },
    {
      path: '/cardDetail',
      name: 'cardDetail',
      component: cardDetail
    },
    {
      path: '/listenVoice',
      name: 'listenVoice',
      component: listenVoice
    },
    {
      path: '/problemList',
      name: 'problemList',
      component: problemList
    }
  ]
})

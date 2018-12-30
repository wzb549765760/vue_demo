import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import AccountManagement from '@/components/AccountManagement'
import CardShow from '@/components/CardShow'
import DepartureVoucher from '@/components/DepartureVoucher'
import EnterIdentityCard from '@/components/EnterIdentityCard'
// import EnterMobile from '@/components/EnterMobile'
import PersonalCenter from '@/components/PersonalCenter'
import InnerMoney from '@/components/InnerMoney'
import QRCodePay from '@/components/QRCodePay'
import QRCodeResult from '@/components/QRCodeResult'
import SuccessfuRegistration from '@/components/SuccessfuRegistration'
import TransactionDetails from '@/components/TransactionDetails'
import TransactionList from '@/components/TransactionList'
// import VerificationCode from '@/components/VerificationCode'
// import VisiteApply from '@/components/VisiteApply'
// import VisitEnd from '@/components/VisitEnd'
import VisitImg from '@/components/VisitImg'
import VisitList from '@/components/VisitList'
import VisitorInformationInput from '@/components/VisitorInformationInput'
import VisitorRegistration from '@/components/VisitorRegistration'
// import VisitorType from '@/components/VisitorType'
// import Avatar from '@/components/Avatar'
import IntervieweeView from '@/components/IntervieweeView'
import VisitorView from '@/components/VisitorView'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/HomePage',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/AccountManagement',
      name: 'AccountManagement',
      component: AccountManagement
    },
    {
      path: '/CardShow',
      name: 'CardShow',
      component: CardShow
    },
    {
      path: '/DepartureVoucher',
      name: 'DepartureVoucher',
      component: DepartureVoucher
    },
    {
      path: '/EnterIdentityCard',
      name: 'EnterIdentityCard',
      component: EnterIdentityCard
    },
    // {
    //   path: '/EnterMobile',
    //   name: 'EnterMobile',
    //   component: EnterMobile
    // },
    {
      path: '/PersonalCenter',
      name: 'personalCenter',
      component: PersonalCenter
    },
    {
      path: '/InnerMoney',
      name: 'InnerMoney',
      component: InnerMoney
    }, {
      path: '/QRCodePay',
      name: 'QRCodePay',
      component: QRCodePay
    },
    {
      path: '/QRCodeResult',
      name: 'QRCodeResult',
      component: QRCodeResult
    },
    // {
    //   path: '/Avatar',
    //   name: 'Avatar',
    //   component: Avatar
    // },
    {
      path: '/SuccessfuRegistration',
      name: 'SuccessfuRegistration',
      component: SuccessfuRegistration
    }, {
      path: '/TransactionDetails',
      name: 'TransactionDetails',
      component: TransactionDetails
    },
    {
      path: '/TransactionList',
      name: 'TransactionList',
      component: TransactionList
    },
    // {
    //   path: '/VerificationCode',
    //   name: 'VerificationCode',
    //   component: VerificationCode
    // },
    // {
    //   path: '/VisiteApply',
    //   name: 'VisiteApply',
    //   component: VisiteApply
    // },
    // {
    //   path: '/VisitEnd',
    //   name: 'VisitEnd',
    //   component: VisitEnd
    // },

    {
      path: '/VisitorInformationInput',
      name: 'VisitorInformationInput',
      component: VisitorInformationInput
    },
    {
      path: '/VisitorRegistration',
      name: 'VisitorRegistration',
      component: VisitorRegistration
    },
    // {
    //   path: '/VisitorType',
    //   name: 'VisitorType',
    //   component: VisitorType
    // },
    {
      path: '/VisitImg',
      name: 'VisitImg',
      component: VisitImg
    },
    {
      path: '/VisitList',
      name: 'VisitList',
      component: VisitList
    },
    {
      path: '/IntervieweeView',
      name: 'IntervieweeView',
      component: IntervieweeView
    },
    {
      path: '/VisitorView',
      name: 'VisitorView',
      component: VisitorView
    }
  ]
})

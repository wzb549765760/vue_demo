import Vue from 'vue'
import Router from 'vue-router'
/*蒙牛产品详情*/
import ProductDetail from '@/components/mengniu/productDetail'
/*蒙牛订单列表*/
import OrderList from '@/components/mengniu/orderList'
/*蒙牛确认支付*/
import ConfirmPayment from '@/components/mengniu/confirmPayment'
/*蒙牛支付成功*/
import ConfirmSuccess from '@/components/mengniu/confirmSuccess'
/*蒙牛支付失敗*/
import ConfirmFail from '@/components/mengniu/confirmFail'
/*蒙牛订单详情*/
import OrderDetail from '@/components/mengniu/orderDetail'

Vue.use(Router)

const router = new Router({
	/*mode: 'history',
	history: false,*/
	routes: [{
		path: '/',
		name: 'ProductDetail',
		component: ProductDetail,
		meta: {
			keepAlive: true,
			title: '商品详情'
		}
	}, {
		path: '/orderList',
		name: 'OrderList',
		component: OrderList,
		meta: {
			keepAlive: true,
			title: '订单确认'
		}
	}, {
		path: '/confirmPayment',
		name: 'ConfirmPayment',
		component: ConfirmPayment,
		meta: {
			keepAlive: true,
			title: '确认支付'
		}
	}, {
		path: '/confirmSuccess',
		name: 'ConfirmSuccess',
		component: ConfirmSuccess,
		meta: {
			keepAlive: true,
			title: '订单支付成功'
		}
	}, {
		path: '/confirmFail',
		name: 'ConfirmFail',
		component: ConfirmFail,
		meta: {
			keepAlive: true,
			title: '订单支付失败'
		}
	}, {
		path: '/orderDetail',
		name: 'OrderDetail',
		component: OrderDetail,
		meta: {
			keepAlive: true,
			title: '订单详情'
		}
	}, {
		path: '/',
		redirect: '/'
	}, {
		path: "*",
		redirect: "/"
	}]
})

router.beforeEach((to, from, next) => {
	if(to.meta.title) {
		document.title = to.meta.title
	}
	next();
})

export default router
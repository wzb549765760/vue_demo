<template>
	<div>
		<div class="orderMain">
			<div class="orderTittle">订单详情</div>
			<div class="orderLists">
				<div class="orderList">
					<div class="orderLogo">
						<img src="../../assets/img/mengniu/mengniu1.jpg" />
					</div>
					<div class="orderContent">
						<div class="name">{{data.name}}</div>
						<div class="price"><span>￥</span>{{data.price/100}}</div>
					</div>
					<div class="orderNum">X1</div>
				</div>

				<div class="listTittle">赠送商品：</div>
				<div class="orderList">
					<div class="orderLogo">
						<img src="../../assets/img/mengniu/mengniu.jpg" />
					</div>
					<div class="orderContent">
						<div class="name">{{data.name}}</div>
						<div class="price"><span>￥</span>{{data.giftPrice/100}}</div>
					</div>
					<div class="orderNum">X1</div>
				</div>
				<div class="listTittle">备注：赠送券兑换不包含运费</div>
			</div>
			<div class="paymentOrder">
				<div class="amountPayable">实付金额：<span>￥</span><span>{{data.totalFee/100}}</span></div>
				<div class="sureB" @click="toSale()">支付订单</div>
			</div>
		</div>
	</div>
</template>

<script>
	import http from '../../assets/js/http.js'
	export default {
		data() {
			return {
				orderId: "",
				data: ""
			}
		},
		mounted() {
			this.orderId = sessionStorage.getItem("orderId");
			this.init();
			this.getWXImf();
		},
		methods: {
			async init() {
				let params = {
					"orderId": this.orderId
				}
				this.$layer.loading('加载中...');
				let data = await http.post('/order/query', JSON.stringify(params));
				this.$layer.close();
				this.data = data.data;
			},
			async getWXImf() {
				var url = window.location.href;
				let params = {
					"url": url
				}
				this.$layer.loading('加载中...');
				let data = await http.post('/config', JSON.stringify(params));
				this.$layer.close();
				wx.config({
					debug: false,
					appId: data.data.appId,
					timestamp: data.data.timestamp,
					nonceStr: data.data.noncestr,
					signature: data.data.signature,
					jsApiList: [
						'chooseWXPay',
					]
				})
			},
			async toSale() {
				let t = this;
				let params = {
					"orderId": this.orderId
				}
				this.$layer.loading('支付中...');
				let data = await http.post('/order/pay', JSON.stringify(params));
				this.$layer.close();
				if(data.code != 200) {
					this.$layer.toast({
						icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中 
						content: data.description,
						time: 1000 // 自动消失时间 toast类型默认消失时间为2000毫秒 
					});
					return;
				}
				wx.chooseWXPay({
					timestamp: data.data.payInfo.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
					nonceStr: data.data.payInfo.nonceStr, // 支付签名随机串，不长于 32 位
					package: data.data.payInfo.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
					signType: data.data.payInfo.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
					paySign: data.data.payInfo.paySign, // 支付签名
					success: function(res) {
						t.toFindSale();
					},
					cancel: function(res) {
						t.cancelSale();
					}

				});
			},
			async cancelSale() {
				this.$layer.loading('取消中...');
				let params = {
					"orderId": this.orderId
				}
				let data = await http.post('/order/cancel', JSON.stringify(params));
				this.$layer.close();
				this.$layer.toast({
					icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中 
					content: '取消成功',
					time: 1000 // 自动消失时间 toast类型默认消失时间为2000毫秒 
				});
				let t = this;
				setTimeout(function() {
					t.$router.push({
						path: "/index"
					});
				}, 1000);
			},
			async toFindSale() {
				let params = {
					"orderId": this.orderId
				}
				this.$layer.loading('加载中...');
				let data = await http.post('/order/query', JSON.stringify(params));
				this.$layer.close();
				if(data.data.status == '01') { //weizhifu
					this.$router.push({
						path: "/productsDetail"
					});
				} else if(data.data.status == '02' || data.data.status == '03') { //cheng
					this.$router.push({
						path: "/confirmSuccess"
					});
				}
			}
		}
	}
</script>

<style scoped lang='css'>
	@import "../../assets/css/base/base.css";
	@import "../../assets/css/mengniu/orderList.css";
</style>
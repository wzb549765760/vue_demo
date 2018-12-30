<template>
	<div>
		<div class="confirmSuccessMain" v-show="saleStatus=='02'">
			<div class="confirmSuccessImf">
				<div class="confirmImf">
					<div class="logo">
						<img src="../../assets/img/mengniu/orderSucess.png" height="100%" />
					</div>
					<div class="content">
						<div class="payType">
							支付方式：<span>微信支付</span>
						</div>
						<div class="payType">
							支付金额：<span>￥{{data.totalFee/100}}</span>
						</div>
					</div>
				</div>
				<div class="confirmImf">
					<div class="logo" style="width: 120px;">
						<img src="../../assets/img/mengniu/mengniu1.jpg" height="100%"/>
					</div>
					<div class="content">
						<div class="productName">
							{{data.name}}
						</div>
						<div class="productName">
							{{data.code}}
						</div>
					</div>
				</div>
				<div class="confirmTittle">赠送商品</div>
				<div class="confirmImf">
					<div class="logo" style="width: 120px;">
						<img src="../../assets/img/mengniu/mengniu.jpg" height="100%"/>
					</div>
					<div class="content">
						<div class="productName">
							{{data.name}}
						</div>
						<div class="productName">
							{{data.giftCode}}
						</div>
					</div>
				</div>
				<div class="rollBack" @click="toDetail()">返回商品详情</div>
			</div>
		</div>
		<div class="confirmSuccessMain" style="background-color: white;padding-top: 50%;" v-show="saleStatus=='03'">
			<div class="confirmSuccessImf">
				<div class="confirmImf" style="margin-bottom: 60px;">
					<div class="logo">
						<img src="../../assets/img/mengniu/orderFail.png" height="100%"/>
					</div>
					<div class="content">
						<div class="payType">
							支付方式：<span>微信支付</span>
						</div>
						<div class="payType">
							支付金额：<span>{{data.totalFee/100}}</span>
						</div>
					</div>
				</div>
				<div class="rollBack" @click="toDetail()">返回商品详情</div>
			</div>
		</div>
	</div>
</template>

<script>
	import http from '../../assets/js/http.js'
	export default {
		data() {
			return {
				"saleStatus":"",
				"data":""
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			async init() {
				let orderId = sessionStorage.getItem("orderId");
				let params = {
					"orderId": orderId
				}
				this.$layer.loading('加载中...');
				let data = await http.post('/order/query', JSON.stringify(params));
				this.$layer.close();
				this.data = data.data;
				this.saleStatus = data.data.status;
			},
			toDetail(){
				localStorage.removeItem("orderId");
				this.$router.push({path: "/index"});
			}
		}
	}
</script>

<style scoped lang='css'>
	@import "../../assets/css/base/base.css";
	@import "../../assets/css/mengniu/confirmSuccess.css";
</style>
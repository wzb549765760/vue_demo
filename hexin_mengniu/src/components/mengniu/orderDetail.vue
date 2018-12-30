<template>
	<div>
		<div class="orderDetailMain">
			<div class="orderDetailParty" v-for="d in data">
				<div class="orderDetailTittle">{{d.orderDate | data}} {{d.orderTime}} </div>
				<div class="orderDetailLists">
					<div class="orderDetailList">
						<div class="logo">
							<img src="../../assets/img/mengniu/mengniu1.jpg" />
						</div>
						<div class="content">
							<span>{{d.name}}</span>
							<span>{{d.code}}</span>
						</div>
					</div>
					<div class="orderDetailTittle">赠送商品</div>
					<div class="orderDetailList">
						<div class="logo">
							<img src="../../assets/img/mengniu/mengniu.jpg" />
						</div>
						<div class="content">
							<span>{{d.name}}</span>
							<span>{{d.giftCode}}</span>
						</div>
					</div>
				<div class="orderDetailBottom">共2件商品 合计：¥{{d.totalFee/100}}（含运费¥{{d.transFee/100}}）</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import http from '../../assets/js/http.js'
	export default {
		data() {
			return {
				"data":""
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			async init() {
				let userId = sessionStorage.getItem("userId");
				let params = {
					"userId":userId
				}
				this.$layer.loading('加载中...');
				let data = await http.post('/order/list', JSON.stringify(params));
				this.$layer.close();
				this.data = data.data;
				console.log(data);
			}
		},
		filters:{
			data(val){
				return val.split("-")[0]+"年"+val.split("-")[1]+"月"+val.split("-")[2]+"日";
			}
		}
	}
</script>

<style scoped lang='css'>
	@import "../../assets/css/base/base.css";
	@import "../../assets/css/mengniu/orderDetail.css";
</style>
<template>
	<div>
		<div class="confirmSuccessMain" style="background-color: white;padding-top: 50%;">
			<div class="confirmSuccessImf">
				<div class="confirmImf" style="margin-bottom: 60px;">
					<div class="logo">
						<img src="../../assets/img/mengniu/orderFail.png" height="100%"/>
					</div>
					<div class="content">
						<div class="payType">
							支付方式：<span>XX支付</span>
						</div>
						<div class="payType">
							支付金额：<span>￥66.00</span>
						</div>
					</div>
				</div>
				<div class="rollBack">返回商品详情</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		mounted() {

		},
		methods: {

		}
	}
</script>

<style scoped lang='css'>
	@import "../../assets/css/base/base.css";
	@import "../../assets/css/mengniu/confirmSuccess.css";
</style>
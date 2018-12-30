<template>
	<div>
		<div class="serviceImf">
			<img src="../assets/img/personCenter.png" />
			<div class="headLogo">
				<div class="logo"></div>
			</div>
			<div class="accountName">张三</div>
			<div class="imfMain">
				<div class="imfList">
					<span>6543363</span>
					<span>会员ID</span>
				</div>
				<div class="imfList">
					<span>108273</span>
					<span>机构号</span>
				</div>
				<div class="imfList">
					<span>560</span>
					<span>可用活力值</span>
				</div>
			</div>
		</div>
		<div class="communicationType">
			<div class="type">
				<div class="logo qqfk"></div>
				<div class="content">
					<div class="left">QQ客服</div>
					<a href="http://wpa.qq.com/msgrd?v=3&uin=549765760&site=oicqzone.com&menu=yes">
						<div class="right color85b3f8">45353453453</div>
					</a>
				</div>
			</div>
			<div class="type">
				<div class="logo qqqun"></div>
				<div class="content">
					<div class="left">QQ管理群</div>
					<a href="mqqapi://card/show_pslcard?src_type=internal&version=1&uin=291829586&card_type=group&source=external">
						<div class="right color85b3f8">3243423523523</div>
					</a>

				</div>
			</div>
			<div class="type">
				<div class="logo serviceMobile"></div>
				<div class="content">
					<div class="left">公司邮箱</div>
					<a href="mailto:549765760@qq.com">
						<div class="right" style="color: black;">549765760@qq.com</div>
					</a>

				</div>
			</div>
			<div class="type">
				<div class="logo conpanyEmail"></div>
				<div class="content">
					<div class="left">客服电话</div>
					<a href="tel:021-51684382">
						<div class="right color85b3f8">021-51684382</div>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Login',
		data() {
			return {
				insNo: ''
			}
		},
		mounted() {

		},
		methods: {}

	}
</script>

<style scoped>
	@import url("../assets/css/customerService.css");
</style>
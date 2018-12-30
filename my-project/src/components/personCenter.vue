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
		<div class="personMenu">
			<div class="menuList borderBottomOrRight">
				<div class="logo">
					<img src="../assets/img/myInf.png" height="100%"/>
				</div>
				<div class="content">
					我的信息
				</div>
			</div>
			<div class="menuList borderBottomOrRight">
				<div class="logo">
					<img src="../assets/img/activityZONE.png" height="100%"/>
				</div>
				<div class="content">
					活力ZONE
				</div>
			</div>
			<div class="menuList borderBottom">
				<div class="logo">
					<img src="../assets/img/password.png" height="100%"/>
				</div>
				<div class="content">
					修改密码
				</div>
			</div>
			<div class="menuList borderRight">
				<div class="logo">
					<img src="../assets/img/registerRule.png" height="100%"/>
				</div>
				<div class="content">
					注册协议
				</div>
			</div>
			<div class="menuList borderRight">
				<div class="logo">
					<img src="../assets/img/question.png" height="100%"/>
				</div>
				<div class="content">
					常见问题
				</div>
			</div>
			<div class="menuList">
				<div class="logo">
					<img src="../assets/img/insLoginOut.png" height="100%"/>
				</div>
				<div class="content">
					机构注销
				</div>
			</div>
		</div>
		<div class="bottom">
			<span>您不是客户经理无法使用</span>
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
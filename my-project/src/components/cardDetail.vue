<template>
	<div>
		<div class="tittle">
			<span class="name">推荐信用卡数量</span>
			<span class="month">10月</span>
			<span class="num">670张</span>
		</div>
		<div class="dataMain">
			<div class="dataTittle">
				<div>10月<i></i></div>
				<div>民生银行<i></i></div>
			</div>
			<div class="dataLists">
				<span>姓名</span>
				<span>有效推荐数量</span>
			</div>
			<div class="dataLists">
				<span>张三</span>
				<span>2</span>
			</div>
			<div class="dataLists">
				<span>张三</span>
				<span>2</span>
			</div>
			<div class="dataLists">
				<span>张三</span>
				<span>2</span>
			</div>
			<div class="dataLists">
				<span>张三</span>
				<span>2</span>
			</div>
			<div class="dataNull">
				<span>暂无数据，</span>
				<span>快去努力推荐办卡赚钱吧。</span>
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
	@import url("../assets/css/cardDetail.css");
</style>
<template>
	<div>
		<div class="confirm_main">
			<i></i>
			<div class="confirm">
				<div class="tittle" v-if="confirmObj.tittleFlag"></div>
				<div class="content">
					<span>{{confirmObj.content}}</span>
				</div>
				<div class="bottom_main">
					<div class="sureButtom" @click="sure()">{{confirmObj.sureContenr}}</div>
					<div class="closeButtom" @click="close()">{{confirmObj.closeContenr}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: '',
		data() {
			return {}
		},
		props: ['confirmObj'],
		mounted() {
		},
		methods: {
			sure(){
				this.$emit('sureClick');
			},
			close(){
				this.$emit('closeClick');
			}
		}
	}
</script>

<style scoped lang='css'>
	@import "../../assets/css/base/confirm.css";
	@import "../../assets/css/base/base.css";
</style>
<template>
	<div>
		<div class="logoMain">
			<div class="logo"></div>
			<div class="tittle">
				盒卡
			</div>
		</div>
		<div class="passwordMain">
			<div class="logo insNo"></div>
			<div class="input">
				<input placeholder="输入机构号" v-model="insNo"/>
			</div>
			<div class="changePwdType"></div>
		</div>
		<div class="passwordMain">
			<div class="logo password"></div>
			<div class="input">
				<input placeholder="输入新的登录密码" type="password" v-model="pwd"/>
			</div>
			<div class="changePwdType changType">
				<div class="changMain" id="changePwdType">
					123
					<div class="slideMain">
						<div class="point"></div>***
					</div>
				</div>
			</div>
		</div>
		<div class="forgetPass" @click="forget();">忘记密码?</div>
		<div class="bottom" @click="submit">
		<div v-html="errorMsg"></div>
			<span>提交</span>
		</div>
	</div>
</template>

<script>
	import {changePassType} from '../assets/js/base/reg.js'
	import {errorMsg} from '../assets/js/base/reg.js'
	import {checkImfFlag} from '../assets/js/base/reg.js'
	export default {
		name: 'Login',
		data() {
			return {
				insNo: '',
				pwd:'',
				errorMsg:''
			}
		},
		mounted() {
			changePassType();
			this.errorMsg=errorMsg({
				message:""
			});
		},
		methods: {
			submit(){
				if(!checkImfFlag(this.insNo)){
					this.errorMsg = errorMsg({
						message:"机构号码不能为空！！！"
					});
					return;
				}
				if(!checkImfFlag(this.pwd)){
					this.errorMsg = errorMsg({
						message:"密码不能为空！！！"
					});
					return;
				}
			this.$router.push('/personCenter');
			},
			forget(){
				this.$router.push('/forgetPwd');
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import url("../assets/css/login.css");
</style>
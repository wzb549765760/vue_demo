<template>
	<div>
		<div class="passwordMain">
			<div class="input">
				<input placeholder="请输入原密码" type="password" v-model="pwd"/>
			</div>
			<div class="changePwdType changType">
				<div class="changMain">
					123
					<div class="slideMain">
						<div class="point"></div>***
					</div>
				</div>
			</div>
		</div>
		<div class="passwordMain">
			<div class="input">
				<input placeholder="6～12位字母和数字组成的密码" type="password" v-model="newPwd" maxlength="12"/>
			</div>
			<div class="changePwdType changType">
				<div class="changMain">
					123
					<div class="slideMain">
						<div class="point"></div>***
					</div>
				</div>
			</div>
		</div>
		<div class="passwordMain">
			<div class="input">
				<input placeholder="请再次输入新密码" type="password" v-model="reNewPwd" maxlength="12"/>
			</div>
			<div class="changePwdType changType">
				<div class="changMain">
					123
					<div class="slideMain">
						<div class="point"></div>***
					</div>
				</div>
			</div>
		</div>
		<div class="bottom">
			<div style="width: 100%;height: 25px;padding-left: 12.5%;line-height: 25px;text-align: left;font-size: 14px;color: red;">
				{{updatePwdError}}
			</div>
			<span @click="updatePwd();">确认修改</span>
		</div>
	</div>
</template>

<script>
	var time = 60;
	import { changePassType } from '../assets/js/base/reg.js'
	import { errorMsg } from '../assets/js/base/reg.js'
	import { checkImfFlag } from '../assets/js/base/reg.js'
	import { checkValByExp } from '../assets/js/base/reg.js'
	
	export default {
		name: 'Login',
		data() {
			return {
				pwd:"",
				newPwd:"",
				reNewPwd:"",
				updatePwdError:""
			}
		},
		mounted() {
			changePassType();
		},
		methods: {
			updatePwd:function(){
				if(!checkImfFlag(this.pwd)){
					this.updatePwdError = "原始密码不能为空";
					return;
				}
				if(!checkImfFlag(this.newPwd)){
					this.updatePwdError = "新密码不能为空";
					return;
				}
				if(!checkValByExp(this.newPwd,'passwordNew')){
					this.updatePwdError = "新密码格式错误";
					return;
				}
				if(!checkImfFlag(this.reNewPwd)){
					this.updatePwdError = "确认密码不能为空";
					return;
				}
				if(this.newPwd!=this.reNewPwd){
					this.updatePwdError = "两次输入密码不正确";
					return;
				}
			}
		},
		watch: {
			
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import url("../assets/css/updatePwd.css");
</style>
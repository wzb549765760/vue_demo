<template>
	<div>
		<div class="list_input">
			<div class="input_main">
				<div class="input_name">真实姓名</div>
				<div class="input">
					{{name}}
				</div>
			</div>
		</div>
		<div class="list_input">
			<div class="input_main">
				<div class="input_name">身份证号</div>
				<div class="input">
					{{idCard}}
				</div>
			</div>
		</div>
		<div class="list_input">
			<div class="input_main">
				<div class="input_name">手机号码</div>
				<div class="input">
					{{mobile}}
				</div>
			</div>
		</div>
		<div class="list_input">
			<div class="input_main">
				<div class="input_name">开户银行</div>
				<div class="input">
					<input placeholder="请输入开户银行" v-model="bankName" />
				</div>
			</div>
		</div>
		<div class="list_input">
			<div class="input_main">
				<div class="input_name">银行卡号</div>
				<div class="input">
					<input placeholder="请输入银行卡号" v-model="bankNum" />
				</div>
			</div>
		</div>
		<div class="list_input">
			<div class="input_main">
				<div class="input_name">邮 箱</div>
				<div class="input">
					<input placeholder="请输入您的邮箱" v-model="email" />
				</div>
			</div>
		</div>
		<div class="list_input">
			<div class="input_main">
				<div class="input_name">家庭住址</div>
				<div class="input">
					<input placeholder="请输入您的家庭住址" v-model="address" />
				</div>
			</div>
		</div>
		<div class="list_input">
			<div class="input_main">
				<div class="input_name">机构号</div>
				<div class="input">
					{{insNo}}
				</div>
			</div>
		</div>
		<div class="bottomDouble" id="submit">
			<div class="error" style="width: 100%;height: 20px;margin: auto auto;text-align: left;color: red;">
				{{myImfError}}
			</div>
			<span class="close" @click="close();">取消</span>
			<span class="sure" @click="sure();">确认修改</span>
		</div>
	</div>
</template>
<script>
	import { checkValByExp } from '../assets/js/base/reg.js'
	import { checkVal } from '../assets/js/base/reg.js'
	export default {
		name: 'HelloWorld',
		data() {
			return {
				name: '测试',
				idCard: '350702199405478787',
				mobile: '13162175330',
				insNo: '12222',
				bankName: '',
				bankNum: '',
				email: '',
				myImfError: '',
				address: ''
			}
		},
		methods: {
			close() {
				this.$router.push('/register');
			},
			sure() {
				this.myImfError = "";
				if(!checkVal(this.bankName)) {
					this.myImfError = "开户银行不能为空";
					return;
				}
				if(!checkValByExp(this.bankName, "china")) {
					this.myImfError = "开户银行格式不正确";
					return;
				}
				if(!checkVal(this.bankNum)) {
					this.myImfError = "银行卡号不能为空";
					return;
				}
				if(!checkVal(this.email)) {
					this.myImfError = "邮箱不能为空";
					return;
				}
				if(!checkValByExp(this.email, "email")) {
					this.myImfError = "邮箱格式不正确";
					return;
				}
				if(!checkVal(this.address)) {
					this.myImfError = "家庭住址不能为空";
					return;
				}
				if(!checkValByExp(this.address, "detailAddress")) {
					this.myImfError = "家庭住址格式不正确";
					return;
				}
				alert(123)
			}
		}
	}
</script>
<style scoped>
	@import url("../assets/css/register.css");
	body {
		padding: 10px 25px 30px;
	}
</style>
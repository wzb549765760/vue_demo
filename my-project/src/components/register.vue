<template>
	<div>
		<div class="list_input">
			<div class="input_main">
				<div class="input_name">真实姓名</div>
				<div class="input">
					<input placeholder="请正确填写您的名字" v-model="userName" maxlength="5" />
				</div>
			</div>
		</div>
		<div class="list_input">
			<div class="input_main">
				<div class="input_name">身份证号</div>
				<div class="input">
					<input placeholder="请输入您的身份证号码" v-model="idCard" />
				</div>
			</div>
		</div>
		<div class="list_input">
			<div class="input_main">
				<div class="input_name">手机号码</div>
				<div class="input">
					<input placeholder="请输入您的手机号码" v-model="mobile" />
				</div>
			</div>
		</div>
		<div class="list_input">
			<div class="input_main">
				<div class="input_name">图片验证码</div>
				<div class="input">
					<input placeholder="验证码" v-model="imgCode" maxlength="4" />
				</div>
			</div>
			<div class="yanzhengma">
				<span class="img">
					<img src="http://172.20.2.12:8080/xinbox/validateImg" width="100%" height="100%"/>
				</span>
			</div>
		</div>
		<div class="list_input">
			<div class="input_main">
				<div class="input_name">动态验证码</div>
				<div class="input">
					<input placeholder="短信验证码" v-model="verificationCode" />
				</div>
			</div>
			<div class="yanzhengma">
				<span v-bind:class="[getCode ? get_yes : 'get_no', yzm]" @click="getMsgCode();">
					{{yanzhenma}}
				</span>
			</div>
		</div>
		<div class="list_input">
			<div class="input_main">
				<div class="input_name">机构号</div>
				<div class="input">
					<input placeholder="请输入机构号" v-model="insNo" maxlength="5" />
				</div>
			</div>
		</div>
		<div class="register_rule">
			<span class="checkbox"></span>
			<span class="rule">
				我知晓并同意遵守本次<span style="color: red;">注册协议</span>
			</span>
		</div>
		<div class="bottom">
			<div style="width: 75%;height: 20px;margin: auto auto;text-align: left;color: red;">{{registerError}}</div>
			<span @click="registerFun();">提交</span>
		</div>
	</div>
</template>

<script>
	var timeFun = "";
	var time = 60;
	import { checkValByExp } from '../assets/js/base/reg.js'
	import { checkVal } from '../assets/js/base/reg.js'

	export default {
		name: 'Login',
		data() {
			return {
				userName: "", //用户正式姓名
				idCard: "", //身份证号码
				mobile: "", //手机号
				imgCode: "", //图形验证码
				verificationCode: "", //短信验证码
				insNo: "", //机构号
				registerError: "",
				getCode: false,
				yzm: 'yzm',
				get_yes: 'get_yes',
				get_no: 'get_no',
				yanzhenma: '获取验证码'
			}
		},
		mounted() {

		},
		methods: {
			userNameWatch: function() {
				this.checkVal({
					"china": this.userName,
					"idCard": this.idCard,
					"mobile": this.mobile,
					"digitOrEnglish": this.imgCode
				})
			},
			checkVal: function(obj) {
				var flag = true;
				for(var o in obj) {
					if(!checkValByExp(obj[o], o)) {
						flag = false;
					}
				}
				this.getCode = flag;
			},
			getMsgCode: function() {
				let self = this;
				if(!self.getCode) {
					console.log("ddd");
					self.$http.get('/xinbox/sendRegisterSms', { params: { 'applicantMobile': self.mobile, "imageValiCode": self.imgCode } }).then(
						(res) => {
							console.log(res);

						}, (err) => {
							alert(134)
						}
					)

					var getCode = setInterval(function() {
						if(time == 0) {
							clearInterval(getCode);
							time = 60;
							self.getCode = true;
							self.yanzhenma = "重新获取"
						} else {
							time--;
							self.getCode = false;
							self.yanzhenma = time + "秒后从新获取";
						}
					}, 1000);
				}

			},
			registerFun: function() { //注册
				this.registerError = "";
				if(!checkVal(this.userName)) {
					this.registerError = "真实姓名不能为空";
					return;
				}
				if(!checkValByExp(this.userName, "china")) {
					this.registerError = "真实姓名格式不正确";
					return;
				}
				if(!checkVal(this.idCard)) {
					this.registerError = "身份证号码不能为空";
					return;
				}
				if(!checkValByExp(this.idCard, "idCard")) {
					this.registerError = "身份证号码格式不正确";
					return;
				}
				if(!checkVal(this.mobile)) {
					this.registerError = "手机号不能为空";
					return;
				}
				if(!checkValByExp(this.mobile, "mobile")) {
					this.registerError = "手机号格式不正确";
					return;
				}
				if(!checkVal(this.imgCode)) {
					this.registerError = "图形验证码不能为空";
					return;
				}
				if(!checkValByExp(this.imgCode, "digitOrEnglish")) {
					this.registerError = "图形验证码格式不正确";
					return;
				}
				if(!checkVal(this.verificationCode)) {
					this.registerError = "短信验证码不能为空";
					return;
				}
				if(!checkValByExp(this.verificationCode, "integer")) {
					this.registerError = "短信验证码格式不正确";
					return;
				}
				if(!checkVal(this.insNo)) {
					this.registerError = "机构号不能为空";
					return;
				}
				if(!checkValByExp(this.insNo, "integer")) {
					this.registerError = "机构号格式不正确";
					return;
				}

				this.$router.push('/TransactionList')

			}
		},
		watch: {
			'userName': 'userNameWatch',
			'idCard': 'userNameWatch',
			'mobile': 'userNameWatch',
			'imgCode': 'userNameWatch'
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import url("../assets/css/register.css");
</style>
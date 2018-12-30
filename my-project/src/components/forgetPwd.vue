<template>
	<div>
		<div class="passwordMain">
			<div class="logo insNo"></div>
			<div class="input">
				<input placeholder="输入机构号" v-model="insNo" maxlength="5" />
			</div>
		</div>
		<div class="passwordMain">
			<div class="logo yzm"></div>
			<div class="input">
				<input placeholder="输入验证码" v-model="verificationCode" />
			</div>
			<div class="changePwdType">
				<div v-bind:class="[getCode ? clickTrue : clickFalse, yanzhengma]" @click="getMsgCode();">
					{{yanzhenma}}
				</div>
			</div>
		</div>
		<div class="passwordMain">
			<div class="logo password"></div>
			<div class="input">
				<input placeholder="输入新的登录密码" type="password" v-model="pwd" />
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
		<div class="bottom" id="submit">
			<div style="width:100%;height:25px;line-height:25px;text-align: left;color: red;font-size:14px">
				{{forgetPwdError}}
			</div>
			<span @click="submit();">提交</span>
		</div>
	</div>
</template>

<script>
	var time = 60;
	import { changePassType } from '../assets/js/base/reg.js'
	import { errorMsg } from '../assets/js/base/reg.js'
	import { checkImfFlag } from '../assets/js/base/reg.js'
	export default {
		name: 'Login',
		data() {
			return {
				insNo: '',
				getCode: false,
				clickTrue: 'clickTrue',
				clickFalse: 'clickFalse',
				yanzhengma: 'yanzhengma',
				yanzhenma: '获取验证码',
				verificationCode: '',
				pwd: '',
				forgetPwdError: ''
			}
		},
		mounted() {
			changePassType();
		},
		methods: {
			insNoWatch() {
				if(!checkImfFlag(this.insNo)) {
					this.getCode = false;
				} else {
					this.getCode = true;
				}
			},
			getMsgCode: function() {
				let self = this;
				if(self.getCode) {
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
			submit: function() {
				this.forgetPwdError = "";
				if(!checkImfFlag(this.insNo)) {
					this.forgetPwdError = "机构号不能为空";
					return;
				}
				if(!checkImfFlag(this.verificationCode)) {
					this.forgetPwdError = "验证码不能为空";
					return;
				}
				if(!checkImfFlag(this.pwd)) {
					this.forgetPwdError = "登录密码不能为空";
					return;
				}
				return;
				_self.$http.get('/plat/getQrcode', {params: {'lng': res.longitude, "lat": res.latitude}}).then(
              (res) => {
                if (res.data.success) {
                  
                } else {
                  
                }

              }, (err) => {
              }
            )
			}
		},
		watch: {
			'insNo': 'insNoWatch'
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import url("../assets/css/forgetPwd.css");
</style>
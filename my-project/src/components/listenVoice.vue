<template>
	<div>
		<div class="listen_top">
			<div class="logo"></div>
			<div class="conpanyName">盒卡</div>
			<div class="tittle">让生活更美好</div>
		</div>
		<div class="listen_logo">
			<img src="../assets/img/listenLogo.png" width="100%" />
		</div>
		<div class="listen_input">
			<div class="input_name">姓&nbsp;&nbsp;&nbsp;&nbsp;名</div>
			<div class="input">
				<input placeholder="点击输入文本" v-model="name" />
			</div>
		</div>
		<div class="listen_input">
			<div class="input_name">手机号</div>
			<div class="input">
				<input placeholder="点击输入文本" v-model="mobile" />
			</div>
		</div>
		<textarea class="textarea" placeholder="请提供您的宝贵想法，用来提升我们的服务，改进经营..." maxlength="200" v-model="textareaVal"></textarea>
		<div class="textareaNum" v-bind:style="num"><span>{{lengthVal}}</span><span>/200</span></div>
		<div class="bottom" id="submit">
			<div>asdf</div>
			<span>提交</span>
		</div>

		<div class="bombBox" id="bombBox" v-show="boxFlag">
			<i></i>
			<div class="bombMain">
				<div class="tittle">
					温馨提示
				</div>
				<div class="content">
					先想一想要说什么
				</div>
				<div class="bottomToSay" @click="iKnow();">
					我知道了
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
				name: '',
				mobile: '',
				textareaVal: '',
				boxFlag: false,
				lengthVal:0,
				num: {
					"color": "#d9d9d9"
				}
			}
		},
		mounted() {

		},
		methods: {
			iKnow: function() {
				this.boxFlag = false;
			},
			textareaFun: function() {
				this.lengthVal = this.textareaVal.length;
				if(this.textareaVal.length == 200){
					this.num = {
						"color":"red"
					}
				}else{
					this.num = {
						"color":"#d9d9d9"
					}
				}
			}
		},
		watch: {
			'textareaVal': 'textareaFun'
		}
	}
</script>

<style scoped>
	@import url("../assets/css/listenVoice.css");
</style>
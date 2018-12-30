<template>
	<div>
		<div class="problemList">
			<div class="problem">1、为什么我推荐了好几张信用卡，一张卡的奖励都没有？</div>
			<div class="answer">在对信用卡一知半解的情况下就着急办卡，往往会事与愿违。只有在了解了申卡的基础知识，知道它有哪些“坑”之后，才有机会成功办理真正适合自己的信用卡。那么，就和小融一起来看看，申请一张信用卡，都有哪些必须要知道的小常识吧！</div>
		</div>
		<div class="problemList">
			<div class="problem">2、为什么我推荐了好几张信用卡，一张卡的奖励都没有？</div>
			<div class="answer">在对信用卡一知半解的情况下就着急办卡，往往会事与愿违。只有在了解了申卡的基础知识，知道它有哪些“坑”之后，才有机会成功办理真正适合自己的信用卡。那么，就和小融一起来看看，申请一张信用卡，都有哪些必须要知道的小常识吧！</div>
		</div>
		<div class="problemList">
			<div class="problem">3、为什么我推荐了好几张信用卡，一张卡的奖励都没有？</div>
			<div class="answer">在对信用卡一知半解的情况下就着急办卡，往往会事与愿违。只有在了解了申卡的基础知识，知道它有哪些“坑”之后，才有机会成功办理真正适合自己的信用卡。那么，就和小融一起来看看，申请一张信用卡，都有哪些必须要知道的小常识吧！</div>
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
				pwd:""
			}
		},
		mounted(){
			$(".problemList .problem").click(function(){
					$(".answer").hide();
					$(this).next().show();
				})
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import url("../assets/css/problemList.css");
</style>
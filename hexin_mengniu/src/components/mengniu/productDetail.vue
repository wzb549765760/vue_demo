<template>
	<div>
		<div class="productDetailMain">
			<div class="swiperMain">
				<swiper :options="swiperOption" ref="mySwiper">
					<swiper-slide class="swiper-slide games">
						<img src="../../assets/img/mengniu/banner1.jpg" />
					</swiper-slide>
					<swiper-slide class="swiper-slide games">
						<img src="../../assets/img/mengniu/banner.png" />
					</swiper-slide>
				</swiper>
			</div>
			<div class="product_introduce">
				<div class="product_name">{{data.name}}</div>
				<div class="product_detail">{{data.descrption}}</div>
				<div class="sale_num">已售{{data.saled}}件</div>
				<div class="sale_money">
					<div class="left"><span>￥</span> {{data.price/100}}</div>
					<div class="right">{{data.salePerson}}人已买</div>
				</div>
			</div>
			<div class="product_otherMore" style="display: none;">内容后续给出</div>
		</div>
		<div class="sale_bottom" v-show="data.status=='01'" @click="buyNow()">立即购买</div>
		<div class="stock_none" v-show="data.status!='01'">商品库存不足，请稍后再试</div>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import http from '../../assets/js/http.js'
	export default {
		components: {
			swiper,
			swiperSlide
		},
		data() {
			return {
				swiperOption: {
					autoplay: {
						disableOnInteraction: false, //用户操作后是否禁止自动循环
						delay: 1500 //自自动循环时间
					}, //可选选项，自动滑动
					speed: 2000, //切换速度，即slider自动滑动开始到结束的时间（单位ms）
					loop: true, //循环切换
					grabCursor: true, //设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
					// setWrapperSize: true, //Swiper使用flexbox布局(display: flex)，开启这个设定会在Wrapper上添加等于slides相加的宽或高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
					autoHeight: true, //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化。   
					scrollbar: '.swiper-scrollbar',
					mousewheelControl: true, //设置为true时，能使用鼠标滚轮控制slide滑动
					observeParents: true, //当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper

					pagination: {
						el: '.swiper-pagination',
						clickable: true, //点击分页器的指示点分页器会控制Swiper切换
					},
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					}
				},
				computed: {
					swiper() {
						return this.$refs.mySwiper.swiper
					}
				},
				sale: true,
				data: {
					"price":0
				}
			}
		},
		mounted() {
			this.type();
		},
		methods: {
			async type() {
				let params = {}
				this.$layer.loading('加载中...');
				let data = await http.post('/key', JSON.stringify(params));
				sessionStorage.setItem("userId", data.data.userId);
				if(data.data.buy == "N") {
					$(".sale_bottom").css({
						"background": "#e5e5e5"
					});
					this.sale = false;
				}
				this.$layer.close();
				if(data.data.key == "" || data.data.key == null || data.data.key == undefined) {
					this.init();
				} else {
					this.$router.push({
						path: "/orderDetail"
					});
				}
			},
			async init() {
				let params = {
					"proId": 1
				}
				this.$layer.loading('加载中...');
				let data = await http.post('/product/detail', JSON.stringify(params));
				this.$layer.close();
				if(data.code == 200) {
					this.data = data.data;

				} else {
					this.toast(data.description);
				}
			},
			async buyNow() {
				if(!this.sale) {
					return;
				}
				let userId = sessionStorage.getItem("userId");
				let params = {
					"proId": this.data.id,
					"userId": userId,
					"num": 1,
					"totalFee": this.data.price,
					"transFee": "0"
				}
				this.$layer.loading('购买中...');
				let data = await http.post('/order/create', JSON.stringify(params));
				this.$layer.close();
				if(data.code == 200) {
					sessionStorage.setItem("orderId", data.data.orderId)
					this.$router.push({
						path: "/orderList"
					});
				} else {
					this.toast(data.description);
				}
			},
			toast(content) {
				this.$layer.toast({
					icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中 
					content: content,
					time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒 
				});
			}
		}
	}
</script>

<style scoped lang='css'>
	@import "../../assets/css/base/base.css";
	@import "../../assets/css/mengniu/productDetail.css";
</style>
<style scoped>
	img {
		width: 100%;
		height: auto;
	}
</style>
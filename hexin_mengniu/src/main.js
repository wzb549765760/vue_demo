// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
Vue.prototype.router = router;

/*弹框*/
import 'vue-layer-mobile/need/layer.css'
import layer from 'vue-layer-mobile'
Vue.use(layer)

/*轮播图*/
import VueAwesomeSwiper from 'vue-awesome-swiper'
import  'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

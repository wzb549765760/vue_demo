'use strict'
import axios from 'axios'
import qs from 'qs'

// axios 配置
//axios.defaults.timeout = 5000;
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//axios.defaults.baseURL = 'http://192.168.10.101:8888/app';

// 请求超时拦截器
axios.interceptors.request.use(config => {
	return config
}, error => {
	return Promise.reject(error.response)
})

// 请求完成后的拦截器
axios.interceptors.response.use(response => {
	return response
}, error => {
	// 这里我们把错误信息扶正, 后面就不需要写 catch 了
	return Promise.resolve(error.response)
})

function checkStatus(response) {
	// loading
	// 如果http状态码正常，则直接返回数据
	if(response && (response.status === 200 || response.status === 304 || response.status === 400)) {
		return response.data;
		// 如果不需要除了data之外的数据，可以直接 return response.data
	}
	// 异常状态下，把错误信息返回去
	return {
		status: -404,
		msg: '无法连接到服务器'
	}
}

function checkCode(res) {
	// 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
	if(res.status === -404) {

	}
	if(res.data && (!res.data.success)) {}
	return res
}

export default {
	post(url, data) {
		return axios({
			method: 'post',
//			baseURL: 'http://test.hedada.com.cn/maria',//（生产）
			baseURL: 'http://milk.omlife.com.cn/maria',//（生产 线上）
//			baseURL: 'http://192.168.1.171:28888/maria',//（本地）
			url,
			data: data,
			timeout: 60000,
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/json; charset=UTF-8',
				'Access-Control-Max-Age': '1209600'
			}
		}).then(
			(response) => {
				return checkStatus(response)
			}
		).then(
			(res) => {
				return checkCode(res)
			}
		)
	},
	get(url, params) {
		return axios({
			method: 'get',
//			baseURL: 'http://test.hedada.com.cn/maria',//（生产）
			baseURL: 'http://milk.omlife.com.cn/maria',//（生产 线上）
//			baseURL: 'http://192.168.1.171:28888/maria',//（本地）
			url,
			params, // get 请求时带的参数
			timeout: 60000,
			headers: {
				'X-Requested-With': 'XMLHttpRequest'
			}
		}).then(
			(response) => {
				return checkStatus(response)
			}
		).then(
			(res) => {
				return checkCode(res)
			}
		)
	}
}
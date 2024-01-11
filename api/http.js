import axios from 'axios';
import QS from 'qs';
import ENV_CONFIG from '@/env/index.js';
axios.defaults.baseURL = ENV_CONFIG[process.env.NODE_ENV].baseUrl;
axios.defaults.timeout = 10000; //http请求响应等待时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

// 请求拦截器
axios.interceptors.request.use(

	config => {

		// 每次发送请求之前判断是否存在token        
		const token = uni.getStorageSync('token')
		token && (config.headers.token = token);
		return config;
	},
	error => {
		return Promise.error(error);
	})
// 响应拦截器
axios.interceptors.response.use(
	response => {
		// 如果返回的errorCode为0，说明接口请求成功
		if (response.data.code === 0 || response.data.code === 0) {
			return Promise.resolve(response);
		} else {
			uni.showToast({
				title: response.data.message,
				icon: 'none',
				duration: 2000
			});
			//特殊响应码处理
			switch (response.data.code) {
				case 100: //用户未登录
					 
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/login/index'
						});
					}, 1000)

					break;
				case 101:
					// 登录过期
					uni.removeStorageSync('token')
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/login/index'
						});
					}, 1000)

					break;
					// 其他错误，直接抛出错误提示
				default:
			}
			return Promise.resolve(response);


		}
	},
	//响应码判断
	error => {
	

	});
export function get(url, params) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
			params: params
		}).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err.data)
		})
	});
}

export function post(url, params) {
	return new Promise((resolve, reject) => {
		axios.post(url, QS.stringify(params))
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data)
			})
	});
}
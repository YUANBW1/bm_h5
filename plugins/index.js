import Vue from 'vue'
import api from '@/api' // 导入api接口
import ENV_CONFIG from '@/env/index.js';

Vue.prototype.$ENV_CONFIG = ENV_CONFIG;
Vue.prototype.$api = api;

Vue.prototype.$goto =function(url){
	uni.navigateTo({
		url:url
	})
} ;
Vue.prototype.$currentPage = function () {
  let pages = getCurrentPages();
  let prePage = pages[pages.length - 1];
  return prePage;
}
Vue.prototype.$getUUID = function () {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}
Vue.prototype.$sleep = function (s = 500) {
  return new Promise(function (r) {
    setTimeout(r, s)
  })
}
Vue.prototype.$ = function (domQuery) {
   
  return new Promise((r) => {
    const query = uni.createSelectorQuery().in(this);
    query
      .select(domQuery)
      .boundingClientRect((data) => {
        r([, data]);
      })
      .exec();
  });
}
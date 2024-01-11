import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './plugins';
import store from './store'
import './uni.promisify.adaptor';

import { dataFetchingMixin } from "@/minx/index.js";
Vue.config.productionTip = false;

// 全局引入 mixin
Vue.mixin(dataFetchingMixin);
 
// 使用 require.context 导入组件
const requireComponent = require.context(
  './com', // 组件目录的相对路径
  true, // 是否查询子目录
  /\/[^/]+\/index\.vue$/ // 匹配组件文件名的正则表达式
);

// 自动注册所有组件
requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName);
  // 获取组件的 PascalCase 名称
  const componentName = fileName
    .split('/')
    .slice(-2, -1)[0];
  Vue.component(
    componentName,
    componentConfig.default || componentConfig
  );
});

 
App.mpType = 'app'
const app = new Vue({
	store,
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
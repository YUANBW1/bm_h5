// 开发环境
const development = {
	baseUrl: 'http://192.168.3.9:8001'

}



// 生产环境
const production = {
	baseUrl: 'http://yuanbw.w1.luyouxia.net/api'

}


// 注意:这里的属性名要和上面package.json中定义的扩展节点编译名称相同
const ENV_CONFIG = {
	development,
	production

}

module.exports = ENV_CONFIG
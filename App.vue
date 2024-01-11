<script>
	export default {
		onLaunch: function() {
			  this.$store.dispatch("commonLoad");
			// //隐藏系统tabbar
			// uni.hideTabBar();
			// 获取系统栏高度
			uni.getSystemInfo({
				success: res => {
					uni.setStorageSync('BarHeight', res.statusBarHeight + 44)
				}
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>

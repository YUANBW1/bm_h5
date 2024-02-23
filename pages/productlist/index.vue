<template>
	<comm-container @load="loaded = true" :refresherEnabled="true">
		<!-- <comm-title slot="header"></comm-title> -->
		<view class="search-box" slot="header">
			<comm-search type='input' v-model="keyword"></comm-search>
		</view>
		<view class="home-box">
			<comm-list ref='list' :keyword="keyword"></comm-list>
		</view>
		<!-- <comm-menu slot="footer"   ></comm-menu> -->
	</comm-container>
</template>

<script>
	export default {
		data() {
			return {
				keyword: ''
			}
		},
		created() {
			if (this.$route.query.keyword) {
				this.keyword = this.$route.query.keyword;
			}
		},
		methods: {},

	}
</script>

<style lang="scss" scoped>
	.search-box {
		height: 180rpx;
		/* 或者尝试设置一个明确的高度 */
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		color: #B3B3B3;
	}

	.home-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
	}
</style>
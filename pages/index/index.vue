<template>
	<comm-container @load="loaded = true" :refresherEnabled="true">
		<!-- <comm-title slot="header"></comm-title> -->
		<view class="search-box" slot="header">
			<comm-search url="/pages/search/index"></comm-search>
		</view>
		<view class="home-box">

			<comm-swiper style="margin-top: 20px;"></comm-swiper>
			<comm-tabs @click="searchCategory">
				<!-- <view class="tab-content-box" slot='tab-content'>
				</view> -->
			</comm-tabs>
			<view class="tips-box">
				<view class="sale-text">Flash Sale</view>
				<comm-countdown :countdownTime="5000"></comm-countdown>
				<view class="see-text">See all</view>
			</view>

			<comm-list ref='list' :category="category"></comm-list>
		</view>
		<!-- <comm-menu slot="footer"   ></comm-menu> -->
	</comm-container>

</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				category: '',
			}
		},

		onShow() {


		},
		mounted() {

		},


		methods: {
			searchCategory(category) {
				console.log(category)
				this.category = category;
			}

		}
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


		.tab-content-box {
			height: 200rpx;
			width: 100%;
			background-color: red;
		}

		.tips-box {
			margin-top: 48rpx;
			display: flex;
			width: 640rpx;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			.sale-text {
				font-size: 32rpx;
				font-weight: 600;
				color: rgba(32, 32, 32, 1);
			}

			.see-text {
				color: #DD5D79;
				font-size: 28rpx;
				font-weight: 400;
			}
		}

		.list-box {
			width: 640rpx;
			height: 500rpx;

		}
	}
</style>
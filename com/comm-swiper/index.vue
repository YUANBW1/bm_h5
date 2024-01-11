<template>
	<view class="banner-box">
		<swiper class="swiper-box" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
			:duration="duration">
			<swiper-item v-for="(item,i) in 3 " :key="i" @click="clickBanner(item)">
				<image class="banner-icon"></image>
			</swiper-item>

		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				bannerList: []
			}
		},
		created() {

		},
		methods: {
			clickBanner(item) {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.banner-box {
		display: flex;
		width: 100%;
		height: 420rpx;
		flex-direction: row;
		justify-content: center;

		.swiper-box {
			width: 640rpx;
			height: 420rpx;

			.banner-icon {
				width: 640rpx;
				height: 365rpx;
				background-image: url('images/test.png');
				background-position: center;
				background-size: 640rpx 365rpx;
			}

			//重写dot样式
			/deep/ {
				.uni-swiper-dot {
					background-color: #d8d8d8;
					width: 12rpx;
					height: 12rpx;
					bottom: 0;
				}

				.uni-swiper-dot-active {
					background-color: #ECB7BB;
					width: 64rpx;
					border-radius: 6rpx;
				}
			}


		}


	}
</style>
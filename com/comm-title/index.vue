<template>
	<view class="title-box">
		<view class="title-left"></view>
		<view class="title-logo"></view>
		<view class="title-right"></view>
	</view>
</template>

<script>
	export default {

	}
</script>

<style scoped lang="scss">
	.title-box {
		position: sticky;
		top: 0;
		z-index: 1000;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		height: 48rpx;
		.title-left {
			width: 48rpx;
			height: 48rpx;
		}

		.title-logo {
			height: 50rpx;
			width: 80rpx;
			background-image: url('@/static/logo.png');
			background-size: 80rpx 50rpx;
			background-position: center;
			background-repeat: no-repeat;
		}

		.title-right {
			width: 48rpx;
			height: 48rpx;
		}
	}
</style>
<template>
	<view class="ui-loading-box">
		<image :src="require('./images/loading.gif')" />
	</view>
</template>

<style lang="scss" scoped>
	.ui-loading-box {
		width: 100%;
		height: 215rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #fff;
	    
		image {
			width: 320rpx;
			height: 215rpx;
			flex: none;
		 
		}
	}
</style>
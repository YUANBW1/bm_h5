<template>
	<view class="comm-btn-box" @click="$emit('click',$event)">{{text}}</view>
</template>

<script>
	export default {
		props:{
			text:{
				type:String,
				default(){
					return 'LOG IN'
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.comm-btn-box{
		position: absolute;
		bottom: 80rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 640rpx;
		height: 100rpx;
		background: #ECB7BB;
		color: #8D5F62;
	}
</style>
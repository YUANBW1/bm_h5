<template>
	<view class="color-box">
		<view v-for="(item,key) in list" @click="selectColor(item)" class="color-item" :style="{backgroundColor:item}"
			:class="item===value?'selected':''" :key="key"></view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {},
			value: {
				type: String,
				default () {
					return '#FED1C3'
				}
			}
		},
		methods: {
			selectColor(key) {
				this.$emit('input', key)
			}
		}
	}
</script>

<style scoped lang="scss">
	.color-box {
		height: 140rpx;
		width: 400rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;

		.color-item {
			width: 40rpx;
			height: 40rpx;
			border-radius: 30rpx;
			border: 10rpx solid #fff;
		}

		.selected {
			box-shadow: 0 6rpx 24rpx rgba(0, 0, 0, 0.2);
			border: 10rpx solid #fff;
		}
	}
</style>
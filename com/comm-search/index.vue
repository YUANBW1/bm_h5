<template>
	<view class="ui-search-box">
		<view class="search-input-box">
			<view class="icon-box"></view>
			<view v-if="type=='view'" class="input-box" @click="gotoPage">Search Product</view>
			<input v-else class="input-box" :value="value" @input="inputValue" :focus="true"
				placeholder="Search Product" maxlength="20" @keydown.enter="$emit('keydown',value)"></input>
		</view>

		<view class="search-btn-box"></view>
	</view>
</template>

<script>
	export default {
		props: {
			value: {},
			url: {},
			type: {
				type: String,
				default () {
					return 'view'
				}
			}
		},

		methods: {
			inputValue(e) {
				this.$emit("input", e.detail.value);
			},
			gotoPage() {

				uni.navigateTo({
					url: this.url
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.ui-search-box {
		width: 640rpx;
		height: 100rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		.search-input-box {
			width: 520rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			background: #F6F6F7;

			.icon-box {
				width: 100rpx;
				height: 100rpx;
				background-image: url('images/icon-search.png');
				background-position: center;
				background-repeat: no-repeat;
				background-size: 48rpx 48rpx;
			}

			.input-box {
				width: 420rpx;
				height: 100rpx;
				display: flex;
				flex-direction: row;
				align-items: center;

			}
		}

		.search-btn-box {
			height: 100rpx;
			width: 100rpx;
			background-image: url('images/icon-btn.png');
			background-position: center;
			background-size: 100rpx 100rpx;
			background-repeat: no-repeat;
		}

	}
</style>
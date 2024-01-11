<template>
	<comm-container @load="loaded = true" class="customer-container-box">
		<view class="page-search-box">
			<view class="search-box">
				<comm-search type='input' v-model="keyword"></comm-search>
			</view>
		</view>
	</comm-container>


</template>

<script>
	export default {
		data() {
			return {
				keyword:''
			};
		}
	}
</script>

<style lang="scss" scoped>
	.customer-container-box {
		/deep/ {
			.uni-scroll-view {
				overflow: hidden !important;
			}
		}

		.page-search-box {
			display: flex;
			flex-direction: column;
			align-items: center;
			 
			.search-box {
				margin-top: 48rpx;
				width: 640rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
			}
		}
	}
</style>
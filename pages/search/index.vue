<template>
	<comm-container @load="loaded = true" class="customer-container-box">
		<view class="page-search-box">
			<view class="search-box">
				<comm-search type='input' v-model="keyword" @keydown="searchKeyword"></comm-search>
			</view>
			<view class="recommend-box">

				<view v-for="(item,index ) in recommend_list" :key="index" class="recommend-tag"
					@click="searchKeyword(item)">{{item}}</view>

			</view>
			<view class="history-box">
				<view class="history-title">
					<view class="title-text">历史记录</view>
					<view class="delete-icon" @click="deleteHistory"></view>
				</view>
				<view class="tag-box">
					<view v-for="(item,index) in history_list" :key="index" class="history-tag"
						@click="searchKeyword(item)">
						{{item}}
					</view>
				</view>
			</view>
		</view>
	</comm-container>


</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				recommend_list: ['推荐1', '推荐2', '推荐3', '推荐4', '推荐5', '推荐6', '推荐7', '推荐8'],
				history_list: [],
			};
		},
		onShow() {
			this.getHistory();
		},
		methods: {
			getHistory() {
				let historylist = uni.getStorageSync('history');
				if (historylist) {
					this.history_list = JSON.parse(historylist);
				} else {
					this.history_list = [];
				}
			},
			deleteHistory() {
				let t = this;
				uni.showModal({
					title: '提示',
					content: '确认删除历史记录吗?',
					success: function(res) {
						if (res.confirm) {
							// 执行确认后的操作
							uni.removeStorageSync('history');
							t.getHistory();
						} else {
							// 执行取消后的操作
						}
					}
				})
			},
			searchKeyword(keyword) {
				const text = keyword ? keyword : this.keyword;
				let historylist = uni.getStorageSync('history') ? JSON.parse(uni.getStorageSync('history')) : [];
				if (historylist) {
					//最新记录写入
					historylist.unshift(text);
					//历史记录去重
					historylist = Array.from(new Set(historylist));
				}
				//更新缓存
				uni.setStorageSync('history', JSON.stringify(historylist));
				//跳转商品搜索页
				uni.navigateTo({
					url: `/pages/productlist/index?keyword=${text}`
				})
			},

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

			.recommend-box {
				width: 640rpx;

				display: flex;
				flex-direction: row;
				margin-top: 10rpx;
				flex-wrap: wrap;

				.recommend-tag {
					padding: 20rpx;
					height: 20rpx;
					background-color: #f2f2f2;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
					border-radius: 20rpx;
					margin-right: 20rpx;
					margin-top: 20rpx;
				}


			}

			.history-box {
				width: 640rpx;
				display: flex;
				flex-direction: column;
				margin-top: 20rpx;

				.history-title {
					font-size: 32rpx;
					font-weight: 700;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
					height: 70rpx;

					.title-text {
						width: 200rpx;
					}

					.delete-icon {
						width: 45rpx;
						height: 45rpx;
						background-image: url('images/delete.png');
						background-position: center;
						background-size: 45rpx 45rpx;
					}

				}

				.tag-box {
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					width: 640rpx;

					.history-tag {
						padding: 20rpx;
						height: 20rpx;
						background-color: #f2f2f2;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;
						border-radius: 20rpx;
						margin-right: 20rpx;
						margin-top: 20rpx;
					}
				}


			}
		}
	}
</style>
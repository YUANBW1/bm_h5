<template>
	<comm-container background="#F6F6F7" @load="loaded = true" :refresherEnabled="true" :tabBar="false">
		<view class="list-box">
			<view class="item-box" v-for="(item,key) in data" :key="key">
				<view class="barnd-box">{{item.product_brand}}</view>
				<view class="product-box">

					<img class="product-image-box" :src="base_url+item.product_banner_url" alt="" />
					<view class="product-desc-box">
						<view class="title-text">{{item.product_name}}</view>
						<view class="desc-text">{{ specifications(item.product_specifications)}}</view>
					</view>
					<view class="total-count">x{{item.quantity}}</view>
				</view>
				<view class="total-box">实付款￥{{item.total_price}}</view>
			</view>
		</view>
		<comm-loading v-show="loading===true"></comm-loading>
		<view class="nomore-box" v-if="no_more===true">
			没有更多
		</view>
	</comm-container>
</template>

<script>
	import {
		dataFetchingMixin
	} from "@/minx/list.js";
	export default {
		mixins: [dataFetchingMixin],
		data() {
			return {
				data: [],
				page: 1,
				page_size: 10,
				no_more: false,
				loading: false,
				total: 0,
				base_url: ''
			}
		},
		mounted() {
			this.base_url = this.$ENV_CONFIG[process.env.NODE_ENV].baseUrl; //图片域名设置，直接在标签内使用会报错，先放这定义
			this.currentPage = this.$currentPage();

			uni.$on(this.currentPage.$container_.pulldownKey, this.onpulldown);
			uni.$on(this.currentPage.$container_.pullupKey, this.pullup);
			this.getData();

		},
		beforeDestroy() {

			uni.$off(this.currentPage.$container_.pulldownKey, this.onpulldown);
			uni.$off(this.currentPage.$container_.pullupKey, this.pullup);

		},
		methods: {
			specifications(data) {
				data = JSON.parse(data)
				if (data.color) {
					console.log(data.color)
					let text = ''
					switch (data.color) {
						case "#ECB7BB":
							text = '浅粉红'
							break;
						case "#F0D8C6":
							text = '浅杏仁色'
							break;
						case "#FED1C3":
							text = '浅橙红色'
							break;
						case " #DFC6B2":
							text = '淡橙灰色'
							break;
					}
					return `颜色: ${text}`

				}
			},
			async getData(e) {
				if (this.loading) {
					await this.$sleep(500); //上一次未加载完成。延迟500毫秒后重新发出新的请求
					await this.getData();
				};
				this.loading = true;
				if (this.no_more) {
					this.loading = false;
					return;
				}
				let {
					code,
					data
				} = await this.$api.order.orderlist({
					page_index: this.page,
					page_size: this.page_size
				});
				if (code == 0) {
					this.total = data.total;
					this.data = this.data.concat(data.list)
				}
				if (this.data.length >= data.total) {
					this.no_more = true;
				} else {
					this.page++;
				}
				this.loading = false;

			},
			async onpulldown() {
				//下来刷新，重新获取list
				this.data = [];
				this.page = 1;
				this.no_more = false;
				await this.getData();
			},

			async pullup() {

				await this.getData();

			},
		}
	}
</script>

<style scoped lang="scss">
	.list-box {

		display: flex;
		flex-direction: column;
		width: 100vw;
		background-color: #F6F6F7;
		align-items: center;

		.item-box {
			width: 670rpx;
			height: 300rpx;
			border-radius: 20rpx;
			margin-top: 20rpx;
			background-color: #fff;
			display: flex;
			flex-direction: column;
			padding: 0 20rpx;

			.barnd-box {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: flex-start;
				height: 100rpx;
				font-size: 30rpx;
				font-weight: 700;
				color: #000;
			}

			.product-box {
				display: flex;
				flex-direction: row;
				align-items: flex-start;
				justify-content: space-between;
				.product-image-box {
					width: 100rpx;
					height: 100rpx;
				}

				.product-desc-box {

					width: 500rpx;
					display: flex;
					flex-direction: column;

					.title-text {
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: flex-start;
						height: 40rpx;
						width: 500rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						font-size: 26rpx;
						font-weight: 700;
					}

					.desc-text {
						width: 500rpx;
						font-size: 26rpx;
						font-weight: 700;
						color: #d3d3d3;
						word-wrap: break-word
					}
				}

			}

			.total-box {
				height: 60rpx;
				margin-top: 20rpx;
				display: flex;
				align-items: center;
				font-size: 26rpx;
				font-weight: 700;
				justify-content: flex-end;
			}
		}

	}

	.nomore-box {
		height: 100rpx;

		background-color: #F6F6F7;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		color: #999;
	}
</style>
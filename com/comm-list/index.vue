<template>
	<view class="comm-list-box">
		<!-- 商品列表 -->
		<comm-card v-for="(item, index) in data" :info="item" :key="index">
		</comm-card>
		<comm-loading v-show="loading===true"></comm-loading>
		<view class="nomore-box" v-if="no_more===true">
			没有更多
		</view>

	</view>
</template>

<script>
	import {
		dataFetchingMixin
	} from "@/minx/list.js";
	export default {
		mixins: [dataFetchingMixin],
		props: {
			category: {
				type: String,
				default () {
					return ""
				}
			},
			keyword: {
				type: String,
				default () {
					return ""
				}
			}
		},
		data() {
			return {
				data: [],
				page: 1,
				page_size: 10,
				no_more: false,
				loading: false,
				total: 0,

			};
		},
		mounted() {

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
			async getData() {

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
				} = await this.$api.product.productlist({
					page_index: this.page,
					page_size: this.page_size,
					category: this.category && this.category != 'ALL' ? this.category : undefined,
					keyword: this.keyword ? this.keyword : undefined,
				});
				if (code == 0) {
					this.total = data.total;
					this.data = this.data.concat(data.list)
				}

				await this.$sleep(500);
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

		},
		watch: {
			category(n, o) {
				this.onpulldown();
			},
			keyword(n, o) {
				this.$delay(() => {
					this.onpulldown();
				}, 300);

			}
		}
	};
</script>

<style lang="scss" scoped>
	.comm-list-box {
		width: 650rpx;
		min-height: 700rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.nomore-box {
			height: 100rpx;
			width: 640rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			color: #999;
		}
	}
</style>
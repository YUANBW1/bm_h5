<template>
	<view class="card-box" @click="jumpTo()" >
		<view class="discount-box">{{discount}}%</view>
		<view class="detail-image-box"></view>
		<view class="desc-box">
			<view class="desc-brand">{{info.brand}}</view>
			<view class="desc-name">{{info.product_name}}</view>
			<view class="desc-price">
				<view class="original-price">${{info.original_price}}</view>
				${{info.price}}
			</view>
			<view class="desc-inventory">
				<view class="progress-container">
					<view class="progress-bar" :style="{ width: progressPercentage + '%' }"></view>
				</view>
				<view class="progress-info">
					Remaining: {{remainingInventory}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			info:{}
		},
		data() {
			return {
				remainingInventory: 60, // 替换为实际的剩余库存数
			}
		},
		computed: {
			progressPercentage() {
				return (this.remainingInventory / 100) * 100;
			},
			discount(){
				 
				return (1-this.info.price/this.info.original_price)*100;
			}
		},
		created() { 	 
			this.remainingInventory = this.info.stock_quantity;
			// setInterval(this.reduceInventory, 3000);
			
		},
		methods: {
			reduceInventory() {
				// 减少库存
				if (this.remainingInventory > 0) {
					this.remainingInventory--;
				}
			},
			jumpTo(id){
				
				uni.navigateTo({
					url:`/pages/productinfo/index?id=${this.info.id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.card-box {
		margin: 30rpx 10rpx 0 0;
		flex: 0 0 calc(50% - 20rpx);
		width: 300rpx;
		height: 500rpx;
		border: 1rpx solid rgba(200, 200, 200, 0.2);
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		border-radius: 20rpx;
		position: relative;
		background-color: #fff;
 
		.discount-box {
			height: 80rpx;
			width: 80rpx;
			background-color: #DD5D79;
			color: #fff;
			border-radius: 40rpx;
			font-size: 20rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			margin: 12rpx 0 0 8rpx;
		}

		.detail-image-box {
			position: absolute;
			width: 240rpx;
			height: 240rpx;
			left: 0;
			right: 0;
			bottom: 0;
			top: 54rpx;
			margin: 0 auto;
			background-image: url('../../com/comm-card/images/image 80.png');
			background-position: center;
			background-size: 240rpx 240rpx;
			background-repeat: no-repeat;
		}

		.desc-box {
			display: flex;
			flex-direction: column;
			width: 280rpx;
			margin-left: 14rpx;
			margin-top: 230rpx;
			.desc-brand {
				color: #B3B3B3;
				font-size:24rpx;
				font-weight: bold;
			}

			.desc-name {
				color: #202020;
				font-size: 24rpx;
				white-space: nowrap;
				/* 防止文字换行 */
				overflow: hidden;
				/* 隐藏溢出的内容 */
				text-overflow: ellipsis;
				/* 使用省略号表示溢出的文本 */
				width: 280rpx;
			}

			.desc-price {
				display: flex;
				flex-direction: row;
				align-items: center;
				height: 50rpx;
				color: #202020;
				font-size: 30rpx;
				font-weight: 600;

				.original-price {
					margin-right: 10rpx;
					height: 50rpx;
					font-weight: normal;
					text-decoration: line-through;
					/* 添加删除线样式 */
					color: #B3B3B3;
					font-size: 28rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
				}
			}

			.desc-inventory {
				width: 280rpx;

				.progress-container {
					width: 280rpx;
					height: 14rpx;
					background-color: #F6F6F7;
					border-radius: 7rpx;
				}

				.progress-bar {
					height: 100%;
					background-color: #DD5D79;
					border-radius: 7rpx;
				}

				.progress-info {
					margin-top: 4rpx;
					color: #B3B3B3;
					font-size: 22rpx;
				}
			}
		}
	}
</style>
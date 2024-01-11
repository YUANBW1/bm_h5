<template>
	<view class="info-box" v-if="data!=''">
		<view class="info-image"  :style="{ backgroundImage: 'url(' +base_url+data.product_banner_url + ')'}">
 
		</view>
		<view class="info-info-box">
			<view class="info-brand-text">
				<view>{{data.brand}}</view>
				<view>${{data.original_price.toFixed(2)}}</view>
			</view>
			<view class="info-name-text">
				<view class="product-name-text">{{data.product_name}}</view>
				<view>${{data.price.toFixed(2)}}</view>
			</view>
			<comm-colors :list="data.specifications.colors" v-model="color"></comm-colors>

			<view class="desc-box">{{data.description}}</view>

		</view>
		<comm-btn class="buy-box" text="BUY NOW" @click="$refs.popup.open('bottom')"></comm-btn>
		<uni-popup ref="popup" class="popup-box">
			<view class="popup-content">
				<view class="content-box">
					<view class="shades-box">Shades</view>
					<comm-colors :list="data.specifications.colors" v-model="color"></comm-colors>
					<view class="item-total-box">Items</view>
					<comm-count v-model="count_value" style="margin-top: 20px;"></comm-count>
					<view class="line-box"></view>
					<view class="total-price">
						<view class="price-desc-text">Total price</view>
						<view class="price-text">${{totalPrice}}</view>
					</view>
					<comm-btn class="checkout-box" text="CHECKOUT" @click="buyProduct"></comm-btn>
				</view>
				<view class="close-box" @click="closePopup"></view>

			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:"",
				color: '#FED1C3',
				count_value: 0,
				base_url:''
			};
		},
		computed:{
			totalPrice(){
				return (this.data.price * this.count_value).toFixed(2)
			}
		},
		created(){
			this.getData();
			this.base_url = this.$ENV_CONFIG[process.env.NODE_ENV].baseUrl;//图片域名设置，直接在标签内使用会报错，先放这定义
		},
		methods: {
			async getData(){
				let id = this.$route.query.id;
				if(id>0){
					let {code,data} = await this.$api.product.productinfo({id:id});
					if(code==0){
						this.data = data.data;
					}
				}
			},
			async buyProduct() {
				 if(this.count_value<=0){
					 return uni.showToast({
					 	title:'请输入购买数量',
						icon:"none"
					 })
				 }
				 if(this.data.stock_quantity<=0){
					 return uni.showToast({
					 	title:'商品已售罄！',
						icon:"none"
					 })
				 }
				let {code,data} = await this.$api.order.creatorder({
					product_id:this.data.id,
					product_name:this.data.product_name,
					product_price:this.data.price,
					product_specifications:JSON.stringify({"color":this.color}),
					quantity:this.count_value
				});
				if(code==0){
					uni.showToast({
						icon:"none",
						title:'购买成功',
					})
					this.$refs.popup.close();
					this.$goto('/pages/orders/index');
				}
			},
			closePopup() {
				this.$refs.popup.close();
			}

		}
	}
</script>

<style lang="scss" scoped>
	.info-box {
		display: flex;
		width: 100%;
		height: 100%;
		flex-direction: column;
		overflow: hidden;
		align-items: center;
		background-color: #fff;
		position: relative;

		.info-image {
			margin-top: 20rpx;
			width: 720rpx;
			height: 520rpx;
			background-color: #FFF5F7;
			border-bottom-left-radius: 40rpx;
			border-bottom-right-radius: 40rpx;
			background-position:center !important;
			background-size: 416rpx 410rpx  !important;
			background-repeat: no-repeat;
		}

		.info-info-box {
			display: flex;
			flex-direction: column;
			width: 640rpx;
			justify-content: center;

			.info-brand-text {
				display: flex;
				flex-direction: row;
				height: 50rpx;
				align-items: center;
				justify-content: space-between;
				color: rgba(179, 179, 179, 1);
			}

			.info-name-text {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				color: #000;
				font-size: 36rpx;
				font-weight: bold;

				.product-name-text {
					width: 350rpx;
					flex-wrap: wrap;
				}
			}

			.desc-box {
				height: 210rpx;
			}


		}

		.buy-box {
			position: absolute;
			z-index: 8;
			bottom: 40rpx;

		}

		.popup-content {
			display: flex;
			flex-direction: column;
			align-items: center;
			height: 680rpx;
			width: 100%;
			background-color: #fff;
			border-top-left-radius: 30rpx;
			border-top-right-radius: 30rpx;
			position: relative;

			.close-box {
				top: 40rpx;
				right: 40rpx;
				height: 50rpx;
				width: 50rpx;
				font-size: 36rpx;
				display: flex;
				position: absolute;
				z-index: 2;
				align-items: center;
				justify-content: center;
				background-image: url('images/close.png');
				background-position: center;
				background-size: 40rpx 40rpx;
			}

			.content-box {
				width: 700rpx;
				display: flex;
				flex-direction: column;

				.total-price {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
					height: 100rpx;

					.price-desc-text {
						color: #B3B3B3;
						font-size: 32rpx;
					}

					.price-text {
						color: #000;
						font-size: 40rpx;
						font-weight: 700;
					}
				}

				.shades-box {
					margin-top: 80rpx;
					font-size: 36rpx;
					font-weight: bold;
					color: #000;
				}

				.item-total-box {

					font-size: 36rpx;
					font-weight: bold;
					color: #000;
				}

				.line-box {
					margin-top: 40rpx;
					width: 700rpx;
					height: 0px;
					border: 2rpx dashed #d8d8d8;
				}

				.checkout-box {
					width: 700rpx;
					bottom: 30rpx;
				}
			}



		}


	}
</style>
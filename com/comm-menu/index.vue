<template>
	<view class="ui-menu-box">
		<view class="circle-box">
			<view class="circle-item-box">+</view>
		</view>
		<view class="tabs-box">
			<view class="left-box">
				<template v-for="(item,key) in data">
					<view class="tab-box" v-if="key<=1" @click="gotoMenu(item.style_name)">
						<view class="icon-box"
							:class="select_==item.style_name?`icon-${item.style_name}-select-box`:`icon-${item.style_name}-box`">
						</view>
						<view class="text-box" :class="select_==item.style_name?'select_text':''">{{item.text}}</view>
					</view>
				</template>
			</view>
			<view class="right-box">
				<template v-for="(item,key) in data">
					<view class="tab-box" v-if="key>1" @click="gotoMenu(item.style_name)">
						<view class="icon-box"
							:class="select_==item.style_name?`icon-${item.style_name}-select-box`:`icon-${item.style_name}-box`">
						</view>
						<view class="text-box" :class="select_==item.style_name?'select_text':''">{{item.text}}</view>
					</view>
				</template>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		 
		data() {
			return {
				data: [{
					text: 'Home',
					style_name: 'home'
				}, {
					text: 'Explore',
					style_name: 'explore'
				}, {
					text: 'Wishlist',
					style_name: 'wishlist'
				}, {
					text: 'Profile',
					style_name: 'profile'
				}],
				select_: 'home'
			}
		},
		 
		methods: {
			async gotoMenu(key) {
				this.select_ = key;
				let url = ';'
				switch (key) {
					case 'home':
						url = '/pages/index/index'
						break;
					case 'explore':
						url = '/pages/explore/index'
						break;
					case 'profile':
						url = '/pages/profile/index'
						break;
					case 'wishlist':
						url = '/pages/wishlist/index'
						break;
				}
			 
				 
				// uni.navigateTo({
				// 	url: url,
				// 	success() {
				// 	 console.log(t.select_)
				// 	t.select_ = key;	
				// 	}
				// })
			
				 


			}
		}
	}
</script>

<style lang="scss" scoped>
	.ui-menu-box {
		width: 100%;
		height: 148rpx;
		background-color: #fff;
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
		box-shadow: 0px -6rpx 40rpx rgba(0, 0, 0, 0.08);
		position: relative;
		display: flex;
		flex-direction: row;

		justify-content: center;

		.circle-box {
			position: absolute;
			z-index: 10;
			top: -72rpx;
			/*预留线条的高度。否则会出现白线*/
			left: 0;
			right: 0;
			width: 140rpx;
			height: 140rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			background: linear-gradient(to bottom, rgba(250, 250, 250, 0.1) 50%, #f1f1f1 50%);
			/* 半透明上半圆和自定义颜色下半圆 */
			margin: auto;
			border-radius: 50%;

			.circle-item-box {
				height: 70rpx;
				width: 70rpx;
				background: #DD5D79;
				border-radius: 35rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				color: #fff;
				font-size: 30rpx;
			}
		}

		.tabs-box {
			margin-top: 32rpx;
			height: 80rpx;
			width: 630rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			.left-box {
				width: 240rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
			}

			.right-box {
				width: 240rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
			}

			.tab-box {
				height: 100%;
				width: 100rpx;
				display: flex;
				flex-direction: column;
				align-items: center;

				.icon-home-box {
					background-image: url('../../static/images/home1.png');
				}

				.icon-home-select-box {
					background-image: url('../../static/images/home.png');
				}

				.icon-explore-box {
					background-image: url('../../static/images/explore1.png');
				}

				.icon-explore-select-box {
					background-image: url('../../static/images/explore.png');
				}

				.icon-profile-box {
					background-image: url('../../static/images/profile1.png');
				}

				.icon-profile-select-box {
					background-image: url('../../static/images/profile.png');
				}

				.icon-wishlist-box {
					background-image: url('../../static/images/wishlist1.png');
				}

				.icon-wishlist-select-box {
					background-image: url('../../static/images/wishlist.png');
				}

				.icon-box {
					width: 48rpx;
					height: 48rpx;
					background-position: center;
					background-repeat: no-repeat;
					background-size: 48rpx 48rpx;
				}

				.text-box {
					color: #D8D8D8;
				}

				.select_text {
					color: #DD5D79;
				}

			}
		}
	}
</style>
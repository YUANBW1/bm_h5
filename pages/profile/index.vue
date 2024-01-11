<template>

	<view class="profile-box">
		<view class="profile-bg-box" >
			<view class="user-box">
				<view class="avatar-box"></view>
				<view class="nickname-text">{{user.uid}}</view>
				<view class="phone-text">{{user.phone}}</view>
			</view>
		</view>
		<view class="tabs-box">
			<view class="tab-box" v-for="(item,key) in tablist" :key='key' @click="tabClick(item.key)">
				<view class="icon-box" :class="`icon-${item.key}`"></view>
				<view class="text-box">{{item.text}}</view>
			</view>
		</view>
		<view class="navs-box">
			<view class="nav-box" v-for="(item,key) in navlist" :key="key" @click="navClick(item.key)">
				<view class="left-box">
					<view class="icon-box" :class="`icon-${item.key}`"></view>
					<view class="text-box">{{item.text}}</view>
				</view>
				<view class="arrow-box"></view>

			</view>
		</view>
	</view>


</template>

<script>
	export default {
		data() {
			return {
				user: '',
				tablist: [{
					text: 'My Orders',
					key: 'order'
				}, {
					text: 'Wishlist',
					key: 'wishlist'
				}, {
					text: 'My Address',
					key: 'address'
				}, {
					text: 'Voucher',
					key: 'voucher'
				}],
				navlist: [{
						text: 'My Account',
						key: 'account'
					},
					{
						text: 'Setting',
						key: 'setting'
					},
					{
						text: 'Help',
						key: 'help'
					},
					{
						text: 'Contact Us',
						key: 'contact'
					}, {
						text: 'Log Out',
						key: 'logout'
					}
				]
			}
		},
		async onShow() {
			//判断用户信息缓存
			let user = uni.getStorageSync('user');  
			if (!user) {
				uni.showToast({
					title:'请先登录',
					duration:2000,
					icon:'none'
				});
				await this.$sleep(2000);
				uni.navigateTo({
					url: '/pages/login/index'
				})
			}else{
				this.user = user;
			}
		},
		 
		methods: {
			async getData() {
				

			},
		  navClick(key){
				if(key=='logout'){
					//退出登录
					uni.removeStorageSync('user');
					uni.removeStorageSync('token');
					this.$goto('/pages/login/index')
				} 
			},
			tabClick(key){
				if(key=='order')
				this.$goto('/pages/orders/index')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.profile-box {
		display: flex;
		flex-direction: column;
		position: relative;
		align-items: center;
		justify-content: flex-start;
		height: 100%;
		overflow: hidden;
		.profile-bg-box {
			width: 100%;
			height: 600rpx;
			background-image: url('images/bg.png');
			background-position: center;
			background-size: 100% 600rpx;
			background-repeat: no-repeat;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.user-box {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;

				.avatar-box {
					width: 208rpx;
					height: 208rpx;
					background-image: url('images/6.jpg');
					background-position: center;
					background-size: 208rpx 208rpx;
					background-repeat: no-repeat;
					border-radius: 104rpx;
					border: 4rpx solid #fff;
				}

				.nickname-text {
					color: #fff;
					font-size: 40rpx;

				}

				.phone-text {
					color: #fff;
					font-size: 24rpx;

				}
			}

		}

		.tabs-box {
			position: absolute;
			z-index: 2;
			width: 666rpx;
			height: 204rpx;
			margin: 480rpx auto 0 auto;
			background-color: #fff;
			box-shadow: 0 2rpx 18rpx 4rpx rgba($color: #a5a5a5, $alpha: 0.2);
			border-radius: 10rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;
			.tab-box {
				min-width: 160rpx;
				height: 130rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;

				.icon-box {
					width: 70rpx;
					height: 70rpx;
					background-position: center;
					background-size: 70rpx 70rpx;
					background-repeat: no-repeat;
				}

				.icon-order {
					background-image: url('images/orders.png');
				}

				.icon-wishlist {
					background-image: url('images/wishlist.png');
				}

				.icon-address {
					background-image: url('images/address.png');
				}

				.icon-voucher {
					background-image: url('images/voucher.png');
				}
			}
		}

		.navs-box {
			display: flex;
			flex-direction: column;
			margin-top: 120rpx;

			.nav-box {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				height: 96rpx;
				width: 586rpx;

				.left-box {
					width: 350rpx;
					display: flex;

					.text-box {
						margin-left: 40rpx;
					}

					.icon-box {

						width: 40rpx;
						height: 40rpx;
						background-position: center;
						background-size: 40rpx 40rpx;
						background-repeat: no-repeat;
					}


					.icon-account {
						background-image: url('images/account.png');
					}

					.icon-setting {
						background-image: url('images/setting.png');
					}

					.icon-help {
						background-image: url('images/help.png');
					}

					.icon-contact {
						background-image: url('images/contact.png');
					}

					.icon-logout {
						background-image: url('images/logout.png');
					}

				}

				.arrow-box {
					width: 48rpx;
					height: 48rpx;
					background-image: url('images/arrow.png');
					background-position: center;
					background-size: 48rpx 48rpx;
					background-repeat: no-repeat;
				}
			}
		}

	}
</style>
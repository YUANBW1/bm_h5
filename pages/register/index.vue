<template>
	<view class="login-box">
		<view class="logo-box"></view>
		<view class="welcome-box">Welcome</view>
		<view class="join-box">
			<view class="join-text-1">Not a member? </view>
			<view class="join-text-2" @click="$goto('/pages/register/index')">Join now </view>
		</view>
		<view class="line-with-text">
			<span class="line"></span>
			Or
			<span class="line"></span>
		</view>
		<view class="btn-login-box">
			<btn type="0" v-model="username" placeholder="Phone"  ></btn>
			<btn type="1" v-model="password"  placeholder="Password"  ></btn>
			<btn type="1" v-model="confirm_password"  placeholder="ConfirmPassword" ></btn>
		</view>
	
		<comm-btn  @click="userLogin" text="REGISTER"></comm-btn>
	</view>
</template>

<script>
	import btn from './com/btn/index.vue';
	export default {
		components: {
			btn
		},
		data() {
			return {
				username: '',
				password: '',
				confirm_password:''
			};
		},
		methods:{
			async userLogin(){
			 let  {code,data} = await this.$api.user.register({phone:this.username,password:this.password,confirm_password:this.confirm_password});
			 
			 if(code==0){
			 
				uni.showToast({
					duration:2000,
					title:'注册成功,请登录',
					success(){
						uni.navigateTo({
							url:'/pages/login/index'
						})
					}
				});
				//
				
			 }
				 
				
			}
		}
	}
</script>

<style lang="scss">
	.login-box {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		background-color: #fff;
		align-items: center;
		justify-content: flex-start;

		.logo-box {
			margin-top: 72rpx;
			width: 100%;
			height: 150rpx;
			background-image: url('@/static/logo.png');
			background-position: center center;
			background-size: 110rpx 70rpx;
			background-repeat: no-repeat;
		}

		.welcome-box {
			font-family: Playfair Display;
			width: 126px;
			height: 40px;
			font-size: 30px;
			font-weight: 700;
			letter-spacing: 0px;
			color: rgba(32, 32, 32, 1);
			text-align: center;
			vertical-align: top;
		}

		.join-box {
			display: flex;
			flex-direction: row;
			margin-top: 48rpx;
			height: 40rpx;
			font-size: 14px;
			font-weight: 400;
			justify-content: flex-start;
			align-items: center;

			.join-text-1 {
				color: rgba(179, 179, 179, 1);
			}

			.join-text-2 {
				margin-left: 15rpx;
				color: rgba(236, 183, 187, 1);
			}
		}

		.channel-box {
			display: flex;
			flex-direction: row;
			margin-top: 20rpx;
			width: 212rpx;
			height: 90rpx;
			background-image: url('images/f_g_logo.png');
			background-position: center center;
			background-size: 212rpx 90rpx;
			background-repeat: no-repeat;
		}

		.line-with-text {
			position: relative;
			text-align: center;
			margin: 20rpx;
			display: flex;
			align-items: center;
			color: rgba(98, 98, 98, 1);
		}

		.line {
			flex: 1;
			height: 1rpx;
			width: 286rpx;
			background-color: #B3B3B3;
			margin: 0 20rpx;
		}

		.btn-login-box {
			margin-top: 20rpx;
			height: 360rpx;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
		}

		.remember-box {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
			width: 640rpx;
			margin-top: 20rpx;

			.switch-box {

				/*自定义switch 样式*/
				/deep/ {
					.uni-switch-input {
						width: 88rpx;
						height: 48rpx;
						border-radius: 48rpx;
					}

					.uni-switch-input:after {
						width: 40rpx;
						height: 40rpx;
						top: 2rpx;
					}

					.uni-switch-input:before {
						width: 88rpx;
						height: 48rpx;
						border-radius: 48rpx;
						background-color: #dfdfdf;
					}

				}
			}

			.remember-text {
				margin-left: 10rpx;
				color: #ECB7BB;
				font-size: 28rpx;
				font-weight: 400;
			}
		}

		 

	}
</style>
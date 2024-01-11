<template>
	<view class="btn-box">
		<view :class="type==='0'?'btn-name':'btn-password'" class="btn-logo"></view>
		<view class="btn-line"></view>
		<input v-if='type==="0"' class="input-box" :value="value"  @input="inputValue" focus :placeholder="placeholder"maxlength="11" ></input>
		<input v-else  class="input-box" focus :placeholder="placeholder" @input="inputValue" :value="value" :password="show_psw" maxlength="10"  ></input>
		<view v-if="type==='1'" :class="show_psw?'show-psw-box':'show-psw-box2'" @click="showPassword"  ></view>
	</view>
</template>

<script>
	export default {
		props: {
			type: {
				type: String,
				default: '0' // 0 账号 1 密码 
			},
			value:"",
			placeholder:""
		},
	 
		data() {
			return {
				show_psw: true
			};
		},
		 
		methods:{
			showPassword(){
				this.show_psw =  !this.show_psw;
			},
			inputValue(e){
				 this.$emit("input", e.detail.value);
			}
		}
	}
</script>

<style lang="scss">
	.btn-box {
		width: 640rpx;
		height: 100rpx;
		border: 1rpx solid rgba(179, 179, 179, 1);
		border-radius: 10rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		position: relative;
		.input-box{
			height: 100rpx;
			width: 100%;
		}
		.btn-logo {
			width: 76rpx;
			height: 76rpx;
		}

		.btn-name {

			background-image: url('../../images/Icon_Profile.png');
			background-position: center;
			background-size: 48rpx 48rpx;
			background-repeat: no-repeat;
		}

		.btn-password {
			background-image: url('../../images/Icon_Password.png');
			background-position: center;
			background-size: 48rpx 48rpx;
			background-repeat: no-repeat;
		}

		.btn-line {
			height: 36rpx;
			width: 1rpx;
			background-color: rgba(179, 179, 179, 1);
			margin-right: 28rpx;
		}
		.show-psw-box{
			position: absolute;
			height: 48rpx;
			width: 48rpx;
			background-image: url('../../images/Icon_Visibility.png');
			right: 28rpx;
		}
		.show-psw-box2{
			position: absolute;
			height: 48rpx;
			width: 48rpx;
			background-image: url('../../images/Icon_Visibility2.png');
			right: 28rpx;
		}
	}
</style>
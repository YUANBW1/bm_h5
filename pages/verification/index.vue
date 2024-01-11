<template>
  <view class="ver-box">
	<view class="opt-box">OPT</view>
		<view class="ver-text-box">Verification</view>
    <CodeInput class="ver-code-box" @inputCompleted="handleInputCompleted" />
	<view class="tip-text">send a new code</view>
	<comm-btn data="SEND"></comm-btn>
  </view>
</template>

<script>
import  CodeInput from './com/code-input/index.vue';

export default {
  components: {
    CodeInput,
  },
  methods: {
    handleInputCompleted(code) {
      // 处理完成输入的验证码
      console.log('输入完成：', code);
    },
  },
};
</script>
<style scoped lang="scss">
	.ver-box{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.opt-box{
			margin-top: 100rpx;
			font-size: 60rpx;
			font-weight: 700;
			color: rgba(32, 32, 32, 1);
		}
		.ver-text-box{
			font-size: 60rpx;
			font-weight: 700;
			color: rgba(32, 32, 32, 1);
		}
		.ver-code-box{
			margin-top: 20rpx;
			width: 100%;
		}
		.tip-text{
			 height:88rpx;
			font-size: 28rpx;
			font-weight: 400;
			display: flex;
			align-items:center;
			justify-content: center;
		}
	}
</style>

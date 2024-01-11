<template>
	<view class="verification-code">
		<input class="code-input-box" v-for="(key, index) in verificationCode" :key="index"
			v-model.trim="verificationCode[index]" @input="handleInput(index)" type="number" maxlength="1"
			:ref="'input_' + index" :class="{ 'code-active': activeIndex === index }">
		</input>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				verificationCode: ['', '', '', '', '', ''],
				activeIndex: 0
			};
		},
		methods: {
			handleInput(index) {
				const inputValue = this.verificationCode[index].replace(/[^0-9]/g, ''); //只能输入数字
				this.$set(this.verificationCode, index, inputValue);

				if (index < this.verificationCode.length - 1 && inputValue !== '') {
					this.$nextTick(() => {
						const nextInput = this.$refs['input_' + (index + 1)];
						if (nextInput && nextInput[0].$el) {
							// 使用 $el 属性获取真实 DOM 元素
							const nextInputElement = nextInput[0].$el.querySelector('input');
							if (nextInputElement && nextInputElement.focus) {
								// 使用原生 DOM 方法调用 focus
								nextInputElement.focus();
								this.activeIndex = index + 1;
							}
						}
					});
				}

				if (index === this.verificationCode.length - 1 && inputValue !== '') {
					// 输入完成时，可以执行其他操作
					this.handleInputCompleted();
				}
			},
			handleInputCompleted() {
				// 输入完成派发给父级
				this.$emit('inputCompleted', this.verificationCode.join(''))

			},
		},
	};
</script>

<style scoped lang="scss">
	.verification-code {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		.code-input-box {
			width: 80rpx;
			height: 80rpx;
			text-align: center;
			font-size: 36rpx;
			border: 1rpx solid rgba(236, 183, 187, 1);
			border-radius: 10rpx;
		}

		.code-active {
			border-color: #000;
		}
	}



	.last-input {
		margin-right: 0;
	}
</style>
<template>
	<view class="countdown-box">
		<!-- 时 -->
		<view class="time-element">
			{{formatNumber(hour) }}
		</view>
		<!-- 分 -->
		<view class="time-element">
			{{ formatNumber(minute) }}
		</view>
		<!-- 秒 -->
		<view class="time-element">
			{{ formatNumber(second) }}
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			countdownTime: {
				type: Number,
				required: true,
			},
		},
		data() {
			return {
				countdown: this.countdownTime,
				hour: 0,
				minute: 0,
				second: 0,
			};
		},
		watch: {
			countdownTime(newTime) {
				this.countdown = newTime;
				this.updateCountdownText();
			},
		},
		mounted() {
			this.updateCountdownText();

			// 每秒更新倒计时文本
			setInterval(() => {
				if (this.countdown > 0) {
					this.countdown--;
					this.updateCountdownText();
				}
			}, 1000);
		},
		methods: {
			// 更新倒计时文本
			updateCountdownText() {
				this.hour = Math.floor(this.countdown / 3600);
				this.minute = Math.floor((this.countdown % 3600) / 60);
				this.second = this.countdown % 60;
			},
			// 格式化数字，不足两位数补零
			formatNumber(value) {
				return value < 10 ? '0' + value : value;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.countdown-box {
		display: flex;
		flex-direction: row;
		.time-element {
			width: 60rpx;
			height: 50rpx;
			background-color: #333;
			color: #fff;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			border-radius: 8rpx;
		}
		.time-element+.time-element {
			margin-left: 10px;
		}
	}
</style>
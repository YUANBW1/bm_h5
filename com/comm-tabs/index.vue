<template>
	<view>
		<!-- 顶部标签栏 -->
		<view class="tabs" ref="tabsContainer">
			<view v-for="(tab, index) in tabs" :key="index" @click="switchTab(index)"
				:class="{ 'active': activeTab === index }" class="tab-item">
				{{ tab.label }}
			</view>
			<view class="underline"
				:style="{ transform: 'translateX(' + underlineTranslateX + 'px)', width: underlineWidth + 'px' }">
			</view>
		</view>
		<!-- 根据当前选中的标签显示对应内容 -->
		<view class="tab-content">
			<view v-show="activeTab === tabIndex" :key="tabIndex" v-for="(tab, tabIndex) in tabs">
			 <slot name="tab-content"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: [{
						label: 'ALL',
						content: 'Tab 1 Content'
					},
					{
						label: 'Powder',
						content: 'Tab 2 Content'
					},
					{
						label: 'Foundation',
						content: 'Tab 3 Content'
					},
					{
						label: 'Eyeshadow',
						content: 'Tab 4 Content'
					},
				],
				activeTab: 0,
				underlineWidthRatio: 0.8, // 横线宽度相对于导航宽度的比例
				underlineTranslateX: 0,
				underlineWidth: 0,
			};
		},
		methods: {
			switchTab(index) {
				this.activeTab = index;
				this.$nextTick(() => {
					this.updateUnderlineWidth();
				});

			},
			updateUnderlineWidth() {
				const tabsContainer = uni.createSelectorQuery().in(this).select('.tabs');
				tabsContainer.boundingClientRect((rect) => {
					const activeTabElement = uni.createSelectorQuery().in(this).select('.active');
					if (activeTabElement) {
						activeTabElement.boundingClientRect((tabRect) => {
							const tabWidth = tabRect.width;
							this.underlineWidth = tabWidth * this.underlineWidthRatio;
							this.underlineTranslateX = tabRect.left + (tabWidth - this.underlineWidth) /
								2 - rect.left;
						}).exec();
					}
				}).exec();
			},
		},
	};
</script>

<style lang="scss" scoped>
	.tabs {
		display: flex;
		position: relative;
		border-radius: 8rpx;
		width: 640rpx;
	}

	.tab-item {
		flex: 1;
		text-align: center;
		padding: 20rpx 30rpx;
		background-color: #fff;
		cursor: pointer;

		&.active {
			background-color: #ECB7BB;
			border-radius: 8rpx;
			transition: background-color 1.5s; //背景颜色过渡

		}
	}

	.underline {
		position: absolute;
		bottom: 0;
		left: 0;
		height: 2px;
		background-color: #ECB7BB;
		transition: transform 0.5s, width 0.5s;
	}
</style>
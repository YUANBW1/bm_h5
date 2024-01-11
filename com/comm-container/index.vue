<template>
	<view class="container-box" :style="containerHeight" ref="container">
		<template v-if="commonLoad">
			<view class="container-header-box">
				<slot name="header"></slot>
			</view>
			<view class="container-content" :style="{ background: background }" id="scrollBody">
				<scroll-view :style="{ height: offset.height + 'px' }" :scroll-y="true" class="scroll-view-box"
					:refresher-enabled="showRefresherEnabled" v-if="!loading" @scrolltolower="scrolltolower"
					@refresherrefresh="pulldown" :refresher-triggered="triggered_" :scroll-top="scrollTop_"
					@scroll="scrollEvent_" :lower-threshold="lower" :scroll-anchoring="true"
					:scroll-into-view="scrollIntoView_">
					<view :style="{ minHeight: offset.height + 1 + 'px' }">
						<view class="container-page-content-box">
							<slot :page="pageStatus"></slot>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="footer-style-box">
				<slot name="footer" :page="pageStatus"></slot>
				
			</view>

		</template>
	</view>
</template>
<script>
	import {
		dataFetchingMixin
	} from "@/minx/list.js";
	import {
		mapState
	} from "vuex";

	export default {
		name: "uiContainer",
		mixins: [dataFetchingMixin],

		props: {
			lower: {
				default () {
					return 200;
				},
			},
			tabBar:{
				type:Boolean,
				default(){
					return true
				},
			},
			refresherEnabled: {},
			background: {
				default () {
					return "rgb(255, 255, 255)";
				},
			},
		},
		watch: {
			commonLoad: {
				async handler() {
					if (this.commonLoad) {
						this.loading = true;
						// 如果是微信要延迟计算 app没有测试过
						await this.$sleep(200);
						let [err, data] = await this.mesureHeight();
						if (err) return;
						this.loading = false;
						this.$emit("load", data);
					}
				},
				immediate: true,
			},
		},
		computed: {
			...mapState({
				commonLoad(state) {
					return state.commonLoad;
				},
			}),
			showRefresherEnabled() {

				return this.refresherEnabled;
			},
			pageStatus() {
				return {
					loading: this.loading,
					offset: this.offset,
				};
			},
			containerHeight(){
				if(this.tabBar)return {'min-height': 'calc(100vh - 100rpx)'}
				return {'min-height': '100vh'}
			}
		},
		data() {
			let uuid = this.$getUUID();
			return {
				offset: {},
				uuid,
				loading: true,
				scrollTop_: 0,
				triggered_: false,
				pulldownKey: `pulldown-${uuid}`,
				pullupKey: `pullup-${uuid}`,
				scrollIntoView_: "",
			};
		},
		created() {
			let currentPage = this.$currentPage();
			currentPage.$container_ = this;
		},

		methods: {
			scrollEvent_(e) {

				if (!this.old_) {
					this.old_ = {};
				}
				this.old_.scrollTop_ = e.detail.scrollTop;
				uni.$emit(`scroll-${this.uuid}`, e.detail.scrollTop);
				this.$emit("scroll", e.detail.scrollTop);

			},
			async scrollInto(id) {
				this.scrollIntoView_ = "";
				await this.$sleep(1);
				this.scrollIntoView_ = id;
			},
			async scrollTo(top) {
				if (this.old_) {
					this.scrollTop_ = this.old_.scrollTop_;
				}
				await this.$sleep(1);
				this.scrollTop_ = top;
				this.$emit("scroll", top);
			},
			async pulldown() {
			
				this.triggered_ = true;
				let fn = setTimeout(() => {
					this.triggered_ = false;
				}, 2000)
				this.$emit("pulldown", fn);
				uni.$emit(this.pulldownKey, fn);
			},
			scrolltolower() {

				this.$emit("pullup");
				uni.$emit(this.pullupKey);

			},
			async mesureHeight() {
				this.offset = {
					height: 0,
				};
				await this.$sleep(0);
				let [err, data] = await this.$("#scrollBody");
				if (err) return [err, data];
				 console.log(data)
				this.offset = data;
				return [err, data];
			},
			register() {
				return {
					scrollTo: this.scrollTo,
					scrollInto: this.scrollInto,
					getRootEl: () => {
						return this.$refs.container;
					},
				};
			},
		},
	};
</script>

<style lang="scss" scoped>
	.container-box {
		display: flex;
		flex-direction: column;
		width: 100%;
		.container-header-box {
			flex: none;
		}
		.container-content {
			flex: 1;
			width: 100%;
			overflow: hidden;
			.scroll-view-box {
				width: 100%;
			}
		}
	}
</style>
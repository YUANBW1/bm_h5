// dataFetchingMixin.js
export const dataFetchingMixin = {
	data() {
		return {
			page: {},
			query: [{
				msg: 'empty'
			}],
			mixinLoading: false,
			data: {},
			__search: {},
		};
	},
	created() {
		this.refresh();
	},
	watch: {
		page() {
			this.refresh();
		},
	},
	methods: {
		find(data) {
			this.__search = data;
			this.page.page = 1;
			this.refresh();
		},
		refresh(cached = false) {
			this.query = (async () => {
				this.mixinLoading = true;
				let arg = {
					...this.page,
					...this.__search,
				};
				for (let item in arg) {
					if (arg[item] === "") delete arg[item];
				}
				let [err, data] = await this.getList(arg);
				this.mixinLoading = false;
				if (err) return [err, data];
				if (cached == 'up') {
					this.data.push(...data);
				} else {
					this.data = data;
				}
				return [err, data];
			})();
			return this.query;
		},
		async pullup() {
			// if (this.mixinLoading) return;
			// if (this.page.page) {
			// 	this.page.page++;
			// } else {
			// 	this.page.page = 2;
			// }
			// return this.refresh('up');
		},
		async mixinLoadingmore() {
			if (this.mixinLoading) return;
			this.page.page = 1;
			return this.refresh('up');
		},
		getList() {
			return [{
				msg: 'getList方法未实现'
			}];
		},
	},
};
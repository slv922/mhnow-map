<template>
  <div class="data-detail">
    <ul class="data-detail-list list text-sm">
			<li>
				目前所在座標 {{ this.$store.state.userPos }}
			</li>
			<li
				class="list-item"
				v-show="range"
			>
				{{range}}的魔物
			</li>

			<li class="list-item">
				資料更新時間 {{formattedTime($store.state.refreshListTime)}}
			</li>
		</ul>

		<button
			class="btn btn-border-pmr corner-round-lg data-detail-refresh"
			@click="refreshList"
			:disabled="disabled"
		>
			重整列表
		</button>
  </div>
</template>

<script>
import { REFRESH_LIST } from '@/types';
const defaultPos = {
	name: '台北車站',
	coords: [25.0457377, 121.5129428],
};
export default {
	props: {
		range: {
			type: String,
			required: true,
		},
		disabled: {
			type: Boolean,
			required: true,
		},
	},
	methods: {
		refreshList() {
			this.getUserPos()
			this.$store.dispatch(
				'maskActions',
				{ type: REFRESH_LIST, payload: Date.now() }
			);
		},
		getUserPos() {
			const successGPS = (position) => {
				const { coords: { latitude, longitude } } = position;
				this.setUserPos([latitude, longitude]);
			};

			const errorGPS = () => {
				const { name, coords } = defaultPos;
				this.errMsg = `無法判斷您的所在位置，預設地點將為 ${name}`
				this.setUserPos(coords);
			};

			if (!navigator.geolocation) {
				this.errMsg = '您的裝置不具備GPS，無法使用此功能';
				return;
			}

			navigator.geolocation.getCurrentPosition(successGPS, errorGPS);
		},
	},
	computed: {
		formattedTime() {
			return (time) => {
				return new Date(time).toLocaleTimeString();
			};
		},
	},
};
</script>

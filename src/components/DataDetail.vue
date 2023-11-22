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
import { REFRESH_LIST, SET_USER_POS } from '@/types';

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
				if(position){
					console.log('successGPS', position.coords.latitude, position.coords.longitude)
					this.setUserPos([position.coords.latitude, position.coords.longitude]);
				}else{
				
				const { coords: { latitude, longitude } } = position;
				this.setUserPos([latitude, longitude]);
				}
			};

			const errorGPS = () => {
				console.log('errorGPS')
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
		setUserPos(coords) {
			this.$store.dispatch('mapActions', { type: SET_USER_POS, payload: coords });
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

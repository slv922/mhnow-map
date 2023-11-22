<template>
  <div class="pharmacy-info">
    <div :class="['pharmacy-title', availableStatus(pharmacyInfo)]" style="display: flex; justify-content: space-between; align-items: center;">
			<h2 class="pharmacy-name text-color-pmr text-bold title-ttr">
				{{pharmacyInfo.name}}
			</h2>
			
			<span class="pharmacy-distance text-color-pmr text-bold text-sm">
				{{calDistance(pharmacyGeo.coordinates)}} km
			</span>

			<span
				:class="[
					'pharmacy-status',
					'text-sm',
					`text-bg-${availableStatus(pharmacyInfo)}`,
					'corner-round-sm'
				]"
			>
				{{availableStatusMap[availableStatus(pharmacyInfo)]}}
			</span>
			<button class="corner-round-sm text-sm text-color-basic" @click="hideCard">X</button>
    </div>

		<ul class="pharmacy-detail-list list">
			<li
				class="pharmacy-detail-list-item list-item"
				v-for="(detailVal, detailKey) in pharmacyDetail"
				:key="detailKey"
			>
				<span class="list-item-title text-sm">
					{{detailVal}}
				</span>

				<span class="list-item-content text-sm">
					{{pharmacyInfo[detailKey]}}
				</span>

				<button
					class="btn text-sm text-underline text-color-basic list-item-btn"
					v-if="detailKey === 'address'"
					@click="checkOnMap(pharmacyInfo.id)"
					:disabled="!$store.state.mapRendered"
				>
					於地圖查看
				</button>

				
			</li>
		</ul>
  </div>
</template>

<script>
import getAvailableStatus from '@/mixins/getAvailableStatus';
import calDistance from '@/mixins/calDistance';
import { SET_PHARMACY_CHECKED } from '@/types';

export default {
	mixins: [
		getAvailableStatus,
		calDistance
	],
	props: {
		pharmacyData: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {

			pharmacyDetail: {
				'address': '座標',
				// 'phone': '電話',
				'note': '更新時間',
			},
		};
	},
	computed: {
		pharmacyInfo() {
			return this.pharmacyData.properties || {};
		},
		pharmacyGeo() {
			return this.pharmacyData.geometry || {};
		},
		formattedTel() {
			return (phone) => {
				let dist = phone.split(')').shift().substr(2);
				let num = phone.split(')').pop();
				return `+886-${dist}-${num}`;
			};
		},
	},


	methods: {
		hideCard() {
			this.pharmacyData.isVisible = false;
			console.log(this.pharmacyData)
		},
		checkOnMap(id) {
			this.$store.dispatch(
				'mapActions',
				{ type: SET_PHARMACY_CHECKED, payload: id }
			);
		},
	},
};
</script>

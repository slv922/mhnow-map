<template>
  <div class="pharmacy-card corner-round-sm box-sdw">
		<!-- <div class="amt-box-container">
			<amt-box
				v-for="ageType in ['adult', 'child']"
				:key="ageType"
				:type="ageType"
				:maskAmt="{
					adult: pharmacyData.properties['mask_adult'],
					child: pharmacyData.properties['mask_child']
				}"
			/>
		</div> -->
		
		<pharmacy-info
			:pharmacyData="pharmacyData"
		/>
  </div>
</template>

<script>
// import AmtBox from '@/components/AmtBox.vue';
import PharmacyInfo from '@/components/PharmacyInfo';

export default {

	components: {
		// AmtBox,
		PharmacyInfo,
	},
	props: {
		pharmacyData: {
			type: Object,
			required: true,
		},
	},
};
</script>

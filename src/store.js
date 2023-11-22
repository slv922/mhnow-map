import Vue from 'vue';
import Vuex from 'vuex';
import mask from '@/apis/mask';
import moment from 'moment-timezone';

import {
	FETCH_MASK_DATA,
	GET_WINDOW_WIDTH,
	REFRESH_LIST,
	SET_USER_POS,
	SET_MAP_RENDERED,
	SET_PHARMACY_CHECKED,
	SET_MAP_CENTER,
	BACKTO_USER_POS,
} from '@/types';

Vue.use(Vuex);

function toLocalTime(timestring){

	let dateTime = moment(timestring);
	dateTime.add(8, 'hours');
	let tocaltz = moment.tz.guess()
	dateTime.tz(tocaltz).format('lll'); 

	return dateTime.tz(tocaltz).format('lll'); 
	
}

function convertData(originalData) {

    if (!originalData || !originalData.data) {
        return null;
    }

    let convertedData = {
        type: "FeatureCollection",
        features: []
    };

    originalData.data.forEach(item => {
        let feature = {
            type: "Feature",
            properties: {
                id: item.id,
                name: item.name,
                phone: "",
                address: item.coordinates,
                mask_adult: item.level,
                mask_child: item.round,
                updated: item.createdAt,
                available: "",
                note: toLocalTime(item.createdAt),
				level: item.level,
				round: item.round,
                custom_note: "",
                website: "",
                county: item.location,
                town: "",
                cunli: "",
                service_periods: "NNNNNNNNNNNNNNNNNNNNY"
            },
            geometry: {
                type: "Point",
                coordinates: [item.lng, item.lat]
            }
        };

        convertedData.features.push(feature);
    });

    return convertedData;
}


const store = new Vuex.Store({
	state: {
		windowWidth: null,
		maskData: null,
		refreshListTime: null,
		userPos: [],
		mapRendered: false,
		checkedPharmacy: null,
		mapCenter: [],
	},
	getters: {
		rwd(state) {
			if (state.windowWidth > 1199) {
				return 'pc';
			}
			if (state.windowWidth > 768 && state.windowWidth < 1200) {
				return 'pad';
			}
			return 'mobile';
		},
	},
	mutations: {
		getWindowWidth(state, width) {
			state.windowWidth = width;
		},
		fetchMaskData(state, data) {
			state.maskData = data;
		},
		refreshList(state, time) {
			state.refreshListTime = time;
		},
		setUserPos(state, coords) {
			state.userPos = coords;
		},
		setMapRendered(state, time) {
			state.mapRendered = time;
		},
		setPharmacyChecked(state, id) {
			state.checkedPharmacy = id;
		},
		setMapCenter(state, coords) {
			state.mapCenter = coords;
		},
	},
	actions: {
		maskActions({ commit }, action) {
			
			const fetchMaskData = () => {
				let features = null;
				console.log('fetch data 0')
				mask.get().then((res) => {
					features = convertData(res.data).features;
				}).catch(async () => {
					console.log('fetch data 2')
					const { features: res } = await import('@/assets/points.json');
					features = res;
				}).finally(() => {
					console.log('fetch data 3')
					commit('fetchMaskData', features);
				});
			};

			switch (action.type) {
				case FETCH_MASK_DATA:
					fetchMaskData();
					break;
				case REFRESH_LIST:
					fetchMaskData();
					console.log('action.payload:', action.payload)
					commit('refreshList', action.payload);
					break;
				default:
					break;
			}
		},
		pageActions({ commit }, action) {
			switch (action.type) {
				case GET_WINDOW_WIDTH:
					commit('getWindowWidth', action.payload);
					break;
				default:
					break;
			}
		},
		mapActions({ commit, state }, action) {
			switch (action.type) {
				case SET_USER_POS:
					commit('setUserPos', action.payload);
					break;
				case SET_MAP_RENDERED:
					commit('setMapRendered', action.payload);
					break;
				case SET_PHARMACY_CHECKED:
					commit('setPharmacyChecked', action.payload);
					break;
				case SET_MAP_CENTER:
					commit('setMapCenter', action.payload);
					break;
				case BACKTO_USER_POS:
					commit('setMapCenter', state.userPos);
					break;
				default:
					break;
			}
		},
	},
});

export default store;
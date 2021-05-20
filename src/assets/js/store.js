import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        refreshListTime: null,
    },
    mutations: {
        refreshList(state, data) {
            state.refreshListTime = data;
        },
    },
});

export default store;
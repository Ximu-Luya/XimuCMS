import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex)
Vue.prototype.$store = new Vuex.Store({
    state: {
        collapse: false,
        tagsList: []
    },
    mutations: {
        collapseChange(state, nowstatus) {
            state.collapse = nowstatus;
        },
        setTags(state, nowtagsList) {
            state.tagsList = nowtagsList;
        }
    },
    getters: {
        getCollapse: (state) => {
            return state.collapse;
        },
        gettagsList: (state) => {
            return state.tagsList;
        }
    }
})
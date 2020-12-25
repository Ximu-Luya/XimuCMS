import Vue from 'vue'
import Vuex from 'vuex'
import userinfo from './modules/userinfo'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        collapse: false,
        tagsList: [],
    },
    mutations: {
        collapseChange(state, nowstatus) {
            state.collapse = nowstatus;
        },
        setTags(state, nowtagsList) {
            state.tagsList = nowtagsList;
        },
    },
    getters: {
        getCollapse: (state) => {
            return state.collapse;
        },
        gettagsList: (state) => {
            return state.tagsList;
        },
    },
    modules: {
        userinfo
    },
    plugins: [createPersistedState()]
})
import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex)
Vue.prototype.$store = new Vuex.Store({
    state: {
        collapse: false,
        tagsList: [],
        userinfo: {
            name: '西木',
            id: 1
        }
    },
    mutations: {
        collapseChange(state, nowstatus) {
            state.collapse = nowstatus;
        },
        setTags(state, nowtagsList) {
            state.tagsList = nowtagsList;
        },
        setUserinfo(state, nowUserinfo){
            state.userinfo = nowUserinfo;
        }
    },
    getters: {
        getCollapse: (state) => {
            return state.collapse;
        },
        gettagsList: (state) => {
            return state.tagsList;
        },
        getUserinfo: (state) => {
            return state.userinfo;
        }
    }
})
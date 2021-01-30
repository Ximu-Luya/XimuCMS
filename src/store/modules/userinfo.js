const state = {
    user: {
        uid: '',
        username: '',
        name: '',
        email: '',
        telephone: '',
        team_id: '',
        team_name: '',
        job: '',
        role: ''
    }
}

const mutations = {
    updateUserinfo(state, userinfo) {
        const {username, name, email, telephone, team_id, team_name, job, role} = userinfo;
        state.user = {uid: state.user.uid, username, name, email, telephone, team_id, team_name, job, role}
    },
    updateUserId(state, uid) {
        state.user.uid = uid
    },
    initUserinfo(state){
        for(let attr in state.user) {
            state.user[attr] = ''
        }
    }
}

const getters = {

}

const actions = {
    setUserInfo({ commit }, userinfo){
        commit('updateUserinfo', userinfo)
    },
    setUserId({ commit }, uid) {
        commit('updateUserId', uid)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
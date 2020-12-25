const state = {
    user: {
        id: '',
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
        state.user = {id: state.user.id, username, name, email, telephone, team_id, team_name, job, role}
    },
    updateUserId(state, id) {
        state.user.id = id
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
    setUserId({ commit }, id) {
        commit('updateUserId', id)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
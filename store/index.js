
export const getters = {
    isAuthenticated(state) {
        return state.auth.loggedIn
    },

    loggedInUser(state) {
        return state.auth.user
    }
}

export const actions = {
  setUser({commit}, user){
    commit('SET_USER', user)
  }
}

export const mutations = {
    CLEAR_ALL(state){
        state = {}
    },
    SET_USER({state}, user){
      state.auth.user = user
    }
}

export const state = () => ({

});

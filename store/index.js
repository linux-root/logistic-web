
export const getters = {
    isAuthenticated(state) {
        return state.auth.loggedIn
    },

    loggedInUser(state) {
        return state.auth.user
    }
}

export const mutations = {
    CLEAR_ALL(state){
        state = {}
    }
}

export const state = () => ({

});

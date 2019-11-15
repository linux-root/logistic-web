export default {
  setCurrentRoute({commit}, route) {
    commit('SET_CURRENT_ROUTE', route)
  },
  setRouteName({commit}, name){
    commit('SET_ROUTE_NAME', name)
  },

  addCheckpoint({commit}, checkpoint){
    commit('ADD_CHECKPOINT', checkpoint)
  },
  clearRouteData({commit}) {
    commit('CLEAR_ROUTE_DATA');
  }
}

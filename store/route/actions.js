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
  setCheckpointName({commit}, {seq, name}){
    commit('SET_CHECKPOINT_NAME', {seq, name})
  },

  setCheckpointCoordinate({commit}, {seq, coordinate}){
    commit('SET_CHECKPOINT_COORDINATE', {seq, coordinate})
  },

  clearRouteData({commit}) {
    commit('CLEAR_ROUTE_DATA');
  }
}

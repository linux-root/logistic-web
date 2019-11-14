export default {
  setCurrentRoute({commit}, route) {
    commit('SET_CURRENT_ROUTE', route)
  },
  addCheckpoint({commit}, checkpoint){
    commit('ADD_CHECKPOINT', checkpoint)
  }
}

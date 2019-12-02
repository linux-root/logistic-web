export default {
  async fetchAssignedRoutes({commit, rootState}){
    const userId = rootState.auth.user.id
    this.$axios.get(`/users/${userId}/routes`).then(res => {
      commit('SET_ASSIGNED_ROUTES', res.data)
    })
  }
}

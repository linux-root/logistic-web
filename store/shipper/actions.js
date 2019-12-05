export default {
  async fetchAssignedRoutes({commit, rootState}){
    const userId = rootState.auth.user.id
    this.$axios.get(`/users/${userId}/routes`).then(res => {
      commit('SET_ASSIGNED_ROUTES', res.data)
    })
  },

  refuseRoute({rootState, commit, state, dispatch}, id) {
    const status = 'X'
    commit('CHANGE_ROUTE_STATUS',{id, status})
    const currentUser = rootState.auth.user
    const route = state.assignedRoutes.filter(r => r.id === id)[0];
    const notification = {
      message: `Shipper ${currentUser.full_name} đã từ chối giao Route ${route.name}`,
      status: 'U',
      type: 'R',
      created_by: currentUser.id,
      notify_to: route.created_by
    }
    dispatch('updateRouteStatusAndSendNotification', {route, notification})
  },

  acceptRoute({rootState, commit, state, dispatch}, id){
    const status = 'A'
    const currentUser = rootState.auth.user
    commit('CHANGE_ROUTE_STATUS', {id, status})
    const route = state.assignedRoutes.filter(r => r.id === id)[0];
    const notification = {
      message: `Shipper ${currentUser.full_name} đã bắt đầu giao Route ${route.name}`,
      status: 'U',
      type: 'R',
      created_by: currentUser.id,
      notify_to: route.created_by
    }
    dispatch('updateRouteStatusAndSendNotification', {route, notification})
  },

  updateRouteStatusAndSendNotification({dispatch},{route, notification}){
    this.$axios.patch(`routes/${route.id}`, route).then(res =>{
      console.log('res')
      dispatch('notification/pushNotification', notification, {root: true})
    })
  },

  sendLocation({},location){
      this.$axios.post('users/location', location).then(res=>console.log(res))
  }
}

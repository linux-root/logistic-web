export default {
  async fetchNotifications({rootState, commit}) {
      const userId = rootState.auth.user.id
      this.$axios.get(`/users/${userId}/notifications`).then(res => {
         commit('SET_NOTIFICATIONS', res.data)
      })

  },

  pushNotification({commit}, notification){
     this.$axios.post(`/users/${notification.notify_to}/notifications`, notification)
  },

  addNotification({commit}, notification){
    if(notification.notify_to){
      commit('ADD_NOTIFICATION', notification)
    }
  },

  readNotification({commit}, notification){
    notification.status = 'S';
    this.$axios.patch(`/notifications/${notification.id}`)
    commit('CHANGE_NOTIFICATION_STATUS', notification.id)
  }
}

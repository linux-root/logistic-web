export default {
  async fetchNotifications({commit}) {
      const whereCondition = {
          where : {is_manager: false}
      }
      this.$axios.get(`/users?filter=${JSON.stringify(whereCondition)}`).then(res => {
          console.log('shippers', res.data)
          commit('SET_SHIPPERS', res.data);
      });
  },

  pushNotification({commit}, notification){
     this.$axios.post(`/users/${notification.notify_to}/notifications`, notification)
  },

  addNotification({commit}, notification){
    if(notification.notify_to){
      commit('ADD_NOTIFICATION', notification)
    }
  }
}

export default {
   getNotifications(state){
       return state.notifications;
   },

  getUnreadNotifications(state){
     return state.notifications.filter(n => n.status === 'U')
  }
}

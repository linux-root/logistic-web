export default {
  ADD_NOTIFICATION(state, notification) {
    state.notifications.push(notification);
  },

  CHANGE_NOTIFICATION_STATUS(state, id){
     const notification = state.notifications.filter(n => n.id === id)[0]
     notification.status = 'S'
  },

  SET_NOTIFICATIONS(state, notifications){
    state.notifications = notifications
  }
}

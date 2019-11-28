export default {
  getUser(state) {
    return state.user;
  },

  getRole(state){
    return state.user.is_manager ? 'Manager' : 'Shipper';
  }
}


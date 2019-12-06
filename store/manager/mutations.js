export default {
  SET_SHIPPERS(state, shippers) {
    state.shippers = shippers;
  },

  SET_ROUTES(state, routes){
    state.routes = routes;
  },

  CHANGE_SHIPPER_ACCOUNT_STATUS(state, acc){
    const shipper = state.shippers.filter(s => s.id === acc.id)[0]
    shipper.is_active = acc.is_active
  }
}

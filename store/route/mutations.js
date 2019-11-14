export default {
  SET_CURRENT_ROUTE(state, route) {
    state.currentRoute = route;
  },

    ADD_CHECKPOINT(state, checkpoint){
      state.currentRoute.checkpoints.push(checkpoint);
    }
}

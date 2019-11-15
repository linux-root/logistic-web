export default {
  SET_CURRENT_ROUTE(state, route) {
    state.currentRoute = route;
  },

  SET_ROUTE_NAME(state, name){
    state.currentRoute.name = name;
  },


  ADD_CHECKPOINT(state, checkpoint){
      state.currentRoute.checkpoints.push(checkpoint);
    },
    CLEAR_ROUTE_DATA(state){
       state.currentRoute = {
         name : '',
         checkpoints: []
       }
    }
}

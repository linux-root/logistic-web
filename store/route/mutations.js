export default {
    SET_CURRENT_ROUTE(state, route) {
        state.currentRoute = route;
        state.currentRoute.checkpoints = []
    },

  SET_ROUTE_ID(state, id){
      state.currentRoute.id = id;
  },

    SET_ROUTE_NAME(state, name) {
        state.currentRoute.name = name;
    },
    ASSIGN_TO_SHIPPER(state, shipper) {
        state.currentRoute.assigned_to_shipper = shipper;
    },
    SET_CHECKPOINT_NAME(state, {seq, name}) {
        const found = state.currentRoute.checkpoints.find(cp => cp.seq === seq);
        found.name = name;
    },

    SET_CHECKPOINT_COORDINATE(state, {seq, coordinate}) {
        const found = state.currentRoute.checkpoints.find(cp => cp.seq === seq);
        found.geo_coordinate = coordinate;
    },

    ADD_CHECKPOINT(state, checkpoint) {
        state.currentRoute.checkpoints.push(checkpoint);
    },
    SET_CHECKPOINTS(state, checkpoints){
       state.currentRoute.checkpoints = checkpoints
    },
    CLEAR_ROUTE_DATA(state) {
        state.currentRoute = {
            name: '',
            checkpoints: [],
            status: 'P',
            assigned_to_shipper: ''
        }
    }
}

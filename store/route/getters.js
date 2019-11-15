export default {
  getCurrentRoute(state) {
    return state.currentRoute;
  },

  getNextCheckpointSeq(state){
    if(!state.currentRoute.checkpoints || !state.currentRoute.checkpoints.length) return 0;
    return state.currentRoute.checkpoints.reduce((cp1, cp2) => cp1.seq > cp2.seq ? cp1 : cp2).seq + 1;
  }
}

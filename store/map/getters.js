export default {
  getMarkerCoordinate(state) {
    return state.marker.geo_coordinate;
  },

  getMarkerLabelIndex(state){
    return state.marker.labelIndex;
  }
}

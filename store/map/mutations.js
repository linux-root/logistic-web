export default {
  SET_MARKER_COORDINATE(state, markerCoordinate) {
    state.marker.geo_coordinate = markerCoordinate;
  },
  INCREASE_MARKER_LABEL_INDEX(state){
    state.marker.labelIndex ++;
  },

  RESET_MAP_DATA(state) {
    state = {
      marker: {
        labelIndex: 0,
        geo_coordinate: {}
      }
    }
  }
}

export default {
  setMarkerCoordinate({commit}, markerCoordinate) {
    commit('SET_MARKER_COORDINATE', markerCoordinate)
  },

  increaseMarkerLabelIndex({commit}){
    commit('INCREASE_MARKER_LABEL_INDEX');
  },

  resetMapData({commit}){
    commit('RESET_MAP_DATA')
  }
}

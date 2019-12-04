export default {
  SET_ASSIGNED_ROUTES(state, routes){
    console.log(routes)
    state.assignedRoutes = routes;
  },

  CHANGE_ROUTE_STATUS(state, {id, status}){
    const route = state.assignedRoutes.filter(r => r.id === id)[0]
    route.status = status
  }
}

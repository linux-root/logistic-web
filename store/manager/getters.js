export default {
   getShippers(state){
       return state.shippers;
   },

  getRoutes(state){
     return state.routes;
  },
  getActiveRoutes(state){
     return state.routes.filter(e => e.status === 'A');
  },

  getUnassignedRoutes(state){
     return state.routes.filter(e => e.status === 'U')
  },

  getPendingRoutes(state){
     return state.routes.filter(e => e.status === 'P')
  }

}

export default {
   getShippers(state){
       return state.shippers;
   },

  getRoutes(state){
     return state.routes;
  },
  getActiveRoutes(state){
     return state.routes.filter(e => e.status === 'A');
  }
}

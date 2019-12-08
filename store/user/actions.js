export default {
   setUser({commit}, user) {
    commit('SET_USER', user);
  },

  updateUser({commit}){
    return this.$axios.get('/users/info').then(res =>{
       commit('SET_USER', res.data)
     })
  }
}

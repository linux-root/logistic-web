export default {
  async fetchShippers({commit}) {
      const whereCondition = {
          where : {is_manager: false}
      }
      this.$axios.get(`/users?filter=${JSON.stringify(whereCondition)}`).then(res => {
          console.log('shippers', res.data)
          commit('SET_SHIPPERS', res.data);
      });
  },
}

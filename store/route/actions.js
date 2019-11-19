
export default {
    setCurrentRoute({commit}, route) {
        commit('SET_CURRENT_ROUTE', route)
    },
    setRouteName({commit}, name) {
        commit('SET_ROUTE_NAME', name)
    },
    assignToShipper({commit}, shipper) {
        commit('ASSIGN_TO_SHIPPER', shipper)
    },

    addCheckpoint({commit}, checkpoint) {
        commit('ADD_CHECKPOINT', checkpoint)
    },
    setCheckpointName({commit}, {seq, name}) {
        commit('SET_CHECKPOINT_NAME', {seq, name})
    },

    setCheckpointCoordinate({commit}, {seq, coordinate}) {
        commit('SET_CHECKPOINT_COORDINATE', {seq, coordinate})
    },

    clearRouteData({commit}) {
        commit('CLEAR_ROUTE_DATA');
    },
    storeCurrentRoute({commit, state, dispatch}) {
        const {checkpoints, ...routeWithoutCheckpoints} = state.currentRoute;
        console.log('saved route', routeWithoutCheckpoints)
        this.$axios.post('/routes', routeWithoutCheckpoints).then(res => {
            const routeId = res.data.id;
            const savedRoute = res.data;

            if(savedRoute.assigned_to_shipper){
              const notification = {
                message: `Bạn đã được gán cho một đơn hàng ${routeId}`,
                created_by: savedRoute.created_by,
                notify_to: savedRoute.assigned_to_shipper
              }
              console.log('notify', notification)
              dispatch('notification/pushNotification', notification, {root: true});

            }

            checkpoints.forEach(cp => {
                delete cp.seq
                this.$axios.post(`routes/${routeId}/checkpoints`, cp).then(res => {
                    console.log('saved checkpoint', res.data)
                })
            });
        })
    }
}

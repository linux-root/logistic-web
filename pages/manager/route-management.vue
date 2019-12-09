<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap justify="center">

      <v-flex sm6 xs12 md6 lg6>
        <nuxt-link to="/manager/active-route">
          <material-stats-card
            color="blue"
            icon="mdi-go-kart-track"
            title="Route đang hoạt động"
            :value="`${this.activeRoutes.length}/${this.routes.length}`"
            small-value=""
            sub-icon="mdi-crosshairs-gps"
            sub-icon-color="blue"
            sub-text="Theo dõi đơn hàng"
            sub-text-color="blue--text darken-1"
          />
        </nuxt-link>
      </v-flex>

      <v-flex sm6 xs12 md6 lg6>
        <nuxt-link to="/manager/create-route">
          <material-stats-card
            color="green"
            icon="mdi-truck-check"
            title="Tạo Route"
            value="."
            small-value=""
            sub-icon="mdi-view-grid-plus"
            sub-icon-color="green"
            sub-text="Tạo Route"
            sub-text-color="green--text lighten-1"
          />
        </nuxt-link>
      </v-flex>

      <v-flex sm6 xs12 md6 lg6>
          <material-stats-card
            color="red lighten-4"
            icon="mdi-truck-fast"
            title="Sửa Route"
            :value="`${this.routes.length - this.activeRoutes.length}/${this.routes.length}`"
            small-value=""
            sub-icon="mdi-lead-pencil"
            sub-icon-color="red lighten-1"
            sub-text="Sửa Route"
            sub-text-color="red--text lightten-1"
          />
      </v-flex>

      <v-flex sm6 xs12 md6 lg6>
        <nuxt-link to="/manager/assign-route">
          <material-stats-card
            color="purple"
            icon="mdi-car-3-plus"
            title="Gán Route"
            :value="`${this.unassignedRoutes.length}/${this.routes.length}`"
            small-value=""
            sub-icon="mdi-card-plus"
            sub-icon-color="purple"
            sub-text="Gán Route"
            sub-text-color="text-primary"
          />
        </nuxt-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    import materialStatsCard from '~/components/material/AppStatsCard'
    import {mapGetters} from 'vuex'

    export default {
        name: "route-management",
        components: {materialStatsCard},
        fetch({store}){
            store.dispatch('manager/fetchRoutes')
        },
        computed : {
            ...mapGetters({
                pendingRoutes: 'manager/getPendingRoutes',
                unassignedRoutes: 'manager/getUnassignedRoutes',
                routes: 'manager/getRoutes',
                activeRoutes: 'manager/getActiveRoutes'
            })
        }
    }
</script>

<style scoped>

</style>

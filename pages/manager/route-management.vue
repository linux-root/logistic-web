<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap justify="center">

      <v-flex sm6 xs12 md6 lg4>
        <nuxt-link to="/manager/active-route">
          <material-stats-card
            color="blue"
            icon="mdi-go-kart-track"
            title="Active Route"
            value="49/50"
            small-value=""
            sub-icon="mdi-crosshairs-gps"
            sub-icon-color="green"
            sub-text="Theo dõi đơn hàng"
            sub-text-color="text-primary"
          />
        </nuxt-link>
      </v-flex>

      <v-flex sm6 xs12 md6 lg4>
        <nuxt-link to="/manager/create-route">
          <material-stats-card
            color="green"
            icon="mdi-truck-check"
            title="Tạo Route"
            value="49/50"
            small-value=""
            sub-icon="mdi-view-grid-plus"
            sub-icon-color="green"
            sub-text="Tạo Route"
            sub-text-color="text-primary"
          />
        </nuxt-link>
      </v-flex>

      <v-flex sm6 xs12 md6 lg4>
        <nuxt-link to="/manager/create-route">
          <material-stats-card
            color="orange"
            icon="mdi-truck"
            title="Sửa Route"
            value="49/50"
            small-value=""
            sub-icon="mdi-lead-pencil"
            sub-icon-color="orange"
            sub-text="Sửa  Route"
            sub-text-color="text-primary"
          />
        </nuxt-link>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
    import materialStatsCard from '~/components/material/AppStatsCard'

    export default {
        name: "route-management",
        components: {materialStatsCard}
    }
</script>

<style scoped>

</style>

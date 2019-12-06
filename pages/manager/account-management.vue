<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap justify="center">

      <v-flex sm6 xs12 md6 lg4>
        <nuxt-link to="register-shipper">
          <material-stats-card
            color="green"
            icon="mdi-account"
            title="Tạo Tài khoản"
            value="Shipper"
            sub-icon="mdi-view-grid-plus"
            sub-icon-color="green"
            sub-text="Tạo mới tài khoản cho Shipper"
            sub-text-color="text-primary"
          />
        </nuxt-link>
      </v-flex>

      <v-flex sm6 xs12 md6 lg4>
        <nuxt-link to="/manager/register-manager">
          <material-stats-card
            color="blue"
            icon="mdi-account-tie"
            title="Tạo tài khoản"
            value="Manager"
            small-value=""
            sub-icon="mdi-view-grid-plus"
            sub-icon-color="green"
            sub-text="Tạo mới tài khoản cho Manager"
            sub-text-color="text-primary"
          />
        </nuxt-link>
      </v-flex>

      <v-flex sm6 xs12 md6 lg4>
        <nuxt-link to="/manager/disable-account">
          <material-stats-card
            color="red"
            icon="mdi-account-alert"
            title="Vô hiệu hóa tài khoản"
            value="Shipper"
            small-value=""
            sub-icon="mdi-account-alert"
            sub-icon-color="orange"
            sub-text="vô hiệu hóa tài khoản"
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
        name: "account-management",
        components: {materialStatsCard}
    }
</script>

<style scoped>

</style>

<template>
  <v-app>
    <core-filter />

    <core-toolbar />

    <core-drawer v-bind:links="items"/>

    <core-view />
  </v-app>
</template>

<script>
  import coreFilter from '~/components/core/AppFilter';
  import coreToolbar from '~/components/core/AppToolbar';
  import coreDrawer from '~/components/core/AppDrawer';
  import coreView from '~/components/core/AppView';
  import {mapActions} from 'vuex'

  const MANAGER_MENU_ITEMS = [
      {
          to: '/dashboard',
          icon: 'mdi-view-dashboard',
          text: 'Dashboard'
      },
      {
          icon: 'mdi-apps',
          text: 'Welcome',
          to: '/'
      },
      {
          icon: 'mdi-chart-bubble',
          text: 'Inspire',
          to: '/inspire'
      },
      {
          icon: 'mdi-account-card-details',
          text: 'Quản lý tài khoản',
          to: '/manager/account-management'
      },
      {
          icon: 'mdi-ship-wheel',
          text:'Quản lý giao hàng',
          to: '/manager/route-management'
      }
  ]

  const SHIPPER_MENU_ITEMS = [
      {
          icon: 'mdi-apps',
          text: 'welcome',
          to: '/'
      },
      {
          icon: 'mdi-chart-bubble',
          text: 'inspire',
          to: '/inspire'
      },
      {
          icon: 'mdi-update',
          text: 'Cập nhật thông tin',
          to: '/shipper/update-profile'
      },
      {
          icon: 'mdi-update',
          text: 'Route',
          to: '/shipper/assigned-route'
      }
  ]

  export default {
    components: {
      coreFilter,
      coreToolbar,
      coreDrawer,
      coreView
    },
      computed: {
          items() {
              if (this.$auth.user.is_manager) {
                  return MANAGER_MENU_ITEMS;
              } else {
                  return SHIPPER_MENU_ITEMS;
              }
          }
      },

    methods: {
      ...mapActions({addNotification: 'notification/addNotification'})
    },

   async mounted() {
       const channel = this.$pusher.subscribe('notification', () => {
         console.log('subscribe successfully ')
       });
       channel.bind(this.$store.state.auth.user.id, data => this.$store.dispatch('notification/addNotification', data));
    }
  }
</script>

<style lang="scss">
  /* Remove in 1.2 */
  .v-datatable thead th.column.sortable i {
    vertical-align: unset;
  }
</style>

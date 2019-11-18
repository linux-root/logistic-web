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
          text: 'Đăng ký shipper',
          to: '/manager/register-shipper'
      },
      {
          icon: 'mdi-ship-wheel',
          text:'Tạo Route',
          to: '/manager/create-route'
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

   async mounted() {
       const channel = this.$pusher.subscribe('my-channel', () => {
         console.log('subscribe successfully ')
       });
       channel.bind('my-event', data => alert(JSON.stringify(data)));
    }
  }
</script>

<style lang="scss">
  /* Remove in 1.2 */
  .v-datatable thead th.column.sortable i {
    vertical-align: unset;
  }
</style>

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
          text: 'Đăng ký Shipper',
          to: '/manager/register-shipper'
      }
  ]

  const SHIPPER_MENU_ITEMS = [
      {
          icon: 'mdi-apps',
          text: 'Welcome',
          to: '/'
      },
      {
          icon: 'mdi-chart-bubble',
          text: 'Inspire',
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
      }
  }
</script>

<style lang="scss">
  /* Remove in 1.2 */
  .v-datatable thead th.column.sortable i {
    vertical-align: unset;
  }
</style>

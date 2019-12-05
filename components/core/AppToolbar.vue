<template>
  <v-toolbar
    id="core-toolbar"
    flat
    prominent
    style="background: #eee;"
  >
    <div class="v-toolbar-title">
      <v-toolbar-title
        class="tertiary--text font-weight-light"
      >
        <v-btn
          v-if="responsive"
          class="default v-btn--simple"
          dark
          icon
          @click.stop="onClickBtn"
        >
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
        {{ title }}
      </v-toolbar-title>
    </div>

    <v-spacer/>
    <v-toolbar-items>
      <v-flex
        align-center
        layout
        py-2
      >
        <v-text-field
          v-if="responsiveInput"
          class="mr-4 mt-2 purple-input"
          label="Search..."
          hide-details
          color="purple"
        />
        <nuxt-link
          v-ripple
          class="toolbar-items"
          to="/"
          title="Dashboard"
        >
          <v-icon color="tertiary">mdi-view-dashboard</v-icon>
        </nuxt-link>
        <v-menu bottom left content-class="dropdown-menu" offset-y transition="slide-y-transition">
          <template v-slot:activator="{on}">
            <span v-on="on" style="cursor: pointer">
              <v-icon v-if="unreadNotifications.length === 0" color="tertiary">mdi-bell</v-icon>
            <v-badge color="error" overlap v-if="unreadNotifications.length > 0">
              <template v-slot:badge>
                {{ unreadNotifications.length}}
              </template>
              <v-icon color="tertiary">mdi-bell</v-icon>
            </v-badge>
            </span>
          </template>
          <v-card>
            <v-list dense>
              <v-list-item v-for="notification in notifications" :key="notification.id" @click="onClick($event)" min-width="200px">
                <v-list-item-title v-text="notification.message"  />
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
        <nuxt-link
          v-ripple
          class="toolbar-items"
          to="/user-profile"
          title="User profile"
        >
          <v-icon color="tertiary">mdi-account</v-icon>
        </nuxt-link>
        <nuxt-link v-ripple class="toolbar-items" to="/" title="Logout" @click.native="logout" >
          <v-icon color="tertiary">mdi-logout</v-icon>
        </nuxt-link>
      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  import {mapActions, mapGetters, mapMutations} from 'vuex'

  export default {
    data: () => ({
      title: 'Dashboard',
      responsive: true,
      responsiveInput: true
    }),

      fetch({store}){
         store.dispatch('notification/fetchNotifications')
      },
    computed: {
        ...mapGetters({
            drawer: 'app/getDrawer',
            notifications: 'notification/getNotifications',
            unreadNotifications: 'notification/getUnreadNotifications'
        }),
    },
    methods: {
      ...mapActions({
          setUser: 'user/setUser',
          setDrawer: 'app/setDrawer',
          readNotification: 'notification/readNotification'
      }),
      ...mapMutations({clearAll: 'CLEAR_ALL'}),
      onClickBtn() {
        this.setDrawer(!this.drawer)
      },
      onClick(event) {
          console.log(event)
          //if unread
      //    this.readNotification()
          this.$router.push('/shipper/assigned-route')
      },
      onResponsiveInverted() {
        if (window.innerWidth < 991) {
          this.responsive = true
          this.responsiveInput = false
        } else {
          this.responsive = false
          this.responsiveInput = true
        }
      },
      async logout() {
        await this.setUser(null);
        this.clearAll();
        this.$auth.logout();
      }
    },
    mounted() {
      this.onResponsiveInverted()
      window.addEventListener('resize', this.onResponsiveInverted)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResponsiveInverted)
    }
  }
</script>

<style>
  #core-toolbar a {
    text-decoration: none;
  }
</style>

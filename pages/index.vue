<template>
  <v-container>
    <v-layout justify-center align-center>
      <v-flex class="text-center">
        <blockquote class="blockquote">
          <span> Xin chào  <span class="font-weight-black">{{user.full_name}}</span>  !</span><br/>
          <span> Bạn đã đăng nhập thành công, vai trò của bạn là <span
            class="font-italic font-weight-bold">{{role}}</span> trong hệ thống </span>
        </blockquote>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    import Logo from '~/components/Logo.vue'
    import {mapGetters} from 'vuex'

    export default {
        middleware: 'auth',
        components: {
            Logo,
        },
        fetch({store}){
            store.dispatch('notification/fetchNotifications')
        },
        computed: {
            user() {
                return this.$store.state.auth.user
            },

            role() {
                return this.$store.state.auth.user.is_manager ? 'Manager' : 'Shipper'
            }
        }
    }
</script>

<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md12>
        <material-card class="v-card-profile">
          <v-avatar slot="offset" class="mx-auto d-block" size="130">
            <img src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg">
          </v-avatar>
          <v-card-text class="text-xs-center">
            <h6 class="category text-gray font-weight-thin mb-3">{{ role }}</h6>
            <h4 class="card-title font-weight-light">{{ user.full_name }}</h4>
            <p class="card-description font-weight-light">{{ description }}</p>
            <blockquote class="blockquote">{{citation }}</blockquote>
            <v-btn color="success" round class="font-weight-light">Thay đổi thông tin</v-btn>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    import {mapGetters} from 'vuex'
    import materialCard from '~/components/material/AppCard'

    export default {
        layout: 'dashboard',
        components: {
            materialCard
        },
        data: () => ({
            description: 'My imagination is my own limit. Trust on you and open your spirit beyond the sky.',
            citation: 'Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.'
        }),
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

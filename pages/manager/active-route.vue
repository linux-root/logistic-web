<template>
  <v-container fill-height fluid grid-list-xl >
    <v-layout justify-center wrap >
      <v-flex md12 >

        <v-dialog v-model="dialog" fullscreen  transition="dialog-bottom-transition">
          <v-card>
            <v-toolbar dark color="success">
              <v-btn  icon dark @click="close()">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

            <v-container fluid>
              <v-layout wrap>
                <v-flex xs12 md12>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Active Route : {{currentRoute.name}}. Đang được thực hiện bởi Shipper : Hà Hữu Vinh </span>
                    </v-card-title>
                    <v-card-text>>
                      <live-tracking/>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-dialog>


        <material-card color="green" flat full-width title="Vận đơn đang được thực hiện"
          text="Here is a subtitle for this table" >
          <v-data-table @click:row="openDialog($event)" :headers="headers" :items="activeRoutes" hide-default-footer >
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    import materialCard from '~/components/material/AppCard'
    import liveTracking from '~/components/map/LiveTracking'
    import {mapGetters, mapActions} from 'vuex'
    export default {
        name: 'active-route',
        middleware: 'auth',
        components: {
            materialCard,
            liveTracking
        },

        fetch({store}){
            store.dispatch('manager/fetchRoutes');
        },
        computed: {
            ...mapGetters({routes: 'manager/getRoutes',
                activeRoutes: 'manager/getActiveRoutes',
                currentRoute: 'route/getCurrentRoute'
            })
        },
        data: () => ({
            dialog : false,
            headers: [
                {
                    sortable: false,
                    text: 'Tên',
                    value: 'name'
                },
                {
                    sortable: false,
                    text: 'Trạng thái',
                    value: 'status'
                },
                {
                    sortable: false,
                    text: 'Shipper',
                    value: 'assigned_to'
                },
                {
                    sortable: false,
                    text: 'Salary',
                    value: 'salary',
                    align: 'right'
                }
            ]
        }),
        methods: {
            ...mapActions({
                setCurrentRoute: 'route/setCurrentRoute',
                setRouteId: 'route/setRouteId',
                fetchCurrentRoute:  'route/fetchCurrentRoute',
                clearRouteData: 'route/clearRouteData',
            }),
            async openDialog(event){
                await this.setRouteId(event.id)
                this.dialog = !this.dialog
            },

            close(){
                this.dialog = false;
                this.clearRouteData()
            }
        }
    }
</script>

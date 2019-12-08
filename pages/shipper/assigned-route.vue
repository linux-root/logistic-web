<template>
  <v-container fill-height fluid grid-list-xl >
    <v-layout justify-center wrap >
      <v-flex md12 >
        <v-dialog v-model="dialog" fullscreen  transition="dialog-bottom-transition">
          <v-card>
            <v-toolbar dark color="success">
              <v-btn  icon dark @click="close">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

            <v-container fluid>
              <v-layout wrap>
                <v-flex xs12 md12>
                      <navigation ref="navigation"/>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-dialog>

        <material-card color="green" flat full-width title="Vận đơn được gán cho bạn"
          text="Here is a subtitle for this table" >
          <v-data-table @click:row="selectRoute($event)" :headers="headers" :items="this.assignedRoutes" hide-default-footer>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    import materialCard from '~/components/material/AppCard'
    import navigation from'~/components/map/Navigation'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'assigned-route',
        components: {
            materialCard,
            navigation
        },
        fetch({store}){
            store.dispatch('shipper/fetchAssignedRoutes')
        },
        computed: {
            ...mapGetters({
                assignedRoutes: 'shipper/getAssignedRoutes',
                currentRoute: 'route/getCurrentRoute'
            })
        },
        data: () => ({
            dialog: false,
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
                    text: 'Người tạo',
                    value: 'created_by'
                }
            ],
        }),
        methods: {
            ...mapActions({
                setCurrentRoute: 'route/setCurrentRoute',
                fetchCurrentRoute:  'route/fetchCurrentRoute',
                clearRouteData: 'route/clearRouteData',
                fetchCurrentCheckpoints: 'route/fetchCurrentCheckpoints',
                refuseRoute : 'shipper/refuseRoute',
                acceptRoute: 'shipper/acceptRoute'
            }),
            selectRoute(event){
                this.$swal.fire({
                    title: 'Xác nhận giao hàng',
                    text: `Tên Route: ${event.name}. ID: ${event.id}`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    showCloseButton: true,
                    confirmButtonText: 'Bắt đầu',
                    cancelButtonText: 'Từ chối'
                }).then((result) => {
                    console.log(result)
                    if (result.dismiss === 'cancel') {
                        this.$swal.fire(
                            'Đã từ chối',
                            `Từ chối Route ${event.name}`,
                            'info'
                        )
                        this.refuseRoute(event.id);
                    }
                    else if(result.value){
                        this.acceptRoute(event.id)
                        this.openDialog(event)
                    }
                })
            },
            async openDialog(event){
                const selectedRoute = {
                    id: event.id,
                    name: event.name,
                    assigned_to_shipper: event.assigned_to_shipper,
                    checkpoints: []
                }
                await this.setCurrentRoute(selectedRoute)
                this.fetchCurrentCheckpoints().then(()=> {
                    this.initMap()
                    this.dialog = !this.dialog
                })
            },
            close(){
                this.dialog = false;
                this.clearRouteData()
            },
            initMap() {
                if(!this.$refs.navigation) return
                this.$refs.navigation.initMap() //access child component method
            }
        }
    }
</script>

<template>
  <v-container fill-height fluid grid-list-xl >
    <v-layout justify-center wrap >
      <v-flex md12 >
        <material-card color="green" flat full-width title="Danh sách Route"
          text="Chọn Route để gán Shipper" >
          <v-data-table :headers="headers" :items="unassignedRoutes" hide-default-footer >
            <template v-slot:item="{item}">
              <tr @click="assignShipper(item)">
                <td>{{item.id}}</td>
                <td>{{item.name}}</td>
                <td>{{item.phone}}</td>
                <td>{{item.status === 'P' ? 'Chưa gán Shipper' : 'Bị vô hiệu hóa'}}</td>
              </tr>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    import materialCard from '~/components/material/AppCard'
    import {mapGetters, mapActions} from 'vuex'
    export default {
        name: 'assign-route',
        middleware:'auth',
        components: {
            materialCard,
        },

        fetch({store}){
            store.dispatch('manager/fetchShippers');
        },
        computed: {
            ...mapGetters({
                shippers: 'manager/getShippers',
                unassignedRoutes: 'manager/getUnassignedRoutes'
            }),

            shipperSelectList(){
                const result = {}
                this.shippers.forEach(e => {
                    const id = e.id
                    result[id] = e.full_name
                })
                return result
            }
        },
        data: () => ({
            dialog : false,
            headers: [
                {
                    sortable: false,
                    text: 'ID',
                    value: 'id'
                },
                {
                    sortable: false,
                    text: 'Tên',
                    value: 'name'
                },
                {
                    sortable: false,
                    text: 'Số điểm đi qua',
                },

                {
                    sortable: false,
                    text: 'Trạng thái',
                    value: 'citizen_id'
                },
            ]
        }),
        methods: {
            ...mapActions({
                setCurrentRoute: 'route/setCurrentRoute',
                assignToShipper: 'route/assignToShipper',
                updateRoute: 'route/updateCurrentRoute'
            }),
            assignShipper(route) {
                this.setCurrentRoute(route)
                this.$swal.fire({
                    title: 'Vui lòng chọn Shipper',
                    input: 'select',
                    inputOptions: this.shipperSelectList,
                    inputAttributes: {
                        autocapitalize: 'off'
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Lưu lại',
                    showLoaderOnConfirm: true,
                    allowOutsideClick: () => !this.$swal.isLoading()
                }).then((result) => {
                    console.log(result)
                    if (result.value) {
                        this.assignToShipper(result.value)
                        this.updateRoute()
                        this.$swal(
                            'Gán Route thành công',
                            '',
                            'success'
                        )
                    }
                })
            },


        }
    }
</script>


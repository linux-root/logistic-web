<template>
  <v-container fill-height fluid grid-list-xl >
    <v-layout justify-center wrap >
      <v-flex md12 >
        <material-card color="green" flat full-width title="Danh sách Shipper"
          text="Chọn Shipper để vô hiệu hóa tài khoản" >
          <v-data-table :headers="headers" :items="shippers" hide-default-footer >
            <template v-slot:item="{item}">
              <tr @click="changeAccountStatus(item)">
                <td>{{item.full_name}}</td>
                <td>{{item.email}}</td>
                <td>{{item.phone}}</td>
                <td>{{item.citizen_id}}</td>
                <td>{{item.is_active ? 'Hoạt động' : 'Bị vô hiệu hóa'}}</td>
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
    import liveTracking from '~/components/map/LiveTracking'
    import {mapGetters, mapActions} from 'vuex'
    export default {
        name: 'disable-account',
        middleware:'auth',
        components: {
            materialCard,
            liveTracking
        },

        fetch({store}){
            store.dispatch('manager/fetchShippers');
        },
        computed: {
            ...mapGetters({
                shippers: 'manager/getShippers',
            })
        },
        data: () => ({
            dialog : false,
            headers: [
                {
                    sortable: false,
                    text: 'Tên',
                    value: 'full_name'
                },
                {
                    sortable: false,
                    text: 'Email',
                    value: 'email'
                },
                {
                    sortable: false,
                    text: 'Số điện thoại',
                    value: 'phone'
                },

                {
                    sortable: false,
                    text: 'Số Chứng minh thư Nhân dân',
                    value: 'citizen_id'
                },
                {
                    sortable: false,
                    text: 'Trạng thái',
                },
            ]
        }),
        methods: {
            ...mapActions({
                disableShipperAccount : 'manager/disableShipperAccount',
                activeShipperAccount: 'manager/activeShipperAccount'
            }),
            changeAccountStatus(account){
              if(account.is_active){
                  this.$swal.fire({
                      title: 'Vô hiệu hóa tài khoản của ' + account.full_name + ' ?',
                      text: "",
                      icon: 'question',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'OK'
                  }).then((result) => {
                      if (result.value) {
                          this.disableShipperAccount(account.id).then( () =>
                              this.$swal.fire(
                                  'Xong',
                                  `Tài khoản Shipper ${account.full_name} đã bị vô hiệu hóa`,
                                  'success'
                              )
                          )
                      }
                  })
              }
              else {
                  this.$swal.fire({
                      title: 'Kích hoạt lại tài khoản của ' + account.full_name + ' ?',
                      text: "",
                      icon: 'question',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'OK'
                  }).then((result) => {
                      if (result.value) {
                          this.activeShipperAccount(account.id).then( () =>
                              this.$swal.fire(
                                  'Xong',
                                  `Tài khoản Shipper ${account.full_name} đã được kích hoạt`,
                                  'success'
                              )
                          )
                      }
                  })
              }
            },
        }
    }
</script>


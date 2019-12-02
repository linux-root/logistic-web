<template>
  <v-container fill-height fluid grid-list-xl >
    <v-layout justify-center wrap >
      <v-flex md12 >
        <material-card color="green" flat full-width title="Vận đơn được gán cho bạn"
          text="Here is a subtitle for this table" >
          <v-data-table :headers="headers" :items="this.assignedRoutes" hide-default-footer>
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
        name: 'assigned-route',
        components: {
            materialCard
        },
        fetch({store}){
            store.dispatch('shipper/fetchAssignedRoutes')
        },
        computed: {
            ...mapGetters({
                assignedRoutes: 'shipper/getAssignedRoutes'
            })
        },
        data: () => ({
            headers: [
                {
                    sortable: false,
                    text: 'Tên',
                    value: 'name'
                },
                {
                    sortable: false,
                    text: 'Trạng thái',
                    value: 'country'
                },
                {
                    sortable: false,
                    text: 'Người tạo',
                    value: 'city'
                },
                {
                    sortable: false,
                    text: 'Salary',
                    value: 'salary',
                    align: 'right'
                }
            ],
            items: [
                {
                    name: 'Dakota Rice',
                    country: 'Niger',
                    city: 'Oud-Tunrhout',
                    salary: '$35,738'
                },
                {
                    name: 'Minerva Hooper',
                    country: 'Curaçao',
                    city: 'Sinaai-Waas',
                    salary: '$23,738'
                }, {
                    name: 'Sage Rodriguez',
                    country: 'Netherlands',
                    city: 'Overland Park',
                    salary: '$56,142'
                }, {
                    name: 'Philip Chanley',
                    country: 'Korea, South',
                    city: 'Gloucester',
                    salary: '$38,735'
                }, {
                    name: 'Doris Greene',
                    country: 'Malawi',
                    city: 'Feldkirchen in Kārnten',
                    salary: '$63,542'
                }, {
                    name: 'Mason Porter',
                    country: 'Chile',
                    city: 'Gloucester',
                    salary: '$78,615'
                }
            ]
        })
    }
</script>

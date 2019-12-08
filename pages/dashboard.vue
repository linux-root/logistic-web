<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex md12 sm12 lg6>
        <material-chart-card :data="dailySalesChart.data" :options="dailySalesChart.options" color="info" type="Line">
          <h4 class="title font-weight-light">Số lượng giao hàng hôm nay</h4>
          <p class="category d-inline-flex font-weight-light">
            <v-icon color="green" small>
              mdi-arrow-up
            </v-icon>
            <span class="green--text">55%</span>&nbsp;
          </p>

          <template slot="actions">
            <v-icon class="mr-2" small>
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">đã cập nhật 4 phút trước</span>
          </template>
        </material-chart-card>
      </v-flex>

      <v-flex md12 sm12 lg6>
        <material-chart-card
          :data="dataCompletedTasksChart.data"
          :options="dataCompletedTasksChart.options"
          color="green"
          type="Line"
        >
          <h3 class="title font-weight-light">Lượt giao hàng thành công</h3>
          <p class="category d-inline-flex font-weight-light">Last Last Campaign Performance</p>

          <template slot="actions">
            <v-icon class="mr-2" small>
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">lượt giao hàng cuối cùng 26 phút trước</span>
          </template>
        </material-chart-card>
      </v-flex>
      <v-flex sm6 xs12 md6 lg4>
        <material-stats-card
          color="green"
          icon="mdi-store"
          title="Doanh thu"
          value="$34,245"
          sub-icon="mdi-calendar"
          sub-text="24 giờ qua"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg4>
        <material-stats-card
          color="orange"
          icon="mdi-account-tie"
          title="Số shipper đang hoạt động"
          value="49/50"
          small-value=""
          sub-icon="mdi-user"
          sub-text="..."
          sub-text-color="text-primary"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg4>
        <material-stats-card color="red" icon="mdi-information-outline"
                             title="Số đơn hàng không thành công"
                             value="75"
                             sub-icon="mdi-car"
                             sub-text="Trong tháng"
        />
      </v-flex>
      <v-flex md12 lg6>
        <material-card color="orange" title="Thống kê Shipper" text="New employees on 15th September, 2016"
        >
          <v-data-table :headers="headers" :items="items" hide-default-footer>
            <template slot="headerCell" slot-scope="{ header }">
              <span class="font-weight-light text-warning text--darken-3"
                    v-text="header.text"/>
            </template>
            <template slot="items" slot-scope="{ index, item }">
              <td>{{ index + 1 }}</td>
              <td>{{ item.name }}</td>
              <td class="text-xs-right">{{ item.salary }}</td>
              <td class="text-xs-right">{{ item.country }}</td>
              <td class="text-xs-right">{{ item.city }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    import materialCard from '~/components/material/AppCard'
    import materialChartCard from '~/components/material/AppChartCard'
    import materialStatsCard from '~/components/material/AppStatsCard'

    export default {
        middleware: 'auth',
        components: {
            materialCard,
            materialChartCard,
            materialStatsCard
        },
        data() {
            return {
                dailySalesChart: {
                    data: {
                        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                        series: [
                            [12, 17, 7, 17, 23, 18, 38]
                        ]
                    },
                    options: {
                        low: 0,
                        high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                        chartPadding: {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        }
                    }
                },
                dataCompletedTasksChart: {
                    data: {
                        labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
                        series: [
                            [230, 750, 450, 300, 280, 240, 200, 190]
                        ]
                    },
                    options: {
                        low: 0,
                        high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                        chartPadding: {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        }
                    }
                },
                emailsSubscriptionChart: {
                    data: {
                        labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
                        series: [
                            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]
                        ]
                    },
                    options: {
                        axisX: {
                            showGrid: false
                        },
                        low: 0,
                        high: 1000,
                        chartPadding: {
                            top: 0,
                            right: 5,
                            bottom: 0,
                            left: 0
                        }
                    },
                    responsiveOptions: [
                        ['screen and (max-width: 640px)', {
                            seriesBarDistance: 5,
                            axisX: {
                                labelInterpolationFnc: function (value) {
                                    return value[0]
                                }
                            }
                        }]
                    ]
                },
                headers: [
                    {
                        sortable: false,
                        text: 'ID',
                        value: 'id'
                    },
                    {
                        sortable: false,
                        text: 'Name',
                        value: 'name'
                    },
                    {
                        sortable: false,
                        text: 'Salary',
                        value: 'salary',
                        align: 'right'
                    },
                    {
                        sortable: false,
                        text: 'Country',
                        value: 'country',
                        align: 'right'
                    },
                    {
                        sortable: false,
                        text: 'City',
                        value: 'city',
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
                    }
                ],
                tabs: 0,
                list: {
                    0: false,
                    1: false,
                    2: false
                }
            }
        },
        methods: {
            complete(index) {
                this.list[index] = !this.list[index]
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.dailySalesChart.options = {
                    lineSmooth: this.$chartist.Interpolation.cardinal({
                        tension: 0
                    }),
                    low: 0,
                    high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                    chartPadding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }
                };
                this.dataCompletedTasksChart.options = {
                    lineSmooth: this.$chartist.Interpolation.cardinal({
                        tension: 0
                    }),
                    low: 0,
                    high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                    chartPadding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }
                };
            });
        },
        logout() {
            this.$auth.logout()
        },
        fetch({store}){
            store.dispatch('notification/fetchNotifications')
        }
    }
</script>

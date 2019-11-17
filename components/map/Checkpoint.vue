<template>
    <v-row justify="center">
        <!--<v-btn color="primary" dark @click.stop="open">{{checkpoint.name}}</v-btn>-->
        <slot :openMethod="open"></slot>
        <v-dialog v-model="dialog" fullscreen  transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="success">
                    <v-btn  icon dark @click="close()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <!--<v-toolbar-title text>Checkpoint</v-toolbar-title>-->
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark text @click="save()">Lưu lại</v-btn>
                    </v-toolbar-items>
                </v-toolbar>

                <v-container fluid>
                    <v-layout wrap>
                            <v-flex xs12 md4>
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">Thông tin Checkpoint</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" sm="12" md="12">
                                                    <v-text-field v-model="checkpointName"
                                                                  :error-messages="nameErrors"
                                                                  :counter="50"
                                                                  label="Tên Checkpoint"
                                                                  required
                                                                  @input="$v.name.$touch()"
                                                                  @blur="$v.name.$touch()"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6">
                                                    <v-select
                                                            :items="['0-17', '18-29', '30-54', '54+']"
                                                            label="Hàng cần giao"
                                                            required
                                                    ></v-select>
                                                </v-col>
                                                <v-col cols="12" sm="6">
                                                    <v-autocomplete
                                                            :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                                            label="Interests"
                                                            multiple
                                                    ></v-autocomplete>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>
                                </v-card>
                            </v-flex>

                        <v-flex xs12 md8>
                            <v-card>
                                      <google-map :checkpoint="checkpoint"></google-map>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import googleMap from './GoogleMap.vue'
  import {required, email, minLength, between, maxLength, numeric} from 'vuelidate/lib/validators'

  export default {
      name: "Checkpoint",
      props: ['checkpoint'],
      components: {
          googleMap,
      },
      validations: {
          name: {required, maxLength: maxLength(50)}
      },
      data: () => ({
          dialog: false,
          notifications: false,
          sound: true,
          widgets: false,
          checkpointName: 'Click để sửa'
      }),
     computed: {
        ...mapGetters({
            markerCoordinate: 'map/getMarkerCoordinate',
          }
        ),

          nameErrors() {
                  const errors = []
                  if (!this.$v.name.$dirty) return errors
                  !this.$v.name.maxLength && errors.push('Độ dài tên tối đa là 50 ký tự')
                  !this.$v.name.required && errors.push('Nhập tên Checkpoint')
                  return errors
          }
      },

      methods: {
          ...mapActions({
              setCheckpointName: 'route/setCheckpointName',
              setCheckpointCoordinate: 'route/setCheckpointCoordinate'
          }),
          async open() {
              this.dialog = true;
          },
          close() {
              this.dialog = false;
          },
          save() {
              this.dialog = false;
              // this.checkpoint.geo_coordinate = this.currentCheckpoint.geo_coordinate;
              // this.checkpoint.name = this.checkpointName
             const seq = this.checkpoint.seq;
             const name = this.checkpointName;
             const coordinate = this.markerCoordinate;
             console.log("%c Checkpoint info", 'color: orange; font-weight:bold;');
             console.log({seq, name})
             console.log({seq, coordinate})
             this.setCheckpointName({seq, name});
             this.setCheckpointCoordinate({seq, coordinate});
          }
      }
  }
</script>

<style scoped>

</style>

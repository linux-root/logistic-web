<template>
    <v-row justify="center">
        <!--<v-btn color="primary" dark @click.stop="open">{{checkpoint.name}}</v-btn>-->
        <slot :openMethod="open"></slot>
        <v-dialog v-model="dialog" fullscreen  transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn  icon dark @click="close()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Settings</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark text @click="save()">Save</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-container py-0>
                    <v-layout wrap>
                            <v-flex xs12 md6>
                                <v-card>
                                <v-text-field v-model="checkpointName"
                                              :error-messages="nameErrors"
                                              :counter="50"
                                              label="Tên Checkpoint"
                                              required
                                              @input="$v.name.$touch()"
                                              @blur="$v.name.$touch()"
                                ></v-text-field>
                                    </v-card>
                            </v-flex>
                        <v-flex xs12 md6>
                            <google-map></google-map>
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
          googleMap
      },
      validations: {
          name: {required, maxLength: maxLength(50)}
      },
    mounted(){
      this.checkpointName = 'Default name'
    },
      data: () => ({
          dialog: false,
          notifications: false,
          sound: true,
          widgets: false,
          checkpointName: ''
      }),
      computed: {
          nameErrors() {
                  const errors = []
                  if (!this.$v.name.$dirty) return errors
                  !this.$v.name.maxLength && errors.push('Độ dài tên tối đa là 50 ký tự')
                  !this.$v.name.required && errors.push('Nhập tên Route')
                  return errors
          }
      },

      methods: {
          ...mapActions({
              setCheckpointName: 'route/setCheckpointName'
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
             const coordinate = this.checkpoint
             console.log("%c Checkpoint info", 'color: orange; font-weight:bold;');
             console.log({seq, name})
             this.setCheckpointName({seq, name});
          }
      }
  }
</script>

<style scoped>

</style>

<template>
    <v-row justify="center">
        <v-btn color="primary" dark @click.stop="open">{{checkpoint.name}}</v-btn>
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
                        <v-flex xs12 md6 >
                            setting
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
    export default {
        name: "Checkpoint",
       props:['checkpoint'],
        components : {
            googleMap
        },
        data: () => ({
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false
    }),
      computed: {
          ...mapGetters({
            currentCheckpoint: 'checkpoint/getCurrentCheckpoint'
          })
      },

        methods : {
          ...mapActions({
            setCurrentCheckpoint: 'checkpoint/setCurrentCheckpoint'
          }),
           async open(){
                this.dialog = true;
                this.setCurrentCheckpoint(this.checkpoint)
            },
            close(){
               this.dialog = false;
            },
          save(){
              this.dialog = false;
              console.log('current checkpoint');
              this.checkpoint.location = this.currentCheckpoint.location;
              console.log(this.checkpoint)
            }
        }
    }
</script>

<style scoped>

</style>

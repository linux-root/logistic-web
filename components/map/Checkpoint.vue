<template>
    <v-row justify="center">
        <v-btn color="primary" dark @click.stop="open">{{checkpoint.name}}</v-btn>
        <v-dialog v-model="dialog" fullscreen  transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn  icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Settings</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark text @click="dialog = false">Save</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-container py-0>
                    <v-layout wrap>
                        <v-flex xs12 md6 >
                            setting
                        </v-flex>
                        <v-flex xs12 md6>
                            <google-map :checkpoint="checkpoint"></google-map>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import googleMap from './GoogleMap.vue'
    export default {
        name: "Checkpoint",
        props: ['checkpoint'],
        components : {
            googleMap
        },
        data: () => ({
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false
    }),
        methods : {
           async open(){
                this.dialog = true;
            }
        }
    }
</script>

<style scoped>

</style>

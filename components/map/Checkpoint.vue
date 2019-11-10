<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on">{{locationName}}</v-btn>
            </template>
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
                        <v-flex xs12 md12 >
                            ahihi
                        </v-flex>
                        <v-flex xs12 md12 >
                            <map></map>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import map from './Maps'
    export default {
        name: "Checkpoint",
        props: ['locationName'],
        component : {
            map
        },
        data: () => ({
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false
    })
    }
</script>

<style scoped>

</style>
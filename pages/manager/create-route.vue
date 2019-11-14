<template>
    <v-container fill-height fluid grid-list-xl>
        <v-layout justify-center wrap >
            <v-flex xs12 md8 >
                <material-card color="green" title="Tạo Route" text="Nhập thông tin Route" >
                    <v-form @submit.prevent="submit">
                        <v-container py-0>
                            <v-layout wrap>
                                <v-flex xs12 md12 >
                                    <v-text-field v-model="name"
                                                  :error-messages="nameErrors"
                                                  :counter="50"
                                                  label="Tên Route"
                                                  required
                                                  @input="$v.name.$touch()"
                                                  @blur="$v.name.$touch()"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 md12 v-for="checkpoint in currentRoute.checkpoints" :key="checkpoint.seq">
                                  <checkpoint :checkpoint="checkpoint" v-slot="{openMethod}">
                                          <v-btn color="primary" @click.stop="openMethod" >{{checkpoint.name}}</v-btn>
                                  </checkpoint>
                                </v-flex>

                                <v-flex xs12 md12>
                                        <v-btn class="mx-2" @click="addCheckpoint" fab dark color="indigo">
                                            <v-icon dark>mdi-plus</v-icon>
                                        </v-btn>
                                </v-flex>

                                    <v-btn type="submit" class="mx-0 font-weight-light" color="success" >
                                        Lưu Route
                                    </v-btn>
                            </v-layout>
                        </v-container>
                    </v-form>
                </material-card>
            </v-flex>
            <v-flex
                    xs12
                    md4
            >
                <material-card class="v-card-profile">
                    <v-avatar
                            slot="offset"
                            class="mx-auto d-block"
                            size="130"
                    >
                        <img
                                src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
                        >
                    </v-avatar>
                    <v-card-text class="text-xs-center">
                        <h6 class="category text-gray font-weight-thin mb-3">CEO / CO-FOUNDER</h6>
                        <h4 class="card-title font-weight-light">{{this.$auth.user.full_name}}</h4>
                        <p class="card-description font-weight-light">Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...</p>
                        <v-btn color="success" rounded class="font-weight-light" >Follow</v-btn>
                    </v-card-text>
                </material-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {required, email, minLength, between, maxLength, numeric} from 'vuelidate/lib/validators'
    import axios from "../../.nuxt/axios";
    import materialCard from '~/components/material/AppCard'
    import cp from '~/components/map/Checkpoint'
    import {mapSetters, mapGetters, mapActions} from 'vuex'

    export default {
        components: {
            materialCard,
            checkpoint: cp
        },
        name: "created-route",
        middleware: 'auth',
        validations: {
            name: {required, maxLength: maxLength(50)},
            email: {required, email},
            phone: {required, numeric},
            select: {required},
            citizenId: {required, numeric}
        },

        data: () => ({
            name: '',
           /* checkpoints: [
                {
                    seq: 'ae',
                    name : 'Linh Dam',
                    geo_coordinate : {}
                },
                {
                    seq: 'af',
                    name: 'Nguy Nhu Kon Tum',
                    geo_coordinate: {}
                }
            ],*/
            snackbar: false
        }),

        computed: {
             ...mapGetters({
               currentRoute: 'route/getCurrentRoute'
            }),
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
                addCheckpointX: 'route/addCheckpoint'
            }),

            submit() {
             console.log(this.checkpoints);
            },
            addCheckpoint(){
               const newCheckpoint = {
                   name : 'new checkpoint'
               }
                this.addCheckpointX(newCheckpoint)
            }
        }
    }
</script>

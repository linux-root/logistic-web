<template>
    <v-container fill-height fluid grid-list-xl>
        <v-layout justify-center wrap>
            <v-flex xs12 md8>
                <material-card color="green" title="Tạo Route" text="Nhập thông tin Route">
                    <v-form @submit.prevent="submit">
                        <v-container py-0>
                            <v-layout wrap>
                                <v-flex xs12 md6>
                                    <v-text-field v-model="name"
                                                  :error-messages="nameErrors"
                                                  :counter="50"
                                                  label="Tên Route"
                                                  required
                                                  @input="$v.name.$touch()"
                                                  @blur="$v.name.$touch()"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 md6>
                                    <v-select v-model="selectedShipper"
                                              :items="shipperSelectionItems"
                                              label="Shipper"
                                              required
                                    ></v-select>
                                </v-flex>

                                <v-flex xs12 md12 v-for="checkpoint in currentRoute.checkpoints" :key="checkpoint.seq">
                                    <checkpoint :checkpoint="checkpoint" v-slot="{openMethod}">
                                        <v-btn color="primary" @click.stop="openMethod">{{checkpoint.seq}}.{{checkpoint.name}}</v-btn>
                                    </checkpoint>
                                </v-flex>

                                <v-flex xs12 md12>
                                    <v-btn class="mx-2" @click="addCheckpoint" fab dark color="indigo">
                                        <v-icon dark>mdi-plus</v-icon>
                                    </v-btn>
                                </v-flex>

                                <v-btn type="submit" class="mx-0 font-weight-light" color="success">
                                    Lưu Route
                                </v-btn>
                            </v-layout>
                        </v-container>
                    </v-form>
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
        head() {
            return {
                title: 'Tạo Route'
            }
        },
        name: "created-route",
        middleware: ['auth','manager'],
        validations: {
            name: {required, maxLength: maxLength(50)},
            email: {required, email},
            phone: {required, numeric},
            select: {required},
            citizenId: {required, numeric}
        },
        fetch({store}){
            store.dispatch('manager/fetchShippers')
            store.dispatch('route/clearRouteData')
        },

        data: () => ({
            name: '',
            selectedShipper: null,
        }),

        computed: {
            ...mapGetters({
                currentRoute: 'route/getCurrentRoute',
                nextCheckpointSeq: 'route/getNextCheckpointSeq',
                shippers: 'manager/getShippers'
            }),
            nameErrors() {
                const errors = []
                if (!this.$v.name.$dirty) return errors
                !this.$v.name.maxLength && errors.push('Độ dài tên tối đa là 50 ký tự')
                !this.$v.name.required && errors.push('Nhập tên Route')
                return errors
            },
            shipperSelectionItems() {
                return this.shippers.map(s => ({
                    text: s.full_name,
                    value: s
                }));
            },
        },

        methods: {
            ...mapActions({
                addCheckpointX: 'route/addCheckpoint',
                setCurrentRoute: 'route/setCurrentRoute',
                setRouteName: 'route/setRouteName',
                assignToShipper: 'route/assignToShipper',
                storeCurrentRoute: 'route/storeCurrentRoute',
                clearRouteData: 'route/clearRouteData',
                fetchShippers: 'manager/fetchShippers'
            }),

            submit() {
              this.$v.$touch()
              if(this.$v.dirty) return;
                const name = this.name;
                const shipper = this.selectedShipper;
                this.setRouteName(name)
                if(shipper){
                    this.assignToShipper(shipper.id);
                }
                this.storeCurrentRoute().then(()=>{
                    const mesg=shipper ?  `Tên: ${name} \n Shipper: ${shipper.full_name}`: `Tên: ${name}`
                    this.$swal('Tạo thành công Route',mesg, 'success');
                });
                this.clearRouteData();
                this.resetData();
            },

            resetData(){
                this.selectedShipper = null;
                this.name = ''
            },

            addCheckpoint() {
                const seq = this.nextCheckpointSeq
                const newCheckpoint = {
                    name: 'Click để sửa',
                    seq: seq
                }
                this.addCheckpointX(newCheckpoint)
            }
        }
    }
</script>

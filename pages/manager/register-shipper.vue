<template>
    <v-container fill-height fluid grid-list-xl>
        <v-layout justify-center wrap >
            <v-flex xs12 md8 >
                <material-card color="green" title="Đăng ký Shipper" text="Nhập thông tin Shipper" >
                    <v-form>
                        <v-container py-0>
                            <v-layout wrap>
                                <v-flex xs12 md6 >
                                    <v-text-field v-model="name"
                                                  :error-messages="nameErrors"
                                                  :counter="50"
                                                  label="Họ tên"
                                                  required
                                                  @input="$v.name.$touch()"
                                                  @blur="$v.name.$touch()"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 md6 >
                                    <v-text-field v-model="email"
                                                  :error-messages="emailErrors"
                                                  label="E-mail"
                                                  required
                                                  @input="$v.email.$touch()"
                                                  @blur="$v.email.$touch()"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 md6 >
                                    <v-text-field v-model="citizenId"
                                                  :error-messages="citizenIdErrors"
                                                  :counter="10"
                                                  label="Số CMTND"
                                                  required
                                                  @input="$v.citizenId.$touch()"
                                                  @blur="$v.citizenId.$touch()"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 md6 >
                                <v-text-field v-model="phone"
                                              :error-messages="phoneErrors"
                                              :counter="10"
                                              label="Số điện thoại"
                                              required
                                              @input="$v.phone.$touch()"
                                              @blur="$v.phone.$touch()"
                                ></v-text-field>
                                </v-flex>
                                    <v-flex xs12 md6>
                                        <v-select v-model="select"
                                                  :items="items"
                                                  :error-messages="selectErrors"
                                                  label="Hình thức làm việc"
                                                  required
                                                  @change="$v.select.$touch()"
                                                  @blur="$v.select.$touch()"
                                        ></v-select>

                                        <v-btn type="submit" class="mx-0 font-weight-light" color="success" >
                                            Đăng ký
                                        </v-btn>
                                    </v-flex>
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
                        <h4 class="card-title font-weight-light">Alec Thompson</h4>
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
    const DEFAULT_PASSWORD = 'secret123'
    import materialCard from '~/components/material/AppCard'

    export default {
        components: {
            materialCard
        },
        name: "register-shipper",
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
            email: '',
            phone: null,
            select: null,
            items: [
                {text: 'Toàn thời gian', value: 'F'},
                {text: 'Bán thời gian', value: 'P'}
            ],
            snackbar: false,
            citizenId: null
        }),

        computed: {
            phoneErrors() {
                const errors = []
                if (!this.$v.phone.$dirty) return errors
                !this.$v.phone.numeric && errors.push('Số điện thoại không hợp lệ');
                return errors
            },

            citizenIdErrors() {
                const errors = []
                console.log(this.$v.citizenId.$dirty)
                if (!this.$v.citizenId.$dirty) return errors;
                !this.$v.citizenId.numeric && errors.push('Số CMTND không hợp lệ')
                !this.$v.citizenId.required && errors.push('Số CMTND không hợp lệ')
                console.log(errors)
                return errors
            },
            selectErrors() {
                const errors = []
                if (!this.$v.select.$dirty) return errors
                !this.$v.select.required && errors.push('Vui lòng chọn thời gian làm việc')
                return errors
            },
            nameErrors() {
                const errors = []
                if (!this.$v.name.$dirty) return errors
                !this.$v.name.maxLength && errors.push('Độ dài tên tối đa là 50 ký tự')
                !this.$v.name.required && errors.push('Nhập họ tên')
                return errors
            },
            emailErrors() {
                const errors = []
                if (!this.$v.email.$dirty) return errors
                !this.$v.email.email && errors.push('E-mail không hợp lệ')
                !this.$v.email.required && errors.push('Nhập E-mail')
                return errors
            }
        },

        methods: {
            submit() {
                this.$v.$touch()
                if(!this.$v.dirty){
                    console.log('submit')
                    const newShipper = {
                        full_name : this.name,
                        email: this.email,
                        working_time: this.select,
                        phone: this.phone,
                        citizen_id: parseInt(this.citizenId),
                        is_active: false,
                        is_manager: false,
                        password: DEFAULT_PASSWORD
                    }
                    this.$axios.post('/users', newShipper).then(res=>{
                        console.log(res)
                        this.snackbar =true;
                    })
                }
            },
            clear() {
                this.$v.$reset()
                this.name = ''
                this.email = ''
                this.select = null
                this.phone = null
                this.citizenId = null
            }
        }
    }
</script>

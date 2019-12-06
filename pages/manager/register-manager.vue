<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card color="green" title="Tạo tài khoản Manager" text="Nhập thông tin Manager">
          <v-form @submit.prevent="submit">
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md6>
                  <v-text-field v-model="name"
                                :error-messages="nameErrors"
                                :counter="50"
                                label="Họ tên"
                                required
                                @input="$v.name.$touch()"
                                @blur="$v.name.$touch()"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="email"
                                :error-messages="emailErrors"
                                label="E-mail"
                                required
                                @input="$v.email.$touch()"
                                @blur="$v.email.$touch()"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="phone"
                                :error-messages="phoneErrors"
                                :counter="10"
                                label="Số điện thoại"
                                required
                                @input="$v.phone.$touch()"
                                @blur="$v.phone.$touch()"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 md12>
                  <v-text-field v-model="password"
                                :error-messages="passwordErrors"
                                :counter="100"
                                label="Mật khẩu"
                                type="password"
                                required
                                @input="$v.password.$touch()"
                                @blur="$v.password.$touch()"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 md12>
                  <v-text-field v-model="repeatPassword"
                                :error-messages="repeatPasswordErrors"
                                :counter="100"
                                label="Nhập lại mật khẩu"
                                type="password"
                                required
                                @input="$v.repeatPassword.$touch()"
                                @blur="$v.repeatPassword.$touch()"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-btn type="submit" class="mx-0 font-weight-light" color="success"> Đăng ký</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    import {required, email, minLength, sameAs, maxLength, numeric} from 'vuelidate/lib/validators'

    import materialCard from '~/components/material/AppCard'

    export default {
        components: {
            materialCard
        },
        name: "register-manager",
        middleware: ['auth', 'manager'],
        validations: {
            name: {required, maxLength: maxLength(50)},
            email: {required, email},
            phone: {required, numeric},
            password: {
                required,
                minLength: minLength(8)
            },
            repeatPassword: {
                sameAsPassword: sameAs('password')
            }
        },

        data: () => ({
            name: '',
            email: '',
            phone: null,
            select: null,
            snackbar: false,
            password: '',
            repeatPassword: ''
        }),

        computed: {
            phoneErrors() {
                const errors = []
                if (!this.$v.phone.$dirty) return errors
                !this.$v.phone.numeric && errors.push('Số điện thoại không hợp lệ');
                return errors
            },

            passwordErrors() {
                const errors = []
                if (!this.$v.password.$dirty) return errors;
                !this.$v.password.minLength && errors.push('Mật khẩu phải có ít nhất 6 ký tự')
                !this.$v.password.required && errors.push('nhập mật khẩu')
                return errors
            },
            repeatPasswordErrors() {
                const errors = []
                if (!this.$v.repeatPassword.$dirty) return errors;
                !this.$v.repeatPassword.sameAsPassword && errors.push('mật khẩu không khớp')
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
                if (!this.$v.dirty) {
                    const newManager = {
                        full_name: this.name,
                        email: this.email,
                        phone: this.phone,
                        is_active: true,
                        is_manager: true,
                        password: this.password
                    }
                    console.log(newManager)
                    this.$axios.post('/users', newManager).then(res => {
                        console.log(res)
                        this.$swal(`Đăng ký thành công tài khoản Manager cho ${res.data.full_name}`, '', 'success');
                    }).catch(()=>this.$auth.logout())
                }
            },
            clear() {
                this.$v.$reset()
                this.name = ''
                this.email = ''
                this.phone = null
                this.password = ''
                this.repeatPassword = ''
            }
        }
    }
</script>

<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <material-card color="success" elevation="12" title="Love System" >
                        <v-card-text>
                            <v-form>
                                <v-text-field v-on:keyup.enter="login" type="text" v-model="email" prepend-icon="mdi-account" name="username" label="Login"></v-text-field>
                                <v-text-field v-on:keyup.enter="login" type="password" v-model="password" prepend-icon="mdi-lock" name="password" label="Password"></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-layout justify-center align-center>
                                <v-btn color="success" @click.prevent="login">Login</v-btn>
                            </v-layout>
                        </v-card-actions>
                    </material-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
    import materialCard from '~/components/material/AppCard'
    export default {
        components: {
            materialCard
        },
        middleware: 'guest',
        name: "login",
        layout: "login",
        data : () => ({
                email: '',
                password: ''
            })
    ,
        methods :{
            login: function () {
                console.log(this.email);
                const that = this;

                    this.$auth.loginWith('local', {
                            data: {
                                email: that.email,
                                password: that.password
                            }
                        }
                    ).catch((error)=>{
                      this.$swal('hello')
                    })

            }
        }
    }
</script>

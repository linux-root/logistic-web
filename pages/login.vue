<template>
    <v-container fluid fill-height >
        <v-layout align-center justify-center >
            <v-flex xs12 sm8 md4 >
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat >
                        <v-toolbar-title>Vui lòng đăng nhập</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon
                                        large
                                        target="_blank"
                                        v-on="on"
                                >
                                    <v-icon>mdi-code-tags</v-icon>
                                </v-btn>
                            </template>
                            <span>Source</span>
                        </v-tooltip>
                        <v-tooltip right>
                            <template v-slot:activator="{ on }">
                                <v-btn
                                        icon
                                        large
                                        target="_blank"
                                        v-on="on"
                                >
                                    <v-icon>mdi-codepen</v-icon>
                                </v-btn>
                            </template>
                            <span>Codepen</span>
                        </v-tooltip>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field v-model="email" label="Login" name="login" prepend-icon="mdi-account" type="text" ></v-text-field>
                            <v-text-field v-model="password" id="password" label="Password" name="password" prepend-icon="mdi-lock" type="password" ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="login()">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
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

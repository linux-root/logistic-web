import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
      '~/plugins/vuelidate',
      '~/plugins/chartist'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
      '@nuxtjs/axios',
      '@nuxtjs/auth',
      '@nuxtjs/pwa',
      'vue-sweetalert2/nuxt'
  ],
    auth: {
     //option
        strategies: {
          local: {
              endpoints: {
                  login: { url: '/users/login', method: 'post', propertyName: 'token' },
                  logout: false,
                  user: { url: '/users/info', method: 'get', propertyName: false}
              }
          }
        }
        ,
        redirect: {
            login: '/login',
            logout: '/login',
            // callback: '/login',
            home: '/dashboard'
        }
    },
   /* router: {
      middleware: ['auth']
    },*/
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'http://localhost:3000/'
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/style/index.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
          default: {
              primary: '#4caf50',
              secondary: '#4caf50',
              tertiary: '#495057',
              accent: '#82B1FF',
              error: '#f55a4e',
              info: '#00d3ee',
              success: '#5cb860',
              warning: '#ffa21a'
          }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}

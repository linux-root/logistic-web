import Vue from 'vue'
const pusher = require('vue-pusher')

Vue.use(pusher, {
  api_key: '7cbcf0b5e0b8ed0bcc80',
  options: {
    cluster: 'ap1',
    encrypted: true,
  }
});

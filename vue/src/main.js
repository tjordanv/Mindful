import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalendar, faCheck, faTimes, faEdit, faTasks, faUsers, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false
library.add(faCalendar, faCheck, faTimes, faEdit, faTasks, faUsers, faAngleUp);
Vue.component('font-awesome-icon', FontAwesomeIcon)

axios.defaults.baseURL = process.env.VUE_APP_REMOTE_API;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import axios from 'axios'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalendar, faCheck, faTimes, faEdit, faTasks, faUsers, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import  Echarts from 'vue-echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/toolbox';


library.add(faCalendar, faCheck, faTimes, faEdit, faTasks, faUsers, faAngleUp);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('chart', Echarts);

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.VUE_APP_REMOTE_API;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

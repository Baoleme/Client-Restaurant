// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store'; // Vuex store
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import '../my_theme/index.less';
import VueDND from 'awe-dnd';

import ax from '@/lib/axios';
import config from '@/config';

Vue.config.productionTip = false;

Vue.prototype.$http = ax;
Vue.prototype.$config = config;
Vue.use(iView);
Vue.use(VueDND);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

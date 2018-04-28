import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    email: '',
    restaurantName: '',
    restaurantId: 0,
    isNetworkErr: false
  },
  actions,
  getters,
  mutations,
  modules: { },
  strict: process.env.NODE_ENV !== 'production'
});

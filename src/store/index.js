import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    index: 0,
    email: '',
    restaurantName: '',
    restaurantId: 0,
    isNetworkErr: false,
    subIndex: 1,
    curOrder: {},
    clue: '',
    orderList: [],
    numberOfPages: 0,
    filters: [],
    dishList: [],
    categories: [],
    waitTimeClock: [],
    curImg: ''
  },
  actions,
  getters,
  mutations,
  modules: { },
  strict: process.env.NODE_ENV !== 'production'
});

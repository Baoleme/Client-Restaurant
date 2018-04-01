import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from '@/page/LoginPage';
import MainPage from '@/page/MainPage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/main',
      name: 'MainPage',
      component: MainPage
    }
  ]
});

import Vue from 'vue';
import Router from 'vue-router';
import login from '@/components/auth/Login';
import main from '@/components/Main';
import register from '@/components/auth/Register';
import emailConfirm from '@/components/emailConfirm';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/main',
      name: 'main',
      component: main
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/emailConfirm',
      name: 'emailConfirm',
      component: emailConfirm
    }
  ]
});

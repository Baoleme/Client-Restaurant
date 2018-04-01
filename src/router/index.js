import Vue from 'vue';
import Router from 'vue-router';
import login from '@/page/login';
import main from '@/page/main';
import register from '@/page/register';
import emailConfirm from '@/page/emailConfirm';

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

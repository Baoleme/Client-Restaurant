import Vue from 'vue';
import Router from 'vue-router';
import login from '@/components/auth/Login';
import main from '@/components/main/Main';
import register from '@/components/auth/Register';
import order from '@/components/main/Order';
import management from '@/components/main/Management';
import QRcode from '@/components/main/QRcode';
import info from '@/components/main/Info';

Vue.use(Router);

export default new Router({
  routes: [
    // 开发用，临时将默认页改成主页面
    {
      path: '/',
      redirect: '/main'
    },
    // {
    //   path: '/',
    //   redirect: '/login'
    // },
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
      path: '/main/order',
      name: 'order',
      component: order
    },
    {
      path: '/main/management',
      name: 'management',
      component: management
    },
    {
      path: '/main/QRcode',
      name: 'QRcode',
      component: QRcode
    },
    {
      path: '/main/info',
      name: 'info',
      component: info
    }
  ]
});

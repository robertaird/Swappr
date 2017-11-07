import Vue from 'vue';
import Router from 'vue-router';
import loginScreen from '@/components/loginScreen';
import mainPage from '@/components/mainPage';
import profile from '@/components/profile';
import axios from 'axios';

Vue.use(Router);
Vue.use(axios);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/profile',
      name: 'profile',
      component: profile,
    },
    {
      path: '/main',
      name: 'mainPage',
      component: mainPage,
    },
    {
      path: '/',
      name: 'loginScreen',
      component: loginScreen,
    },
  ],
});

import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Callback from '@/components/Callback';
import loginScreen from '@/components/loginScreen';
import mainPage from '@/components/mainPage';
import profile from '@/components/profile';
import axios from 'axios';
// import VModal from 'vue-js-modal';

Vue.use(Router);
Vue.use(axios);
// Vue.use(VModal);

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
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback,
    },
    {
      path: '*',
      redirect: '/home',
    },
  ],
});

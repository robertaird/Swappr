import Vue from 'vue';
import Router from 'vue-router';
<<<<<<< HEAD
import HelloWorld from '@/components/HelloWorld';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld,
=======
import loginScreen from '@/components/loginScreen';
import mainPage from '@/components/mainPage';
import profile from '@/components/profile';
import axios from 'axios';
import VModal from 'vue-js-modal';

Vue.use(Router);
Vue.use(axios);
Vue.use(VModal);

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
>>>>>>> 4c8d4bf93875763b3ac282c7f30e15ad51c9bc16
    },
  ],
});

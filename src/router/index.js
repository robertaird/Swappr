import Vue from 'vue';
import Router from 'vue-router';
import loginScreen from '@/components/loginScreen';
import mainPage from '@/components/mainPage';
import axios from 'axios';

Vue.use(Router);
Vue.use(axios);

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'Main',
      component: mainPage,
    },
    {
      path: '/',
      name: 'loginScreen',
      component: loginScreen,
    },
  ],
});

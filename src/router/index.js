import Vue from 'vue';
import Router from 'vue-router';
import loginScreen from '@/components/loginScreen';
import mainPage from '@/components/mainPage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: loginScreen,
    },
    {
      path: '/main',
      name: 'Main',
      component: mainPage,
    },
  ],
});

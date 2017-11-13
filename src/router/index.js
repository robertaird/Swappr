import Vue from 'vue';
import Router from 'vue-router';
import Callback from '@/components/Callback';
import loginScreen from '@/components/loginScreen';
import mainPage from '@/components/mainPage';
import profile from '@/components/profile';
import VModal from 'vue-js-modal';

Vue.use(Router);
Vue.use(VModal);

const allRoutes = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'loginScreen',
      component: loginScreen,
    },
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
      path: '/callback',
      name: 'Callback',
      component: Callback,
    },
    {
      path: '*',
      redirect: '/loginScreen',
    },
  ],
});
allRoutes.beforeEach((to, from, next) => {
  if (to.name === 'loginScreen' && Number(localStorage.getItem('userId'))) {
    next('/main');
  } else if (to.name === 'Callback' || to.name === 'loginScreen'
|| Number(localStorage.getItem('userId'))) {
    next();
  } else {
    next('/');
  }
});
export default allRoutes;

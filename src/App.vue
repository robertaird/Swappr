<template>
  <div id='app'>
    <div class="container">
      <router-view 
        :userId="userId"
        :auth="auth" 
        :authenticated="authenticated">
      </router-view>
    </div>
  </div>
</template>

<script>

import AuthService from './Auth/AuthService';

const auth = new AuthService();

const { authenticated, authNotifier } = auth;

export default {
  name: 'app',
  data() {
    authNotifier.on('authChange', (authState) => {
      this.authenticated = authState.authenticated;
      this.userId = localStorage.getItem('userId');
    });
    return {
      auth,
      authenticated,
      userId: '0',
    };
  },
};
</script>

<style>
.btn-margin {
  margin-top: 7px
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
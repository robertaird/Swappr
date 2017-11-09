<template>
  <div id='app'>
    <div class="container">
      <router-view 
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
    });
    return {
      auth,
      authenticated,
    };
  },
};
</script>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.css';
.btn-margin {
  margin-top: 7px
}
</style>
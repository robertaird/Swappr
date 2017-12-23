<template>
  <div id='app'>
    <router-view
      :userId="userId"
      :auth="auth"
      :authenticated="authenticated"
      :categories="categories">
    </router-view>
    <nav class="navbar" style="position: absolute; bottom: 0; height: 3em;">
      <div class="nav-contents container">
        <h6 class="created-by pt-1">Created by HoneyBadgerHackers</h6>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from 'axios';
import AuthService from './Auth/AuthService';
import { SERVER_URI } from './constants';

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
      userId: localStorage.getItem('userId'),
      categories: [],
    };
  },
  methods: {
    getCategories() {
      axios.get(`${SERVER_URI}/categories`)
      .then(({ data: categories }) => {
        this.categories = categories;
      })
      .catch((error) => {
        console.error(error);
      });
    },
  },
  mounted() {
    this.getCategories();
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
  margin-top: 0px;
}

</style>

<template>
  <div id='app'>
    <div class="container">
      <router-view 
        :userId="userId"
        :auth="auth" 
        :authenticated="authenticated"
        :categories="categories">
      </router-view>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
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
      userId: localStorage.getItem('userId'),
      categories: [],
    };
  },
  methods: {
    getCategories() {
      axios.get('/categories')
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
  margin-top: 60px;
}
</style>
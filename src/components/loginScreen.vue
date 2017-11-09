<template>
  <div class="hello">
    <modal name="failed">
      <h4>Authentication Failed</h4>
    </modal>
    <img src="https://i.imgur.com/HyT4LZP.png">
    <h1>{{ msg }}</h1>
    <button class="btn-lg" @click="nextPage">Log In</button>
  </div>
</template>

<script>
export default {
  name: 'loginScreen',
  data() {
    return {
      msg: 'Welcome to Swappr',
    };
  },
  methods: {
    nextPage() {
      this.$router.push({ path: '/main' });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
} 
.hello {
  text-align: center;
}

img {
  width: 400px;
  height: 400px;
}
</style>

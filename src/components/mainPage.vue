<template>
  <div class="hello">
      <nav>
          <button></button>
      </nav>
    <h1>{{ msg }}</h1>
    <button v-on:click="nextPage">Log In</button>
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>

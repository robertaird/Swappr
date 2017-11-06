<template>
  <div class="hello">
    <h1>swappr</h1>
    <h1>{{ msg }}</h1>
    <form @submit.prevent="handleSubmit">
    <label>
      Email:
      <input type="email" v-model="user.email"/>
    </label>
    <label>
      Name:
      <input type="text" v-model="user.name"/>
    </label>
    <label>
      Password:
      <input type="password" v-model="user.password"/>
    </label>
    <button type="submit">Submit</button>
  </form>
    <button @click="something">Hello!</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Please Sign In',
      user: {
        email: '',
        name: '',
        password: '',
      },
    };
  },
  methods: {
    handleSubmit() {
      console.log(this.user, this.password, this.email);
    },
    something() {
      this.msg = 'Pressed a button!';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

  <template>
  <div class="hello">
      <nav class="navbar">
          <button class="navbar-btn">Profile Page</button>
      </nav>
      <div class="itemArea">
    <button class="btn-warning" @click="decline">No Thanks</button>
    <div>
        <h3>{{currentItem.title}}</h3>
        <h6>{{currentItem.description}}</h6>
    </div>
    <button class="btn-success" @click="accept">Let's Trade!</button>
      </div>
      
  </div>
</template>

<script>
export default {
  name: 'mainPage',
  data() {
    return {
      currentItem: {
        title: 'test Title',
        description: 'test description',
      },
    };
  },
  methods: {
    accept() {
      console.log('accept');
    },
    decline() {
      console.log('decline');
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
</style>

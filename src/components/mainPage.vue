  <template>
  <div class="hello">
      <nav>
          <button>Profile Page</button>
      </nav>
      <div class="itemArea">
    <!-- <button @click="decline">No Thanks</button> -->
    <div>
        <h3>{{title}}</h3>
        <h6>{{description}}</h6>
    </div>
    <!-- <button @click="accept">Let's Trade!</button> -->
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
  // methods: {
  //   accept() {
  //     console.log('accept');
  //   },
  //   decline() {
  //     console.log('decline');
  //   }
  // },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
</style>

  <template>
  <div class="hello">
      <nav class="navbar">
        <button class="navbar-btn" @click="signOut">Sign Out</button>
        <button  class="navbar-btn" @click="mainMenu">Main Menu</button>
      </nav>
      <div>
          <div>
              
          </div>
      </div>
   </div>
</template>

<script>
export default {
  name: "profile",
  data() {
    return {
      currentItem: {
        title: "test Title",
        description: "test description"
      }
    };
  },
  methods: {
    signOut() {
      this.$router.push({ path: "/" });
    },
    mainMenu() {
      this.$router.push({ path: "/main" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
</style>

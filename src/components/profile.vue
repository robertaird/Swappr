  <template>
  <div class="hello">
      <nav class="navbar">
        <button class="navbar-btn" @click="signOut">Sign Out</button>
        <button  class="navbar-btn" @click="mainMenu">Main Menu</button>
      </nav>
      <div class="well">
        <input v-model="title" placeholder="Title" type="text">
        <input v-model="description" placeholder="Description" type="text">
        <button @click="addItem" class="btn">Add item</button>
          <div class="well">
            <ul>
              <li v-for="(item,index) in profileItems" :key='index'>
                <div class="card" style="border-style: outset; width: 15rem;">
                  <div class="card-block">
                    <h3 class="card-title">{{item.title}}</h3>
                    <p class="card-text">{{item.description}}</p>
                    <a href="#" @click="removeListing(index)" class="btn btn-primary">remove</a>
                  </div>
                </div>
              </li>

            </ul>
          </div>
      </div>
   </div>
</template>

<script>
export default {
  name: 'profile',
  data() {
    return {
      profileItems: [
        { title: 'testItem1', description: 'a very fine item' },
        { title: 'testItem2', description: 'an even nicer item' },
      ],
    };
  },
  methods: {
    signOut() {
      this.$router.push({ path: '/' });
    },
    mainMenu() {
      this.$router.push({ path: '/main' });
    },
    removeListing(index) {
      this.profileItems.splice(index, 1);
    },
    addItem() {
      if (this.title.length !== 0 && this.description.length !== 0) {
        this.profileItems.push({
          title: this.title,
          description: this.description,
        });
        this.title = '';
        this.description = '';
      }
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

li {
  display: inline-block;
}
</style>

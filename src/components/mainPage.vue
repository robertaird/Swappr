  <template>
  <div class="hello">
      <nav class="navbar">
        <button class="navbar-btn" @click="signOut">Sign Out</button>
        <button class="navbar-btn" @click="profilePage">Profile Page</button>
      </nav>
      <modal name="itemModal">
        <!-- <div class="modal-header">
          <button class="close" @click="hide">&times;</button>
          <h4 class="modal-title">Your Offer</h4>
        </div> -->
       <ul>
         <li v-for="(item,index) in profileItems" :key='index'>
           <div class="card" style="border-style: outset; width: 15rem;">
             <div class="card-block">
               <h3 class="card-title">{{item.title}}</h3>
               <p class="card-text">{{item.description}}</p>
               <a href="#" @click="offerItem(index)" class="btn btn-primary">Offer</a>
             </div>
           </div>
         </li>
       </ul>
       <button class="btn-danger" @click="hide">Nevermind</button>
      </modal>
      <div class="well">
        <button class="btn-warning" @click="getItem">No Thanks</button>
        <div>
          <h3>{{currentItem.title}}</h3>
          <h6>{{currentItem.description}}</h6>
        </div>
        <button class="btn-success" @click="show">Let's Trade!</button>
      </div>
      
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'mainPage',
  data() {
    return {
      userId: 5,
      currentItem: {
        title: 'test Title',
        description: 'test description',
        id: 4,
      },
      profileItems: [
        { title: 'testItem1', description: 'a very fine item', id: 3 },
        { title: 'testItem2', description: 'an even nicer item', id: 6 },
      ],
    };
  },
  methods: {
    getItems(userId) {
      const config = {
        headers: {
          userId,
        },
      };
      axios.get('/items', config)
        .then((userItems) => {
          console.log(userItems);
        });
    },
    getTradeItem() {
      axios.get('/newItem')
      .then(console.log);
    },
    show() {
      this.$modal.show('itemModal');
    },
    hide() {
      this.$modal.hide('itemModal');
      this.getItem();
    },
    signOut() {
      this.$router.push({ path: '/' });
    },
    profilePage() {
      this.$router.push({ path: '/profile' });
    },
    offerItem(index) {
      axios.post('/offer', { body: { has: this.profileItems[index].id, wants: this.currentItem.id } })
        .then(this.hide);
    },
    ready() {
      this.getItems(this.userId);
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

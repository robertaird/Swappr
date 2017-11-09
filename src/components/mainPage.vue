  <template>
  <div class="hello">
      <nav class="navbar">
        <button class="btn" @click="signOut">Sign Out</button>
        <button class="btn" @click="profilePage">Profile Page</button>
      </nav>
      <modal name="itemModal">
        <div class="modal-header">
          <button class="close" @click="hide">&times;</button>
          <h4 class="modal-title">Your Offer</h4>
        </div>
       <ul>
         <li v-for="(item,index) in profileItems" :key='index'>
           <div class="card" style="border-style: outset; width: 15rem;">
             <div class="card-block">
               <h3 class="card-title">{{item.name}}</h3>
               <p class="card-text">{{item.description}}</p>
               <a href="#" @click="offerItem(index)" class="btn btn-primary">Offer</a>
             </div>
           </div>
         </li>
       </ul>
       <!-- <button class="btn-danger" @click="hide">Nevermind</button> -->
      </modal>
      <div class="well">
        <button class="btn-warning btn-lg" @click="getTradeItem">No Thanks</button>
        <div class="card" style="border-style: outset; width: 15rem;">
          <div class="card-block">
            <h3 class="card-title">{{currentItem.name}}</h3>
            <p class="card-text">{{currentItem.description}}</p>
          </div>
        </div>
        <button class="btn-success btn-lg" @click="show">Let's Trade!</button>
      </div>
      
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'mainPage',
  data() {
    return {
      id_user: 5,
      currentItem: {
        name: 'test Title',
        description: 'test description',
        id_item: 4,
      },
      profileItems: [
        { name: 'testItem1', description: 'a very fine item', id_item: 3 },
        { name: 'testItem2', description: 'an even nicer item', id_item: 6 },
      ],
    };
  },
  methods: {
    getItems(userId) {
      const config = {
        headers: {
          id_user: userId,
        },
      };
      axios.get('/items', config)
        .then((userItems) => {
          console.log(userItems);
          if (!this.profileItems.length) {
            console.log('cannot trade');
          }
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
    },
    signOut() {
      this.$router.push({ path: '/' });
    },
    profilePage() {
      this.$router.push({ path: '/profile' });
    },
    offerItem(index) {
      axios.post('/offer', { body: { id_item_offered: this.profileItems[index].id_item, id_item_desired: this.currentItem.id_item } })
        .then(this.hide);
    },
    ready() {
      this.getItems(this.id_user);
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

.well * {
  display: inline-block;
}

li {
  display: inline-block;
}

</style>

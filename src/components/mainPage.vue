  <template>
  <div class="hello">
      <nav class="navbar">
        <button class="btn" @click="auth.logout">Sign Out</button>
        <button class="btn" @click="profilePage">Profile Page</button>
      </nav>
      <modal name="itemModal">
        <div class="modal-header">
          <button class="close" @click="hide">&times;</button>
          <h4 class="modal-title">Your Offer</h4>
        </div>
       <ul>
         <li v-for="(item,index) in userItems" :key='index'>
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
        <button class="btn-warning btn-lg" @click="rejectTradeItem">No Thanks</button>
        <div class="card" style="border-style: outset; width: 15rem;">
          <div class="card-block">
            <h3 class="card-title">{{currentTradeItem.name}}</h3>
            <p class="card-text">{{currentTradeItem.description}}</p>
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
  props: ['auth', 'authentication', 'userId'],
  data() {
    return {
      currentTradeItem: {
        // name: 'test Title',
        // description: 'test description',
        // id_item: 4,
      },
      userItems: [
        // { name: 'testItem1', description: 'a very fine item', id_item: 3 },
        // { name: 'testItem2', description: 'an even nicer item', id_item: 6 },
      ],
      userId: 2,
    };
  },
  methods: {
    getUserItems() {
      const config = {
        headers: {
          id_user: this.userId,
        },
      };
      axios.get('/items', config)
        .then(({ data: userItems }) => {
          userItems.forEach((item) => {
            this.userItems.push(item);
          });
          if (!this.userItems.length) {
            console.log('cannot trade');
          }
        });
    },
    getTradeItem() {
      const config = {
        headers: {
          id_user: this.userId,
        },
      };
      axios.get('/transactions', config)
      .then(({ data: tradeItem }) => {
        this.currentTradeItem = tradeItem;
      });
    },
    show() {
      this.$modal.show('itemModal');
    },
    hide() {
      this.$modal.hide('itemModal');
    },
    profilePage() {
      this.$router.push({ path: '/profile' });
    },
    offerItem(index) {
      axios.post('/offer', { body: { id_item_offered: this.userItems[index].id_item, id_item_desired: this.currentTradeItem.id_item } })
        .then(this.hide);
    },
    ready() {
      this.getUserItems(this.userId);
    },
    rejectTradeItem() {
      console.log(this.userId);
      console.log(this.currentTradeItem.id);
      console.log(this.userItems);
      axios.post('/transactions', { body: {
        user_id: this.userId,
        id_item_offered: this.currentTradeItem.id,
        id_item_desired: this.currentTradeItem.id,
        pending: false,
        accepted: false,
      },
      }).then((item) => {
        this.getTradeItem();
        console.log(item);
      }).catch((error) => {
        console.log(error);
      });
    },
    acceptTradeItem(profileItem) {
      axios.post('/transactions', { body: {
        user_id: this.userId,
        id_item_offered: profileItem,
        id_item_desired: this.currentTradeItem.id_item,
        pending: true,
      },
      }).then((item) => {
        console.log(item);
      }).catch((error) => {
        console.log(error);
      });
    },
  },
  mounted() {
    this.getTradeItem();
    this.getUserItems();
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

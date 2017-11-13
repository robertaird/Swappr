  <template>
  <div class="container-fluid main-container">
      <nav class="navbar">
        <button class="btn btn-warning" @click="auth.logout">Sign Out</button>
        <div style="width: 7em;">
          <button class="btn btn-primary btn-block" @click="profilePage">Profile Page</button>
        </div>
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
               <a href="#" @click="acceptTradeItem(item)" class="btn btn-primary">Offer</a>
             </div>
           </div>
         </li>
       </ul>
      </modal>
      <div class="card p-1 col-12 inner-container" style="background-color: #E5E7E9;">
        <button class="btn-warning btn-lg" @click="getTradeItem">No Thanks</button>
        <div class="card" style="border-style: outset; width: 15rem; height: 14rem;">
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
      currentTradeItem: {},
      userItems: [],
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
        })
        .catch(err => console.log(err));
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
    ready() {
      this.getUserItems(this.userId);
    },
    rejectTradeItem() {
      const config = {
        id_user: this.userId,
        id_item_offered: this.currentTradeItem.id,
        id_item_desired: this.currentTradeItem.id,
        pending: false,
        accepted: false,
      };
      axios.post('/transactions', config)
      .then(() => {
        this.getTradeItem();
      }).catch((error) => {
        console.error(error);
      });
    },
    acceptTradeItem(userItem) {
      const config = {
        id_user: this.userId,
        id_item_offered: userItem.id,
        id_item_desired: this.currentTradeItem.id,
        pending: true,
      };
      axios.post('/transactions', config)
      .then(() => {
        this.getTradeItem();
        this.hide();
      })
      .catch((error) => {
        console.error(error);
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

.btn {
  margin: 1px;
}

li {
  display: inline-block;
}

</style>

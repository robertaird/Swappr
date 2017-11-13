  <template>
  <div class="container-fluid main-container">
      <nav class="navbar">
        <button class="btn btn-warning" @click="auth.logout">Sign Out</button>
        <span class="fa-stack fa-5x has-badge ml-auto" :data-count="tradeOffers.length">
          <button class="btn btn-info ml-auto" @click="tradeView">Pending Trades</button>
        </span>
        <div style="width: 7em;">
          <button class="btn btn-primary btn-block" @click="mainMenu">Swap!</button>
        </div>
      </nav>
      <modal name="acceptedTrades">
        <div class="modal-header">
          <button class="close" @click="closeTradeView">&times;</button>
          <h4 class="modal-title">Accepted Trades</h4>
        </div>
        <ul>
          <li v-for="(trade,index) in tradeOffers" :key='index'>
            <div class="card" style="border-style: outset; width: 15rem;">
              <div class="card-block">
                <h3 class="card-title">{{trade.theirItem.name}}</h3>
                <p class="card-text">{{trade.theirItem.description}}</p>
                <h3 class="card-title">For Your {{trade.myItem.name}}</h3>
                <a href="#" @click="acceptOffer(index)" class="btn btn-primary">Accept</a>
              </div>
            </div>
          </li>
        </ul>
      </modal>
      <modal name="tradeInfo">
        <div class="modal-header">
          <button class="close" @click="closeOfferView">&times;</button>
          <h4 class="modal-title">Trade Info</h4>
          <h5>Please contact: {{acceptedTrade.name}}</h5>
          <h5>At: {{acceptedTrade.email}}</h5>
        </div>
      </modal>
      <div class="card py-1 col-12 inner-container" style="min-height: 10em; background-color: #E5E7E9;">
          <add-item v-bind="$props" v-on:new-item="newItem"></add-item>
          <div class="card my-1 pl-4 w-100" style="background-color: #F0F3F4; min-height: 10em;">
            <div class="container-fluid">
              <div class="row">
                <item-view v-for="(item,index) in profileItems" :item='item' :key='index' v-on:deleted-item="getItems"></item-view>
              </div>
            </div>
        </div>
   </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'profile',
  props: ['auth', 'authentication', 'userId'],
  data() {
    return {
      name: '',
      description: '',
      tradeOffers: [],
      profileItems: [],
      acceptedTrade: {
        traderName: '',
        traderEmail: '',
      },
    };
  },
  methods: {
    newItem({ data: newItem }) {
      this.profileItems.push(newItem);
    },
    acceptOffer(index) {
      const config = {
        headers: {
          id: this.tradeOffers[index].theirItem.id_user,
        },
      };
<<<<<<< HEAD
      axios.get('/items', config)
        .then(({ data: userItems }) => {
          this.profileItems = userItems;
        })
        .catch(err => console.log(err));
=======
      axios.get('/users/single', config)
        .then((trader) => {
          this.acceptedTrade = trader.data;
          return 'changed';
        }).then(() => {
          this.$modal.show('tradeInfo');
        });
>>>>>>> 85d9faefb662e1c9e6d44f0429ef2bebfd94f3e0
    },
    getUserItems() {
      return new Promise((resolve) => {
        const config = {
          headers: {
            id_user: this.userId,
          },
        };
        axios.get('/items', config)
          .then(({ data: userItems }) => {
            this.profileItems = userItems;
            resolve('done!');
          });
      });
    },
    mainMenu() {
      this.$router.push({ path: '/main' });
    },
    getTradeOffers() {
      if (!this.profileItems.length) {
        return;
      }
      const config = {
        headers: {
          id: this.userId,
          items: this.profileItems.map(item => item.id),
        },
      };
      axios.get('/users', config)
        .then((items) => {
          const sorted = items.data.map((offer) => {
            if (offer.id_user.toString() === this.userId) {
              return { myItem: offer.offered, theirItem: offer.desired };
            }
            return { myItem: offer.desired, theirItem: offer.offered };
          });
          this.tradeOffers = sorted;
          console.log(this.tradeOffers);
        });
    },
    removeListing(index) {
      const config = {
        headers: {
          id_item: this.profileItems[index].id,
        },
      };
      axios.delete('/items', config)
        .then(() => {
          this.getItems(this.userId);
        })
        .catch(err => console.log(err));
    },
    tradeView() {
      this.$modal.show('acceptedTrades');
    },
    closeTradeView() {
      this.$modal.hide('acceptedTrades');
    },
    closeOfferView() {
      this.$modal.hide('tradeInfo');
    },
  },
  mounted() {
    this.getUserItems()
    .then(this.getTradeOffers);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

.btn {
  margin: 1px;
}

li {
  display: inline-block;
}

</style>

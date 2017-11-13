  <template>
  <div class="hello">
      <nav class="navbar">
        <button class="btn" @click="auth.logout">Sign Out</button>
        <button  class="btn" @click="mainMenu">Main Menu</button>
      </nav>
      <button @click="tradeView" class="btn">Accepted Trades ({{tradeOffers.length}})</button>
      <modal name="acceptedTrades">
        <div class="modal-header">
          <!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->
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
      <div class="well">
        <add-item v-bind="$props" v-on:new-item="newItem"></add-item>
        <!-- <button @click="show" class="btn">Add New Item</button> -->
          <div class="well">
            <ul>
              <li v-for="(item,index) in profileItems" :key='index'>
                <div class="card" style="border-style: outset; width: 15rem;">
                  <div class="card-block">
                    <h3 class="card-title">{{item.name}}</h3>
                    <p class="card-text">{{item.description}}</p>
                    <h3 class="card-title">for your: {{item.name}}</h3>
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
      axios.get('/users/single', config)
        .then((trader) => {
          this.acceptedTrade = trader.data;
          return 'changed';
        }).then(() => {
          this.$modal.show('tradeInfo');
        });
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
          this.getUserItems(this.userId);
        });
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
    getCategories() {
      axios.get('/categories')
      .then(({ data: categories }) => {
        this.categories = categories;
        console.log(this.categories);
      })
      .catch((error) => {
        console.log(error);
      });
    },
  },
  mounted() {
    this.getUserItems()
    .then(this.getTradeOffers);
    this.getCategories();
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

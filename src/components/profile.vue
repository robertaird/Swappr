  <template>
  <div class="container main-container">
      <nav class="navbar">
        <h3 class="logo">Swappr</h3>
        <button class="btn btn-info ml-auto pending-btn" @click="tradeView">Pending Trades</button>
        <pending-trades ref="pendingTrades" v-bind="$props" :tradeOffers='tradeOffers'></pending-trades>
        <div style="width: 7em;">
          <button class="btn btn-primary btn-block" @click="mainMenu">Swap!</button>
        </div>
      </nav>
        <div class="card inner-container p-2" style="min-height: 10em; background-color: #E5E7E9;">
          <add-item v-bind="$props" v-on:new-item="newItem"></add-item>
          <div class="card pl-3 my-1 w-100 item-box" style="background-color: #F0F3F4;">
            <div class="container">
              <div class="row">
                <item-view v-for="(item,index) in profileItems" :item='item' :key='index' v-on:deleted-item="getUserItems"></item-view>
              </div>
            </div>
          </div>
        </div>
      <nav class="footer">
        <button class="btn btn-secondary btn-sm signout" @click="auth.logout">Sign Out</button>
      </nav>
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
    getUserItems() {
      const config = {
        headers: {
          id_user: this.userId,
        },
      };
      return axios.get('/items', config)
      .then(({ data: userItems }) => {
        this.profileItems = userItems;
      })
      .catch(err => console.log(err));
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
        });
    },
    mainMenu() {
      this.$router.push({ path: '/main' });
    },
    removeListing(index) {
      const config = {
        headers: {
          id_item: this.profileItems[index].id,
        },
      };
      axios.delete('/items', config)
        .then(() => {
          this.getUserItems()
          .then(this.getTradeOffers);
        })
        .catch(err => console.log(err));
    },
    tradeView() {
      this.$refs.pendingTrades.show();
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

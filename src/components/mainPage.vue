  <template>
  <div class="container main-container">
      <nav class="navbar">
        <h3 class="logo">Swappr</h3>
        <button class="btn btn-info ml-auto pending-btn" @click="tradeView">Pending Trades</button>
        <pending-trades ref="pendingTrades" v-bind="$props" :tradeOffers='tradeOffers'></pending-trades>
        <div style="width: 7em;">
          <button class="btn btn-primary btn-block" @click="profilePage">Profile Page</button>
        </div>
      </nav>
      <b-modal ref="itemModal">
        <div slot="modal-header" class="w-100">
          <button class="close float-right" @click="hide">&times;</button>
          <h4 class="modal-title float-left">Your Offer</h4>
        </div>
        <div class="container-fluid item-offers">
          <div v-for="(item,index) in profileItems" :key='index' class="card m-1 w-100" style="border-style: outset; height: 5rem;">
            <h5 class="card-title text-left m-1">{{item.name}}</h5>
            <div class="row">
              <div class="col">
                <p class="text-left ml-1" style="height: 3rem; overflow: hidden;">{{item.description}}
                </p>
              </div>
              <div class="col-3 mr-2">
                <a href="#" @click="acceptTradeItem(item)" class="btn btn-primary btn-sm">Offer</a>
              </div>
            </div>
          </div>          
        </div>
      </b-modal>
      <div class="card inner-container p-2" style="background-color: #E5E7E9;">
        <div class="container">          
          <div class="row">
            <div class="col order-2 my-1 order-md-1 align-self-center">
              <button class="btn-warning btn-lg" @click="rejectTradeItem">No Thanks</button>
            </div>
            <div class="col-12 order-first order-md-2 col-md-5" style="min-height: 14rem;">
              <div class="card w-100 h-100" style="max-width: 15rem; border-style: outset;">
                <div class="card-block">
                  <h3 class="card-title">{{currentTradeItem.name}}</h3>
                  <p class="card-text">{{currentTradeItem.description}}</p>
                  <img v-bind:src="categoryPic"/>
                </div>
              </div>
            </div>
            <div class="col order-3 my-1 align-self-center">
              <button class="btn-success btn-lg" @click="show">Let's Trade!</button>
            </div>
          </div>
        </div>
      </div>
      <nav class="navbar">
        <button class="btn btn-secondary btn-sm signout" @click="auth.logout">Sign Out</button>
      </nav>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'mainPage',
  props: ['auth', 'authentication', 'userId', 'categories'],
  data() {
    return {
      currentTradeItem: {},
      profileItems: [],
      tradeOffers: [],
      categoryPic: '',
    };
  },
  methods: {
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
      .catch(err => console.error(err));
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
    getTradeItem() {
      const config = {
        headers: {
          id_user: this.userId,
        },
      };
      axios.get('/transactions', config)
      .then(({ data: tradeItem }) => {
        if (typeof tradeItem === 'string') {
          const noItemResponse = {
            name: 'Sorry!',
            description: 'No more trade items can be found at this time, check back later or select "No Thanks" to refresh',
            id: null,
          };
          this.currentTradeItem = noItemResponse;
        } else {
          this.currentTradeItem = tradeItem;
          this.getCategoryPic();
        }
      });
    },
    show() {
      this.$refs.itemModal.show();
    },
    hide() {
      this.$refs.itemModal.hide();
    },
    profilePage() {
      this.$router.push({ path: '/profile' });
    },
    ready() {
      this.getUserItems(this.userId);
    },
    tradeView() {
      this.$refs.pendingTrades.show();
    },
    rejectTradeItem() {
      if (!this.currentTradeItem.id) {
        this.getTradeItem();
        return;
      }
      const config = {
        id_user: this.userId,
        id_item_offered: this.currentTradeItem.id,
        id_item_desired: this.currentTradeItem.id,
        pending: false,
        accepted: false,
      };
      axios.post('/transactions', config)
      .then(this.getTradeItem)
      .catch((error) => {
        console.error(error);
      });
    },
    acceptTradeItem(userItem) {
      if (!this.currentTradeItem.id) {
        this.hide();
        return;
      }
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
    getCategoryPic() {
      const categoryID = this.currentTradeItem.id_category;
      const categoryPicArray = this.categories.filter(category =>
        categoryID === category.id)[0].url_img.split('cats');
      this.categoryPic = `../static/cats/${categoryPicArray[1]}`;
    },
  },
  mounted() {
    this.getTradeItem();
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

.well * {
  display: inline-block;
}

.item-offers {
  overflow-y: scroll;
  overflow-x: hidden;
}

.btn {
  margin: 1px;
}

li {
  display: inline-block;
}

</style>

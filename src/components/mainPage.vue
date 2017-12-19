  <template>
  <div>
    <nav class="navbar">
      <div class="nav-contents container">
        <div class="row w-100 ">
          <div class="col-12 col-sm-3 col-md-5">
            <img src="../assets/logo-white.png" class="float-left" style="width: 120px;">
          </div>
          <div class="col-12 col-sm-9 col-md-7 px-0" align="right">
            <div style="float: right;">
              <button class="btn btn-test signout" @click="auth.logout">Sign Out</button>
            </div>
            <div style="float: right;">
              <div class="col-3 px-0">
                <span class="fa-stack fa-5x has-badge" :data-count="tradeOffers.length">
                  <button class="btn btn-test pending-btn" @click="tradeView">Pending Trades</button>
                  <pending-trades ref="pendingTrades" v-bind="$props" :tradeOffers='tradeOffers'></pending-trades>
                </span>
              </div>
            </div>
            <div style="float: right; width: 7em;">
              <button class="btn btn-test btn-block" @click="profilePage">Profile</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="container main-container px-sm-0 mx-auto">
        <b-modal ref="itemModal" :class="'item-modal-view'">
          <div slot="modal-header" class="w-100">
            <button class="close float-right" @click="hide">&times;</button>
            <h4 class="modal-title float-left">Your Stash</h4>
          </div>
          <b-form @submit="acceptTradeItem">
          <div slot="modal-body" class="container-fluid item-offers">
              <div v-for="(item,index) in profileItems" :key='index' class="card m-1 w-100" style="border-style: outset; height: 6.5rem;">
                <h5 class="card-title text-left m-1">{{item.name}}</h5>
                <div class="row">
                  <div class="col-2">
                    <img class="item-img rounded ml-1" :src="item.url_img">
                  </div>
                  <div class="col">
                    <p class="text-left ml-1" style="height: 5rem; overflow: hidden;">{{item.description}}
                    </p>
                  </div>
                  <div class="col-3 mr-2">
                    <b-form-checkbox v-model="offeredItems" :id="`${item.id}`" :value="item.id">Offer?</b-form-checkbox>
                  </div>
                </div>
              </div>
          </div>
            </b-form>
            <div slot="modal-footer" class="w-100">
              <b-btn class="float-left" variant="primary" @click="hide">Close</b-btn>
              <b-button @click="acceptTradeItem" type="reset" variant="primary" class="btn btn-primary float-right">Offer Items</b-button>
            </div>
        </b-modal>
        <div class="card inner-container p-0 p-sm-2">
            <div style="height: 3rem;"></div>
            <div class="container-fluid">
              <div class="row">
                <div class="col-12 px-0 px-sm-2 pb-3" style="min-height: 14rem;">
                  <div class="item-card card px-0 w-100 h-100" style="border-style: outset;">
                    <div class="card-block px-0">
                      <img v-b-popover.hover.bottom="currentTradeItem.description" :title="currentTradeItem.name" class="trade-photo rounded" v-bind:src="categoryPic"/>
                      <h2 class="card-title">{{currentTradeItem.name}}</h2>
                    </div>
                  </div>
                </div>
                <div class="col order-2 my-1 align-self-center">
                  <button class="btn-warning btn-lg" @click="rejectTradeItem">No Thanks</button>
                </div>
                <div class="col order-3 my-1 align-self-center">
                  <button class="btn-success btn-lg" @click="show">Let's Trade!</button>
                </div>
              </div>
            </div>
        </div>
    </div>
    <nav class="navbar" style="position: absolute; bottom: 0; height: 3em;">
      <div class="nav-contents container">
        <h6 class="created-by pt-1">Created by HoneyBadgerHackers</h6>
      </div>
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
      offeredItems: [],
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
          items: this.profileItems.map(item => item.id),
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
          this.categoryPic = '';
        } else {
          this.currentTradeItem = tradeItem;
          if (tradeItem.url_img) {
            this.categoryPic = tradeItem.url_img;
          } else {
            this.getCategoryPic();
          }
        }
        this.getTradeOffers();
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
      const config = { data: [
        {
          id_user: this.userId,
          id_item_offered: this.currentTradeItem.id,
          id_item_desired: this.currentTradeItem.id,
          pending: false,
          accepted: false,
        },
      ] };
      axios.post('/transactions', config)
      .then(this.getTradeItem)
      .catch((error) => {
        console.error(error);
      });
    },
    acceptTradeItem() {
      if (!this.currentTradeItem.id) {
        this.offeredItems = [];
        this.hide();
        return;
      }
      const userItemsArray = this.offeredItems.map((item) => {
        const config = {
          id_user: this.userId,
          id_item_offered: item,
          id_item_desired: this.currentTradeItem.id,
          pending: true,
        };
        return config;
      });
      const config = { data: userItemsArray };
      axios.post('/transactions', config)
      .then(() => {
        this.offeredItems = [];
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
      this.categoryPic = `../static/cats${categoryPicArray[1]}`;
    },
  },
  mounted() {
    this.getUserItems()
    .then(this.getTradeItem)
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

.modal-body {
  max-height: 70vh;
  overflow-y: scroll;
}

.item-img {
  height: 4rem;
  width: 4.3rem;
  object-fit: cover;
}

.btn {
  margin: 1px;
}

li {
  display: inline-block;
}

img {
  width: 100%
}

</style>

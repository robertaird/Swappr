<template>
  <div style="overflow: hidden; max-height: 100%;">
    <nav class="navbar">
      <div class="nav-contents container">
        <div class="row w-100">
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
              <button class="btn btn-test btn-block" @click="mainMenu">Swap!</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="container main-container">
      <div class="card inner-container p-2" style="min-height: 10em;">
        <div class="float-right" style="max-height: 3rem;"></div>
        <add-item v-bind="$props" v-on:new-item="newItem"></add-item>
        <div class="card pl-3 my-1 w-100 item-box">
          <div class="container">
            <div class="row">
              <item-view v-for="(item,index) in profileItems" :item='item' :key='index' v-on:deleted-item="getUserItems"></item-view>
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
import { SERVER_URI } from '../constants';

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
      return axios.get(`${SERVER_URI}/items`, config)
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
      axios.get(`${SERVER_URI}/users`, config)
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
      axios.delete(`${SERVER_URI}/items`, config)
        .then(this.getUserItems)
          .then(this.getTradeOffers)
        .catch(err => console.error(err));
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

.item-box {
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

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
                <a href="#" @click="acceptOffer(index)" class="btn btn-primary">Accept</a>
              </div>
            </div>
          </li>
        </ul>
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
      tradeOffers: [{
        myItem: { name: 'testItem1', description: 'a very fine item', id_item: 3 },
        tradeFor: { name: 'testItem2', description: 'an even nicer item', id_item: 7 },
      },
      ],
      profileItems: [],
    };
  },
  methods: {
    newItem({ data: newItem }) {
      this.profileItems.push(newItem);
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

li {
  display: inline-block;
}
</style>

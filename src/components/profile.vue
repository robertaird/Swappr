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
          <ul>
            <li v-for="(trade,index) in tradeOffers" :key='index'>
              <!-- <div class="card" style="border-style: outset; width: 15rem;">
                <div class="card-block">
                  <h3 class="card-title">{{item.name}}</h3>
                  <p class="card-text">{{item.description}}</p>
                  <a href="#" @click="acceptOffer(index)" class="btn btn-primary">Accept</a>
                </div>
              </div> -->
            </li>
          </ul>
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
      const config = {
        headers: {
          id_user: this.userId,
        },
      };
      axios.get('/items', config)
        .then(({ data: userItems }) => {
          userItems.forEach(item => this.profileItems.push(item));
        });
    },
    mainMenu() {
      this.$router.push({ path: '/main' });
    },
    removeListing(index) {
      const config = {
        headers: {
          id_item: this.profileItems[index].id_item,
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

li {
  display: inline-block;
}
</style>

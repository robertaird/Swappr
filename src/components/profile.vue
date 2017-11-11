  <template>
  <div class="container-fluid">
      <nav class="navbar">
        <button class="btn btn-warning" @click="auth.logout">Sign Out</button>
        <button class="btn btn-info ml-auto" @click="tradeView">Pending Trades ({{tradeOffers.length}})</button>
        <button class="btn btn-primary" @click="mainMenu">Swap!</button>
      </nav>
      <modal name="acceptedTrades">
        <div class="modal-header">
          <button class="close" @click="closeTradeView">&times;</button>
          <h4 class="modal-title">Accepted Trades</h4>
        </div>
      </modal>
      <div class="card p-1" style="background-color: #E5E7E9;">
          <add-item v-bind="$props" v-on:new-item="newItem"></add-item>
          <div class="card px-3" style="background-color: #F0F3F4">
            <div class="container-fluid">
              <div class="row">
                <item-view v-for="(item,index) in profileItems" :item='item' :key='index' v-on:deleted-item="getItems"></item-view>
              </div>
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
    getItems() {
      const config = {
        headers: {
          id_user: this.userId,
        },
      };
      axios.get('/items', config)
        .then(({ data: userItems }) => {
          this.profileItems = userItems;
        })
        .catch(err => console.log(err));
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
  },
  mounted() {
    this.getItems();
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

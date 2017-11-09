  <template>
  <div class="hello">
      <nav class="navbar">
        <button class="navbar-btn" @click="signOut">Sign Out</button>
        <button  class="navbar-btn" @click="mainMenu">Main Menu</button>
      </nav>
      <button @click="tradeView" class="btn">Accepted Trades ({{tradeOffers.length}})</button>
      <modal name="addNew">
        <div class="modal-header">
          <button class="close" @click="hide">&times;</button>
          <h4 class="modal-title">Add New Item</h4>
        </div>
        <form>
          <div class="form-group">
            <label for="titleArea">Item Name</label>
            <input v-model="name" type="email" class="form-control" id="titleArea" placeholder="Enter Item Name">
          </div>
          <div class="form-group">
            <label for="descriptionArea">Description</label>
            <input v-model="description" type="text" class="form-control" id="descriptionArea" placeholder="description">
          </div>
          <button @click="addItem" class="btn btn-primary">Add Item</button>
        </form>
      </modal>
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
        <button @click="show" class="btn">Add New Item</button>
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
  data() {
    return {
      id_user: 5,
      tradeOffers: [{
        myItem: { name: 'testItem1', description: 'a very fine item', id_item: 3 },
        tradeFor: { name: 'testItem2', description: 'an even nicer item', id_item: 7 },
      },
      ],
      profileItems: [
        { name: 'testItem1', description: 'a very fine item', id_item: 3 },
        { name: 'testItem2', description: 'an even nicer item', id_item: 6 },
      ],
    };
  },
  methods: {
    getItems(userId) {
      const config = {
        headers: {
          id_user: userId,
        },
      };
      axios.get('/items', config)
        .then((userItems) => {
          console.log(userItems);
        });
    },
    signOut() {
      this.$router.push({ path: '/' });
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
          this.getItems(this.id_user);
        });
    },
    show() {
      this.$modal.show('addNew');
    },
    hide() {
      this.$modal.hide('addNew');
    },
    addItem() {
      if (this.name.length !== 0 && this.description.length !== 0) {
        const config = {
          body: {
            name: this.name,
            description: this.description,
            id_user: this.id_user,
          },
        };
        axios.post('/items', config)
          .then(() => {
            this.getItems(this.id_user);
            this.name = '';
            this.description = '';
            this.hide();
          });
      }
    },
    tradeView() {
      this.$modal.show('acceptedTrades');
    },
    closeTradeView() {
      this.$modal.hide('acceptedTrades');
    },
    ready() {
      this.getItems(this.id_user);
    },
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

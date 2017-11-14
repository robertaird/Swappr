  <template>
  <div class="pending-btn">
    <b-modal ref="acceptedTrades">
      <div slot="modal-header" class="w-100">
        <h4 class="modal-title float-left">Accepted Trades</h4>
        <button class="close" @click="closeTradeView">&times;</button>
      </div>
      <div class="container-fluid">
        <div class="card-block row">
          <div v-for="(trade,index) in tradeOffers" :key='index' class="card p-1 w-100" style="border-style: outset;">
            <div class="float-left">
              <p>
              {{trade.theirItem.name}}
              for your {{trade.myItem.name}}
              </p>
            </div>
            <div class="float-right">
              <a href="#" @click="acceptOffer(index)" class="btn btn-primary">More Info</a>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
    <b-modal ref="tradeInfo">
      <div slot="modal-header" class="w-100">
        <button class="close" @click="closeOfferView">&times;</button>
        <h4 class="modal-title float-left">{{acceptedTrade.itemName}}</h4>
      </div>
      <div style="text-align: left;">
        <h5>Description: {{acceptedTrade.description}}</h5>
        <h5>Please contact: {{acceptedTrade.name}}</h5>
        <h5>At: {{acceptedTrade.email}}</h5>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'addItem',
  props: ['auth', 'authentication', 'userId', 'tradeOffers', 'index'],
  data() {
    return {
      acceptedTrade: {
        traderName: '',
        traderEmail: '',
      },
    };
  },
  methods: {
    acceptOffer(index) {
      const { theirItem: { id_user, description, name } } = this.tradeOffers[index];
      const config = {
        headers: {
          id: id_user,
        },
      };
      axios.get('/users/single', config)
        .then((trader) => {
          this.acceptedTrade = trader.data;
          this.acceptedTrade.description = description;
          this.acceptedTrade.itemName = name;
          return 'changed';
        })
        .then(() => {
          this.$refs.tradeInfo.show();
        })
        .catch(err => console.log(err));
    },
    show() {
      this.$refs.acceptedTrades.show();
    },
    closeTradeView() {
      this.$refs.acceptedTrades.hide();
    },
    closeOfferView() {
      this.$refs.tradeInfo.hide();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1,
h2 {
  font-weight: normal;
}

.btn-danger {
  display: inline-block;
}

.card {
  display: inline-block;
}
</style>

  <template>
  <div class="pending-btn">
    <span class="fa-stack fa-5x has-badge ml-auto" :data-count="tradeOffers.length">
    </span>
    <b-modal ref="acceptedTrades">
      <div slot="modal-header" class="w-100">
        <h4 class="modal-title float-left">Accepted Trades</h4>
        <button class="close" @click="closeTradeView">&times;</button>
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
    </b-modal>
    <b-modal ref="tradeInfo">
      <div class="modal-header">
        <button class="close" @click="closeOfferView">&times;</button>
        <h4 class="modal-title">Trade Info</h4>
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
      const config = {
        headers: {
          id: this.tradeOffers[index].theirItem.id_user,
        },
      };
      axios.get('/users/single', config)
        .then((trader) => {
          this.acceptedTrade = trader.data;
          return 'changed';
        })
        .then(() => {
          this.$modal.show('tradeInfo');
        })
        .catch(err => console.log(err));
    },
    show() {
      console.log(this.tradeOffers);
      this.$refs.acceptedTrades.show();
    },
    hide() {
      // this.$refs[this.item.id].hide();
    },
    closeTradeView() {
      this.$modal.hide('acceptedTrades');
    },
    closeOfferView() {
      this.$modal.hide('tradeInfo');
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

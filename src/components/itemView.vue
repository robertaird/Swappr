  <template>
  <div :class="item.id">
      <div class="card col" @click="show" style="margin: 5px; border-style: outset; width: 12rem; height: 11rem;">
        <div class="card-body">
        </div>
        <div class="card-footer bg-transparent border-white">
          <h5 class="card-title">{{ item.name }}</h5>
        </div>
      </div>
      <b-modal :ref="item.id">
        <div slot="modal-header" class="w-100">
          <h4 class="modal-title float-left">{{ item.name }}</h4>
          <button class="close float-right" @click="hide">&times;</button>
        </div>
        <div class="modal-body" style="height: 10rem;">
          {{ item.description }}<br>
          {{ item.id }}
        </div>
        <div slot="modal-footer" class="w-100">
          <a href="#" @click="removeListing" class="btn btn-danger float-left">Delete Item</a>
          <a href="#" @click="hide" class="btn btn-primary float-right">Close</a>
        </div>
      </b-modal>          
   </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'addItem',
  props: ['auth', 'authentication', 'userId', 'item', 'index'],
  data() {
    return {
    };
  },
  methods: {
    show() {
      this.$refs[this.item.id].show();
    },
    hide() {
      this.$refs[this.item.id].hide();
    },
    removeListing() {
      this.hide();
      const config = {
        headers: {
          id_item: this.item.id,
        },
      };
      axios.delete('/items', config)
        .then(() => {
          this.$emit('deleted-item');
        });
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

  <template>
  <div :class="item.id">
      <div class="card col" @click="show" style="margin: 5px; border-style: outset; width: 12rem; height: 11rem;">
        <div class="card-body">
        </div>
        <div class="card-footer bg-transparent">
          <h5 class="card-title">{{item.name}}</h5>
        </div>
      </div>
      <!-- <button @click="show" class="btn">{{ item.name }}</button> -->
      <modal :name="item.id">
        <div class="modal-header">
          <h4 class="modal-title ">{{ item.name }}</h4>
          <button class="close" @click="hide">&times;</button>
        </div>
        <div class="modal-body" style="height: 10rem;">
          {{ item.description }}
        </div>
        <div class="modal-footer">
          <a href="#" @click="removeListing(index)" class="btn btn-danger mr-auto">Delete Item</a>
          <a href="#" @click="hide" class="btn btn-primary">Close</a>
        </div>
      </modal>          
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
      this.$modal.show(this.item.id);
    },
    hide() {
      this.$modal.hide(this.item.id);
    },
    removeListing(index) {
      const config = {
        headers: {
          id_item: this.profileItems[index].id,
        },
      };
      axios.delete('/items', config)
        .then(() => {
          // this.getItems(this.userId);
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

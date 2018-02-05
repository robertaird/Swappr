  <template>
    <div :class="item.id">
      <div class="item-card card col-12 mx-1 ml-sm-4 ml-md-4 p-0" @click="show" style="margin: 5px; border-style: outset; width: 10rem; height: 9rem;">
        <div class="card-body p-0 m-0">
          <img class="item-img rounded-top p-0 m-0" :src="item.url_img">
        </div>
        <div class="card-footer px-0 pt-1 m-0 border-none">
          <h6 class="card-title">{{ item.name }}</h6>
        </div>
      </div>
      <b-modal :ref="item.id">
        <div slot="modal-header" class="w-100">
          <h4 class="modal-title float-left">{{ item.name }}</h4>
          <button class="close float-right" @click="hide">&times;</button>
        </div>
        <div class="modal-body" style="max-height: 20rem;">
          <img class="item-img-lg rounded pb-3" :src="item.url_img"><br>
          {{ item.description }}
        </div>
        <div slot="modal-footer" class="w-100">
          <a href="#" @click="removeListing" class="btn btn-danger  btn-sm float-left">Delete Item</a>
          <a href="#" @click="hide" class="btn btn-primary float-right">Close</a>
        </div>
      </b-modal>
   </div>
</template>

<script>
import axios from 'axios';
import { SERVER_URI } from '../constants';

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
      axios.delete(`${SERVER_URI}/items`, config)
        .then(() => {
          this.$emit('deleted-item');
        })
        .catch(err => console.log(err));
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

.item-img {
  height: 7rem;
  width: 9.9rem;
  object-fit: cover;
}

.item-img-lg {
  height: 15rem;
  width: 20rem;
  object-fit: cover;
}
.btn-danger {
  display: inline-block;
}

.item-card {
  cursor: pointer;
}

.card {
  display: inline-block;
}
</style>

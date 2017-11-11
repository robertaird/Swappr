  <template>
  <div class="addItem">
      <b-button @click="showModal" class="btn btn-info">Add New Item</b-button>
      <b-modal ref="addItemModal" :adaptive="true" draggable=".window-header" height="500px">
        <!-- <div class="modal-content"> -->
            <div class="modal-header">
              <h4 class="modal-title">Add New Item</h4>
              <button class="close" @click="hideModal">&times;</button>
            </div>
            <!-- <div class="modal-body"> -->
              <div>
            <form>
              <div class="form-group">
                <label for="titleArea">Item Name</label>
                <input v-model="name" type="name" class="form-control" id="titleArea" placeholder="Enter Item Name">
              </div>
              <div class="form-group">
                <label for="descriptionArea">Description</label>
                <textarea v-model="description" v-on:keyup.enter="addItem" type="text" class="form-control" id="descriptionArea" placeholder="description"></textarea>
              </div>
              <button @click="addItem" type='button' class="btn btn-primary">Add Item</button>
            </form>

              </div>
            <!-- </div> -->
          <!-- </div> -->
      </b-modal>          
   </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'addItem',
  props: ['auth', 'authentication', 'userId'],
  data() {
    return {
      newItem: null,
      name: '',
      description: '',
    };
  },
  methods: {
    showModal() {
      this.$refs.addItemModal.show();
    },
    hideModal() {
      this.$refs.addItemModal.hide();
    },
    // show() {
    //   this.$modal.show('addNew');
    // },
    // hide() {
    //   this.$modal.hide('addNew');
    // },
    addItem() {
      if (this.name.length !== 0 && this.description.length !== 0) {
        const config = {
          name: this.name,
          description: this.description,
          id_user: this.userId,
        };
        this.hide();
        axios.post('/items', config)
          .then((item) => {
            this.name = '';
            this.description = '';
            this.$emit('new-item', item);
          });
      }
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

textarea {
  resize: none;
}

li {
  display: inline-block;
}
</style>

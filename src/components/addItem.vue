  <template>
  <div class="addItem">
      <b-button @click="showModal" class="btn btn-info">Add New Item</b-button>
      <b-modal ref="addItemModal" class="mt-10">
            <div slot="modal-header" class="w-100">
              <h3 class="float-left">Add New Item</h3>
              <button class="close float-right" @click="hideModal">&times;</button>
            </div>
            <div class="modal-body">
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
                </form>
              </div>
            </div>
            <div slot="modal-footer" class="w-100">
              <button @click="addItem" type='button' class="btn btn-primary float-left">Add Item</button>
              <b-btn class="float-right" variant="primary" @click="hideModal">Close</b-btn>
            </div>
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
    addItem() {
      if (this.name.length !== 0 && this.description.length !== 0) {
        const config = {
          name: this.name,
          description: this.description,
          id_user: this.userId,
        };
        this.hideModal();
        axios.post('/items', config)
          .then((item) => {
            this.name = '';
            this.description = '';
            this.$emit('new-item', item);
          })
          .catch(err => console.log(err));
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

.modal-content {
  margin-top: 25vh;
}

.modal-header {
  text-align: left;
}

.modal-body {
  font-size: 14px;
  text-align: left;
}

textarea {
  resize: none;
}

li {
  display: inline-block;
}
</style>

  <template>
  <div class="addItem">
      <button @click="show" class="btn">Add New Item</button>
      <modal name="addNew">
        <div class="modal-header">
          <button class="close" @click="hide">&times;</button>
          <h4 class="modal-title">Add New Item</h4>
        </div>
        <form>
          <div class="form-group">
            <label for="titleArea">Item Name</label>
            <input v-model="name" type="name" class="form-control" id="titleArea" placeholder="Enter Item Name">
          </div>
          <div class="form-group">
            <label for="descriptionArea">Description</label>
            <input v-model="description" type="text" class="form-control" id="descriptionArea" placeholder="description">
          </div>
          <button @click="addItem" type='button' class="btn btn-primary">Add Item</button>
        </form>
      </modal>          
   </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'addItem',
  props: ['auth', 'authentication'],
  data() {
    return {
      id_user: 2,
      newItem: null,
    };
  },
  methods: {
    show() {
      this.$modal.show('addNew');
    },
    hide() {
      this.$modal.hide('addNew');
    },
    addItem() {
      if (this.name.length !== 0 && this.description.length !== 0) {
        const config = {
          data: {
            name: this.name,
            description: this.description,
            id_user: this.id_user,
          },
        };

        this.$emit('child-data', config);
        axios.post();
        this.hide();
        // axios.post('/items', config)
        //   .then(() => {
        //     this.getItems(this.id_user);
        //     this.name = '';
        //     this.description = '';
        //     this.hide();
        //   });
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

li {
  display: inline-block;
}
</style>

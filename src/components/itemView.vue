  <template>
  <div :class="item.id">
      <button @click="show" class="btn">{{ item.name }}</button>
      <modal :name="item.id">
        <div class="modal-header">
          <button class="close" @click="hide">&times;</button>
          <h4 class="modal-title">{{ item.name }}</h4>
        </div>
      </modal>          
   </div>
</template>

<script>

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

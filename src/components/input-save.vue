<template>
  <div class="navbar-item">
    <b-input placeholder="No input" v-model="input" rounded></b-input>
    <b-button @click="save">Save</b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: this.$store.state.input_save
    };
  },
  methods: {
    save() {
      this.$store.state.input_save = this.input;
    }
  }
};
</script>

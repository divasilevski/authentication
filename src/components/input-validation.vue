<template>
  <ValidationProvider
    :vid="vid"
    :name="$attrs.name || $attrs.label"
    :rules="rules"
  >
    <b-field
      slot-scope="{ errors, valid }"
      v-bind="$attrs"
      :type="{ 'is-danger': errors[0], 'is-dark': valid }"
      :message="errors[0]"
    >
      <p class="control has-icons-left">
        <b-input v-model="innerValue" v-bind="$attrs"></b-input>
        <span class="icon is-small is-left">
          <i :class="icon"></i>
        </span>
      </p>
    </b-field>
  </ValidationProvider>
</template>

<script>
export default {
  props: {
    vid: {
      type: String
    },
    rules: {
      type: [Object, String],
      default: ""
    },
    // must be included in props
    value: {
      type: null
    },
    icon: {
      type: String
    }
  },
  data: () => ({
    innerValue: ""
  }),
  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
      this.$emit("input", newVal);
    },
    // Handles external model changes.
    value(newVal) {
      this.innerValue = newVal;
    }
  },
  created() {
    if (this.value) {
      this.innerValue = this.value;
    }
  }
};
</script>

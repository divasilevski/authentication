<template>
  <div class="app">
    <RouterButton></RouterButton>
    <router-view></router-view>

    <ValidationObserver ref="observer">
      <section class="section">
        <ValidationProvider rules="required|email" name="Email">
          <b-field
            slot-scope="{ errors, valid }"
            label="Email"
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
            :message="errors"
          >
            <b-input type="email" v-model="email"></b-input>
          </b-field>
        </ValidationProvider>

        <div class="buttons">
          <button class="button is-success" @click="validate().then(submit)">
            <span class="icon is-small">
              <i class="fas fa-check"></i>
            </span>
            <span>Submit</span>
          </button>
        </div>
      </section>
    </ValidationObserver>
  </div>
</template>

<script>
// @ is an alias to /src
import RouterButton from "@/components/nav.vue";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  data: () => ({
    email: "",
    password: "",
    confirmation: "",
    subject: "",
    choices: []
  }),
  methods: {
    submit() {
      // eslint-disable-next-line no-console
      console.log("Form submitted yay!");
    },
    resetForm() {
      this.email = "";
      this.password = "";
      this.confirmation = "";
      this.subject = "";
      this.choices = [];
      requestAnimationFrame(() => {
        this.$refs.observer.reset();
      });
    }
  },
  name: "app",
  components: {
    ValidationObserver,
    ValidationProvider,
    RouterButton
  }
};
</script>

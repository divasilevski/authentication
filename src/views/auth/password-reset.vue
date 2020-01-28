<template>
  <div class="columns is-centered" style="margin:0px">
    <div class="column is-6-tablet is-4-desktop is-4-widescreen">
      <!-- 1/3 Horizontal center -->

      <ValidationObserver ref="observer">
        <!-- Observer and validate need for button -->
        <section slot-scope="{ validate, valid }">
          <h1 class="title is-1 has-text-centered">
            Reset your
            <br />password
          </h1>

          <!-- EMAIL ADRESS -->
          <InputValidation
            vid="email"
            name="Email"
            rules="required|email"
            type="email"
            placeholder="Email address"
            v-model="user_mail"
            icon="fas fa-envelope"
          ></InputValidation>
          <p style="margin-top: .75rem"></p>

          <!-- RESET BUTTON -->
          <div class="field">
            <b-button
              type="is-dark"
              @click="validate().then(valid ? reset() : 0)"
              :loading="loading"
              expanded
            >
              Send password reset email
            </b-button>
          </div>
        </section>
      </ValidationObserver>

      <!-- 1/3 Horizontal center -->
    </div>
  </div>
</template>

<script>
import InputValidation from "@/components/input-validation.vue";

export default {
  data() {
    return {
      user_mail: ""
    };
  },
  methods: {
    reset() {
      this.$store
        .dispatch("resetPassword", this.user_mail)
        .then(() => {
          this.$router.push("/sign-in").catch(() => {});
          this.$buefy.toast.open({
            message: "Check your email.",
            duration: 5000,
            position: "is-bottom",
            type: "is-dark"
          });
        })
        .catch(error => {
          this.$buefy.toast.open({
            message: error,
            duration: 5000,
            position: "is-bottom",
            type: "is-dark"
          });
        });
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  components: {
    InputValidation
  }
};
</script>

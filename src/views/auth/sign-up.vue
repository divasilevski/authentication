<template>
  <div class="columns is-centered is-variable is-10">
    <div class="column is-6-tablet is-4-desktop is-4-widescreen is-centered">
      <div class="columns is-centered">
        <div class="column is-centered">
          <!-- 1/3 Horizontal center -->

          <ValidationObserver ref="observer">
            <!-- Observer and validate need for button -->
            <section class="section" slot-scope="{ handleSubmit }">
              <h1 class="title is-1 has-text-centered">
                Create new
                <br />account
              </h1>

              <!-- USERNAME -->
              <InputValidation
                vid="username"
                name="Username"
                rules="required|alpha_spaces"
                type="text"
                placeholder="Username"
                v-model="user_name"
                icon="fa fa-user"
              ></InputValidation>
              <p style="margin-top: .75rem"></p>

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

              <!-- PASSWORD -->
              <InputValidation
                vid="password"
                name="Password"
                rules="required|min:6"
                type="password"
                placeholder="Create password"
                v-model="user_password"
                icon="fas fa-lock"
                password-reveal
              ></InputValidation>
              <p style="margin-top: .75rem"></p>

              <!-- CONFIRM PASSWORD -->
              <InputValidation
                vid="confirmed_password"
                name="Confirmed password"
                rules="required|confirmed:password"
                type="password"
                placeholder="Confirm password"
                v-model="confirm_password"
                icon="fa fa-key"
                password-reveal
              ></InputValidation>
              <p style="margin-top: .75rem"></p>

              <!-- REGGISTRATE BUTTON -->
              <div class="field">
                <b-button
                  type="is-dark"
                  @click="handleSubmit(() => registrate)"
                  :loading="loading"
                  expanded
                >
                  Sign Up
                </b-button>
              </div>

              <!-- --------------------------SEPARATOR-------------------------- -->
              <div class="field has-text-centered">
                <span style="color: #D6D6D6">———————— or ————————</span>
              </div>

              <!-- CREATE ACCOUNT -->
              <b-button
                tag="router-link"
                size="is-small"
                to="/sign-in"
                type="is-text"
                expanded
              >
                Have an account? Sign In!
              </b-button>
            </section>
          </ValidationObserver>

          <!-- 1/3 Horizontal center -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputValidation from "@/components/input-validation.vue";

export default {
  data() {
    return {
      user_name: "",
      user_mail: "",
      user_password: ""
    };
  },
  methods: {
    registrate() {
      // eslint-disable-next-line no-console
      console.log("hey");
      const user = {
        name: this.user_name,
        email: this.user_mail,
        password: this.user_password
      };

      this.$store
        .dispatch("registerUser", user)
        .then(() => {
          this.$router.push("/user");
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

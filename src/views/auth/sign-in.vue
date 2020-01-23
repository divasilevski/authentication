<template>
  <div class="columns is-centered is-variable is-10">
    <div class="column is-6-tablet is-4-desktop is-4-widescreen is-centered">
      <div class="columns is-centered">
        <div class="column is-centered">
          <!-- 1/3 Horizontal center -->

          <ValidationObserver ref="observer">
            <!-- Observer and validate need for button -->
            <section slot-scope="{ validate, valid }">
              <h1 class="title is-1 has-text-centered">
                Login to
                <br />account
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

              <!-- LOGIN BUTTON -->
              <div class="field">
                <b-button
                  type="is-dark"
                  @click="validate().then(valid ? login() : 0)"
                  :loading="loading"
                  expanded
                >
                  Sign In
                </b-button>
              </div>

              <!-- --------------------------SEPARATOR-------------------------- -->
              <div class="field has-text-centered">
                <span style="color: #D6D6D6">———————— or ————————</span>
              </div>

              <!-- GOOGLE -->
              <div class="field">
                <b-button
                  @click="loginGoogle"
                  icon-left="fab fa-google"
                  icon-pack="fab"
                  expanded
                >
                  Sign In using Google
                </b-button>
              </div>

              <!-- GITHUB -->
              <div class="field">
                <b-button icon-left="fab fa-github" icon-pack="fab" expanded>
                  Sign In using GitHub
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
                to="/sign-up"
                type="is-text"
                expanded
              >
                Don't have an account? Sign Up!
              </b-button>

              <!-- FORGOT PASSWORD -->
              <b-button
                tag="router-link"
                size="is-small"
                to="/sign-up"
                type="is-text"
                expanded
              >
                Forgot your password?
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
      user_mail: "",
      user_password: "",
      is_tag: false
    };
  },
  methods: {
    login() {
      const user = {
        email: this.user_mail,
        password: this.user_password
      };

      this.$store
        .dispatch("loginUser", user)
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
    },
    loginGoogle() {
      this.$store
        .dispatch("loginGoogle")
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

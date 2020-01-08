<template>
  <div class="columns is-centered is-variable is-10">
    <div class="column is-6-tablet is-4-desktop is-4-widescreen is-centered">
      <div class="columns is-centered">
        <div class="column is-centered">
          <!-- 1/3 Horizontal center -->

          <section>
            <h1 class="title is-1 has-text-centered">
              Login to <br />
              account
            </h1>

            <!-- EMAIL ADRESS -->
            <b-field>
              <p class="control has-icons-left">
                <b-input
                  placeholder="Email address"
                  type="email"
                  v-model="user_mail"
                ></b-input>
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </p>
            </b-field>

            <!-- PASSWORD -->
            <b-field>
              <p class="control has-icons-left">
                <b-input
                  type="password"
                  placeholder="Password"
                  v-model="user_password"
                  password-reveal
                ></b-input>
                <span class="icon is-small is-left">
                  <i class="fa fa-key"></i>
                </span>
              </p>
            </b-field>

            <!-- REGGISTRATE BUTTON -->
            <div class="field">
              <b-button
                type="is-dark"
                @click="login"
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

          <!-- 1/3 Horizontal center -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    errorTag() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

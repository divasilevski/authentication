<template>
  <div class="columns is-centered is-variable is-10">
    <div class="column is-6-tablet is-4-desktop is-4-widescreen is-centered">
      <div class="columns is-centered">
        <div class="column is-centered">
          <!-- 1/3 Horizontal center -->

          <section>
            <h1 class="title is-1 has-text-centered">Create your account</h1>

            <!-- USERNAME -->
            <b-field>
              <p class="control has-icons-left">
                <b-input placeholder="Username" v-model="user_name"></b-input>
                <span class="icon is-small is-left">
                  <i class="fa fa-user" aria-hidden="true"></i>
                </span>
              </p>
            </b-field>

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
                  placeholder="Create password"
                  v-model="user_password"
                  password-reveal
                ></b-input>
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </b-field>

            <!-- CONFIRM PASSWORD -->
            <b-field>
              <p class="control has-icons-left">
                <b-input
                  type="password"
                  placeholder="Confirm password"
                  v-model="confirm_password"
                  password-reveal
                ></b-input>
                <span class="icon is-small is-left">
                  <i class="fa fa-key" aria-hidden="true"></i>
                </span>
              </p>
            </b-field>

            <!-- REGGISTRATE BUTTON -->
            <div class="field">
              <b-button
                type="is-dark"
                @click="registrate"
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

            <!-- GOOGLE -->
            <div class="field">
              <b-button icon-left="fab fa-google" icon-pack="fab" expanded>
                Sign In using Google
              </b-button>
            </div>

            <!-- GITHUB -->
            <div class="field">
              <b-button icon-left="fab fa-github" icon-pack="fab" expanded>
                Sign In using GitHub
              </b-button>
            </div>
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
      user_name: "",
      user_mail: "",
      user_password: "",
      isTag: false
    };
  },
  methods: {
    registrate() {
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

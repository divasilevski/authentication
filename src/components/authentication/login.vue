<template>
  <div class="columns is-centered is-variable is-10">
    <div class="column is-6-tablet is-4-desktop is-4-widescreen is-centered">
      <div class="columns is-centered">
        <div class="column is-centered">
          <!-- 1/3 Horizontal center -->

          <section>
            <!-- Input forms -->
            <div class="field">
             <b-input placeholder="Email" type="email" v-model="user_mail"></b-input>
            </div>
            <div class="field">
              <b-input placeholder="Password" type="password" v-model="user_password" password-reveal></b-input>
            </div>
            
            <!-- Login button -->
            <div class="field">
              <b-button @click="login" :loading="loading" expanded>Login</b-button>
            </div>

            <!-- Google button -->
            <div class="field">
              <b-button @click="loginGoogle" :loading="loading" expanded>Through Google</b-button>
            </div>
          </section>

          <!-- Tag with error -->
          <b-tag
            v-if="is_tag"
            attached
            closable
            aria-close-label="Close tag"
            @close="is_tag = false"
          >{{ errorTag }}</b-tag>

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
        .catch(() => {
          this.is_tag = true;
        });
    },
    loginGoogle() {
      this.$store
        .dispatch("loginGoogle")
        .then(() => {
          this.$router.push("/user");
        })
        .catch(() => {
          this.is_tag = true;
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

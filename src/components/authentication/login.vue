<template>
  <div class="navbar-item">
    <section>
      <!-- Input forms -->
      <b-input placeholder="Email" type="email" v-model="user_mail"></b-input>
      <b-input
        placeholder="Password"
        type="password"
        v-model="user_password"
        password-reveal
      ></b-input>

      <!-- Login button -->
      <b-button @click="login" :loading="loading" expanded>Login</b-button>

      <!-- Google button -->
      <b-button @click="loginGoogle" :loading="loading" expanded>
        Through Google
      </b-button>
    </section>

    <!-- Tag with error -->
    <b-tag
      v-if="is_tag"
      attached
      closable
      aria-close-label="Close tag"
      @close="is_tag = false"
      >{{ errorTag }}
    </b-tag>
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

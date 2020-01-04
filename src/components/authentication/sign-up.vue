<template>
  <div class="navbar-item">
    <section>
      <!-- Input forms -->
      <b-input placeholder="UserName" v-model="user_name"></b-input>
      <b-input placeholder="Email" type="email" v-model="user_mail"></b-input>
      <b-input
        placeholder="Password"
        type="password"
        v-model="user_password"
        password-reveal
      ></b-input>

      <!-- Registrate button -->
      <b-button @click="registrate" :loading="loading" expanded>
        SignUp
      </b-button>
    </section>

    <!-- Tag with error -->
    <b-tag
      v-if="isTag"
      attached
      closable
      aria-close-label="Close tag"
      @close="isTag = false"
      >{{ errorTag }}
    </b-tag>
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
        .catch(() => {
          this.isTag = true;
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

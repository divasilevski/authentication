<template>
  <div class="navbar-item">
    <section>
      <b-input placeholder="User name" v-model="user_name"></b-input>
      <b-input placeholder="Email" type="email" v-model="user_mail"></b-input>
      <b-input
        placeholder="Password"
        type="password"
        v-model="user_password"
        password-reveal
      ></b-input>

      <b-button @click="registrate" expanded>SignUp</b-button>
    </section>
  </div>
</template>

<script>
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
      const user = {
        email: this.user_mail,
        password: this.user_password
      };
      this.$store.dispatch("registerUser", user);
    }
  }
};
</script>

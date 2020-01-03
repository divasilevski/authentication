<template>
  <div class="navbar-item">
    <section>
      <b-input placeholder="Email" type="email" v-modele="user_mail"></b-input>
      <b-input
        placeholder="Password"
        type="password"
        v-modele="user_password"
        password-reveal
      ></b-input>

      <b-button @click="login" expanded>Login</b-button>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_password: "",
      user_mail: ""
    };
  },
  methods: {
    login() {
      //
    }
  }
};
</script>

<template>
  <div class="navbar-item">
    <section>
      <b-input placeholder="User name" v-modele="user_name"></b-input>
      <b-input placeholder="Email" type="email" v-modele="user_mail"></b-input>
      <b-input
        placeholder="Password"
        type="password"
        v-modele="user_password"
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
      user_password: "",
      user_mail: ""
    };
  },
  methods: {
    registrate() {
      //
    }
  }
};
</script>

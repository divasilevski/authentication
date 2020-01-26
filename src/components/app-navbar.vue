<template>
  <b-navbar class="is-white">
    <!-- BREND NAVBAR -->
    <template slot="brand">
      <b-navbar-item @click="home">
        <div class="media">
          <span class="icon">
            <i class="fas fa-home"></i>
          </span>
          <span>Home</span>
        </div>
      </b-navbar-item>
    </template>

    <!-- END NAVBAR -->
    <template slot="end">
      <!-- AUTH -->
      <b-navbar-item tag="div" :style="isAuth ? 'display:none' : ''">
        <div class="buttons">
          <a class="button is-dark" @click="signIn">Sign in</a>
          <a class="button is-light" @click="signUp">Sign up</a>
        </div>
      </b-navbar-item>

      <!-- USER -->
      <div
        class="navbar-item has-dropdown is-hoverable border-radius"
        :style="!isAuth ? 'display:none' : ''"
      >
        <a class="navbar-item">
          <div class="media">
            <span class="icon">
              <i class="fas fa-user"></i>
            </span>
          </div>
        </a>
        <div class="navbar-dropdown is-right">
          <a class="navbar-item" @click="user">User</a>
          <hr class="navbar-divider" />
          <a class="navbar-item">Settings</a>
          <a class="navbar-item">Logout</a>
        </div>
      </div>
    </template>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      username: "username"
    };
  },
  methods: {
    home() {
      this.$router.push("/").catch(() => {});
    },
    user() {
      this.$router.push("/user").catch(() => {});
    },
    settings() {
      this.$router.push("/user/settings").catch(() => {});
    },
    signIn() {
      this.$router.push("/sign-in").catch(() => {});
    },
    signUp() {
      this.$router.push("/sign-up").catch(() => {});
    }
  },
  computed: {
    isAuth() {
      if (this.$store.getters.isAuth === undefined) {
        return this.$store.state.isAuth;
      }
      return this.$store.getters.isAuth;
    }
  }
};
</script>

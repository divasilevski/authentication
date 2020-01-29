<template>
  <b-navbar class="is-white">
    <!-- BREND NAVBAR -->
    <template slot="brand">
      <b-navbar-item @click="home">
        <div class="media">
          <span class="icon">
            <font-awesome-icon :icon="['fas', 'h-square']" />
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
              <font-awesome-icon :icon="['fas', 'user']" />
            </span>
          </div>
        </a>
        <div class="navbar-dropdown is-right">
          <a class="navbar-item" @click="home">Home page</a>
          <a class="navbar-item" @click="user">Your profile</a>
          <hr class="navbar-divider" />
          <a class="navbar-item" @click="settings">Settings</a>
          <a class="navbar-item" @click="logout">Logout</a>
        </div>
      </div>
    </template>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    home() {
      this.$router.push("/").catch(() => {});
    },
    signIn() {
      this.$router.push("/sign-in").catch(() => {});
    },
    signUp() {
      this.$router.push("/sign-up").catch(() => {});
    },
    user() {
      this.$router.push("/user").catch(() => {});
    },
    settings() {
      this.$router.push("/settings").catch(() => {});
    },
    logout() {
      this.$store.dispatch("signOut").then(() => {
        this.$router.push("/sign-in");
      });
    }
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    }
  }
};
</script>

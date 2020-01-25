<template>
  <b-navbar class="is-white">
    <template slot="end">
      <!-- END NAVBAR -->
      <b-navbar-item @click="home" class="is-dark">
        <div class="media">
          <span class="icon">
            <i class="fas fa-home"></i>
          </span>
          <span>Home</span>
        </div>
      </b-navbar-item>

      <div class="navbar-item has-dropdown is-hoverable border-radius">
        <a :class="arrowless1" @click="user">
          <div class="media">
            <span class="icon">
              <i class="fas fa-user"></i>
            </span>
            <span class="has-text">User</span>
          </div>
        </a>

        <div class="navbar-dropdown" :style="arrowless2">
          <a class="navbar-item">Settings</a>
          <a class="navbar-item">Logout</a>
        </div>
      </div>
      <!-- END NAVBAR -->
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
    }
  },
  computed: {
    arrowless1() {
      return !this.$store.getters.checkUser
        ? "navbar-link is-arrowless"
        : "navbar-link";
    },
    arrowless2() {
      return !this.$store.getters.checkUser ? "display:none" : "";
    }
  }
};
</script>

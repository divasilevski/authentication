<template>
  <nav class="navbar">
    <div class="navbar-menu">
      <div class="navbar-end">
        <!-- HOME BUTTON -->
        <b-navbar-item @click="home">
          Home
        </b-navbar-item>

        <!-- HOME BUTTON -->
        <b-navbar-item @click="user">
          User
        </b-navbar-item>

        <!-- MENU BUTTON -->
        <b-dropdown v-model="navigation" position="is-bottom-left" aria-role="menu">
          <a class="navbar-item" slot="trigger" role="button">
            <span>
              <i class="fas fa-ellipsis-v"></i>
            </span>
          </a>

          <b-dropdown-item custom aria-role="menuitem">
            Logged as
            <b>Rafael Beraldo</b>
          </b-dropdown-item>
          <hr class="dropdown-divider" aria-role="menuitem" />
          <b-dropdown-item value="settings">
            <b-icon icon="settings"></b-icon>Settings
          </b-dropdown-item>
          <b-dropdown-item value="logout" aria-role="menuitem">
            <b-icon icon="logout"></b-icon>Logout
          </b-dropdown-item>
        </b-dropdown>
      </div>

      <!-- END NAVBAR -->
    </div>
  </nav>
</template>

<script>
export default {
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
  }
};
</script>

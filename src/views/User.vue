<template>
  <div class="user">
    <div class="navbar-item">
      <section>
        <h3>USER PAGE!</h3>

        <!-- Logout button -->
        <b-button @click="logout">Logout</b-button>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logoutUser");
      this.$router.push("/login");
    }
  }
};
</script>

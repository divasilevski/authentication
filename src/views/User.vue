<template>
  <div class="user">
    <div class="navbar-item">
      <section>
        <!-- Logout button -->
        <b-button @click="logout">Logout</b-button>

        <!-- Input save -->
        <h2>{{ $store.state.input_save }}</h2>
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

<template>
  <div class="tabs is-right">
    <ul>
      <li @click="home"><a>Home</a></li>
      <li @click="user"><a>User</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    home() {
      this.$router.push("/");
    },
    user() {
      this.$router.push("/sign-in");
    }
  }
};
</script>

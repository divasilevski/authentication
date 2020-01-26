<template>
  <div class="user">
    <div class="navbar-item">
      <section>
        <h3>USER PAGE!</h3>
      </section>
    </div>

    <div class="navbar-item">
      <section>
        <!-- Input forms -->
        <b-input placeholder="UserName" v-model="user_name"></b-input>

        <!-- Change user name -->
        <b-button @click="changeUserName">Change name</b-button>
      </section>
    </div>

    <div class="navbar-item">
      <section>
        <!-- Input forms -->
        <b-input
          placeholder="New password"
          type="password"
          v-model="new_password"
          password-reveal
        ></b-input>

        <!-- Change user name -->
        <b-button @click="changePassword">Change password</b-button>
      </section>
    </div>

    <div class="navbar-item">
      <section>
        <!-- Logout button -->
        <b-button @click="logout">Logout</b-button>

        <!-- Delete button -->
        <b-button @click="deleteUser">Delete account</b-button>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_name: "",
      new_password: ""
    };
  },
  methods: {
    logout() {
      this.$store.state.isAuth = false;
      this.$store.dispatch("logoutUser").then(() => {
        this.$router.push("/sign-in");
      });
    },
    deleteUser() {
      this.$store.dispatch("deleteUser");
      this.$router.push("/sign-up");
    },
    changeUserName() {
      this.$store.dispatch("changeUserName", this.user_name).then(() => {
        this.$router.push("/user");
      });
    },
    changePassword() {
      this.$store.dispatch("changePassword", this.new_password);
    }
  }
};
</script>

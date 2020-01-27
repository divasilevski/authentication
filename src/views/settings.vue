<template>
  <div class="container" style="padding:12px">
    <h1 class="title">
      <strong>Settings</strong>
    </h1>
    <h1 :computed="checkUserName">
      {{ username }}, here you can change the account settings or delete it.
    </h1>

    <div
      class="column is-6-tablet is-4-desktop is-4-widescreen"
      style="padding-left:0px; padding-right:0px"
    >
      <!-- CHANGE USERNAME -->

      <ValidationObserver ref="observer">
        <!-- Observer and validate need for button -->
        <section slot-scope="{ validate, valid }">
          <InputValidation
            vid="username"
            name="Username"
            rules="required|alpha_spaces"
            type="text"
            placeholder="New username"
            v-model="new_username"
            icon="fa fa-user"
          ></InputValidation>
          <p style="margin-top: .75rem"></p>

          <b-button
            class="is-dark"
            @click="validate().then(valid ? changeUsername() : 0)"
            expanded
          >
            Change username
          </b-button>
          <p style="margin-top: .75rem"></p>
        </section>
      </ValidationObserver>

      <!----------------------------SEPARATOR-------------------------- -->
      <div class="field has-text-centered">
        <span style="color: #D6D6D6">———————— or ————————</span>
      </div>

      <!-- CHANGE PASSWORD -->

      <ValidationObserver ref="observer">
        <!-- Observer and validate need for button -->
        <section slot-scope="{ validate, valid }">
          <InputValidation
            vid="new_password"
            name="Password"
            rules="required|min:6"
            type="password"
            placeholder="New password"
            v-model="new_password"
            icon="fas fa-lock"
            password-reveal
          ></InputValidation>
          <p style="margin-top: .75rem"></p>

          <b-button
            class="is-dark"
            @click="validate().then(valid ? changePassword() : 0)"
            expanded
          >
            Change password
          </b-button>
          <p style="margin-top: .75rem"></p>
        </section>
      </ValidationObserver>

      <!-- --------------------------SEPARATOR-------------------------- -->
      <div class="field has-text-centered">
        <span style="color: #D6D6D6">———————— or ————————</span>
      </div>

      <!-- DELETE ACCOUNT -->
      <b-button class="is-dark" @click="deleteAccount" expanded>
        Delete account
      </b-button>
    </div>
  </div>
</template>

<script>
import InputValidation from "@/components/input-validation.vue";

export default {
  data() {
    return {
      username: "User",
      new_username: "",
      new_password: ""
    };
  },
  methods: {
    deleteAccount() {
      this.$store.dispatch("deleteAccount");
      this.$router.push("/").catch(() => {});
    },
    changeUsername() {
      this.$store.dispatch("updateUserData", { name: this.new_username });
      this.$store.commit("setUsername", this.new_username);
      this.$buefy.toast.open({
        message: "Username has been changed.",
        duration: 5000,
        position: "is-bottom",
        type: "is-dark"
      });
    },
    changePassword() {
      this.$store.dispatch("changePassword", this.new_password);
      this.$buefy.toast.open({
        message: "Password has been changed.",
        duration: 5000,
        position: "is-bottom",
        type: "is-dark"
      });
    },
    setUsername() {
      this.username = this.$store.getters.user.name;
    }
  },
  computed: {
    checkUserName() {
      // Set Username when checkUser == true
      return !this.$store.getters.checkUser || this.setUsername();
    }
  },
  components: {
    InputValidation
  }
};
</script>

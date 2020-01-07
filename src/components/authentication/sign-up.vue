<template>
  <div class="columns is-centered is-variable is-10">
    <div class="column is-6-tablet is-4-desktop is-4-widescreen is-centered">
      <div class="columns is-centered">
        <div class="column is-centered">
          <!-- 1/3 Horizontal center -->

          <section>
            <div class="field">
              <b-input placeholder="UserName" v-model="user_name"></b-input>
            </div>
            <div class="field">
              <b-input placeholder="Email" type="email" v-model="user_mail"></b-input>
            </div>
            <div class="field">
              <b-input
                placeholder="Password"
                type="password"
                v-model="user_password"
                password-reveal
              ></b-input>
            </div>

            <!-- Registrate button -->
            <div class="field">
              <b-button @click="registrate" :loading="loading" expanded>SignUp</b-button>
            </div>

            <!-- Tag with error -->
            <b-tag
              v-if="isTag"
              attached
              closable
              aria-close-label="Close tag"
              @close="isTag = false"
            >{{ errorTag }}</b-tag>
          </section>

          <!-- 1/3 Horizontal center -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_name: "",
      user_mail: "",
      user_password: "",
      isTag: false
    };
  },
  methods: {
    registrate() {
      const user = {
        name: this.user_name,
        email: this.user_mail,
        password: this.user_password
      };

      this.$store
        .dispatch("registerUser", user)
        .then(() => {
          this.$router.push("/user");
        })
        .catch(() => {
          this.isTag = true;
        });
    }
  },
  computed: {
    errorTag() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

<template>
  <div class="tabs is-right">
    <ul>
      <li @click="home">
        <a>Home</a>
      </li>
      <li @click="user">
        <a>User</a>
      </li>
      <li @click="settings">
        <a style="padding-left:0px; padding-right:0px">
          <span class="icon" style="margin-right:3px;size:150%">
            <i class="fas fa-ellipsis-v"></i>
          </span>
          <span></span>
        </a>
      </li>
    </ul>
  </div>
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

<template>
  <Login></Login>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/authentication/sign-in.vue";

export default {
  name: "login",
  components: {
    Login
  }
};
</script>

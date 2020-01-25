<template>
  <div class="container">
    <AppNuvbar></AppNuvbar>
    <router-view></router-view>
  </div>
</template>

<script>
import AppNuvbar from "@/components/app-navbar.vue";

export default {
  name: "app",
  components: {
    AppNuvbar
  }
};
</script>

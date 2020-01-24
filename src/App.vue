<template>
  <div class="app">
    <AppTubs></AppTubs>
    <router-view></router-view>
  </div>
</template>

<script>
import AppTubs from "@/components/app-tubs.vue";

export default {
  name: "app",
  components: {
    AppTubs
  }
};
</script>

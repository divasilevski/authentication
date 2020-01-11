<template>
  <div class="app">
    <RouterButton></RouterButton>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import RouterButton from "@/components/nav.vue";

export default {
  name: "app",
  components: {
    RouterButton
  }
};
</script>

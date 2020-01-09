<template>
  <div class="app">
    <RouterButton></RouterButton>
    <router-view></router-view>

    <ValidationProvider rules="positive" v-slot="{ errors }">
      <input v-model="value" type="text" />
      <span>{{ errors[0] }}</span>
    </ValidationProvider>
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

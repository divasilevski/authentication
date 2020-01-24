<template>
  <div class="columns">
    <div class="column is-one-quarter-desktop">
      <UserPreview></UserPreview>
    </div>
    <div class="column"></div>
  </div>
</template>

<script>
import UserPreview from "@/components/user-preview.vue";

export default {
  name: "user",
  components: {
    UserPreview
  }
};
</script>

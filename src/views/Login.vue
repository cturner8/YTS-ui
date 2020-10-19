<template>
  <div>
    <b-button class="anon-signin" @click="anonymousSignIn"
      >Login anonymously</b-button
    >
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";

export default Vue.extend({
  name: "Login",
  methods: {
    ...mapActions(["anonymousSignIn"]),
  },
});
</script>

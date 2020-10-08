<template>
  <div class="main-content reports">
    <Tables :items="reportData" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Tables } from "../components";
import { mapState } from "vuex";

export default Vue.extend({
  name: "Reports",
  components: {
    Tables
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["reportData"])
  }
});
</script>

<template>
  <div class="main-content reports">
    <Tables :items="reportData" />
  </div>
</template>

<script>
import { Tables } from "../components";
import { mapState } from "vuex";

export default {
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
};
</script>

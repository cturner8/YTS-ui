<template>
  <div class="main-content dashboard">
    <Chart v-if="reportData.channels" :reportData="reportData.channels" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { Chart } from "@/components";

export default Vue.extend({
  name: "Home",
  data() {
    return {};
  },
  components: {
    Chart,
  },
  computed: {
    ...mapState(["reportData"]),
  },
});
</script>

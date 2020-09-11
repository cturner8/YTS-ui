<template>
  <div class="main-content home">
    <Tables v-if="!isLoading" :items="reportData" />
    <b-container v-else fluid>
      <b-spinner variant="danger" />
    </b-container>
  </div>
</template>

<script>
import { Tables } from "../components";
import { mapActions, mapState } from "vuex";

export default {
  name: "Reports",
  components: {
    Tables,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["reportData", "isLoading"]),
  },
  methods: {
    ...mapActions(["searchReportData"]),
    async searchData(body) {
      await this.searchReportData(body);
    },
  },
  async created() {
    await this.searchData({
      title: "rolex",
      dateTo: "",
      dateFrom: "",
    });
  },
};
</script>

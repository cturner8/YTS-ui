<template>
  <div id="app">
    <Header id="nav" />
    <b-overlay :show="isLoading" spinner-variant="danger" :opacity="1" fluid>
      <router-view />
    </b-overlay>
  </div>
</template>

<script>
import { Header } from "./components";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    Header
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["isLoading"])
  }
};
</script>

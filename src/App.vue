<template>
  <div id="app">
    <Header id="nav" />
    <router-view />
  </div>
</template>

<script>
import { Header } from "./components";

export default {
  name: "App",
  components: {
    Header,
  },
  data() {
    return {};
  },
};
</script>

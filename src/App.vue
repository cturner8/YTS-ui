<template>
  <div id="app">
    <div id="nav">
      <Header />
    </div>
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

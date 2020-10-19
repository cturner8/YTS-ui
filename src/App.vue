<template>
  <div id="app">
    <Header
      id="nav"
      :signIn="anonymousSignIn"
      :signOut="signOut"
      :user="user"
    />
    <b-overlay :show="isLoading" spinner-variant="danger" :opacity="1" fluid>
      <router-view />
    </b-overlay>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Header } from "@/components";
import { mapState, mapActions, mapMutations } from "vuex";
import router from "@/router";

import { auth } from "@/libs/firebase";

let unsubscribe: Function;

interface IData {}

export default Vue.extend({
  name: "App",
  components: {
    Header,
  },
  data(): IData {
    return {};
  },
  async mounted() {
    unsubscribe = await auth.onAuthStateChanged((user) => {
      if (user) {
        this.setAuthUser(user);
      } else {
        this.setAuthUser(null);
      }

      if (router.currentRoute.path !== "/") {
        router.push("/");
      }
    });
  },
  destroyed() {
    unsubscribe();
  },
  computed: {
    ...mapState(["isLoading", "user"]),
  },
  methods: {
    ...mapMutations(["setAuthUser"]),
    ...mapActions(["anonymousSignIn", "signOut"]),
  },
});
</script>

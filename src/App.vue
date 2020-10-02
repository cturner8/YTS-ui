<template>
  <div id="app">
    <Header id="nav" :signIn="signIn" :signOut="signOut" :user="user" />
    <b-overlay :show="isLoading" spinner-variant="danger" :opacity="1" fluid>
      <router-view />
    </b-overlay>
  </div>
</template>

<script>
import { Header } from "./components";
import { mapState } from "vuex";

import { auth } from "./libs/firebase";

let unsubscribe;

export default {
  name: "App",
  components: {
    Header
  },
  data() {
    return {
      user: null
    };
  },
  async mounted() {
    unsubscribe = await auth.onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
  destroyed() {
    unsubscribe();
  },
  computed: {
    ...mapState(["isLoading"])
  },
  methods: {
    async signIn() {
      try {
        await auth.signInAnonymously();
      } catch (e) {
        console.log(e);
      }
    },
    async signOut() {
      try {
        await auth.signOut();
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
